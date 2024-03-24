import { Router } from "itty-router";
import { InteractionType, verifyDiscordRequest } from "./discord";
import commands from "./commands";

const app = Router();

// test
app.get("/", (_req, env) => {
  return new Response(`👋 ${env.DISCORD_APPLICATION_ID}`);
});

// main route 
app.post("/", async (request, env, context) => {

  const { isValid, interaction } = await verifyDiscordRequest(request, env);

  if (!isValid || !interaction) {
    return new Response("Bad request signature.", { status: 401 });
  }

  if (interaction.type === InteractionType.PING) {
    return interaction.pong();
  }

  if (interaction.type !== InteractionType.APPLICATION_COMMAND) {
    console.error("Unknown Type");
    return interaction.error();
  }

  const commandName = interaction.data.name.toLowerCase();

  try {
    const command = commands.find((cmd) => cmd.data.name === commandName);
    return await command.execute(interaction, context);
  } catch (error) {
    console.error(error);
    return interaction.error();
  }
});


// register commands globally
app.get("/register/global", async (_req, env) => {
  const token = env.DISCORD_TOKEN;
  const applicationId = env.DISCORD_APPLICATION_ID;
  const url = `https://discord.com/api/v10/applications/${applicationId}/commands`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${token}`,
    },
    method: "PUT",
    body: JSON.stringify(commands.map(c => c.data)),
  });

  const res = await response.json();
  const data = JSON.stringify(res, null, 2)
  console.log(data);

  return new Response(response.ok ?
    `Registered all commands: \n${data}` : `Error registering commands: \n${data}`
  );
});

// for all route 
app.all("*", () => new Response("Not Found.", { status: 404 }));

// important stuff
const server = {
  verifyDiscordRequest,
  fetch: (...args) => app.fetch(...args)
};

export default server;