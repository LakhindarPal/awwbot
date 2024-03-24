import { InteractionResponseType, ApplicationCommandOptionType } from "./types.js";

class JsonResponse extends Response {
  constructor(body, init) {
    const jsonBody = JSON.stringify(body);
    init = init || {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    };
    super(jsonBody, init);
  }
};

class JsonRequest extends Request {
  constructor(url, data, method) {
    const options = {
      method,
      headers: {
        "User-Agent": "DiscordBot (https://awwbot.web.app, v10)",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data),
    };
    super(url, options);
  }
}

export default class Interaction {
  constructor(raw) {
    Object.assign(this, raw);
    this._group = null;
    this._subcommand = null;
    this._hoistedOptions = this.data.options ?? [];
    this._resolvedOptions = this.data.resolved ?? [];

    // Hoist subcommand group if present
    if (this._hoistedOptions[0]?.type === ApplicationCommandOptionType.SubcommandGroup) {
      this._group = this._hoistedOptions[0].name;
      this._hoistedOptions = this._hoistedOptions[0].options ?? [];
    }
    // Hoist subcommand if present
    if (this._hoistedOptions[0]?.type === ApplicationCommandOptionType.Subcommand) {
      this._subcommand = this._hoistedOptions[0].name;
      this._hoistedOptions = this._hoistedOptions[0].options ?? [];
    }
  }

  /**
   * Gets an option by its name.
   * @param {string} name The name of the option.
   * @returns {?} The option, if found.
   */
  getOption(name) {
    const option = this._hoistedOptions.find(opt => opt.name === name);
    return option?.value;
  }

  /**
   * Gets an resolved option by its nameand type.
   * @param {string} name - The name of the option.
   * @param {'members' | 'users' | 'channels' | 'role' | 'attachments' | 'mentionables'} type - The type of the option.
   * @returns {?} The option, if found.
   */
  getResolvedOption(name, type) {
    const option = this.getOption(name);
    if (!option) return null;
    return this._resolvedOptions?.[type]?.[option];
  }

  /**
   * Gets the selected subcommand.
   * @returns {?string} The name of the selected subcommand, or null if not set and not required.
   */
  getSubcommand() {
    return this._subcommand;
  }

  /**
   * Gets the selected subcommand group.
   * @returns {?string} The name of the selected subcommand group, or null if not set and not required.
   */
  getSubcommandGroup() {
    return this._group;
  }

  pong() {
    return new JsonResponse({
      type: InteractionResponseType.PONG,
    })
  }

  /**
   * Replies to an interaction.
   * @param {object} data - The data for replying.
   * @param {string} [data.content] - The content of the reply.
   * @param {object[]} [data.embeds] - An array of embed objects.
   * @param {object[]} [data.components] - An array of component objects.
   * @param {object} [data.flags] - Flags for the reply.
   * @returns {JsonResponse} - A JSON response object.
   */
  reply({ content, embeds, components, flags } = {}) {
    return new JsonResponse({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content, embeds, components, flags }
    });
  }

  /**
   * Defers replying to an interaction.
   * @param {object} [options] - The options for replying.
   * @param {object} [options.flags] - Flags for the deferred reply.
   * @returns {JsonResponse} - A JSON response object.
   */
  deferReply({ flags } = {}) {
    return new JsonResponse({
      type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
      data: { flags }
    });
  };

  /**
   * Edits the initial reply to an interaction.
   * @param {object} data - The data for editing the reply.
   * @param {string} [data.content] - The new content of the reply.
   * @param {object[]} [data.embeds] - An array of updated embed objects.
   * @param {object[]} [data.components] - An array of updated component objects.
   * @returns {Request} - A request object.
   */
  async editReply(data) {
    const endpointUrl = `https://discord.com/api/v10/webhooks/${this.application_id}/${this.token}/messages/@original`;

    const request = new JsonRequest(endpointUrl, data, "PATCH");

    return await fetch(request);
  }

  /**
   * Send a follow-up reply to an interaction.
   * @param {object} data - The data for editing the reply.
   * @param {string} [data.content] - The new content of the reply.
   * @param {object[]} [data.embeds] - An array of updated embed objects.
   * @param {object[]} [data.components] - An array of updated component objects.
   * @returns {Request} - A request object.
   */
  async followUp(data) {
    const endpointUrl = `https://discord.com/api/v10/webhooks/${this.application_id}/${this.token}`;

    const request = new JsonRequest(endpointUrl, data, "POST");

    return await fetch(request);
  }

  error() {
    return new JsonResponse({ error: "Unknown Type" }, { status: 400 });
  }
}