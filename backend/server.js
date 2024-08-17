const express = require("express");
const metadataRoutes = require("./routes/matadataRoutes");

const app = express();
app.use(express.json());

app.use("/api", metadataRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
