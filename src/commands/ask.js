import { ApplicationCommandOptionType } from "../discord";
import data from "../data/ask.json";

const AskCommand = {
  data: {
    name: "ask",
    description: "Ask various figures or animals a question.",
    options: Object.entries(data).map(([key, item]) => ({
      name: key,
      description: item.description,
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "question",
          description: "The question you want to ask.",
          type: ApplicationCommandOptionType.String,
          required: true
          }
        ]
    }))
  },
  async execute(interaction) {
    const subCmdName = interaction.getSubcommand();
    const content = subCmdName === "8ball" ? data["ball8"] : data[subCmdName];
    const { messages, name, icon: icon_url } = content;
    const randomIndex = Math.floor(Math.random() * messages.length);

    const embed = {
      author: { name, icon_url },
      description: messages[randomIndex],
      color: 0x5865f2,
      footer: {
        text: "DISCLAIMER: Responses are simulated and for entertainment purposes only."
      }
    };

    return interaction.reply({ embeds: [embed] });
  }
}

export default AskCommand;