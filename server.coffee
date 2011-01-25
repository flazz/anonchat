express = require 'express'
ws = require 'websocket-server'
sys = require 'sys'

app = express.createServer()

app.configure () ->
  #app.use express.logger()
  app.use express.bodyDecoder()
  app.use express.staticProvider (__dirname + '/public')


app.set 'view engine', 'jade'

app.get "/", (req, res) ->
  res.render 'index.jade'
  res.send "hello world"

wsapp = ws.createServer server: app

wsapp.addListener 'connection', (connection) ->
  sys.log 'connect: ' + connection.id
  m = JSON.stringify(type: 'join', nick: connection.id)
  #wsapp.broadcast m

  connection.addListener 'message', (msg) ->
    sys.log msg
    wsapp.broadcast msg

app.listen 3000
