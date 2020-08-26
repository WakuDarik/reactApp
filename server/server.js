
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const apiPort = 3001
const http = require('http');
const userRouter = require('./routes/UserRouter')
const cors = require("cors");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const models = require('./models')
// получение списка пользователей
models.sequelize.sync().then(function () {
    console.log('Connected succsses')
}).catch(err => console.log(err))

app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
}));

app.use(cors());

app.use('/api', userRouter)

// const port = parseInt(process.env.PORT, 10) || 8000;

// app.set('port', port);

// const server = http.createServer(app);

const httpServer = http.createServer(app);
httpServer.listen(apiPort, () => {
    console.log(`server start on ${apiPort}`);
});

app.listen(httpServer);

