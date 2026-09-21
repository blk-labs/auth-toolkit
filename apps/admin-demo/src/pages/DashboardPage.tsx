import { useAuth, useAuthRedirect } from "@blk-auth-toolkit/react";
import type { AdminUser } from "../auth";

const metrics = [
  { number: "01", label: "People with access", value: "2,846", change: "+12.8%", detail: "from last month", color: "lilac" },
  { number: "02", label: "Sessions open", value: "1,204", change: "+8.2%", detail: "from last month", color: "mint" },
  { number: "03", label: "Sign-ins blocked", value: "18", change: "−4.3%", detail: "from last month", color: "coral" },
  { number: "04", label: "Requests to review", value: "07", change: "3 new", detail: "since yesterday", color: "yellow" },
] as const;

const signIns = [
  { day: "Mon", height: 48 },
  { day: "Tue", height: 64 },
  { day: "Wed", height: 57 },
  { day: "Thu", height: 76 },
  { day: "Fri", height: 66 },
  { day: "Sat", height: 91 },
  { day: "Sun", height: 73 },
] as const;

const users = [
  { initials: "JC", name: "Jordan Carter", email: "jordan.carter@example.com", role: "Admin", status: "Active", lastActive: "Just now", color: "mint" },
  { initials: "SL", name: "Samira Lee", email: "samira.lee@example.com", role: "Editor", status: "Active", lastActive: "12 min ago", color: "lilac" },
  { initials: "MR", name: "Miles Reed", email: "miles.reed@example.com", role: "Viewer", status: "Active", lastActive: "1 hour ago", color: "coral" },
  { initials: "AP", name: "Avery Patel", email: "avery.patel@example.com", role: "Editor", status: "Invited", lastActive: "—", color: "yellow" },
] as const;

const activity = [
  { title: "Admin sign-in", detail: "Jordan Carter · Chrome on macOS", time: "2 min ago", color: "mint" },
  { title: "Role changed", detail: "Samira Lee now has Editor access", time: "24 min ago", color: "lilac" },
  { title: "Session renewed", detail: "Access token refreshed", time: "1 hour ago", color: "yellow" },
  { title: "Session ended", detail: "Inactive session signed out", time: "3 hours ago", color: "coral" },
] as const;

export function DashboardPage() {
  const { user, logout } = useAuth<AdminUser>();
  const { redirectAfterLogout } = useAuthRedirect();

  function handleLogout() {
    logout();
    redirectAfterLogout();
  }

  if (user?.role !== "admin") {
    return (
      <main className="access-screen">
        <div className="access-card">
          <p className="eyebrow">Admin area</p>
          <h1>You don't have access to this dashboard.</h1>
          <p>Sign out and use an admin account to continue.</p>
          <button type="button" className="button button-primary" onClick={handleLogout}>Log out</button>
        </div>
      </main>
    );
  }

  return (
    <div className="dashboard-shell">
      <aside className="sidebar" aria-label="Dashboard sidebar">
        <div className="sidebar-top">
          <div className="brand">
            <span className="brand-mark" aria-hidden="true">b.</span>
            <div className="brand-copy"><strong>BLK / Identity</strong><span>ADMIN DEMO</span></div>
          </div>

          <div className="sidebar-workspace">
            <span>Current workspace</span>
            <strong>BLK Sandbox</strong>
            <small>Identity toolkit demo</small>
          </div>

          <nav className="sidebar-nav" aria-label="Dashboard sections">
            <span className="nav-heading">Explore</span>
            <a className="nav-link active" href="#overview" aria-current="page"><span className="nav-number">01</span> Overview <span className="nav-arrow" aria-hidden="true">↗</span></a>
            <a className="nav-link" href="#activity"><span className="nav-number">02</span> Activity</a>
            <a className="nav-link" href="#users"><span className="nav-number">03</span> People</a>
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div className="demo-callout"><strong>DEMO MODE</strong><p>Everything on this page is sample data.</p></div>
          <div className="sidebar-account">
            <span className="account-avatar" aria-hidden="true">{user.name.split(" ").map((part) => part[0]).join("")}</span>
            <span className="account-details"><strong>{user.name}</strong><small>Administrator</small></span>
          </div>
          <button type="button" className="logout-button" onClick={handleLogout}>
            <span>Log out</span><span aria-hidden="true">↗</span>
          </button>
        </div>
      </aside>

      <main className="dashboard-main" id="overview">
        <header className="topbar">
          <div className="breadcrumbs"><span>BLK Sandbox</span><span aria-hidden="true">/</span><strong>Overview</strong></div>
          <div className="topbar-right"><span className="environment-dot" aria-hidden="true" /> Demo environment <span className="topbar-avatar" aria-label={`${user.name}, administrator`}>{user.name.slice(0, 1)}</span></div>
        </header>

        <div className="content-wrap">
          <div className="page-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-rule" /> IDENTITY OVERVIEW</p>
              <h1>Who's in.<br />What's changed<span className="heading-period">.</span></h1>
              <p className="page-subtitle">A quick read on members, sessions, and sign-ins.</p>
            </div>
            <div className="heading-stamp"><span>SAMPLE DATA</span><strong>Workspace<br />pulse</strong><span className="stamp-asterisk" aria-hidden="true">✳</span></div>
          </div>

          <section className="metrics-grid" aria-label="Workspace statistics">
            {metrics.map((metric) => (
              <article className={`metric-card metric-${metric.color}`} key={metric.label}>
                <div className="metric-top"><p>{metric.label}</p><span>{metric.number}</span></div>
                <p className="metric-value">{metric.value}</p>
                <div className="metric-foot"><strong>{metric.change}</strong><span>{metric.detail}</span></div>
              </article>
            ))}
          </section>

          <div className="feature-grid">
            <section className="chart-panel" aria-labelledby="chart-heading">
              <div className="panel-heading"><div><p className="section-kicker">THE LAST SEVEN DAYS</p><h2 id="chart-heading">Sign-in pulse</h2></div><span className="chart-trend">↗ 9.2%</span></div>
              <p className="chart-description">Successful sign-ins, day by day</p>
              <div className="chart-bars" role="img" aria-label="Sample sign-in activity for the last seven days, highest on Saturday">
                {signIns.map((item) => (
                  <div className="chart-column" key={item.day}>
                    <div className="bar-track"><span className={item.day === "Sat" ? "bar bar-highlight" : "bar"} style={{ height: `${item.height}%` }} /></div>
                    <span className="bar-label">{item.day}</span>
                  </div>
                ))}
              </div>
              <div className="chart-footer"><span className="legend-dot" /> Sign-ins <span>Demo trend</span></div>
            </section>

            <section className="activity-panel" id="activity" aria-labelledby="activity-heading">
              <div className="panel-heading"><div><p className="section-kicker">AS IT HAPPENS</p><h2 id="activity-heading">Recent activity</h2></div><span className="activity-count">04</span></div>
              <div className="activity-list">
                {activity.map((item) => (
                  <div className="activity-item" key={item.title}>
                    <span className={`activity-marker ${item.color}`} aria-hidden="true" />
                    <div className="activity-copy"><strong>{item.title}</strong><span>{item.detail}</span><time>{item.time}</time></div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="users-panel" id="users" aria-labelledby="users-heading">
            <div className="panel-heading"><div><p className="section-kicker">PEOPLE & ACCESS</p><h2 id="users-heading">Recently active</h2></div><span className="users-count">4 people shown</span></div>
            <div className="table-scroll">
              <table>
                <thead><tr><th scope="col">Person</th><th scope="col">Role</th><th scope="col">Status</th><th scope="col">Last active</th></tr></thead>
                <tbody>
                  {users.map((person) => (
                    <tr key={person.email}>
                      <td><div className="person-cell"><span className={`person-avatar ${person.color}`} aria-hidden="true">{person.initials}</span><span><strong>{person.name}</strong><small>{person.email}</small></span></div></td>
                      <td><span className="role-text">{person.role}</span></td>
                      <td><span className={`status-pill ${person.status.toLowerCase()}`}><span aria-hidden="true" /> {person.status}</span></td>
                      <td>{person.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <p className="dashboard-footnote">BLK / Identity <span>·</span> Admin interface preview <span>·</span> Sample data</p>
        </div>
      </main>
    </div>
  );
}
