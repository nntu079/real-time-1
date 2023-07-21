import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";

const host = "http://localhost:3000";

function App() {
  const [mess, setMess] = useState([]);
  const [message, setMessage] = useState('');
  const [id, setId] = useState();

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient.connect(host)

    socketRef.current.on("server-set-id", ({ id }) => {
      setId(id)
    })

    socketRef.current.on("server-send-data", dataGot => {
      console.log({ dataGot })
    })
  }, []);

  function sendData() {
    socketRef.current.emit("client-send-data", "tu test")
  }


  return (
    <>
      <div>{id}</div>
      <button onClick={sendData}>TEST</button>
    </>
  );
}

export default App;
