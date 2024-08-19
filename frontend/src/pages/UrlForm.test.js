import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UrlForm from "./UrlForm";
import MetadataView from "./MetadataView";

test("renders three input fields initially", () => {
  render(<UrlForm />);
  const inputFields = screen.getAllByPlaceholderText("Enter URL");
  expect(inputFields.length).toBe(3);
});

test("allows user to input URL", () => {
  render(<UrlForm />);
  const inputFields = screen.getAllByPlaceholderText("Enter URL");
  fireEvent.change(inputFields[0], {
    target: { value: "https://example.com" },
  });
  expect(inputFields[0].value).toBe("https://example.com");
});

test("renders MetadataView with data", () => {
  const sampleMetadata = [
    {
      metadata: {
        title: "Title 1",
        description: "Description 1",
        image: "image1.jpg",
      },
    },
    { metadata: { title: "Title 2", description: "Description 2" } },
  ];

  render(<MetadataView metadata={sampleMetadata} />);

  expect(screen.getByText("Title 1")).toBeInTheDocument();
  expect(screen.getByText("Description 1")).toBeInTheDocument();
  expect(screen.getByAltText("Meta-image")).toBeInTheDocument();
  expect(screen.getByText("Title 2")).toBeInTheDocument();
});
test("does not submit when input fields are empty", () => {
  global.fetch = jest.fn();

  render(<UrlForm />);
  const submitButton = screen.getByText("Submit");

  fireEvent.click(submitButton);

  expect(global.fetch).not.toHaveBeenCalled();
});
test("prevents submission when one or more input fields are empty", () => {
  global.fetch = jest.fn();
  render(<UrlForm />);
  const inputFields = screen.getAllByPlaceholderText("Enter URL");
  const submitButton = screen.getByText("Submit");

  fireEvent.change(inputFields[0], {
    target: { value: "https://example1.com" },
  });
  fireEvent.change(inputFields[1], {
    target: { value: "https://example2.com" },
  });

  fireEvent.click(submitButton);

  expect(global.fetch).not.toHaveBeenCalled();
});
