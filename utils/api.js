const axios = require("axios");
async function translateText(text, sourceLanguage, targetLanguage) {
  const encodedParams = new URLSearchParams();
  encodedParams.set("from", sourceLanguage);
  encodedParams.set("to", targetLanguage);
  encodedParams.set("text", text);

  const options = {
    method: "POST",
    url: "https://google-translate113.p.rapidapi.com/api/v1/translator/text",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "dedbf2051emshdde11662bde5f9cp14d73fjsnd8e7f8343eef",
      "X-RapidAPI-Host": "google-translate113.p.rapidapi.com",
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = { translateText };
