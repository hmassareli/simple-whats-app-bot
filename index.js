// if (message.body === "last 10 messages") {
//   client.getChats().then((chats) => {
//     client.sendMessage(message.from, JSON.stringify(chats));
//   });
// }

//client.pupPage.click("#pane-side")

const qrcode = require("qrcode-terminal");
const translateText = require("./functions/translateText");

const { Client, LocalAuth } = require("whatsapp-web.js");
const getPokemons = require("./functions/getPokemons");
const sendMessages = require("./functions/sendMessages");
const client = new Client({
  authStrategy: new LocalAuth({ clientId: "bot-zdg" }),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
  client.on("message", (message) => {
    if (message.body.toLowerCase().includes("pokemons")) {
      getPokemons(message, client);
    }
    if (message.body.toLowerCase().includes("disparar mensagens")) {
      sendMessages(message, client);
    }
    if (message.body.toLowerCase().includes("traduzir")) {
      translateText(message, client);
    }
    console.log(message.body);
    //get a list of 10 pokemons from the pokeapi and send it to the user
  });
});

client.initialize();
