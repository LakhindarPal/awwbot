import {
  ApplicationCommandOptionType,
  displayAvatarURL,
  getDisplayName,
} from "../discord";

const CanvasCommand = {
  data: {
    name: "canvas",
    description: "Generating various types of images",
    options: [
      {
        name: "overlay",
        description: "Apply overlay effects to an avatar",
        type: ApplicationCommandOptionType.SubcommandGroup,
        options: [
          {
            name: "comrade",
            description: "Apply a comrade overlay to an avatar",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "user",
                description: "The user whose avatar to overlay (default: you)",
                type: ApplicationCommandOptionType.User,
                required: false
              }
            ]
          },
          {
            name: "pride",
            description: "Give an avatar a pride rainbow overlay",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "user",
                description: "The user whose avatar to overlay (default: you)",
                type: ApplicationCommandOptionType.User,
                required: false
            },
            ]
          },
          {
            name: "glass",
            description: "Give an avatar a glass effect overlay",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "user",
                description: "The user whose avatar to overlay (default: you)",
                type: ApplicationCommandOptionType.User,
                required: false
              }
            ]
          },
          {
            name: "jail",
            description: "Go to horny jail.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "user",
                description: "The user whose avatar to overlay (default: you)",
                type: ApplicationCommandOptionType.User,
                required: false
              },
            ]
          },
          {
            name: "passed",
            description: "Mission passed overlay to an avatar",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "user",
                description: "The user whose avatar to overlay (default: you)",
                type: ApplicationCommandOptionType.User,
                required: false
              },
            ]
          },
          {
            name: "triggered",
            description: "I will not enter a description so you will get triggered",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "user",
                description: "The user whose avatar to overlay (default: you)",
                type: ApplicationCommandOptionType.User,
                required: false
              }
            ]
          },
          {
            name: "wasted",
            description: "Wastedeeznuts overlay to an avatar",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "user",
                description: "The user whose avatar to overlay (default: you)",
                type: ApplicationCommandOptionType.User,
                required: false
              },
            ]
          },
        ]
      },
      {
        name: "filter",
        description: "Apply various filters to an avatar",
        type: ApplicationCommandOptionType.SubcommandGroup,
        options: [
          {
            name: "blue",
            description: "Blueify an avatar",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "user",
                description: "The user whose avatar to filter (default: you)",
                type: ApplicationCommandOptionType.User,
                required: false
              }
            ]
          },
          {
            name: "blurple",
            description: "Blurplify an avatar",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "user",
                description: "The user whose avatar to filter (default: you)",
                type: ApplicationCommandOptionType.User,
                required: false
              }
            ]
          },
          {
            name: "brightness",
            description: "Adjust the brightness of an avatar",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "user",
                description: "The user whose avatar to filter (default: you)",
                type: ApplicationCommandOptionType.User,
                required: false
                },
              {
                name: "brightness",
                description: "The brightness value to apply",
                type: ApplicationCommandOptionType.Integer,
                required: false
              }
            ]
          },
          {
            name: "tint",
            description: "Tint an avatar to a certain color",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "user",
                description: "The user whose avatar to filter (default: you)",
                type: ApplicationCommandOptionType.User,
                required: false
                },
              {
                name: "color",
                description: "The color of the tint",
                type: ApplicationCommandOptionType.String,
                required: false
              }
            ]
          },
          {
            name: "green",
            description: "Make an avatar green like the hulk",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "user",
                description: "The user whose avatar to filter (default: you)",
                type: ApplicationCommandOptionType.User,
                required: false
              }
            ]
          },
          {
            name: "grey",
            description: "Greyscale an avatar",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "user",
                description: "The user whose avatar to filter (default: you)",
                type: ApplicationCommandOptionType.User,
                required: false
              }
            ]
          },
          {
            name: "invert",
            description: "Invert and grayscale an avatar",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "user",
                description: "The user whose avatar to filter (default: you)",
                type: ApplicationCommandOptionType.User,
                required: false
              }
            ]
          },
          {
            name: "red",
            description: "Redify an avatar",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "user",
                description: "The user whose avatar to filter (default: you)",
                type: ApplicationCommandOptionType.User,
                required: false
              }
            ]
          },
          {
            name: "sepia",
            description: "Apply a sepia filter to an avatar",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "user",
                description: "The user whose avatar to filter (default: you)",
                type: ApplicationCommandOptionType.User,
                required: false
              }
            ]
          },
          {
            name: "threshold",
            description: "Apply a threshold filter to an avatar",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "user",
                description: "The user whose avatar to filter (default: you)",
                type: ApplicationCommandOptionType.User,
                required: false
              },
              {
                name: "threshold",
                description: "The threshold value to apply",
                type: ApplicationCommandOptionType.Integer,
                required: false
              },
            ]
          },
        ]
      },
      {
        name: "misc",
        description: "Miscellaneous image edits",
        type: ApplicationCommandOptionType.SubcommandGroup,
        options: [
          {
            name: "blur",
            description: "Blur an avatar",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "user",
                description: "The user whose avatar to edit (default: you)",
                type: ApplicationCommandOptionType.User,
                required: false
              }
            ]
          },
          {
            name: "circle",
            description: "Crop an user's avatar to a circle",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "user",
                description: "The user whose avatar to edit (default: you)",
                type: ApplicationCommandOptionType.User,
                required: false
              }
            ]
          },
          {
            name: "heart",
            description: "Crop an user’s avatar to a heart shape",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "user",
                description: "The user whose avatar to edit (default: you)",
                type: ApplicationCommandOptionType.User,
                required: false
              }
            ]
          },
          {
            name: "horny",
            description: "Horny card of an user with avatar",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "user",
                description: "The user whose avatar to edit (default: you)",
                type: ApplicationCommandOptionType.User,
                required: false
              }
            ]
          },
          {
            name: "its-so-stupid",
            description: "Create ‘It's so stupid’ meme of an user's avatar",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "user",
                description: "The user whose avatar to edit (default: you)",
                type: ApplicationCommandOptionType.User,
                required: false
              }
            ]
          },
          {
            name: "lolice",
            description: "Create 'LOLICE (Loli police)' meme of an user's avatar",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "user",
                description: "The user whose avatar to edit (default: you)",
                type: ApplicationCommandOptionType.User,
                required: false
              }
            ]
          },
          {
            name: "namecard",
            description: "Generate a Genshin Impact namecard",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "birthday",
                description: "The character's birthday (DD-MM-YYYY)",
                type: ApplicationCommandOptionType.String,
                required: true
              },
              {
                name: "user",
                description: "The user whose avatar and username to use",
                type: ApplicationCommandOptionType.User,
                required: false
              },
              {
                name: "description",
                description: "Description of the character",
                type: ApplicationCommandOptionType.String,
                required: false
              }
            ]
          },
          {
            name: "pixelate",
            description: "Pixelate an user's avatar",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "user",
                description: "The user whose avatar to edit (default: you)",
                type: ApplicationCommandOptionType.User,
                required: false
              }
            ]
          },
          {
            name: "simpcard",
            description: "Generate a 'Simp Card' with user's avatar",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "user",
                description: "The user whose avatar to use (default: you)",
                type: ApplicationCommandOptionType.User,
                required: false
              }
            ]
          },
          {
            name: "tonikawa",
            description: "Put an image on a dvd disk (scene from tonikawa)",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "user",
                description: "The user whose avatar to use (default: you)",
                type: ApplicationCommandOptionType.User,
                required: false
              }
            ]
          },
          {
            name: "tweet",
            description: "Generate screenshot of a fake tweet",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "comment",
                description: "The content of the tweet",
                type: ApplicationCommandOptionType.String,
                required: true
              },
              {
                name: "user",
                description: "The user whose tweet to mimic (default: you)",
                type: ApplicationCommandOptionType.User,
                required: false
              },
              {
                name: "replies",
                description: "Number of replies on the tweet (default: 1)",
                type: ApplicationCommandOptionType.String,
                required: false
              },
              {
                name: "likes",
                description: "Number of likes on the tweet (default: 6.9k)",
                type: ApplicationCommandOptionType.String,
                required: false
              },
              {
                name: "retweets",
                description: "Number of retweets (default: 420)",
                type: ApplicationCommandOptionType.String,
                required: false
              },
              {
                name: "theme",
                description: "Theme of twitter (default: light)",
                type: ApplicationCommandOptionType.String,
                required: false,
                choices: [
                  {
                    name: "Light",
                    value: "light"
                  },
                  {
                    name: "Dark",
                    value: "dark"
                  },
                  {
                    name: "Dim",
                    value: "dim"
                  },
                ]
              },
            ]
          },
          {
            name: "youtube-comment",
            description: "Generate screenshot of a fake YouTube comment",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: "comment",
                description: "The comment text",
                type: ApplicationCommandOptionType.String,
                required: true
              },
              {
                name: "user",
                description: "The user whose avatar and username to use",
                type: ApplicationCommandOptionType.User,
                required: false
              },
            ]
          }
        ]
      }
    ]
  },
  async execute(interaction) {
    const cmdGroupName = interaction.getSubcommandGroup();
    const subCmdName = interaction.getSubcommand();

    const member = interaction.getResolvedOption("user", "members") ?? interaction.member;
    const user = interaction.getResolvedOption("user", "users") ?? interaction.member.user;
    const description = interaction.getOption("description");
    const comment = interaction.getOption("comment");
    const birthday = interaction.getOption("birthday");
    const optionalParams = {
      brightness: interaction.getOption("brightness"),
      threshold: interaction.getOption("threshold"),
      color: interaction.getOption("color"),
      description: description ? encodeURIComponent(description) : null,
      comment: comment ? encodeURIComponent(comment) : null,
      replies: interaction.getOption("replies"),
      likes: interaction.getOption("likes"),
      retweets: interaction.getOption("retweets"),
      theme: interaction.getOption("theme"),
    };

    if (birthday) {
      const timestamp = Date.parse(birthday);
      const date = isNaN(timestamp) ? new Date() : new Date(timestamp);
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      optionalParams.birthday = date.toLocaleDateString("en-US", options);
    }

    const avatarUrl = displayAvatarURL(member, interaction.guild_id, user, { size: 4096, extension: "png" });
    const displayName = getDisplayName(user, member);

    let resultUrl = `https://some-random-api.com/canvas/${cmdGroupName}/${subCmdName}?avatar=${avatarUrl}`;

    for (const param in optionalParams) {
      if (optionalParams[param]) {
        resultUrl += `&${param}=${optionalParams[param]}`;
      }
    }

    if (subCmdName === "namecard" || subCmdName === "youtube-comment" || subCmdName === "tweet") {
      resultUrl += `&username=${user.username}`;
    }

    if (subCmdName == "tweet") {
      resultUrl += `&displayname=${displayName}`;
    }

    const embed = {
      author: {
        name: displayName,
        icon_url: avatarUrl
      },
      image: { url: resultUrl },
      color: 0x5865f2,
      footer: {
        text: "Powered by some-random-api.com"
      }
    };

    return interaction.reply({ embeds: [embed] });
  }
}

export default CanvasCommand;