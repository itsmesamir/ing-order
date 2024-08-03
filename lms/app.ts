// app.ts
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
const router = express.Router();

import routes from "./routes/authRoutes";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use("/api", routes);

export default app;
