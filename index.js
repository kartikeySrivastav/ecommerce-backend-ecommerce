const express = require("express");
const app = express();
const dbConnect = require("./src/config/dbConnect");
const { notFound, errorHandler } = require("./src/middlewares/errorHandler");
const bodyParser = require("body-parser");
const env = require("dotenv").config();
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 3000;

// routes
const userRouter = require("./src/routes/userRoute");
const adminRouter = require("./src/routes/admin/authRoute");
const categoryRouter = require("./src/routes/categoryRoute");
const productRouter = require("./src/routes/productRoute");
const cartRouter = require("./src/routes/cartRoute");

// mongodb connection

dbConnect();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/user/cart", cartRouter);

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
