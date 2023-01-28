import request from "supertest";
import { pool } from "../db/index.js";
import app from "../app.js";
import { expect, test, afterAll, beforeEach, afterEach } from "@jest/globals";
import { response } from "express";

afterAll(() => {
  pool.end();
});

test("GET /api/posts", async function () {
  let id = 1;
  const response = await request(app).get(`/pantry/${id}`);
  //console.log(response.body)

  expect(response.status).toBe(200);
});
