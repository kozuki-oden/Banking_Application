const env = require('dotenv');
const express = require('express');
const app = express();
const useRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin/auth");
const mongoose = require('mongoose');
const cors = require('cors');



//initializing enviroment variables
env.config();

//establishing MongoDB connection
mongoose.connect(process.env.CONNECTION_URL).then(() => {
    console.log('DataBase Connected');
});

//initializing modules
app.use(cors());
app.use(express.json());
app.use('/api', useRoutes);
app.use('/api', adminRoutes);

//Setting up server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
