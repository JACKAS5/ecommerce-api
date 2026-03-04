import request from "supertest";
import app from "../src/app.js";

describe("Health Check", () => {
  it("should return API working", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});