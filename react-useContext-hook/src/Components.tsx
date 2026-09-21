import { useUserContext } from "./context";

interface SidebarProps {}

export function Sidebar({}: SidebarProps) {
  //   const user = useContext(DashboardContext);

  //Use Custum Hook useUserContext
  const user = useUserContext();

  return (
    <div className="sidebar-panel">
      <div className="user-pill">{user?.name}</div>
      <div className="status-row">
        <span className="status-label">Subscription Status:</span>
        <span
          className={`status-badge ${user?.isSubscribed ? "active" : "inactive"}`}
        >
          {user?.isSubscribed ? "Active" : "Inactive"}
        </span>
      </div>
    </div>
  );
}

interface ProfileProps {}

export function Profile({}: ProfileProps) {
  //   const user = useContext(DashboardContext);

  //Use Custum Hook useUserContext
  const user = useUserContext();

  return (
    <div className="profile-panel">
      <p className="profile-label">Profile</p>
      <h2 className="profile-name">{user?.name}</h2>
      <p className="profile-text">
        {user?.isSubscribed
          ? "This user has an active subscription."
          : "This user does not currently have an active subscription."}
      </p>
    </div>
  );
}
