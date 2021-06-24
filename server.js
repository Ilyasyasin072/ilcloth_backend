const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
var cors = require('cors')
const config = require('./config/config')
const jsonwebtoken = require('jsonwebtoken')
const app = express();

const router = require('./routes/route');

// app.use(cors())

app.set('port', (process.env.NODE_PORT || 3000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

app.use(function(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'SHOPPINGCART') {
      jsonwebtoken.verify(req.headers.authorization.split(' ')[1], config.secret, function(err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      });
    } else {
      req.user = undefined;
      next();
    }
  });

app.use('/api', cors(), router);

app.get('/', (req, res, next) => {
    res.json({
        'data': 'data'
    })
})

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`);
  });