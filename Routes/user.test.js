import request from "supertest";
import { pool } from "../db/index.js";
import app from "../app.js";
import { expect, test, afterAll, beforeEach, afterEach } from "@jest/globals";
import { response } from "express";

let CarryId = Math.floor(Math.random() * 1000000000000);
test("Post new user to database", async () => {
  const res = await request(app).post("/userVerify").send({ uid: CarryId });
  expect(res.status).toEqual(200);
  expect(res.body.success).toBeTruthy();
  expect(res.body.payload).toStrictEqual([{ uid: expect.any(String) }]);
});
