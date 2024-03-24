import * as cdn from "./CDN.js";

/**
 * Gets the user tag, which includes the username and discriminator.
 * @param {object} user - The user data object.
 * @param {string} user.username - The username of the user.
 * @param {string} user.discriminator - The discriminator of the user.
 * @returns {?string} The user tag, or null if the user's username is not a string.
 */
export function getUserTag(user) {
  if (typeof user.username !== "string") return null;
  return user.discriminator === "0" ? user.username : `${user.username}#${user.discriminator}`;
}

/**
 * Gets the URL of the user's avatar to display.
 * If the user has an avatar, it returns the URL of the avatar; otherwise, it returns the URL of the default avatar.
 * @param {object} user - The user data object.
 * @param {string} user.id - The ID of the user.
 * @param {?string} user.avatar - The avatar hash of the user, or null if the user does not have an avatar.
 * @param {string} user.discriminator - The discriminator of the user.
 * @param {object} [options={}] - Optional parameters for the avatar URL.
 * @returns {string} The URL of the user's avatar to display.
 */
export function displayUserAvatarURL(user, options = {}) {
  return user.avatar ?
    cdn.avatar(user.id, user.avatar, options) :
    cdn.defaultAvatar(user.id, user.discriminator, options);
}

/**
 * Gets the URL of the member's avatar within a guild to display.
 * If the member has an avatar in the guild, it returns the URL of the avatar; otherwise, it returns null.
 * @param {object} member - The member data object.
 * @param {string} member.id - The ID of the member.
 * @param {?string} member.avatar - The avatar hash of the member, or null if the member does not have an avatar.
 * @param {object} [options={}] - Optional parameters for the avatar URL.
 * @param {string} guildId - The ID of the guild the member belongs to.
 * @returns {?string} The URL of the member's avatar to display, or null if the member does not have an avatar.
 */
export function displayMemberAvatarURL(member, guildId, options = {}) {
  return member.avatar ?
    cdn.guildMemberAvatar(guildId, member.id, member.avatar, options) :
    null;
}

/**
 * Gets the URL of the avatar to display for a user or member.
 * If the member has an avatar in the guild, it returns the URL of the member's avatar;
 * otherwise, it returns the URL of the user's avatar.
 * @param {object} member - The member object.
 * @param {string} member.id - The ID of the member.
 * @param {?string} member.avatar - The avatar hash of the member, or null if the member does not have an avatar.
 * @param {string} guildId - The ID of the guild the member belongs to.
 * @param {object} user - The user data object.
 * @param {string} user.id - The ID of the user.
 * @param {?string} user.avatar - The avatar hash of the user, or null if the user does not have an avatar.
 * @param {string} user.discriminator - The discriminator of the user.
 * @param {object} [options={}] - Optional parameters for the avatar URL.
 * @returns {string} The URL of the avatar to display.
 */
export function displayAvatarURL(member, guildId, user, options = {}) {
  return member.avatar ?
    displayMemberAvatarURL(member, guildId, options) :
    displayUserAvatarURL(user, options);
}

/**
 * Gets the display name of a user or member.
 * If the member has a nickname in the guild, it returns the nickname;
 * otherwise, it returns the global name or username of the user.
 * @param {object} user - The user object.
 * @param {?string} user.global_name - The global name of the user.
 * @param {string} user.username - The username of the user.
 * @param {?object} member - The member object.
 * @param {?string} member.nick - The nickname of the member in the guild, or null if not set.
 * @returns {string} The display name of the user or member.
 */
export function getDisplayName(user, member) {
  return member?.nick ?? user.global_name ?? user.username;
}

/**
 * Formats a user id into a user mention.
 * @param {string} userId - The user id to format
 * @returns {string} The mentioncfor the user.
 */
export function userMention(userId) {
  return `<@${userId}>`;
}