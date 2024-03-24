import {
  ApplicationCommandOptionType,
  userMention,
} from "../discord";

const messages = {
  "hug": "{author} hugged {target}.",
  "smile": "{author} smiled at {target}.",
  "wave": "{author} waved at {target}.",
  "cuddle": "{author} cuddled with {target}.",
  "laugh": "{author} laughed with {target}.",
  "pat": "{author} gently patted {target}.",
  "poke": "{author} playfully poked {target}.",
  "wink": "{author} winked at {target}.",
  "blush": "{author} blushed.",
  "smug": "{author} looked smug.",
  "tickle": "{author} tickled {target}.",
  "highfive": "{author} high-fived {target}.",
  "feed": "{author} offered food to {target}.",
  "kiss": "{author} kissed {target}.",
  "dance": "{author} expressed joy through dance.",
  "handshake": "{author} shook hands with {target}.",
  "slap": "{author} playfully or angrily slapped {target}.",
  "cry": "{author} cried.",
  "pout": "{author} pouted.",
  "handhold": "{author} held hands with {target}.",
  "stare": "{author} stared at {target}.",
  "kick": "{author} kicked {target}.",
  "shrug": "{author} shrugged.",
  "nod": "{author} nodded their head.",
  "nope": "{author} shook their head.",
};

const NekoCommand = {
  data: {
    name: "neko",
    description: "Send a random neko gif.",
    options: [
      {
        name: "hug",
        description: "Send a hug to someone special.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "user",
            description: "The user you want to hug.",
            type: ApplicationCommandOptionType.User,
            required: true
          }
        ]
      },
      {
        name: "smile",
        description: "Share a warm smile with someone.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "user",
            description: "The user you want to smile at.",
            type: ApplicationCommandOptionType.User,
            required: true
          }
        ]
      },
      {
        name: "wave",
        description: "Greet someone with a friendly wave.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "user",
            description: "The user you want to wave at.",
            type: ApplicationCommandOptionType.User,
            required: true
          }
        ]
      },
      {
        name: "cuddle",
        description: "Wrap someone in a warm cuddle.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "user",
            description: "The user you want to cuddle with.",
            type: ApplicationCommandOptionType.User,
            required: true
          }
        ]
      },
      {
        name: "laugh",
        description: "Spread joy with a hearty laugh.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "user",
            description: "The user you want to share a laugh with.",
            type: ApplicationCommandOptionType.User,
            required: true
          }
        ]
      },
      {
        name: "pat",
        description: "Gently pat someone on the back or head.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "user",
            description: "The user you want to pat.",
            type: ApplicationCommandOptionType.User,
            required: true
          }
        ]
      },
      {
        name: "poke",
        description: "Playfully poke someone to get their attention.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "user",
            description: "The user you want to poke.",
            type: ApplicationCommandOptionType.User,
            required: true
          }
        ]
      },
      {
        name: "wink",
        description: "Send a playful wink to someone.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "user",
            description: "The user you want to wink at.",
            type: ApplicationCommandOptionType.User,
            required: true
          }
        ]
      },
      {
        name: "blush",
        description: "Feel shy and show a blush on your face.",
        type: ApplicationCommandOptionType.Subcommand
      },
      {
        name: "smug",
        description: "Express confidence and satisfaction with a smug expression.",
        type: ApplicationCommandOptionType.Subcommand
      },
      {
        name: "tickle",
        description: "Tickle someone playfully to make them laugh.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "user",
            description: "The user you want to tickle.",
            type: ApplicationCommandOptionType.User,
            required: true
          }
        ]
      },
      {
        name: "highfive",
        description: "Celebrate success or show solidarity with a high five.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "user",
            description: "The user you want to give highfive.",
            type: ApplicationCommandOptionType.User,
            required: true
          }
        ]
      },
      {
        name: "feed",
        description: "Offer food to someone or something.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "user",
            description: "The user you want to feed.",
            type: ApplicationCommandOptionType.User,
            required: true
          }
        ]
      },
      {
        name: "kiss",
        description: "Express affection with a gentle kiss.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "user",
            description: "The user you want to kiss.",
            type: ApplicationCommandOptionType.User,
            required: true
          }
        ]
      },
      {
        name: "dance",
        description: "Move rhythmically to music or express joy through dance.",
        type: ApplicationCommandOptionType.Subcommand,
      },
      {
        name: "handshake",
        description: "Formally greet or conclude an agreement with a handshake.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "user",
            description: "The user you want to shake hand with.",
            type: ApplicationCommandOptionType.User,
            required: true
          }
        ]
      },
      {
        name: "slap",
        description: "Playfully or angrily slap someone.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "user",
            description: "The user you want to slap.",
            type: ApplicationCommandOptionType.User,
            required: true
          }
        ]
      },
      {
        name: "cry",
        description: "Express sadness or frustration with tears.",
        type: ApplicationCommandOptionType.Subcommand
      },
      {
        name: "pout",
        description: "Show displeasure or disappointment with a pout.",
        type: ApplicationCommandOptionType.Subcommand
      },
      {
        name: "handhold",
        description: "Hold someone's hand for comfort or support.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "user",
            description: "The user you want to hold hand.",
            type: ApplicationCommandOptionType.User,
            required: true
          }
        ]
      },
      {
        name: "stare",
        description: "Gaze intently at someone or something.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "user",
            description: "The user you want to stare.",
            type: ApplicationCommandOptionType.User,
            required: true
          }
        ]
      },
      {
        name: "kick",
        description: "Kick someone out of an activity.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "user",
            description: "The user you want to kick out.",
            type: ApplicationCommandOptionType.User,
            required: true
          }
        ]
      },
      {
        name: "shrug",
        description: "Indicate uncertainty or lack of concern with a shrug.",
        type: ApplicationCommandOptionType.Subcommand
      },
      {
        name: "nod",
        description: "Indicate agreement or acknowledgment with a nod.",
        type: ApplicationCommandOptionType.Subcommand
      },
      {
        name: "nope",
        description: "Indicate disagreement or refusal with a head shake.",
        type: ApplicationCommandOptionType.Subcommand
      }
    ]
  },
  async execute(interaction) {
    const subCmdName = interaction.getSubcommand();
    const intUser = interaction.member.user;
    const targetUser = interaction.getResolvedOption("user", "users");

    const apiUrl = `https://nekos.best/api/v2/${subCmdName}`;
    const res = await fetch(apiUrl);
    const data = await res.json();

    const embed = {
      image: { url: data.results[0].url },
      color: 0x5865f2,
      footer: {
        text: "Powered by nekos.best"
      }
    };

    const content = messages[subCmdName]
      .replace(/{author}/g, userMention(intUser.id))
      .replace(/{target}/g, userMention(targetUser?.id));

    return interaction.reply({ content, embeds: [embed] });
  }
}

export default NekoCommand;