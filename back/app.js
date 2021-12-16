const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const port = process.env.PORT || 3000;
const auth = require("./middleware/auth");

app.use(helmet());
app.use(express.json());
app.use(cors());

const userRouter = require("./routes/user.router");
const propertyRouter = require("./routes/property.router");
const tagRouter = require("./routes/tag.router");

app.use("/users", userRouter);
app.use("/properties", auth(), propertyRouter);
app.use("/tags", auth(), tagRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
