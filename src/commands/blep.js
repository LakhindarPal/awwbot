import { ApplicationCommandOptionType } from "../discord";
import catfacts from "../data/catfacts.json";
import dogfacts from "../data/dogfacts.json";
import { getHotUrl } from "../utils/reddit.js";

const dogBreeds = ["Labrador", "German Shepherd", "Retriever", "Bulldog", "Beagle", "Poodle", "Pug", "Boxer", "Dachshund", "Husky", "Terrier", "Rottweiler", "Shih Tzu", "Dane", "Doberman", "Pinscher", "Australian", "Collie", "Sheepdog", "Spaniel", "Pembroke", "Shiba", "Mountain", "Pomeranian", "Hound"];

const catBreeds = [
  { name: "Maine Coon", value: "mcoo" },
  { name: "Ragdoll", value: "ragd" },
  { name: "Persian", value: "pers" },
  { name: "American Shorthair", value: "asho" },
  { name: "British Shorthair", value: "bsho" },
  { name: "Russian Blue", value: "rblu" },
  { name: "Scottish Fold", value: "sfol" },
  { name: "Abyssinian", value: "abys" },
  { name: "Sphynx", value: "sphy" },
  { name: "Norwegian Forest Cat", value: "norw" },
  { name: "Siamese", value: "siam" },
  { name: "Birman", value: "birm" },
  { name: "Bengal", value: "beng" },
  { name: "Devon Rex", value: "drex" },
  { name: "Exotic Shorthair", value: "esho" },
  { name: "Siberian", value: "sibe" },
  { name: "Savannah", value: "sava" },
  { name: "Japanese Bobtail", value: "jbob" },
  { name: "Himalayan", value: "hima" },
  { name: "Balinese", value: "bali" },
  { name: "Turkish Angora", value: "tang" },
  { name: "Ragamuffin", value: "raga" },
  { name: "Chartreux", value: "char" },
  { name: "Cornish Rex", value: "crex" },
  { name: "Bombay", value: "bomb" },
];

const birdCategories = [
  { name: "General", value: "general" },
  { name: "Birds of Prey", value: "birdsofprey" },
  { name: "Hummingbirds", value: "hummingbirds" },
  { name: "Parrots", value: "parrots" },
  { name: "Crows", value: "crows" },
];

const birdSubreddits = {
  "general": ["birdphotography", "birding", "whatsthisbird", "ornithology"],
  "birdsofprey": ["birdsofprey"],
  "hummingbirds": ["hummingbirds"],
  "crows": ["crows"],
  "parrots": ["parrots"]
};
const bigcatSubreddits = ["BigCatGifs", "bigcats"];
const elephantSubreddits = ["Elephants", "babyelephantgifs"];

const BlepCommand = {
  data: {
    name: "blep",
    description: "Send a random photo or fact about animals or birds",
    options: [
      {
        name: "image",
        description: "Retrieve a random animal photo",
        type: ApplicationCommandOptionType.SubcommandGroup,
        options: [
          {
            name: "dog",
            description: "Get an adorable photo of a dog",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "breed",
                description: "Specify the breed of the dog",
                type: ApplicationCommandOptionType.String,
                required: false,
                choices: dogBreeds.map(item => ({ name: item, value: item.replace(/\s/g, "").toLowerCase() }))
              }
            ]
          },
          {
            name: "cat",
            description: "Get an adorable photo of a cat",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "breed",
                description: "Specify the breed of the cat",
                type: ApplicationCommandOptionType.String,
                required: false,
                choices: catBreeds
              }
            ]
          },
          {
            name: "fox",
            description: "Get an adorable photo of a fox",
            type: ApplicationCommandOptionType.Subcommand,
          },
          {
            name: "kangaroo",
            description: "Get a random photo of a kangaroo",
            type: ApplicationCommandOptionType.Subcommand,
          },
          {
            name: "koala",
            description: "Get a random photo of a koala",
            type: ApplicationCommandOptionType.Subcommand,
          },
          {
            name: "panda",
            description: "Get a random photo of a panda",
            type: ApplicationCommandOptionType.Subcommand,
          },
          {
            name: "raccoon",
            description: "Get a random photo of a raccoon",
            type: ApplicationCommandOptionType.Subcommand,
          },
          {
            name: "whale",
            description: "Get a random photo of a whale",
            type: ApplicationCommandOptionType.Subcommand,
          },
          {
            name: "red_panda",
            description: "Get a random photo of a red panda",
            type: ApplicationCommandOptionType.Subcommand,
          },
          {
            name: "lizard",
            description: "Get a random photo of a lizard",
            type: ApplicationCommandOptionType.Subcommand,
          },
          {
            name: "bigcat",
            description: "Get a photo or video of big cats like tigers, lions, leopards.",
            type: ApplicationCommandOptionType.Subcommand,
          },
          {
            name: "elephant",
            description: "Get an image or gif of an elephant.",
            type: ApplicationCommandOptionType.Subcommand,
          },
          {
            name: "bird",
            description: "Get an adorable photo of a bird",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "category",
                description: "Specify the category of the bird",
                type: ApplicationCommandOptionType.String,
                required: false,
                choices: birdCategories
              },
            ]
          },
        ]
      },
      {
        name: "fact",
        description: "Retrieve a random fact about animals or birds",
        type: ApplicationCommandOptionType.SubcommandGroup,
        options: [
          {
            name: "dog",
            description: "Get a random fact about dogs",
            type: ApplicationCommandOptionType.Subcommand,
          },
          {
            name: "cat",
            description: "Get a random fact about cats",
            type: ApplicationCommandOptionType.Subcommand,
          },
          {
            name: "fox",
            description: "Get a random fact about foxes",
            type: ApplicationCommandOptionType.Subcommand,
          },
          {
            name: "koala",
            description: "Get a random fact about koalas",
            type: ApplicationCommandOptionType.Subcommand,
          },
          {
            name: "panda",
            description: "Get a random fact about pandas",
            type: ApplicationCommandOptionType.Subcommand,
          },
          {
            name: "bird",
            description: "Get a random fact about birds",
            type: ApplicationCommandOptionType.Subcommand,
          },
        ]
      },
    ]
  },
  async execute(interaction) {
    const cmdGroupName = interaction.getSubcommandGroup();
    const subCmdName = interaction.getSubcommand();
    const embed = {
      image: { url: null },
      video: { url: null },
      color: 0x5865f2,
      footer: { text: null }
    };

    if (cmdGroupName === "image") {
      const attributions = {
        dog: "dog.ceo",
        cat: "thecatapi.com",
        fox: "randomfox.ca",
        lizard: "nekos.life"
      };

      switch (subCmdName) {
        case "bird":
        case "bigcat":
        case "elephant": {
          let subreddits = subCmdName === "bigcat" ? bigcatSubreddits : elephantSubreddits;

          if (subCmdName === "bird") {
            const selectedBird = interaction.getOption("category");
            subreddits = selectedBird ? birdSubreddits[selectedBird] : Object.values(birdSubreddits).flat();
          }

          const randomIndex = Math.floor(Math.random() * subreddits.length);
          const selectedSub = subreddits[randomIndex];
          const redditImage = await getHotUrl(selectedSub);

          embed.image.url = redditImage;
          if (redditImage.includes(".mp4")) embed.video.url = redditImage;
          embed.footer.text = "Powered by Reddit"
        }
        break;

        default: {
          const breed = interaction.getOption("breed");
          const apiUrls = {
            "dog": "https://dog.ceo/api/breeds/image/random",
            "cat": "https://api.thecatapi.com/v1/images/search",
            "fox": "https://randomfox.ca/floof",
            "lizard": "https://nekos.life/api/v2/img/lizard",
            "kangaroo": "https://some-random-api.com/img/kangaroo",
            "koala": "https://some-random-api.com/img/koala",
            "panda": "https://some-random-api.com/img/panda",
            "raccoon": "https://some-random-api.com/img/raccoon",
            "red_panda": "https://some-random-api.com/img/red_panda",
            "whale": "https://some-random-api.com/img/whale",
          }

          let api = apiUrls[subCmdName];
          if (breed) {
            api = subCmdName === "dog" ?
              `https://dog.ceo/api/breed/${breed}/images/random` :
              `https://api.thecatapi.com/v1/images/search?breed_ids=${breed}`;
          }

          const res = await fetch(api);
          const data = await res.json();

          embed.image.url =
            subCmdName === "dog" ? data.message :
            subCmdName === "cat" ? data[0].url :
            subCmdName === "fox" ? data.image :
            subCmdName === "lizard" ? data.url :
            data.link;

          embed.footer.text =
            `Powered by ${attributions[subCmdName] ?? "some-random-api.com"}`;
        }
      }
    } else {
      if (subCmdName === "dog" || subCmdName === "cat") {
        const facts = subCmdName === "dog" ? dogfacts : catfacts;

        const randomIndex = Math.floor(Math.random() * facts.length);
        embed.description = facts[randomIndex];
        embed.footer.text =
          `Powered by ${subCmdName === "dog-api.kinduff.com" ? dogfacts : "catfacts.ninja"}`;
      } else {
        const apiUrl = `https://some-random-api.com/facts/${subCmdName}`;

        const res = await fetch(apiUrl);
        const data = await res.json();

        embed.description = data.fact;
        embed.footer.text = "Powered by some-random-api.com";
      }
    }

    return interaction.reply({ embeds: [embed] });
  }
};

export default BlepCommand;