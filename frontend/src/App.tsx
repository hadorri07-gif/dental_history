import { useState } from "react";
import "./App.css";

type Visit = {
  dentist: string;
  procedure: string;
  tooth: string;
  visitDate: string;
};

const CONTRACT_ADDRESS =
  "CDQPGEIBBEFPFSFLIWLHT6AQ2ZJSXPQNKMOC5LD5GXISRHUEL7LLD55Y";

const PATIENT_ADDRESS =
  "GCZFWV6QSU5EYACOIUL7LKHLC4GFPF3FWUG4QGD6ZX7SFLVWHN3DKGU3";

const DENTIST_ADDRESS =
  "GBUCZP6ZABFQURZ5XYDGGGVHVN5L2EUISASQQ2RIWOIYFFIWPJDT5SQ6";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [status, setStatus] = useState("Ready to manage dental history.");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [patientAddress, setPatientAddress] = useState(PATIENT_ADDRESS);
  const [dentistAddress, setDentistAddress] = useState(DENTIST_ADDRESS);
  const [procedure, setProcedure] = useState("clean");
  const [tooth, setTooth] = useState("UR3");
  const [visitDate, setVisitDate] = useState("20260621");
  const [visitIndex, setVisitIndex] = useState("0");

  const [visit, setVisit] = useState<Visit | null>({
    dentist: DENTIST_ADDRESS,
    procedure: "clean",
    tooth: "UR3",
    visitDate: "20260621",
  });

  const fakeDelay = async () => {
    await new Promise((resolve) => setTimeout(resolve, 700));
  };

  const connectWallet = async () => {
    setError("");
    setIsLoading(true);
    setStatus("Connecting wallet...");

    try {
      await fakeDelay();

      setWalletAddress(PATIENT_ADDRESS);
      setStatus("Demo wallet connected. Freighter integration comes next.");
    } catch {
      setError("Could not connect wallet. Please install or unlock Freighter.");
      setStatus("Wallet connection failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const grantAccess = async () => {
    setError("");
    setIsLoading(true);
    setStatus("Granting dentist access...");

    try {
      if (!patientAddress || !dentistAddress) {
        throw new Error("Patient and dentist addresses are required.");
      }

      await fakeDelay();

      setStatus("Access granted successfully in demo UI.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Grant access failed.");
      setStatus("Grant access failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const addVisit = async () => {
    setError("");
    setIsLoading(true);
    setStatus("Adding dental visit...");

    try {
      if (!patientAddress || !dentistAddress || !procedure || !tooth || !visitDate) {
        throw new Error("All visit fields are required.");
      }

      await fakeDelay();

      setVisit({
        dentist: dentistAddress,
        procedure,
        tooth,
        visitDate,
      });

      setStatus("Dental visit added successfully in demo UI.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Add visit failed.");
      setStatus("Add visit failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const readVisit = async () => {
    setError("");
    setIsLoading(true);
    setStatus("Reading visit from dental history...");

    try {
      if (visitIndex !== "0") {
        throw new Error("Demo data only has visit index 0.");
      }

      await fakeDelay();

      setVisit({
        dentist: DENTIST_ADDRESS,
        procedure: "clean",
        tooth: "UR3",
        visitDate: "20260621",
      });

      setStatus("Visit loaded successfully in demo UI.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Read visit failed.");
      setStatus("Read visit failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="app">
      <section className="hero">
        <div className="heroText">
          <p className="badge">Stellar Testnet dApp</p>
          <h1>Dental History</h1>
          <p className="subtitle">
            A patient-owned, append-only dental record built with Soroban smart
            contracts on Stellar.
          </p>

          <div className="heroActions">
            <button onClick={connectWallet} disabled={isLoading}>
              {walletAddress ? "Wallet connected" : "Connect demo wallet"}
            </button>
            <a
              href="https://stellar.expert/explorer/testnet"
              target="_blank"
              rel="noreferrer"
              className="secondaryButton"
            >
              View Testnet Explorer
            </a>
          </div>
        </div>

        <div className="contractCard">
          <p className="cardLabel">Contract address</p>
          <p className="mono">{CONTRACT_ADDRESS}</p>
          <p className="network">Network: Stellar Testnet</p>
        </div>
      </section>

      <section className="statusPanel">
        <div>
          <p className="cardLabel">Current status</p>
          <p>{status}</p>
        </div>

        {isLoading && <p className="loading">Processing transaction...</p>}
        {error && <p className="error">{error}</p>}
      </section>

      <section className="grid">
        <div className="panel">
          <h2>1. Patient grants access</h2>
          <p>
            The patient controls which dentist can read or append to the dental
            record.
          </p>

          <label>Patient address</label>
          <input
            value={patientAddress}
            onChange={(event) => setPatientAddress(event.target.value)}
          />

          <label>Dentist address</label>
          <input
            value={dentistAddress}
            onChange={(event) => setDentistAddress(event.target.value)}
          />

          <button onClick={grantAccess} disabled={isLoading}>
            Grant access
          </button>
        </div>

        <div className="panel">
          <h2>2. Dentist adds visit</h2>
          <p>
            Each visit is signed by the dentist and stored as append-only
            history.
          </p>

          <label>Procedure</label>
          <input
            value={procedure}
            onChange={(event) => setProcedure(event.target.value)}
          />

          <label>Tooth</label>
          <input value={tooth} onChange={(event) => setTooth(event.target.value)} />

          <label>Visit date</label>
          <input
            value={visitDate}
            onChange={(event) => setVisitDate(event.target.value)}
          />

          <button onClick={addVisit} disabled={isLoading}>
            Add visit
          </button>
        </div>

        <div className="panel">
          <h2>3. Read dental visit</h2>
          <p>
            Patients and authorized dentists can retrieve visits by index.
          </p>

          <label>Visit index</label>
          <input
            value={visitIndex}
            onChange={(event) => setVisitIndex(event.target.value)}
          />

          <button onClick={readVisit} disabled={isLoading}>
            Get visit
          </button>

          {visit && (
            <div className="visitResult">
              <p className="cardLabel">Visit result</p>
              <p>
                <strong>Dentist:</strong> <span className="mono">{visit.dentist}</span>
              </p>
              <p>
                <strong>Procedure:</strong> {visit.procedure}
              </p>
              <p>
                <strong>Tooth:</strong> {visit.tooth}
              </p>
              <p>
                <strong>Visit date:</strong> {visit.visitDate}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="proof">
        <h2>Submission proof</h2>
        <div className="proofGrid">
          <div>
            <p className="cardLabel">Deploy TX</p>
            <p className="mono">
              6179be5571bd13e6efeef12146db6c0caad6c7e1b6ccc489be16f271a3547f55
            </p>
          </div>
          <div>
            <p className="cardLabel">Add Visit TX</p>
            <p className="mono">
              310f560e04de8dff74a1f066cde99ae4b164c5e02acc0e70e80adade27794a4e
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;