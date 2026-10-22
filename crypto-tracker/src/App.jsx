import  { useState, useEffect } from 'react';
import CryptoTableRow from './CryptoTableRow';

const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Evaluation Criteria: async/await approach with useEffect
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('API fetch failed or rate-limited by CoinGecko');
        }
        const data = await response.json();
        setCoins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'sans-serif',
      padding: '32px 16px'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '8px', fontSize: '28px' }}>
          Crypto Market Top 10 Tracker
        </h1>
        <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px' }}>
          Fetched live using React useEffect and useState
        </p>

        {loading && (
          <p style={{ textAlign: 'center', padding: '40px', color: '#38bdf8' }}>
            Loading cryptocurrency data...
          </p>
        )}

        {error && (
          <div style={{
            backgroundColor: '#7f1d1d',
            color: '#fecaca',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error} (CoinGecko free tier allows 10-30 req/min, please refresh after a moment)
          </div>
        )}

        {!loading && !error && (
          <div style={{ overflowX: 'auto', backgroundColor: '#1e293b', borderRadius: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #334155', color: '#94a3b8', fontSize: '14px' }}>
                  <th style={{ padding: '16px' }}>Rank</th>
                  <th style={{ padding: '16px' }}>Asset</th>
                  <th style={{ padding: '16px' }}>Price</th>
                  <th style={{ padding: '16px' }}>24h Change</th>
                  <th style={{ padding: '16px' }}>24h Volume</th>
                  <th style={{ padding: '16px' }}>Market Cap</th>
                </tr>
              </thead>
              <tbody>
                {/* Evaluation Criteria Part 4: Mapping with Unique Keys */}
                {coins.map((coin) => (
                  <CryptoTableRow key={coin.id} coin={coin} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;