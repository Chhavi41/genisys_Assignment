const request = require("supertest");
const app = require("../../server"); // Your Express app
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const fs = require("fs");
const path = require("path");
const apiKey = "1234567890abcdef";

let mongoServer;
let uploadedImageId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  // Use the existing connection if already established
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// 1. Test Image Upload
describe("POST /upload", () => {
  it("should upload a dog image and return 201", async () => {
    const res = await request(app)
      .post("/dogs/upload")
      .set("x-api-key", apiKey) 
      .attach("image", fs.readFileSync(path.join(__dirname, "test-image.jpg")), "dog.jpg");

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("dog._id");
    uploadedImageId = res.body.dog._id;
  });

  it("should return 400 for missing file", async () => {
    const res = await request(app).post("/dogs/upload").set("x-api-key", apiKey);
    expect(res.statusCode).toBe(400);
  });
});

// 2. Fetch Image by ID
describe("GET /dogs/:id", () => {
  it("should retrieve the uploaded image", async () => {
    const res = await request(app).get(`/dogs/${uploadedImageId}`).set("x-api-key", apiKey);
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toContain("image");
  });

  it("should return 404 for non-existent image", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/dogs/${fakeId}`).set("x-api-key", apiKey);
    expect(res.statusCode).toBe(404);
  });
});

// 3. Fetch All Images
describe("GET /dogs", () => {
  it("should return a list of uploaded dog images", async () => {
    const res = await request(app).get("/dogs").set("x-api-key", apiKey);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

// 4. Update Image
describe("PUT /dogs/:id", () => {
  it("should replace the existing image", async () => {
    const res = await request(app)
      .put(`/dogs/${uploadedImageId}`)
      .set("x-api-key", apiKey)
      .attach("image", fs.readFileSync(path.join(__dirname, "test-dog_2.jpg")), "dog_2.jpg");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Dog picture updated");
  });

  it("should return 404 for non-existent image", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .put(`/dogs/${fakeId}`)
      .set("x-api-key", apiKey)
      .attach("image", fs.readFileSync(path.join(__dirname, "test-image.jpg")), "dog.jpg");

    expect(res.statusCode).toBe(404);
  });
});

// 5. Delete Image
describe("DELETE /dogs/:id", () => {
  it("should delete an uploaded image", async () => {
    const res = await request(app).delete(`/dogs/${uploadedImageId}`).set("x-api-key", apiKey);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Dog picture deleted");
  });

  it("should return 404 for non-existent image", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).delete(`/dogs/${fakeId}`).set("x-api-key", apiKey);
    expect(res.statusCode).toBe(404);
  });
});
