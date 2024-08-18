const express = require("express");
const cors = require("cors");
const metadataRoutes = require("./routes/metadataRoutes");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const app = express();
app.use(cors());
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
