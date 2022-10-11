import React, { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";
import { createMsg, IMessage } from "./types";
import { MessagePanel } from "./messagePanel";

export const url: string = process.env.REACT_APP_WS_URL || "";
const socket = io(url, { autoConnect: false });

// INFO: если нужно подключться сразу
// const socket = io(url, {
//   auth: {
//     token:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzM5MzcxMGE2Y2E1MTBlMzZmZGQ4OTQiLCJpYXQiOjE2NjUyOTkzNTYsImV4cCI6MTY2NTg5OTI5Nn0.eKJcXhJOcT6VpkMwLtxvYHzq-Xxl8eR3arkYSwKjATQ",
//   },
// });

function App() {
  let [msgs, set_msgs] = useState([] as IMessage[]);
  let [token, set_token] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzM5MzcxMGE2Y2E1MTBlMzZmZGQ4OTQiLCJpYXQiOjE2NjUyOTkzNTYsImV4cCI6MTY2NTg5OTI5Nn0.eKJcXhJOcT6VpkMwLtxvYHzq-Xxl8eR3arkYSwKjATQ"
  );

  const onTokenChange = (event: ChangeEvent<HTMLInputElement>) => {
    set_token(event.target.value);
  };

  const connect = () => {
    socket.auth = { token: token };
    socket.connect();
  };

  const disconnect = () => {
    socket.disconnect();
  };

  useEffect(() => {
    socket.on("connect", () => {
      set_msgs((prev) => [
        ...prev,
        createMsg(`Подключение: ${socket.connected}`),
      ]);
    });

    socket.on("disconnect", (reason) => {
      set_msgs((prev) => [...prev, createMsg(`Отключение: ${reason}`)]);
    });

    socket.on("connect_error", (error) => {
      set_msgs((prev) => [...prev, createMsg(error.message)]);
    });

    socket.on("receive_message", (data) => {
      set_msgs((prev) => [...prev, data]);
    });

    socket.on("join-to-room", (data) => {
      set_msgs((prev) => [...prev, createMsg(data)]);
    });

    return () => {
      if (socket.connected) {
        console.log("unmount");
        socket.close();
      }
    };
  }, []);

  return (
    <div className="App">
      <p>Токен</p>
      <input style={{ width: "100%" }} value={token} onChange={onTokenChange} />
      <button onClick={connect}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
      <div style={{ display: "flex", border: "1px solid red" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: "1 1 0",
            gap: "10px",
            margin: "4px",
            border: "1px solid green",
          }}
        >
          <p>Список сообщений</p>
          <ul style={{ border: "1px solid red" }}>
            {msgs.map((el, idx) => (
              <li key={idx}>{el.message}</li>
            ))}
          </ul>
        </div>
        <MessagePanel socket={socket} />
      </div>
    </div>
  );
}

export default App;
