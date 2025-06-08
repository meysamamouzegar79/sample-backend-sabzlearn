import express from "express";
import authRouter from "./routes/v1/auth.route";
import userRouter from "./routes/v1/user.route";
import categoryRouter from "./routes/v1/category.route";
import courseRouter from "./routes/v1/course.route";
import commentsRouter from './routes/v1/comments.route'
import contactRouter from './routes/v1/contact.route'
import newsLetterRouter from './routes/v1/newsletter.route'
import searchRouter from './routes/v1/search.route'
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(
  "/courses/covers",
  express.static(path.join(__dirname, "public", "courses", "covers"))
);
app.use("/v1/users", userRouter);
app.use("/v1/auth", authRouter);
app.use("/v1/category", categoryRouter);
app.use("/v1/course", courseRouter);
app.use("/v1/comments", commentsRouter);
app.use("/v1/contacts", contactRouter);
app.use("/v1/newsLetter", newsLetterRouter);
app.use("/v1/search", searchRouter);

export default app;
