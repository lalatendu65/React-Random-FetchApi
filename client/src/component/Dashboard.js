import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Dashboard.css";

function Dashboard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [formError, setFormError] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setProfiles(data));
  }, []);

 const handleFormSubmit = (e) => {
   e.preventDefault();
   if (name.trim() && email.trim()) {
     const newProfile = {
       name: name,
       email: email,
     };
     fetch("https://jsonplaceholder.typicode.com/users", {
       method: "POST",
       body: JSON.stringify(newProfile),
       headers: {
         "Content-Type": "application/json",
       },
     })
       .then((response) => response.json())
       .then((data) => {
         setProfiles([...profiles, data]); // append the new profile to the existing array
         setName("");
         setEmail("");
         setFormError(false);
       });
   } else {
     setFormError(true);
   }
 };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="dashboard-container">
      
      <div className="dashboard-form">
        <h2>Add Profile</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="form-error">
            {formError && <p>Please enter a valid name and email.</p>}
          </div>
          <button type="submit">Add Profile</button>
        </form>
      </div>
      <Link to="/">Go back to home page</Link>
    </div>
  );
}

export default Dashboard;
