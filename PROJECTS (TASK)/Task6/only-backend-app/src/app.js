import cookieParser from "cookie-parser";
import cors from "cors"
import express, { urlencoded } from "express"



const app = express()

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('signup');
    res.sendFile('/sighup.html');
});
app.get('/login', (req, res) => {
    res.render('login');
    res.sendFile('/login.html');
});

app.use(cors ({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


// app.use(bodyParser.urlencoded({ extended: true, limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"})) // sometimes url is encoded and when data comes from url it can be decoded and format properly so we'll use urlencoded to remove special characters  replaced for space and other characters also
app.use(express.json({limit: "16kb"})) // inorder to prevent server crash we gave a limit of 16kb json 
app.use(express.static("public"))   // file and other things that we want to store, we can put it in the public folder/directory
app.use(cookieParser()) // uses the browser cookies of the user efficiently


//routes import 
import userRouter from "./routes/user.routes.js"

app.use("/api/v1/users", userRouter)

export { app }