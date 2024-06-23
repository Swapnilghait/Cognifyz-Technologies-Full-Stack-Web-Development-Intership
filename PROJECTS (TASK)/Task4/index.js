const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './')));

let tempStorage = {};

app.set('view engine', 'ejs');

app.post('/sign-up', (req, res) => {
    const { email, password } = req.body;
    if ( !email || !password) {
        return res.status(400).send('Invalid data provided.');
    }

    tempStorage = { ...req.body };
    console.log('Stored data:', tempStorage);

    res.status(200);
    res.render('signup');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});
app.use((req, res) => {
    if (res.statusCode === 200) {
        res.render('signup');
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
