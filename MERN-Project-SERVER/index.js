import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

// importing router exported from posts.js
import postRoutes from "./routes/posts.js";

// importing router exported from users.js
import userRouter from "./routes/user.js";

// what we do with everu express application is first initialize this app
const app = express();
// now we can use all different methods on that app instance

import dotenv from "dotenv";

dotenv.config();

// we are setting up bodyParser so that we can properly send our requests
// -- deprecated -- app.use(bodyParser.json({ limit: "30mb", extended: true }));
// -- deprecated -- app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

// we use express middleware to connect this to our application
app.use("/posts", postRoutes);
// eavery routes inside the postRoutes is goning to start with posts

app.get("/", (req, res) => {
  res.send(
    "Welcome to Share Ideas API!! It seems you are on the server url Navigate to https://priyam-share-ideas.netlify.app/"
  );
});

// adding routes for the users
app.use("/user", userRouter);

// connect our server application with our database mongo db (atlas cloud version)
// https://www.mongodb.com/cloud/atlas

const PORT = process.env.PORT || 5000;

// finally we use mongoose to connect to our db
// mongoose.connect() is a function wirh 2 parameters 1 --> connection url 2--> obj with all options
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
// .then() returns a promiss --> when connection is successfull
// second parameter of listen() is a callback function which will run once our application successfully listens
// .catch() --> if connection to the db is not successfull

mongoose.set("useFindAndModify", false);
// so that we dont get any warnings in the console
