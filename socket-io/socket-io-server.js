users = [
  { id: 1, name: "roman", age: 27 },
  { id: 2, name: "Nikol", age: 26 },
  { id: 3, name: "Dana", age: 23 },
  { id: 4, name: "Yossi", age: 15 },
  { id: 5, name: "Dorin", age: 45 }
]
const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:4200"],
  },
})

io.on('connection', function (socket) {
  console.log("User connected: ", socket.id);


  socket.on('fetch-data', (userId) => {
    console.log("User info for id: ", userId);
    var userInfo = users.find(x => x.id == userId);
    if (userInfo == null) {
      io.emit("error-userInfo", "User not found");
    }
    else {
      console.log("User: ", userInfo);
      io.emit("receive-userInfo", userInfo);
    }

  });

  socket.on('get-time', () => {
    let time = Date.now();
    console.log("Time to send:", time);
    io.emit("receive-time", time);
  })




})




