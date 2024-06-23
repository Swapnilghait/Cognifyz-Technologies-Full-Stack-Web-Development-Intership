import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "./Profile.css";

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
            <div className="profile-container">
                <div className="profile-card">
                    <img className="profile-image" src={user.picture} alt={user.name} />
                    <div className="profile-info">
                        <h3 className="welcome">Welcome Intern</h3>
                        <h2 className="profile-name">{user.name}</h2>
                        <p className="profile-email">{user.email}</p>
                    </div>
                </div>
            </div>
        )
    );
};

export default Profile;
