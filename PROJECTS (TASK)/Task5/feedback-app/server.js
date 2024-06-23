const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// CORS setup
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5173/feedback-form'],
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://mrjayant81:thisIsMyMongoDbPassword@cluster0.tyifqyc.mongodb.net/cognifyz-db', {
});

// Mongoose model for Feedback collection
const feedbackSchema = new mongoose.Schema({
    feedbackId: Number,
    fullName: String,
    content: String,
});
const Feedback = mongoose.model('Feedback', feedbackSchema);

app.post('/api/feedback-form', async (req, res) => {
    const { feedbackId, fullName, content } = req.body;

    if (!feedbackId || !fullName || !content) {
        return res.status(400).json({ error: 'Full Name and Content and Feedback ID are required' });
    }



    const feedbacksaveresponse = await Feedback.create(
        {
            feedbackId,
            fullName,
            content
        }
    )

    const createdFeedback = await Feedback.findById(feedbacksaveresponse._id);


    if (!createdFeedback) {
        return res.status(500).json({ error: 'Failed to create feedback' });
    }


    return res.status(201)
        .json({"created feedback": createdFeedback});
});

// GET endpoint to fetch all feedback entries
app.get('/api/feedbackCollection', (req, res) => {
    // Retrieve all feedback entries using `Feedback.find()`
    Feedback.find()
        .then((feedbackEntries) => {
            res.status(200).json(feedbackEntries); // Send feedback entries as JSON response
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to fetch feedback' }); // Handle error
        });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});
