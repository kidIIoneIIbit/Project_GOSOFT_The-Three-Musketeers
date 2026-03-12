const RiskBadge = ({ score }) => {
  let color = 'var(--color-success)';
  let bg = 'rgba(16, 185, 129, 0.1)';
  let label = 'Low';

  if (score >= 70) {
    color = 'var(--color-danger)';
    bg = 'rgba(239, 68, 68, 0.1)';
    label = 'Critical';
  } else if (score >= 40) {
    color = 'var(--color-warning)';
    bg = 'rgba(245, 158, 11, 0.1)';
    label = 'Medium';
  }

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '4px 10px',
      borderRadius: '20px',
      background: bg,
      color: color,
      border: `1px solid ${color}40`,
      fontSize: '13px',
      fontWeight: '600'
    }}>
      <div style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 8px ${color}`
      }} />
      <span>{score} ({label})</span>
    </div>
  );
};

export default RiskBadge;
