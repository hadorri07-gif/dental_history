#![no_std]

use soroban_sdk::{
    contract, contracterror, contractimpl, contracttype, symbol_short, Address, Env, Symbol, Vec,
};

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub struct Visit {
    pub dentist: Address,
    pub procedure: Symbol,
    pub tooth: Symbol,
    pub visit_date: u64,
}

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Access(Address, Address), // patient, dentist
    Visits(Address),          // patient
}

#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[contracterror]
#[repr(u32)]
pub enum DentalError {
    NotAuthorized = 1,
    VisitNotFound = 2,
}

#[contract]
pub struct DentalHistoryContract;

#[contractimpl]
impl DentalHistoryContract {
    pub fn grant_access(env: Env, patient: Address, dentist: Address) {
        patient.require_auth();

        let key = DataKey::Access(patient.clone(), dentist.clone());
        env.storage().persistent().set(&key, &true);

        env.events().publish(
            (symbol_short!("access"), symbol_short!("grant"), patient),
            dentist,
        );
    }

    pub fn revoke_access(env: Env, patient: Address, dentist: Address) {
        patient.require_auth();

        let key = DataKey::Access(patient.clone(), dentist.clone());
        env.storage().persistent().set(&key, &false);

        env.events().publish(
            (symbol_short!("access"), symbol_short!("revoke"), patient),
            dentist,
        );
    }

    pub fn has_access(env: Env, patient: Address, dentist: Address) -> bool {
        Self::read_access(&env, &patient, &dentist)
    }

    pub fn add_visit(
        env: Env,
        patient: Address,
        dentist: Address,
        procedure: Symbol,
        tooth: Symbol,
        visit_date: u64,
    ) -> Result<(), DentalError> {
        dentist.require_auth();

        let allowed = Self::read_access(&env, &patient, &dentist);
        if !allowed {
            return Err(DentalError::NotAuthorized);
        }

        let mut visits = Self::read_visits(&env, &patient);

        let visit = Visit {
            dentist: dentist.clone(),
            procedure,
            tooth,
            visit_date,
        };

        visits.push_back(visit.clone());

        let key = DataKey::Visits(patient.clone());
        env.storage().persistent().set(&key, &visits);

        env.events().publish(
            (symbol_short!("visit"), symbol_short!("add"), patient),
            visit,
        );

        Ok(())
    }

    pub fn visit_count(
        env: Env,
        patient: Address,
        caller: Address,
    ) -> Result<u32, DentalError> {
        caller.require_auth();

        if caller != patient && !Self::read_access(&env, &patient, &caller) {
            return Err(DentalError::NotAuthorized);
        }

        let visits = Self::read_visits(&env, &patient);
        Ok(visits.len())
    }

    pub fn get_visit(
        env: Env,
        patient: Address,
        caller: Address,
        index: u32,
    ) -> Result<Visit, DentalError> {
        caller.require_auth();

        if caller != patient && !Self::read_access(&env, &patient, &caller) {
            return Err(DentalError::NotAuthorized);
        }

        let visits = Self::read_visits(&env, &patient);

        if index >= visits.len() {
            return Err(DentalError::VisitNotFound);
        }

        Ok(visits.get(index).unwrap())
    }

    fn read_access(env: &Env, patient: &Address, dentist: &Address) -> bool {
        let key = DataKey::Access(patient.clone(), dentist.clone());

        env.storage()
            .persistent()
            .get(&key)
            .unwrap_or(false)
    }

    fn read_visits(env: &Env, patient: &Address) -> Vec<Visit> {
        let key = DataKey::Visits(patient.clone());

        env.storage()
            .persistent()
            .get(&key)
            .unwrap_or(Vec::new(env))
    }
}

mod test;