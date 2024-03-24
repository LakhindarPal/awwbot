const PingCommand = {
  data: {
    name: "ping",
    description: "Ping? Pong!",
  },
  execute(interaction) {
    return interaction.reply({ content: "🏓 Pong!" });
  }
};

export default PingCommand;