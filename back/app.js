const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const userRouter = require("./routes/user.router");

app.use("/users", userRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
