const socket = io();

socket.on("connect", () => {
  console.log("connected");
});
socket.on("disconnect", () => {
  console.log("disconnected");
});
socket.on("qr", (data) => {
  console.log(data);
  const qr = new QRious({
    element: document.getElementById("qr"),
    value: data,
  });
});
