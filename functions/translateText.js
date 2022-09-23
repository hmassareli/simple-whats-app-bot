const axios = require("axios");
const DetectLanguage = require("detectlanguage");

const translateText = (userMessage, client) => {
  let step = 0;

  const translateByLanguage = (message, language) => {
    if (language === "pt") {
      sendMessage("A mensagem está em português, vou traduzir para inglês");
      return translate(message.body, "pt", "en");
    }
    return translate(message.body, language, "pt");
  };

  const sendMessage = (message) => {
    client.sendMessage(userMessage.from, message);
  };

  const translate = (text, from, to) => {
    axios
      .post(
        "https://translate.fortytwo-it.com/translate",
        {
          q: text,
          source: from,
          target: to,
          format: "text",
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        sendMessage(response.data.translatedText);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  sendMessage("Por favor, insira a mensagem que deseja traduzir");

  client.on("message", (message) => {
    if (message.from === userMessage.from) {
      step++;
      if (step === 1) {
        step++;
        let detectlanguage = new DetectLanguage(
          "e74ebc1f6928e312a86ef4cf23233224"
        );
        detectlanguage.detect(message.body).then((result) => {
          console.log(JSON.stringify(result));
          translateByLanguage(message, result[0].language);
        });
      } else {
        return;
      }
    }
  });
};
module.exports = translateText;
