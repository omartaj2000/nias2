import { spawn, exec, execSync } from "child_process";
import http from "http";

const PORT = process.env.PORT || "3000";
const URL = `http://localhost:${PORT}`;

function freePort(port) {
  try {
    execSync(`fuser -k ${port}/tcp`, { stdio: "ignore" });
  } catch {
    // nothing listening — fine
  }
}

freePort(PORT);

const next = spawn("npx", ["next", "dev", "-p", PORT], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

let opened = false;

function openBrowser() {
  if (opened) return;
  opened = true;

  const cmd =
    process.platform === "darwin"
      ? `open "${URL}"`
      : process.platform === "win32"
        ? `cmd /c start "" "${URL}"`
        : `xdg-open "${URL}"`;

  exec(cmd, (err) => {
    if (err) {
      console.log(`\nApp ready at ${URL} (could not auto-open browser)`);
      return;
    }
    console.log(`\nOpened ${URL}`);
  });
}

function waitForServer(retries = 0) {
  const req = http.get(URL, (res) => {
    res.resume();
    openBrowser();
  });
  req.on("error", () => {
    if (retries > 150) {
      console.log(`\nServer did not become ready. Open ${URL} manually.`);
      return;
    }
    setTimeout(() => waitForServer(retries + 1), 400);
  });
}

setTimeout(() => waitForServer(0), 800);

const shutdown = () => {
  next.kill("SIGTERM");
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
next.on("exit", (code) => process.exit(code ?? 0));
