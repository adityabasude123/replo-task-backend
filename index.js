const express = require("express");
const connectToMongo = require("./utils/dbConnection");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
connectToMongo();

app.use(
  cors({
    origin: "*", 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use(express.json());
app.use("/api/product", require("./routes/productRoute"));
app.use("/api/auth", require("./routes/authRoute"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
