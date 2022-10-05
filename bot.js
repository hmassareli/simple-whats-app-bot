const qrcode = require("qrcode-terminal");
const translateText = require("./functions/translateText");

const { Client, LocalAuth } = require("whatsapp-web.js");
const getPokemons = require("./functions/getPokemons");
const sendMessages = require("./functions/sendMessages");

const RunWhatsAppByName = (name) => {
  const client = new Client({
    authStrategy: new LocalAuth({ clientId: name }),
  });

  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    console.log("Client is ready!");
    client.on("message_create", (message) => {
      if (message.fromMe === false) {
        if (message.body.toLowerCase().includes("pokemons")) {
          getPokemons(message, client);
        }
        if (message.body.toLowerCase().includes("disparar mensagens")) {
          sendMessages(message, client);
        }
        if (message.body.toLowerCase().includes("traduzir")) {
          translateText(message, client);
        }
      } else {
        if (message.body.toLowerCase().includes("translate text")) {
          translateText(message, client);
        }
      }
      console.log(message.body);
    });
  });

  client.initialize();
};

module.exports = RunWhatsAppByName;
