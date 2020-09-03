import app from "./app";

/** Port the server will be on. Set by PORT environment variable with a default of 80. */
let port = 80;

if (process.env.port) {
  if (Number.isInteger(Number(process.env.port))) {
    port = Number(process.env.port);
  } else {
    console.error(`Bad port set in PORT env. Defaulting to ${port}`);
  }
}

console.log(`Slash Command Proxy server starting on port ${port}`);
app.listen(port);
