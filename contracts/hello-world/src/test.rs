#![cfg(test)]

use super::*;
use soroban_sdk::{symbol_short, testutils::Address as _, Address, Env};

#[test]
fn patient_can_grant_access_and_dentist_can_add_visit() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(DentalHistoryContract, ());
    let client = DentalHistoryContractClient::new(&env, &contract_id);

    let patient = Address::generate(&env);
    let dentist = Address::generate(&env);

    client.grant_access(&patient, &dentist);

    let has_access = client.has_access(&patient, &dentist);
    assert_eq!(has_access, true);

    client.add_visit(
        &patient,
        &dentist,
        &symbol_short!("clean"),
        &symbol_short!("UR3"),
        &20260621,
    );

    let count = client.visit_count(&patient, &patient);
    assert_eq!(count, 1);

    let visit = client.get_visit(&patient, &patient, &0);
    assert_eq!(visit.dentist, dentist);
    assert_eq!(visit.procedure, symbol_short!("clean"));
    assert_eq!(visit.tooth, symbol_short!("UR3"));
    assert_eq!(visit.visit_date, 20260621);
}

#[test]
fn unauthorized_dentist_cannot_add_visit() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(DentalHistoryContract, ());
    let client = DentalHistoryContractClient::new(&env, &contract_id);

    let patient = Address::generate(&env);
    let unauthorized_dentist = Address::generate(&env);

    let result = client.try_add_visit(
        &patient,
        &unauthorized_dentist,
        &symbol_short!("fill"),
        &symbol_short!("LL5"),
        &20260622,
    );

    assert!(result.is_err());
}

#[test]
fn revoked_dentist_cannot_add_new_visit() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(DentalHistoryContract, ());
    let client = DentalHistoryContractClient::new(&env, &contract_id);

    let patient = Address::generate(&env);
    let dentist = Address::generate(&env);

    client.grant_access(&patient, &dentist);
    client.revoke_access(&patient, &dentist);

    let result = client.try_add_visit(
        &patient,
        &dentist,
        &symbol_short!("xray"),
        &symbol_short!("UR1"),
        &20260623,
    );

    assert!(result.is_err());
}

#[test]
fn get_visit_out_of_bounds_returns_error() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(DentalHistoryContract, ());
    let client = DentalHistoryContractClient::new(&env, &contract_id);

    let patient = Address::generate(&env);
    let dentist = Address::generate(&env);

    client.grant_access(&patient, &dentist);

    client.add_visit(
        &patient,
        &dentist,
        &symbol_short!("clean"),
        &symbol_short!("UR3"),
        &20260621,
    );

    let missing_visit = client.try_get_visit(&patient, &patient, &99);

    assert!(missing_visit.is_err());
}