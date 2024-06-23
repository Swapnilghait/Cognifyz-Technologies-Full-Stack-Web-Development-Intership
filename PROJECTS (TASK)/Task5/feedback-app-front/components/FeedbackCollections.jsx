import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Feedback-collection.css'; // Import custom CSS for styling

function FeedbackCollections() {
    const [feedbackEntries, setFeedbackEntries] = useState([]);

    useEffect(() => {
        const fetchFeedbackEntries = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/feedbackCollection');
                setFeedbackEntries(response.data); // Set feedback entries from API response
            } catch (error) {
                console.error('Failed to fetch feedback entries:', error);
            }
        };

        fetchFeedbackEntries();
    }, []); // Run effect only once on component mount

    return (
        <div className="feedback-collections">
            <h2>Feedback Collections</h2>
            <div className="card-container">
                {feedbackEntries.length > 0 ? (
                    feedbackEntries.map((entry) => (
                        <div className="card" key={entry._id}>
                            <p><strong>ID:</strong> {entry._id}</p>
                            <p><strong>Full Name:</strong> {entry.fullName}</p>
                            <p><strong>Content:</strong> {entry.content}</p>
                            {entry.feedbackId && (
                                <p><strong>Feedback ID:</strong> {entry.feedbackId}</p>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No feedback entries available</p>
                )}
            </div>
            <Link to="/feedback-form" className="button">
                Provide Feedback
            </Link>
        </div>
    );
}

export default FeedbackCollections;
