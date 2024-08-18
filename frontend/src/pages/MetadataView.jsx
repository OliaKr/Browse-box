import React from "react";
import "../assets/css/MetadataView.css";

const MetadataView = ({ metadata }) => {
  return (
    <div className="metadata-container">
      {metadata.map((data, index) => (
        <div
          key={index}
          className="cards"
        >
          <p>{data.metadata.title || "Not Found"}</p>
          <p>{data.metadata.description || "Not Found"} </p>
          {data.metadata.image && (
            <img
              src={data.metadata.image}
              alt="Meta-image"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MetadataView;
