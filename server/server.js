/**
 * the express.js server
 */

import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

// apply middlewares
// for parsing incoming json payload from HTTP requests
app.use(express.json());
// for logging HTTP requests
app.use(morgan("dev"));
// handling CORS
app.use(cors());

app.get('/api', (req, res) => {

});