import app from "./app";

/** Port the server will be on. Set by PORT environment variable with a default of 80. */
let port = 80;

if (process.env.PORT) {
  if (Number.isInteger(Number(process.env.PORT))) {
    port = Number(process.env.PORT);
  } else {
    console.error(`Bad port set in PORT env. Defaulting to ${port}`);
  }
}

console.log(`Slash Command Proxy server starting on port ${port}`);
app.listen(port);
