const { performance } = require("perf_hooks");
const axios = require("axios");

const translateText = (from, to, text) => {
  var startTime = performance.now();

  return axios
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
      var endTime = performance.now();
      console.log("Time for freeTranslate: " + (endTime - startTime) + "ms");
      return response.data.translatedText;
    })
    .catch((error) => {
      console.log(error);
    });
};
module.exports = translateText;
