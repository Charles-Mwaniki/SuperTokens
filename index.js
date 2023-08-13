require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
require('./lib/supertokens.auth')();
const indexRouter = require('./routes/index');
const supertokens = require("supertokens-node");
const { middleware, errorHandler } = require("supertokens-node/framework/express");
const PORT = process.env.PORT;
app.use(cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
}));

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(middleware);
app.use('/', indexRouter);
app.use(errorHandler);
app.use((err, req, res, next) => {
    res.status(500).send("Internal error: " + err.message);
});
app.listen(PORT, () => console.log(`API Server listening on port ${PORT}`));