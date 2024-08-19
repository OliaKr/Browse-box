const axios = require("axios");
const { fetchMetadata } = require("./metadataModel");

jest.mock("axios");

describe("fetchMetadata", () => {
  it("should return metadata for valid URL", async () => {
    const validUrl = "https://valid-url.com";
    const mockData = "<html><head><title>Test Title</title></head></html>";

    axios.get.mockResolvedValue({ data: mockData });

    const metadata = await fetchMetadata(validUrl);

    expect(metadata).toEqual({
      title: "Test Title",
      description: "No description available",
      image: "https://example.com/default-image.jpg",
    });
  });

  it("should throw an error for invalid URL", async () => {
    const invalidUrl = "https://invalid-url.com";

    axios.get.mockRejectedValue(new Error("Failed to fetch metadata"));

    await expect(fetchMetadata(invalidUrl)).rejects.toThrow(
      "Failed to fetch metadata"
    );
  });
});
