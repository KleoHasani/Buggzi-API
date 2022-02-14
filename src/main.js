require("dotenv").config();
require("./db/connect.db").connect();
require("./utils/response.util");

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const UsersRouter = require("./routers/users.router");
const SessionsRouter = require("./routers/sessions.router");
const ProjectsRouter = require("./routers/projects.router");
const TicketsRouter = require("./routers/tickets.router");

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
    allowedHeaders: ["content-type", "authorization", "x-refresh", "x-access-token"],
    exposedHeaders: ["authorization", "x-refresh", "x-access-token"],
  })
);

// TODO: Global authentication middleware impl.
// App routing.
app.use("/api/", [UsersRouter, SessionsRouter, ProjectsRouter, TicketsRouter]);

// Listen
app.listen(PORT);
