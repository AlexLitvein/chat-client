import React, { useState, ChangeEvent } from "react";
import { socket } from "./App";
import { createMsg, IMessage } from "./types";

export interface IMessagePanelProps {}

export const MessagePanel = ({}: IMessagePanelProps) => {
  let [msg, set_msg] = useState({
    userId: "63393710a6ca510e36fdd894",
    documentId: "63415b42ad7aec6fdf8ffd64",
    message: "msg 1",
  } as IMessage);

  const onChangeInput =
    (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
      set_msg((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const onSendRoom = () => {
    socket.emit("room", msg.documentId); // room = documentId
  };

  const onSendMsg = () => {
    const m = createMsg(msg.message, msg.userId, msg.documentId);
    socket.emit("send_message", m);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: "1 1 0",
        gap: "10px",
        margin: "4px",
        border: "1px solid blue",
      }}
    >
      <p>user id</p>
      <input
        style={{ width: "100%" }}
        value={msg.userId}
        onChange={onChangeInput("userId")}
      />

      <p>Комната (ид документа)</p>
      <input
        style={{ width: "100%" }}
        value={msg.documentId}
        onChange={onChangeInput("documentId")}
      />
      <button onClick={onSendRoom}>Войти</button>

      <p>Сообщение</p>
      <input
        style={{ width: "100%" }}
        value={msg.message}
        onChange={onChangeInput("message")}
      />
      <button onClick={onSendMsg}>Отправить</button>
    </div>
  );
};
