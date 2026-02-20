require("dotenv").config({ path: "../.env" });

const express = require("express");
const cors = require("cors");

const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const userRoute = require("./routes/user");
const applicationRoutes = require("./routes/applicationRoutes");
const jobRoutes = require("./routes/jobRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const adminRoutes = require("./routes/adminRoutes");
const bodyParser = require("body-parser");
const createAdminAccount = require("./scripts/admin");



const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

createAdminAccount();

app.use("/user", signupRoute);
app.use("/auth", loginRoute);
app.use("/api", userRoute);
app.use("/api/applications", applicationRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/resume',resumeRoutes);
app.use('/api/admin',adminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on : http://localhost:${PORT}`);
});
