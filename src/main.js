require("dotenv").config();
require("./db/connect.db").connect();
require("./utils/response.util");

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const UserRouter = require("./routers/user.router");

// Global VARS.
const PORT = parseInt(process.env.PORT, 10) || 8000;

// Express app.
const app = express();

// App middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(
  cors({
    origin: process.env.DOMAIN,
    methods: "GET,PATCH,POST,DELETE",
    allowedHeaders: ["content-type", "authorization", "x-refresh"],
    exposedHeaders: ["authorization", "x-refresh"],
  })
);

// App routing.
app.use("/api/", UserRouter);

// Listen
app.listen(PORT);
