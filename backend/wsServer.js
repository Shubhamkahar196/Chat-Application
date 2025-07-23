import ws from 'ws';
import jwt from 'jsonwebtoken';
import Message from './models/messageModel.js';
import { User } from './models/userModel.js';

let onlineUsers = [];

export const createWebSocketServer = (server) => {
  const wss = new ws.WebSocketServer({ server });

  const notifyAboutOnlinePeople = async () => {
    const onlineUsersData = Array.from(wss.clients).map((client) => {
      return {
        userId: client.userId,
        username: client.username,
      };
    });

    [...wss.clients].forEach((client) => {
      client.send(JSON.stringify({ online: onlineUsersData }));
    });
  };

  wss.on("connection", (connection, req) => {
    connection.isAlive = true;
    connection.timer = setInterval(() => {
      connection.ping();
      connection.deathTimer = setTimeout(() => {
        connection.isAlive = false;
        clearInterval(connection.timer);
        connection.terminate();
        notifyAboutOnlinePeople();
      }, 1000);
    }, 5000);

    connection.on('pong', () => {
      clearTimeout(connection.deathTimer);
    });

    const cookies = req.headers.cookie;
    if (cookies) {
      const tokenString = cookies.split(";").find((str) => str.startsWith('authToken='));
      if (tokenString) {
        const token = tokenString.split("=")[1];
        jwt.verify(token, process.env.JWTPRIVATEKEY, (err, userData) => {
          if (err) console.log(err);
          else {
            const { _id, firstName, lastName } = userData;
            connection.userId = _id;
            connection.username = `${firstName} ${lastName}`;
            onlineUsers.push({ userId: _id, username: connection.username });
            notifyAboutOnlinePeople();
          }
        });
      }
    }

    connection.on("message", async (message) => {
      const messageData = JSON.parse(message.toString());
      const { recipient, text } = messageData;
      const msgDoc = await Message.create({ sender: connection.userId, recipient, text });

      if (recipient && text) {
        [...wss.clients].forEach((client) => {
          if (client.userId === recipient) {
            client.send(JSON.stringify({ sender: connection.username, text, id: msgDoc._id }));
          }
        });
      }
    });

    connection.on("close", () => {
      onlineUsers = onlineUsers.filter((user) => user.userId !== connection.userId);
      notifyAboutOnlinePeople();
    });
  });
};


















// import ws from 'ws';
// import jwt from 'jsonwebtoken';
// import fs from 'fs';
// import Message from './models/messageModel.js';
// import {clear} from 'console';
// import {User} from './models/userModel.js'
// import { setTimeout } from 'timers/promises';
// import { connection } from 'mongoose';


// export const createWebSocketServer = (server) =>{
//     const wss = new ws.WebSocketServer({server});

//     ws.on("connection", (connection,req)=>{
//         const notifyAboutOnlinePeople = async()=>{
//             Array.from(wss.clients).map(async(client)=>{
//                 const {userId, username} = client;
//                 const user = await User.findById(userId);
//                 const avatarLink = user ? user.avatarLink: null;

//                 return{
//                     userId,
//                     username,
//                     avatarLink,
//                 };
//             })
//         };
//         [...wss.clients].forEach((client)=>{
//             client.send(
//                 JSON.stringify({
//                     online: onlineUsers,
//                 })(
//             )
//         })
//     })

//     connection.isAlive = true;

//     connection.timer = setInterval(()=>{
//         connection.ping();
//         connection.deathTimer = setTimeout(()=>{
//             connection.isAlive = false;
//             clearInterval(connection.timer);
//             connection.terminate();
//             notifyAboutOnlinePeople();
//             console.log("dead");
//         },1000);
//     },5000);

//     connection.on('pong', ()=>{
//         clearTimeout(connection.deathTimer);
//     });

//     const cookies = req.headers.cookie;

//     if(cookies){
//         const tokenString = cookies.split(";").find((str)=> str.startsWith('authToken='));

//         if(tokenString){
//             const token = tokenString.split("=")[1];
//             jwt.verify(token, process.env.JWTPRIVATEKEY,{},(err)
//            if(err) console.log(err);

//            const {_id, firstName, lastName } = userData;
//            connection.userId = _id;
//            connection.username = `${firstName} ${lastName}`;
//         )
//         }
//     }

//     connection.on("message", async(message)=>{
//         const messageData = JSON.parse(message.toString());
//         const {recipient, text} = messageData;
//         const msgDoc = await Message.create({
//             sender: connection.userId,
//             recipient,
//             text,
//         })

//           if(recipient && text){
//             [...wss.clients].forEach((client)=>{
//                 if(client.userId === recipient){
//                     client.send(
//                         JSON.stringify({
//                             sender: connection.username,
//                             text,
//                             id: msgDoc._id,
//                         })
//                     )
//                 }
//             });

//             notifyAboutOnlinePeople();
//             // sending online user list to all clients
//             // Log online user to the console
//             console.log("Online user: ", onlineUsers);
//           }
//     })
// }

