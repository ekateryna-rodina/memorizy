process.env.NODE_ENV = "test";

import mongoose from "mongoose";
import User from "../models/userModel.js";
import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server.js";
let should = chai.should();

chai.use(chaiHttp);
describe("Auth", () => {
  beforeEach((done) => {
    // empty database before each test
    User.remove({}, (err) => {
      done();
    });
  });
});

// Test user register
describe("/POST users", () => {
  it("should not register without firstName", (done) => {
    let user = {
      email: "test@email.com",
      password: "1234567",
      password2: "1234567",
    };
    chai
      .request(server)
      .post("/api/users/register")
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it("should not register without email", (done) => {
    let user = {
      firstName: "fname",
      password: "1234567",
      password2: "1234567",
    };
    chai
      .request(server)
      .post("/api/users/register")
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it("should not register without password", (done) => {
    let user = {
      firstName: "fname",
      email: "test@email.com",
      password2: "1234567",
    };
    chai
      .request(server)
      .post("/api/users/register")
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it("should not register without password2", (done) => {
    let user = {
      firstName: "fname",
      email: "test@email.com",
      password: "1234567",
    };
    chai
      .request(server)
      .post("/api/users/register")
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
