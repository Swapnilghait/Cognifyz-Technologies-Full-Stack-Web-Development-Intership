import React from 'react';
import './App.css';
import LoginButton from './components/LoginButton.jsx';
import LogoutButton from './components/LogoutButton';
import SignupButton from './components/SignupButton';
import Profile from './components/Profile';
import { useAuth0 } from '@auth0/auth0-react';

const internshipsData = [
    {
        id: 1,
        company: 'Cognifyz',
        position: 'Full-Stack Intern',
        location: 'On-site (India, Nagpur)',
        duration: '3 months',
        description: 'Industry-level tasks and learning will be provided.',
    },
    {
        id: 2,
        company: 'Cognifyz',
        position: 'Backend Developer Intern',
        location: 'Remote',
        duration: '4 months',
        description: 'Explore the world of how things work under the hood!',
    },
    {
        id: 3,
        company: 'Cognifyz',
        position: 'Frontend Developer Intern',
        location: 'On-site (India, Nagpur)',
        duration: '3 months',
        description: 'Learn modern frontend technologies and UX/UI design principles.',
    },
    {
        id: 4,
        company: 'Cognifyz',
        position: 'Data Science Intern',
        location: 'Remote',
        duration: '6 months',
        description: 'Apply data science techniques to solve real-world problems.',
    },
    {
        id: 5,
        company: 'Cognifyz',
        position: 'UX/UI Design Intern',
        location: 'On-site (India, Nagpur)',
        duration: '3 months',
        description: 'Gain hands-on experience in user experience and interface design.',
    },
    {
        id: 6,
        company: 'Cognifyz',
        position: 'Digital Marketing Intern',
        location: 'Remote',
        duration: '3 months',
        description: 'Learn and apply digital marketing strategies and analytics.',
    },
    {
        id: 7,
        company: 'Cognifyz',
        position: 'Software Testing Intern',
        location: 'On-site (India, Nagpur)',
        duration: '4 months',
        description: 'Test and ensure the quality of software products.',
    },
    {
        id: 8,
        company: 'Cognifyz',
        position: 'Business Development Intern',
        location: 'Remote',
        duration: '3 months',
        description: 'Assist in business growth initiatives and client relations.',
    },

];

function App() {
    const { isAuthenticated } = useAuth0();

    return (
        <div className="App">
            <header className="navbar">
                <div className="khali"></div>

                <div className="auth-buttons">
                    {isAuthenticated ? <LogoutButton /> : <SignupButton />}
                    {!isAuthenticated && <LoginButton />}
                </div>
            </header>

            <div className="middle-section">
                {isAuthenticated ? (
                    <>
                        <Profile />
                        <h1>Successfully Logged in</h1>
                        <h2>Internship Opportunities</h2>
                        <h2 style={{ color: 'indianred', fontSize: '15px', } }>Scroll down</h2>
                        <div className="internships-container">
                            {internshipsData.map((internship) => (
                                <div key={internship.id} className="internship-card">
                                    <h3>{internship.company}</h3>
                                    <p>{internship.position}</p>
                                    <p>{internship.location}</p>
                                    <p>Duration: {internship.duration}</p>
                                    <p>{internship.description}</p>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <h1 style={{marginTop: '50px'}}>Signup or Login to Discover Opportunities from Cognifyz</h1>
                )}
            </div>
        </div>
    );
}

export default App;
