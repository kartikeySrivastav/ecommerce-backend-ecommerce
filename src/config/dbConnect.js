const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const conn = mongoose.connect(
      process.env.CLUSTER_MONGODB_URL || process.env.MONGODB_LOCAL_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("db connected");
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = dbConnect;
