import request from "supertest";
import { pool } from "../db/index.js";
import app from "../app.js";
import { expect, test, afterAll, beforeEach, afterEach } from "@jest/globals";
import { response } from "express";

afterAll(() => {
  pool.end();
});
