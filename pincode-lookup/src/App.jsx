import  { useState } from "react";
import "./App.css";

function App() {
  const [pincode, setPincode] = useState("");
  const [submittedPincode, setSubmittedPincode] = useState("");
  const [postOffices, setPostOffices] = useState([]);
  const [apiMessage, setApiMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleLookup = async (e) => {
    e.preventDefault();
    setError("");

    // 6-digit validation check
    const isSixDigit = /^\d{6}$/.test(pincode.trim());
    if (!isSixDigit) {
      setError("Postal code must be exactly 6 digits.");
      return;
    }

    setLoading(true);
    setHasSearched(false);
    setSearchTerm("");

    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode.trim()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch postal data from server.");
      }

      const data = await response.json();

      if (data && data[0]) {
        if (data[0].Status === "Error" || !data[0].PostOffice) {
          setError(data[0].Message || "Invalid Pincode entered.");
          setPostOffices([]);
        } else {
          setPostOffices(data[0].PostOffice);
          setApiMessage(data[0].Message || "");
          setSubmittedPincode(pincode.trim());
          setHasSearched(true);
        }
      } else {
        setError("Unexpected response received from postal server.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Real-time filter
  const filteredPostOffices = postOffices.filter((item) =>
    item.Name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const handleReset = () => {
    setHasSearched(false);
    setPincode("");
    setSearchTerm("");
    setPostOffices([]);
    setError("");
  };

  return (
    <div className="app-container">
      {/* Before clicking button */}
      {!hasSearched && !loading && (
        <div>
          <h2 className="form-title">Enter Pincode</h2>
          <form onSubmit={handleLookup}>
            <input
              type="text"
              className="input-box"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              maxLength={6}
            />
            {error && <p className="error-msg">{error}</p>}
            <button type="submit" className="lookup-btn">
              Lookup
            </button>
          </form>
        </div>
      )}

      {/* Loader while fetching */}
      {loading && (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Fetching postal details...</p>
        </div>
      )}

      {/* After clicking button */}
      {hasSearched && !loading && (
        <div>
          <button className="back-btn" onClick={handleReset}>
            ← Lookup Another Pincode
          </button>

          <div className="details-header">
            <h3 className="pincode-title">Pincode: {submittedPincode}</h3>
            <p className="message-text">
              <strong>Message:</strong> {apiMessage}
            </p>
          </div>

          <div className="filter-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="filter-input"
              placeholder="Filter by post office name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredPostOffices.length === 0 ? (
            <p className="empty-msg">
              Couldn’t find the postal data you’re looking for…
            </p>
          ) : (
            <div className="cards-grid">
              {filteredPostOffices.map((office, index) => (
                <div key={`${office.Name}-${index}`} className="post-card">
                  <p>
                    <strong>Name:</strong> {office.Name}
                  </p>
                  <p>
                    <strong>Branch Type:</strong> {office.BranchType}
                  </p>
                  <p>
                    <strong>Delivery Status:</strong> {office.DeliveryStatus}
                  </p>
                  <p>
                    <strong>District:</strong> {office.District}
                  </p>
                  <p>
                    <strong>Division:</strong> {office.Division}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;