export default function Loading() {
  return (
    <div className="empty-state">
      <div className="breathing-circle paused" style={{ width: 60, height: 60, margin: '0 auto 16px', fontSize: '0.8rem' }}>
        <span className="spinner-border spinner-border-sm" role="status" />
      </div>
      <p className="text-muted">Loading...</p>
    </div>
  );
}
