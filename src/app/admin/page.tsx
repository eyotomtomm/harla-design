export default function AdminDashboard() {
  return (
    <>
      <div className="admin-header">
        <h1>Dashboard</h1>
      </div>
      <div className="admin-stats">
        <div className="stat-card">
          <div className="number">--</div>
          <div className="label">Projects</div>
        </div>
        <div className="stat-card">
          <div className="number">--</div>
          <div className="label">Blog Posts</div>
        </div>
        <div className="stat-card">
          <div className="number">--</div>
          <div className="label">Team Members</div>
        </div>
        <div className="stat-card">
          <div className="number">--</div>
          <div className="label">Messages</div>
        </div>
      </div>
      <div className="admin-card">
        <h3>Welcome to Harla Admin</h3>
        <p style={{ color: '#999' }}>Use the sidebar to manage your website content. All changes will be reflected on the public site immediately.</p>
      </div>
    </>
  );
}
