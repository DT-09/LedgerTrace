import assert from "node:assert/strict";
import fs from "node:fs";

const source = fs.readFileSync("functions/api/inquiries.js", "utf8");
const moduleUrl = "data:text/javascript;base64," + Buffer.from(source).toString("base64");
const { onRequestPost } = await import(moduleUrl);

const validPayload = {
  email: "finance@example.com",
  company: "Example Distribution",
  volume: "100–500",
  cadence: "Paid Evidence Review",
  description: "We need to investigate an unresolved supplier invoice balance.",
  website: ""
};

function makeRequest(payload = validPayload, overrides = {}) {
  return new Request("https://ledgertrace.pages.dev/api/inquiries", {
    method: "POST",
    headers: {
      Origin: "https://ledgertrace.pages.dev",
      "Content-Type": "application/json",
      ...overrides.headers
    },
    body: overrides.body ?? JSON.stringify(payload)
  });
}

function makeDb({ fail = false } = {}) {
  const calls = [];
  return {
    calls,
    prepare(sql) {
      return {
        bind(...values) {
          return {
            async run() {
              calls.push({ sql, values });
              if (fail) throw new Error("database unavailable");
              return { success: true };
            },
            async first() {
              calls.push({ sql, values });
              if (fail) throw new Error("database unavailable");
              return { request_count: 1 };
            }
          };
        }
      };
    }
  };
}

let db = makeDb();
let response = await onRequestPost({ request: makeRequest(), env: { DB: db } });
let body = await response.json();
assert.equal(response.status, 201);
assert.equal(body.ok, true);
assert.ok(body.reference);
assert.equal(db.calls.length, 1);
assert.match(db.calls[0].sql, /INSERT INTO inquiries/);
assert.equal(db.calls[0].values[1], validPayload.email);
assert.equal(db.calls[0].values[5], validPayload.description);

db = makeDb();
response = await onRequestPost({
  request: makeRequest(validPayload, { headers: { Origin: "https://attacker.example" } }),
  env: { DB: db }
});
assert.equal(response.status, 403);
assert.equal(db.calls.length, 0);

db = makeDb();
response = await onRequestPost({
  request: makeRequest({ ...validPayload, email: "not-an-email" }),
  env: { DB: db }
});
assert.equal(response.status, 400);
assert.equal(db.calls.length, 0);

db = makeDb();
response = await onRequestPost({
  request: makeRequest({ ...validPayload, website: "bot-filled" }),
  env: { DB: db }
});
assert.equal(response.status, 202);
assert.equal(db.calls.length, 0);

response = await onRequestPost({ request: makeRequest(), env: {} });
assert.equal(response.status, 503);

response = await onRequestPost({
  request: makeRequest(validPayload, { headers: { "Content-Type": "text/plain" } }),
  env: { DB: makeDb() }
});
assert.equal(response.status, 415);

response = await onRequestPost({
  request: makeRequest(validPayload, { body: "x".repeat(9000) }),
  env: { DB: makeDb() }
});
assert.equal(response.status, 413);

db = makeDb({ fail: true });
response = await onRequestPost({ request: makeRequest(), env: { DB: db } });
assert.equal(response.status, 500);

console.log("Inquiry API tests passed: storage, origin validation, field validation, honeypot, missing binding, content type, payload limit and database failure.");
