const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();
const { translateText } = require("./utils/api");

const bot = new Telegraf(process.env.TOKEN);

bot.hears("/start", async (ctx) => {
  ctx.reply(
    `Salom ${ctx.from.first_name}. Botimizga xush kelibsiz. Qaysi tilni tarjima qilmoqchisiz?`,
    Markup.inlineKeyboard([
      Markup.button.callback("uz🇺🇿", "button1"),
      Markup.button.callback("en🇬🇧", "button2"),
      Markup.button.callback("ru🇷🇺", "button3"),
    ])
  );
});

bot.action("button1", async (ctx) => {
  await ctx.reply(
    "Tarjima qilinadigan tilni tanlang:",
    Markup.inlineKeyboard([
      Markup.button.callback("O'zbekcha -> Inglizcha", "uz-en"),
      Markup.button.callback("O'zbekcha -> Ruscha", "uz-ru"),
    ])
  );
  bot.action(["uz-en", "uz-ru"], async (ctx) => {
    const [sourceLanguage, targetLanguage] = ctx.match.input.split("-");
    await ctx.deleteMessage();
    await ctx.reply("Matn kiriting:", Markup.removeKeyboard());
    bot.on("text", async (msg) => {
      const translatedText = await translateText(
        msg.update.message.text,
        sourceLanguage,
        targetLanguage
      );
      console.log(translatedText);
      await ctx.reply(`
      Tarjimasi: ${translatedText.trans}
    `);
    });
  });
});

bot.action("button2", async (ctx) => {
  await ctx.reply(
    "Choose the language you want to translate:",
    Markup.inlineKeyboard([
      Markup.button.callback("English -> Uzbek", "en-uz"),
      Markup.button.callback("English -> Russian", "en-ru"),
    ])
  );
  bot.action(["en-uz", "en-ru"], async (ctx) => {
    const [sourceLanguage, targetLanguage] = ctx.match.input.split("-");
    await ctx.deleteMessage();
    await ctx.reply("Enter the text:", Markup.removeKeyboard());
    bot.on("text", async (msg) => {
      const translatedText = await translateText(
        msg.update.message.text,
        sourceLanguage,
        targetLanguage
      );
      console.log(translatedText);
      await ctx.reply(`
      Translation: ${translatedText.trans}
    `);
    });
  });
});

bot.action("button3", async (ctx) => {
  await ctx.reply(
    "Выберите язык, на котором хотите перевести:",
    Markup.inlineKeyboard([
      Markup.button.callback("Русский -> Английский", "ru-en"),
      Markup.button.callback("Русский -> Узбекский", "ru-uz"),
    ])
  );
  bot.action(["ru-en", "ru-uz"], async (ctx) => {
    const [sourceLanguage, targetLanguage] = ctx.match.input.split("-");
    await ctx.deleteMessage();
    await ctx.reply("Введите текст:", Markup.removeKeyboard());
    bot.on("text", async (msg) => {
      const translatedText = await translateText(
        msg.update.message.text,
        sourceLanguage,
        targetLanguage
      );
      console.log(translatedText);
      await ctx.reply(`
      Трансляция: ${translatedText.trans}
    `);
    });
  });
});

bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
