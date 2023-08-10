const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const connection = mongoose.connect(process.env.CLUSTER_MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected");
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = dbConnect;
