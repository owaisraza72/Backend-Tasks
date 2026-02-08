const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const cors = require('cors');
app.use(cors({
  origin:"http://localhost:5173", // Replace with your frontend URL
  methods: ["GET", "POST"]
}));

app.use(express.static('public'))



// ====== Simple connection without rooms ======
// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id)

//   socket.on('message', (msg) => {
//     io.emit('message', msg)
//   })

//   socket.on('disconnect', () => {
//     console.log('User disconnected')
//   })
// })



// ====== y connection room k sath h ======
io.on('connection', (socket) => {
  socket.on('join-room', (room) => {
    socket.join(room)
  })

  socket.on('room-message', ({ room, message }) => {
    io.to(room).emit('message', message)
  })
})


server.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
