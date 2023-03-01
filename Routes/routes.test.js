import request from "supertest";
import { pool } from "../db/index.js";
import app from "../app.js";
import { expect, test, afterAll, beforeEach, afterEach } from "@jest/globals";
import { response } from "express";

afterAll(() => {
  pool.end();
});

test("GET UserFood pantry", async function () {
  let id = 1;
  const response = await request(app).get(`/pantry/${id}`);

  expect(response.status).toBe(200);
});

test("GET Add Item pantry", async function () {
  let id = 1;
  const response = await request(app).get(`/addItem/${id}`);

  expect(response.status).toBe(200);
});

test("GET UserProfile", async function () {
  let id = 1;
  const response = await request(app).get(`/userProfile/${id}`);

  expect(response.status).toBe(200);
});

test("Post Add Item, should add a new food item for a user", async () => {
  const res = await request(app)
    .post("/addItem/34")
    .send({ name: "eggs", price: 2.5, expires_on: "01/05/2023" });
  expect(res.status).toEqual(200);
  expect(res.body.success).toBeTruthy();
  expect(res.body.payload).toBeDefined();
});

test("Patch Binned food date", async () => {
  const res = await request(app).patch("/binFood/936");
  expect(res.status).toEqual(200);
  expect(res.body.success).toBeTruthy();
  expect(res.body.payload).toBeDefined();
});

test("Patch eaten food date", async () => {
  const res = await request(app).patch("/eatFood/933");
  expect(res.status).toEqual(200);
  expect(res.body.success).toBeTruthy();
  expect(res.body.payload).toBeDefined();
});
