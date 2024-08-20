const express = require("express");
const cors = require("cors");
const metadataRoutes = require("./routes/metadataRoutes");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://main.d31i8rj0bb3jlx.amplifyapp.com",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 1000,
  max: 5,
  message:
    "You have reached the maximum requests limit, please try again later.",
});

app.use("/api", limiter, metadataRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
