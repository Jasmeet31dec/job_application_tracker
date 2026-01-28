const express = require("express");
const cors = require("cors");

const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const bodyParser = require("body-parser");
const createAdminAccount = require("./scripts/admin");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

createAdminAccount();

app.use("/user", signupRoute);
app.use("/auth", loginRoute);

app.listen(PORT, () => {
  console.log(`Server is running on : http://localhost:${PORT}`);
});
