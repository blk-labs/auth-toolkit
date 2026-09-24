import { useAuth, useAuthRedirect } from "@blk-auth-toolkit/react";
import type { DemoUser } from "../auth";

const accountDetails = [
  { label: "Member since", value: "March 2025", color: "lilac" },
  { label: "Active sessions", value: "2 devices", color: "mint" },
  { label: "Security checks", value: "All passed", color: "yellow" },
] as const;

const recentActivity = [
  { title: "Signed in successfully", detail: "Chrome on Windows", time: "Just now", color: "mint" },
  { title: "Account details reviewed", detail: "No changes were made", time: "Yesterday", color: "lilac" },
  { title: "Session renewed", detail: "Your access stayed active", time: "3 days ago", color: "yellow" },
] as const;

export function UserPage() {
  const { user, logout } = useAuth<DemoUser>();
  const { redirectAfterLogout } = useAuthRedirect();

  function handleLogout() {
    logout();
    redirectAfterLogout();
  }

  if (user?.role !== "member") {
    return (
      <main className="access-screen">
        <div className="access-card">
          <p className="eyebrow">Member area</p>
          <h1>This page is for member accounts.</h1>
          <p>Sign out and use a member account to continue.</p>
          <button type="button" className="button button-primary" onClick={handleLogout}>Log out</button>
        </div>
      </main>
    );
  }

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("");
  const firstName = user.name.split(" ")[0];

  return (
    <div className="member-shell">
      <header className="member-header">
        <div className="brand member-brand">
          <span className="brand-mark" aria-hidden="true">b.</span>
          <div className="brand-copy"><strong>BLK / Identity</strong><span>MEMBER SPACE</span></div>
        </div>
        <div className="member-header-actions">
          <span className="member-environment"><span className="environment-dot" aria-hidden="true" /> Demo environment</span>
          <span className="member-avatar" aria-hidden="true">{initials}</span>
          <button type="button" className="member-logout" onClick={handleLogout}>Log out <span aria-hidden="true">↗</span></button>
        </div>
      </header>

      <main className="member-main">
        <section className="member-hero" aria-labelledby="member-heading">
          <div className="member-hero-copy">
            <p className="eyebrow"><span className="eyebrow-rule" /> YOUR ACCOUNT</p>
            <h1 id="member-heading">Good to see you,<br />{firstName}<span className="heading-period">.</span></h1>
            <p>Your identity, workspace access, and recent security activity in one place.</p>
          </div>
          <div className="member-pass" aria-label="Active member pass">
            <span className="member-pass-label">MEMBER PASS</span>
            <span className="member-pass-mark" aria-hidden="true">✦</span>
            <strong>{initials}</strong>
            <div><span>{user.name}</span><small>ACTIVE ACCESS</small></div>
          </div>
        </section>

        <section className="member-stats" aria-label="Account summary">
          {accountDetails.map((item, index) => (
            <article className={`member-stat member-stat-${item.color}`} key={item.label}>
              <span>0{index + 1}</span>
              <div><p>{item.label}</p><strong>{item.value}</strong></div>
            </article>
          ))}
        </section>

        <div className="member-grid">
          <section className="member-profile" aria-labelledby="profile-heading">
            <div className="member-section-heading">
              <div><p className="section-kicker">PROFILE</p><h2 id="profile-heading">Account details</h2></div>
              <span className="status-pill active"><span aria-hidden="true" /> Active</span>
            </div>
            <dl className="profile-list">
              <div><dt>Full name</dt><dd>{user.name}</dd></div>
              <div><dt>Email address</dt><dd>{user.email}</dd></div>
              <div><dt>Account ID</dt><dd>{user.id}</dd></div>
              <div><dt>Access level</dt><dd>Member</dd></div>
            </dl>
          </section>

          <section className="member-activity" aria-labelledby="member-activity-heading">
            <div className="member-section-heading">
              <div><p className="section-kicker">SECURITY LOG</p><h2 id="member-activity-heading">Recent activity</h2></div>
              <span className="member-activity-count">03</span>
            </div>
            <div className="activity-list">
              {recentActivity.map((item) => (
                <div className="activity-item" key={item.title}>
                  <span className={`activity-marker ${item.color}`} aria-hidden="true" />
                  <div className="activity-copy"><strong>{item.title}</strong><span>{item.detail}</span><time>{item.time}</time></div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="member-security" aria-labelledby="security-heading">
          <div>
            <p className="section-kicker">ACCOUNT SECURITY</p>
            <h2 id="security-heading">Your account looks healthy.</h2>
            <p>This preview uses sample information. A real app can connect these cards to its account and session endpoints.</p>
          </div>
          <div className="security-score"><strong>100</strong><span>security score</span></div>
        </section>

        <p className="dashboard-footnote">BLK / Identity <span>·</span> Member interface preview <span>·</span> Sample data</p>
      </main>
    </div>
  );
}
