import { useState, useEffect } from "react";
import "./ProfileList.css";
import { Link } from "react-router-dom";

function ProfileList() {
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=10`)
      .then((response) => response.json())
      .then((data) =>
        setProfiles((prevProfiles) => [...prevProfiles, ...data])
      );
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <ul className="profile-list">
        {profiles.map((profile) => (
          <li key={profile.id}>
            <img
              src={`https://avatars.dicebear.com/api/male/${profile.id}.svg`}
              alt={profile.name}
            />
            <p>{profile.name}</p>
          </li>
        ))}
      </ul>
      <Link className="new" to="/dashboard">Add newProfile</Link>
    </div>
  );
}

export default ProfileList;
