const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

// Uncaught Error
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to error");

    process.exit(1);
});

// Set config
dotenv.config({ path: "backend/config/config.env" });

// Connect DB
connectDB();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// unhandled Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to error");

    server.close(() => {
        process.exit(1);
    });
});
