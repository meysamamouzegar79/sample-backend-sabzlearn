import "dotenv/config";
import mongoose from "mongoose";
import app from "./app";
const port = process.env.PORT;

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
})();

app.listen(port, () => {
  console.log(`server runing on port ${port}`);
});
