import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import path from "node:path";
import process from "node:process";

const port = 3100;
const baseUrl = `http://127.0.0.1:${port}`;
const nextBin = path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next");

const server = spawn(process.execPath, [nextBin, "start", "-p", String(port)], {
  cwd: process.cwd(),
  env: process.env,
  stdio: ["ignore", "pipe", "pipe"],
});

let output = "";
server.stdout.on("data", (chunk) => {
  output += chunk.toString();
});
server.stderr.on("data", (chunk) => {
  output += chunk.toString();
});

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`${baseUrl}/admin/login`, { redirect: "manual" });
      if (response.status === 200) {
        return;
      }
    } catch {}

    await delay(500);
  }

  throw new Error(`Timed out waiting for Next.js server.\n${output}`);
}

try {
  await waitForServer();

  const homeResponse = await fetch(`${baseUrl}/`, { redirect: "manual" });
  assert.equal(homeResponse.status, 200, "Expected public home page to return 200");

  const loginResponse = await fetch(`${baseUrl}/admin/login`, { redirect: "manual" });
  assert.equal(loginResponse.status, 200, "Expected admin login page to return 200");

  const adminResponse = await fetch(`${baseUrl}/admin`, { redirect: "manual" });
  assert.equal(adminResponse.status, 307, "Expected unauthenticated /admin request to redirect");
  assert.equal(
    adminResponse.headers.get("location"),
    "/admin/login?redirectTo=%2Fadmin",
    "Expected /admin redirect to preserve the target path",
  );
} finally {
  server.kill("SIGTERM");
  await delay(500);
}
