import { useState } from "react";

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
      const response = await fetch("http://localhost:5000/api/fetch-metadata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ urls }),
      });
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
    <div>
      <form onSubmit={handleSubmit}>
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
          type="submit"
          disabled={loading}
        >
          Submit
        </button>
      </form>

      {loading && <p>Loading metadata...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {metadata.map((data, index) => (
          <div key={index}>
            <h4>Metadata for {data.url}</h4>
            <p>Title: {data.title || "N/A"}</p>
            <p>Description: {data.description || "N/A"}</p>
            {data.image && (
              <img
                src={data.image}
                alt="Preview"
                style={{ width: "100px" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UrlForm;
