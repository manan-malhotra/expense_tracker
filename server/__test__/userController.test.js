const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app.js");
const User = require("../models/UserModel");
jest.mock("../models/UserModel");
jest.setTimeout(30000);
describe("user controller", () => {
    describe("register", () => {
        describe("given the register request is not complete", () => {
            it("should return a 400", async () => {
                const user = [{ username: "test" }, { password: "test" }, {}];

                for (let i = 0; i < user.length; i++) {
                    await supertest(app)
                        .post("/users/register")
                        .send(user[i])
                        .expect(400);
                }
            });
        });
        describe("given the username already exists", () => {
            it("should return error if username is already present", async () => {
                User.findOne = jest.fn().mockResolvedValue({
                    username: "test",
                    password: "test",
                });

                const user = { username: "test", password: "test" };
                const userFound = await User.findOne({
                    username: user.username,
                });
                if (userFound) {
                    await supertest(app)
                        .post("/users/register")
                        .send(user)
                        .expect(400);
                }
            });
        });

        describe("given the register is successful", () => {
            it("should return a 201", async () => {
                User.findOne = jest.fn().mockResolvedValue(null);
                User.create = jest.fn().mockResolvedValue({
                    _id: 1,
                    username: "test",
                    password: "test",
                });
                const user = { username: "test", password: "test" };
                const res = await supertest(app)
                    .post("/users/register")
                    .send(user);
                expect(res.statusCode).toBe(201);
                expect(res.body.username).toBe("test");
                expect(res.body.id).toBe(1);
                expect(res.body.token).toBeDefined();
            });
        });
    });
    describe("login", () => {
        describe("given the login request is not complete", () => {
            it("should return a 400", async () => {
                const user = [{ username: "test" }, { password: "test" }, {}];

                for (let i = 0; i < user.length; i++) {
                    const res = await supertest(app)
                        .post("/users/login")
                        .send(user[i]);
                    expect(res.statusCode).toBe(400);
                    expect(res.body.message).toBe("Please enter all details!");
                }
            });
        });

        describe("given the username does not exist", () => {
            it("should return error if username is not present", async () => {
                User.findOne = jest.fn().mockResolvedValue(null);
                const user = { username: "test", password: "test" };
                const res = await supertest(app)
                    .post("/users/login")
                    .send(user);
                expect(res.statusCode).toBe(400);
                expect(res.body.message).toBe("User not present.");
            });
        });

        describe("given the password does not match", () => {
            it("should return error if password does not match", async () => {
                User.findOne = jest.fn().mockResolvedValue({
                    username: "test",
                    password: "test",
                });
                bcrypt.compare = jest.fn().mockResolvedValue(false);
                const user = { username: "test", password: "test" };
                const res = await supertest(app)
                    .post("/users/login")
                    .send(user);
                expect(res.statusCode).toBe(400);
                expect(res.body.message).toBe("Incorrect password.");
            });
        });

        describe("given the login is successful", () => {
            it("should return a token", async () => {
                User.findOne = jest.fn().mockResolvedValue({
                    username: "test",
                    password: "test",
                });
                bcrypt.compare = jest.fn().mockResolvedValue(true);
                const user = { username: "test", password: "test" };
                const res = await supertest(app)
                    .post("/users/login")
                    .send(user);
                expect(res.statusCode).toBe(200);
                expect(res.body.token).toBeDefined();
            });
        });
    });
});
