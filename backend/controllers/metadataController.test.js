const request = require("supertest");
const express = require("express");
const metadataRoutes = require("../routes/metadataRoutes");
const { fetchMetadata } = require("../models/metadataModel");

jest.mock("../models/metadataModel");

const app = express();
app.use(express.json());
app.use("/api", metadataRoutes);

describe("GET /api/fetch-metadata", () => {
  it("should return 400 if less than 3 URLs are provided", async () => {
    const res = await request(app)
      .post("/api/fetch-metadata")
      .send({ urls: ["https://example.com"] });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ error: "Please provide at least 3 valid URLs" });
  });

  it("should fetch metadata for valid URLs", async () => {
    fetchMetadata.mockResolvedValue({ title: "Example Title" });

    const res = await request(app)
      .post("/api/fetch-metadata")
      .send({
        urls: [
          "https://example1.com",
          "https://example2.com",
          "https://example3.com",
        ],
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(3);
    expect(res.body[0].metadata.title).toEqual("Example Title");
  });

  it("should handle errors when a URL is invalid", async () => {
    fetchMetadata.mockImplementation((url) => {
      if (url === "https://invalid-url.com") {
        throw new Error("Failed to fetch metadata");
      }
      return { title: "Example Title" };
    });

    const res = await request(app)
      .post("/api/fetch-metadata")
      .send({
        urls: [
          "https://example1.com",
          "https://invalid-url.com",
          "https://example3.com",
        ],
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body[1].error).toEqual("Failed to fetch metadata");
  });
});
