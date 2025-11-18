const express = require("express");
const app = express();
const port = process.env.PORT || 10000;
const host = process.env.HOST || "localhost";
const cors = require('cors');

require("dotenv").config();


app.use(express.json());

app.use(cors());

app.use("/api/", require("./routes/apiRoutes"));



// Error handlers
app.use((err, req, res, next) => {
    console.error('Error occurred:', err);
    next(createError(404));
});

app.use((err, req, res, next) => {
    console.error('Error occurred:', err);
    if (req.headers['accept'] && req.headers['accept'].includes('application/json')) {
        return res.status(500).json({
            status: false,
            status_code: 500,
            message: "Internal Server Error",
            error: err.message || 'Unknown error'
        });
    } else {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err.message
        });
    }
});


app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the Node API",
        node_version: process.version
    });
});

app.get("/", (req, res) => {
  res.send("API is running...");
});


app.listen(port, host, () => {
    const addr =  `http://localhost:${port}`;
    console.log(`Server listening at ${addr}`);
});
