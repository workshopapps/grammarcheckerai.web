const request = require("supertest");
const app = require("../app");

describe("Gets the home page", () => {
  it("Tests home endpoint", async () => {
    await request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe("Welcome to Grit Grammarly 🙌");
      });
  });
});
describe("Login Endpoint", () => {
  it("Tests login endpoint", async () => {
    await request(app)
      .post("/api/v1/login")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe("Welcome to Grit Grammarly 🙌");
      });
  });
});

describe("Send Audio", () => {
  it("Tests if the user sends an audio", async () => {
    await request(app)
      .post("/api/vi/sendAudio")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200)
      .then((response) => {
        expect(response.body.status).toBe("ok");
      });
  });
});

