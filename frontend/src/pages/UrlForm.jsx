import React, { useState } from "react";
import MetadataView from "./MetadataView";
import "../assets/css/UrlForm.css";

const UrlForm = () => {
  const [urls, setUrls] = useState(["", "", ""]);
  const [metadata, setMetadata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUrlChange = (index, value) => {
    const updatedUrls = [...urls];
    updatedUrls[index] = value;
    setUrls(updatedUrls);
  };

  const fetchMetadataForUrls = async () => {
    try {
      const response = await fetch(
        "https://browse-box.onrender.com/api/fetch-metadata",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ urls }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch metadata");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching metadata:", error);
      setError("Failed to fetch metadata. Please check the URLs.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const fetchedMetadata = await fetchMetadataForUrls();
    if (fetchedMetadata) {
      setMetadata(fetchedMetadata);
    }

    setLoading(false);
  };

  return (
    <div className="form-container">
      <h1>Find what you love: Paste your favorite URL's below!</h1>
      <form
        onSubmit={handleSubmit}
        className="url-form"
      >
        {urls.map((url, index) => (
          <div key={index}>
            <input
              type="url"
              placeholder="Enter URL"
              value={url}
              onChange={(e) => handleUrlChange(index, e.target.value)}
              required
            />
          </div>
        ))}
        <button
          className="original-button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <MetadataView metadata={metadata} />
    </div>
  );
};

export default UrlForm;
