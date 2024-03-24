import { ApplicationCommandOptionType } from "../discord";
import allJokes from "../data/jokes.json";
const jokeTags = [...new Set(allJokes.flatMap(joke => joke.tags))];
const attributions = {
  meme: "meme-api.com | Reddit",
  joke: "npm.io/one-liner-joke",
  dadjoke: "icanhazdadjoke.com",
  chucknorris: "chucknorris.io",
  advice: "adviceslip.com",
  quote: "quotable.io",
  inspiration: "zenquotes.io",
  positivity: "affirmations.dev",
  funfact: "djtech.net",
};

const ContentCommand = {
  data: {
    name: "content",
    description: "Get various types of content",
    options: [
      {
        name: "meme",
        description: "Summon a random meme at will.",
        type: ApplicationCommandOptionType.Subcommand,
      },
      {
        name: "joke",
        description: "Fetch a random one-liner joke",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "include_tag",
            description: "Filter jokes that includes a tag",
            type: ApplicationCommandOptionType.String,
            required: false,
            choices: jokeTags.slice(0, 25).map(tag => ({ name: tag, value: tag }))
          },
          {
            name: "exclude_tag",
            description: "Filter jokes that excludes a tag",
            type: ApplicationCommandOptionType.String,
            required: false,
            choices: jokeTags.slice(0, 25).map(tag => ({ name: tag, value: tag }))
          }
        ]
      },
      {
        name: "dadjoke",
        description: "Retrieve a dad joke",
        type: ApplicationCommandOptionType.Subcommand,
      },
      {
        name: "chucknorris",
        description: "Obtain a random Chuck Norris joke or fact",
        type: ApplicationCommandOptionType.Subcommand,
      },
      {
        name: "advice",
        description: "Receive a piece of advice",
        type: ApplicationCommandOptionType.Subcommand,
      },
      {
        name: "quote",
        description: "Acquire a famous quote",
        type: ApplicationCommandOptionType.Subcommand,
      },
      {
        name: "inspiration",
        description: "Get some instant words of inspiration",
        type: ApplicationCommandOptionType.Subcommand,
      },
      {
        name: "positivity",
        description: "Receive a positive message or affirmation",
        type: ApplicationCommandOptionType.Subcommand,
      },
      {
        name: "funfact",
        description: "Get an interesting or useless fact",
        type: ApplicationCommandOptionType.Subcommand,
      },
    ],
  },
  async execute(interaction) {
    const subCmdName = interaction.getSubcommand();
    const embed = {
      image: { url: null },
      color: 0x5865f2,
      footer: { text: `Powered by ${attributions[subCmdName]}` }
    };

    switch (subCmdName) {
      case "meme": {
        const res = await fetch("https://meme-api.com/gimme");
        const meme = await res.json();
        embed.image.url = meme.url;
        embed.title = meme.title;
      }
      break;

      case "joke": {
        const includeTag = interaction.getOption("include_tag");
        const excludeTag = interaction.getOption("exclude_tag");
        let jokes = allJokes;
        if (excludeTag) jokes = jokes.filter(joke => !joke.tags.includes(excludeTag));
        if (includeTag) jokes = jokes.filter(joke => joke.tags.includes(includeTag));

        const randomIndex = Math.floor(Math.random() * jokes.length);
        embed.description = jokes[randomIndex];
      }
      break;

      default: {
        const apiUrls = {
          dadjoke: "https://icanhazdadjoke.com",
          chucknorris: "https://api.chucknorris.io/jokes/random",
          advice: "https://api.adviceslip.com/advice",
          quote: "https://api.quotable.io/quotes/random",
          inspiration: "https://zenquotes.io/api/random",
          positivity: "https://www.affirmations.dev",
          funfact: "https://uselessfacts.jsph.pl/api/v2/facts/random"
        };

        const res = await fetch(apiUrls[subCmdName], {
          headers: {
            "Accept": "application/json"
          }
        });
        const data = await res.json();

        embed.description =
          subCmdName === "dadjoke" ? data.joke :
          subCmdName === "chucknorris" ? data.value :
          subCmdName === "advice" ? data.slip.advice :
          subCmdName === "quote" ? `${data[0].content} by ${data[0].author}` :
          subCmdName === "inspiration" ? `${data[0].q} by ${data[0].a}` :
          subCmdName === "positivity" ? data.affirmation :
          data.text
      }
    }

    return interaction.reply({ embeds: [embed] })
  }
};

export default ContentCommand;