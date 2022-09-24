const DetectLanguage = require("detectlanguage");
const getDeeplTranslation = require("./deepTranslate");
const getFreeTranslation = require("./freeTranslate");

const translateText = (userMessage, client) => {
  let step = 0;
  const deepTranslate = getDeeplTranslation();

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
    console.log("função translate");
    deepTranslate.then((translate) => {
      translate(from, to, text).then((deeplTranslation) => {
        sendMessage("deepL: \n" + deeplTranslation);
      });
    });
    // getFreeTranslation(from, to, text).then((freeTranslation) => {
    //   sendMessage("FreeTranslate: \n" + freeTranslation);
    // });
  };

  sendMessage("Por favor, insira a mensagem que deseja traduzir");

  client.on("message_create", (message) => {
    if (message.from === userMessage.from) {
      step++;
      if (step === 2) {
        step++;
        let detectlanguage = new DetectLanguage(
          "e74ebc1f6928e312a86ef4cf23233224"
        );
        detectlanguage.detect(message.body).then((result) => {
          console.log(JSON.stringify(result));
          translateByLanguage(message, result[0].language);
        });
      }
    }
  });
};
module.exports = translateText;
