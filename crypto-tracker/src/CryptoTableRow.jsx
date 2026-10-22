

const CryptoTableRow = ({ coin }) => {
  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <tr style={{ borderBottom: '1px solid #334155' }}>
      <td style={{ padding: '14px 16px' }}>{coin.market_cap_rank}</td>
      <td style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img 
          src={coin.image} 
          alt={coin.name} 
          style={{ width: '28px', height: '28px', borderRadius: '50%' }} 
        />
        <div>
          <strong style={{ display: 'block', color: '#f8fafc' }}>{coin.name}</strong>
          <span style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase' }}>
            {coin.symbol}
          </span>
        </div>
      </td>
      <td style={{ padding: '14px 16px', fontWeight: '600' }}>
        ${coin.current_price?.toLocaleString()}
      </td>
      <td style={{ 
        padding: '14px 16px', 
        fontWeight: '600',
        color: isPositive ? '#22c55e' : '#ef4444' 
      }}>
        {isPositive ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
      </td>
      <td style={{ padding: '14px 16px' }}>
        ${coin.total_volume?.toLocaleString()}
      </td>
      <td style={{ padding: '14px 16px' }}>
        ${coin.market_cap?.toLocaleString()}
      </td>
    </tr>
  );
};

export default CryptoTableRow;