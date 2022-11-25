const request = require("supertest");
const app = require("../app");

describe("Testing if jest works", () => {
  it("Testing if Jest works", () => {
    expect(true).toBe(true);
  });
});

describe("Testing All Endpoints", () => {
  it("Tests test endpoint", async () => {
    await request(app).get("/test").expect(200);
  });
  it("Tests home endpoint", async () => {
    await request(app)
      .get("/")
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe("Welcome to Grit Grammarly 🙌");
      });
  });
  it("Tests signup endpoint", async () => {
    await request(app).get("/api/v1/user/signup").expect(200);
  });
  it("Tests login endpoint", async () => {
    await request(app).get("/api/v1/user/login").expect(200);
  });
  it("Tests logout endpoint", async () => {
    await request(app).get("/api/v1/user/logout").expect(200);
  });
  it("Tests if the user sends an audio", async () => {
    await request(app).get("/api/v1/sendAudio").expect(200);
  });
  it("Tests if the getText enpoint works", async () => {
    await request(app).get("/api/vi/getText").expect(200);
  });
});
