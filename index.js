require('dotenv').config()
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import scheduler from "./routes/scheduler-router";

var server = express();

server.use(bodyParser.json());
server.use(cors());
server.use(scheduler);

server.listen(process.env.PORT, () => {
    console.log(`Server listening at port ${process.env.PORT}`);
});