# Browse Box - Full stack assignment

## Description

Browser Box is a full-stack application that allows users to input a list of URLs, fetch metadata (title, description, and image) for each URL, and display the results. It features both a front-end built with React and a back-end with Node.js.

## Screenshots

![alt text](https://github.com/OliaKr/Brainwave/blob/main/src/assets/screen.JPG)
![alt text](https://github.com/OliaKr/Brainwave/blob/main/src/assets/screen1.JPG)
![alt text](https://github.com/OliaKr/Brainwave/blob/main/src/assets/screen2.JPG)

## Front-End

The front-end is a React application that provides a form for users to input URLs and display fetched metadata.

# Features

- Input and submit a list of URLs.
- Fetch and display metadata including title, description, and image.
- Handle errors gracefully with user feedback.

# Setup

```shell
cd frontend

```

    ```shell

npm install

````
  ```shell
npm run dev

````

# Testing

npm test

## Back-End

The back-end is a Node.js server that handles fetching metadata for URLs.

# Setup

```shell
cd backend

```

```shell
npm install

```

    ```shell

npm start

```
# Testing

npm test

**URls used**

[link](https://museumsvictoria.com.au/article/nemo-found-new-species-of-dancing-peacock-spider-named/).
[link](https://www.thewholeworldisaplayground.com/visiting-rakotzbrucke-devils-bridge-germany/).
[link](https://theloverspassport.com/sea-of-stars-maldives/).

# Security and Rate Limiting

- Endpoint **/api/fetch-metadata**to fetch metadata for a list of URLs.
- Rate limiting (max 5 requests per second).
- Basic security (CORS, Helmet) and error handling.

**Deployed at** [link](https://theloverspassport.com/sea-of-stars-maldives/).


```
