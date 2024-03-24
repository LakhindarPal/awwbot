import { InteractionResponseFlags } from "../discord";

const InviteCommand = {
  data: {
    name: "invite",
    description: "Get an invite link to add the bot to your server",
  },
  execute(interaction) {
    const applicationId = interaction.application_id;

    const inviteURL =
      `https://discord.com/oauth2/authorize?client_id=${applicationId}&permissions=277092813888&scope=applications.commands%20bot`;

    return interaction.reply({
      content: inviteURL,
      flags: InteractionResponseFlags.EPHEMERAL
    });
  }
};

export default InviteCommand;