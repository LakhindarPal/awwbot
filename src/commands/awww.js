import { getHotUrl } from "../utils/reddit.js";

const AwwwCommand = {
  data: {
    name: "awww",
    description: "Drop some cuteness on this channel.",
  },
  async execute(interaction) {
    const cuteUrl = await getHotUrl("aww");

    const embed = {
      image: { url: cuteUrl },
      video: { url: null },
      color: 0x5865f2,
      footer: { text: "Powered by Reddit | r/aww" }
    };
    if (cuteUrl.includes(".mp4")) embed.video.url = cuteUrl;

    return interaction.reply({ embeds: [embed] });
  }
};

export default AwwwCommand;