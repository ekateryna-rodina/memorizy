process.env.NODE_ENV = "test";
import sinon from "sinon";
import mongoose from "mongoose";
import User from "../models/userModel.js";
import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server.js";
import authUtil from "../utils/auth.js";
import request from "supertest";
import { connectDB, disconnectDB } from "../config/db.js";

let should = chai.should();
const { expect } = chai;
sinon.config = {
  useFakeTimers: false,
};
chai.use(chaiHttp);

// Test user register
describe("/POST users", () => {
  let sandbox;
  let newUserBody;
  let mockUserFindOneReturnsUser;
  let mockUserFindOneReturnsNull;
  let mockExistingUser = {
    userName: "fnameexist",
    email: "exist@email.com",
    password: "1234567",
  };

  let existingUserBody = {
    userName: "fnameexist",
    email: "exist@email.com",
    password: "1234567",
    password2: "1234567",
  };

  let mockNewUser = null;

  before(() => {
    newUserBody = {
      userName: "fnamenew",
      email: "news@email.com",
      password: "1234567",
      password2: "1234567",
    };
  });
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  after(async () => {
    try {
      await disconnectDB();
    } catch (error) {
      console.log(error);
    }
  });

  it("should not register without userName", (done) => {
    let user = {
      email: "test@email.com",
      password: "1234567",
      password2: "1234567",
    };
    request(server)
      .post("/api/users/register")
      .send(user)
      .then((res) => {
        res.should.have.status(400);
        done();
      });
  });
  it("should not register without email", (done) => {
    let user = {
      userName: "fname",
      password: "1234567",
      password2: "1234567",
    };
    request(server)
      .post("/api/users/register")
      .send(user)
      .then((res) => {
        res.should.have.status(400);
        done();
      });
  });
  it("should not register without password", (done) => {
    let user = {
      userName: "fname",
      email: "test@email.com",
      password2: "1234567",
    };
    request(server)
      .post("/api/users/register")
      .send(user)
      .then((res) => {
        res.should.have.status(400);
        done();
      });
  });
  it("should not register without password2", (done) => {
    let user = {
      userName: "fname",
      email: "test@email.com",
      password: "1234567",
    };
    request(server)
      .post("/api/users/register")
      .send(user)
      .then((res) => {
        res.should.have.status(400);
        done();
      });
  });
  it("register a new user is successfull", (done) => {
    request(server)
      .post("/api/users/register")
      .send(newUserBody)
      .then((res) => {
        try {
          const body = res.body;
          expect(body).to.have.property("token");
          expect(body).to.contain.property("user");
          expect(body).to.contain.property("token");
          expect(body).to.contain.property("success");
          done();
        } catch (error) {
          console.log(error);
          console.log(res.body);
          done();
        }
      })
      .catch((err) => {
        console.log(err);
        done(error);
      });
  });
  it("register a new user fails because of user exists", (done) => {
    request(server)
      .post("/api/users/register")
      .send(newUserBody)
      .then((res) => {
        const body = res.body;
        expect(body).to.have.property("errors");
        expect(body.errors[0]).to.equal("User already exists");
        expect(body).not.to.contain.property("success");
        done();
      })
      .catch((err) => done(err));
  });
  // it("Should call findOne user by email and returns 400 because user exists", (done) => {
  //   mockUserFindOneReturnsUser = sandbox
  //     .stub(User, "findOne")
  //     .withArgs({ email: existingUserBody.email })
  //     .returns(mockExistingUser);
  //   chai
  //     .request(server)
  //     .post("/api/users/register")
  //     .send(existingUserBody)
  //     .end((err, res) => {
  //       expect(mockUserFindOneReturnsUser.calledOnce).to.equal(true);
  //       res.should.be.status(400);
  //       done();
  //     });
  // });
  // it("Issue JWT is called once", (done) => {
  //   const jwtMock = {
  //     token: "token",
  //     iat: Date.now(),
  //     expires: Date.now(),
  //   };
  //   mockUserFindOneReturnsNull = sandbox
  //     .stub(User, "findOne")
  //     .withArgs({ email: newUserBody.email })
  //     .returns(mockNewUser);
  //   let mockJwt = sandbox.stub(authUtil, "issueJWT").returns(jwtMock);
  //   chai
  //     .request(server)
  //     .post("/api/users/register")
  //     .send(newUserBody)
  //     .end((err, res) => {
  //       res.should.be.status(200);
  //       done();
  //     });
  // });
  // it("Should call findOne user by email and does not return 400 because user does not exist", (done) => {
  //   const jwtMock = {
  //     token: "token",
  //     iat: Date.now(),
  //     expires: Date.now(),
  //   };
  //   mockUserFindOneReturnsNull = sandbox.stub(issueJWT).returns(jwtMock);
  //   chai
  //     .request(server)
  //     .post("/api/users/register")
  //     .send(newUserBody)
  //     .end((err, res) => {
  //       mockJwt = sandbox
  //         .stub(User, "findOne")
  //         .withArgs({ email: existingUserBody.email })
  //         .returns(mockExistingUser);
  //       expect(mockUserFindOneReturnsNull.calledOnce).to.equal(true);
  //       res.should.be.status(200);
  //       // res.should.have.property("errors");
  //       done();
  //     });
  // });
});
