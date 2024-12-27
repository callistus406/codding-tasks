import express from "express";

import routes from "./routes";
import { handleCustomError } from "./middleware/customErrorHandler";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api", routes);
app.use(handleCustomError as any);
app.get("/", (req, res) => {
  res.send("Welcome to the JWT Auth API");
});
// s;ldsds[dp[dsd]]
app.listen(PORT, () => {
  console.log(`✅ App is running on http://localhost:${PORT}`);
});
