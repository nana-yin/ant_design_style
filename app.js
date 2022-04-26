var express = require('express')
var app = express()
app.use(express.static('dist')).listen(8080, '127.0.0.1')
