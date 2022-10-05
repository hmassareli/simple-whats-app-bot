import RunWhatsAppByName from "../bot";

const login = () => {
  console.log(socket);
  const username = document.getElementById("username");
  if (username.value === "") {
    alert("Username is required");
    return;
  }
  RunWhatsAppByName(username.value);
};

document.querySelector("#login").addEventListener("click", login);
