const { response } = require("express");
const request = require("supertest");
const app = require("../app");

describe("Login Test", () => {
  it("fails when an empty request is supplied", async () => {
    await request(app).post("/api/v1/login").send({}).expect(400);
  });
});
describe("Login Test", () => {
  it("returns true when a correct request is supplied", async () => {
    await request(app)
      .post("/api/v1/login")
      .send({
        email: "test@mail.com",
        password: "password",
      })
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe("login successful");
      });
  });
});

describe("Logout Test", () => {
  it("is successful when session is destroyed", async () => {
    await request(app)
      .post("/api/v1/logout")
      .expect(200)
      .then((response) => {
        expect(response.body.status).toBe("success");
      });
  });
});

describe("Login Test", () => {
  it("fails when an incorrect password is supplied", async () => {
    await request(app)
      .post("/api/v1/login")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(401);
  });
});
