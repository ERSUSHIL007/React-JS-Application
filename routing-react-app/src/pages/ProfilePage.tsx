import { Link, useParams } from "react-router";

const profiles = [
  { id: "1", name: "Test Dev 1", role: "Frontend Developer" },
  { id: "2", name: "Test Dev 2", role: "UI Designer" },
  { id: "3", name: "Test Dev 3", role: "Product Manager" },
  { id: "4", name: "Test Dev 4", role: "Backend Developer" },
  { id: "5", name: "Test Dev 5", role: "QA Engineer" },
];

export function ProfilePage() {
  const { profileId } = useParams();
  const profile = profiles.find((item) => item.id === profileId);

  return (
    <main className="screen">
      <section className="home-panel">
        <p className="eyebrow">Profile</p>
        {profileId ? (
          profile ? (
            <>
              <h1 className="home-title">{profile.name}</h1>
              <p className="home-copy">
                Profile {profile.id} · {profile.role}
              </p>
            </>
          ) : (
            <>
              <h1 className="home-title">Profile not found</h1>
              <p className="home-copy">
                There is no profile with ID {profileId}. Choose a profile from
                the list.
              </p>
            </>
          )
        ) : (
          <>
            <h1 className="home-title">Choose a profile</h1>
            <p className="home-copy">
              Each profile link includes its ID as a route parameter.
            </p>
            <ul className="profile-list">
              {profiles.map((item) => (
                <li key={item.id}>
                  <Link className="text-link" to={`/profile/${item.id}`}>
                    Profile {item.id}: {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
        {profileId && (
          <p className="profile-back-link">
            <Link className="text-link" to="/profile">
              Back to all profiles
            </Link>
          </p>
        )}
      </section>
    </main>
  );
}
