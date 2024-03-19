// require('dotenv').config();

require('./models/db.model');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const compression = require('compression')

const devENV = require('./devenv');
const userRoutes = require('./routes/user.routes');
const orderRoutes = require('./routes/order.routes');
// const contactDetailRoutes = require('./routes/contact-detail.routes');

const PORT = process.env.PORT || devENV.LOCAL_PORT;
// const rtsAdmin = require('./routes/admin.router');

const app = express();

// app.use((req, res, next) => {
//     // req.writeHead({
//     //     'Content-Type': 'text/event-stream'
//     // })
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Content-Length, Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Length"
//     );
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET, POST, PATCH, PUT, DELETE, OPTIONS"
//     );
    
//     next();
// });

// var options = {  
//     host: 'reportsapi.zoho.com',  
//     port: 443,  
//     path: '/api/username/FA/AA',  
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Content-Length': Buffer.byteLength(p)
//     } 
//   }
app.use(cors());
app.use(compression());

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
// app.use('/api/admin', rtsAdmin);

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        const valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors);
    }
    if (err.statusCode === 401 && err.error.code === 'BAD_REQUEST_ERROR') {
        res.status(401).send({
            success: false,
            message: err.error.description,
        });
    } else {
        res.status(401).send(err);
    }
});
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(express.static(path.join(__dirname, 'www')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'www/index.html'));
});

// start server
app.listen(PORT, () => console.log(`Server started at port : ${PORT}`));