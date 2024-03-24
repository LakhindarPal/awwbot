const ALLOWED_EXTENSIONS = ["webp", "png", "jpg", "jpeg", "gif"];
const ALLOWED_STICKER_EXTENSIONS = ["png", "json", "gif"];
const ALLOWED_SIZES = [16, 32, 64, 128, 256, 512, 1_024, 2_048, 4_096];
const base = "https://cdn.discordapp.com";

export function appAsset(clientId, assetHash, options) {
  return makeURL(`/app-assets/${clientId}/${assetHash}`, options);
}

export function appIcon(clientId, iconHash, options) {
  return makeURL(`/app-icons/${clientId}/${iconHash}`, options);
}

export function avatar(id, avatarHash, options) {
  return dynamicMakeURL(`/avatars/${id}/${avatarHash}`, avatarHash, options);
}

export function avatarDecoration(userId, userAvatarDecoration, options) {
  return makeURL(`/avatar-decorations/${userId}/${userAvatarDecoration}`, options);
}

export function defaultAvatar(userId, discriminator, { size }) {
  const index = discriminator === "0" ? Number(BigInt(userId) >> 22n) % 6 : discriminator % 5;
  return makeURL(`/embed/avatars/${index}`, { extension: "png", size });
}

export function banner(id, bannerHash, options) {
  return dynamicMakeURL(`/banners/${id}/${bannerHash}`, bannerHash, options);
}

export function channelIcon(channelId, iconHash, options) {
  return makeURL(`/channel-icons/${channelId}/${iconHash}`, options);
}

export function discoverySplash(guildId, splashHash, options) {
  return makeURL(`/discovery-splashes/${guildId}/${splashHash}`, options);
}

export function emoji(emojiId, options) {
  return makeURL(`/emojis/${emojiId}`, options);
}

export function guildMemberAvatar(guildId, userId, avatarHash, options) {
  return dynamicMakeURL(`/guilds/${guildId}/users/${userId}/avatars/${avatarHash}`, avatarHash, options);
}

export function guildMemberBanner(guildId, userId, bannerHash, options) {
  return dynamicMakeURL(`/guilds/${guildId}/users/${userId}/banner`, bannerHash, options);
}

export function icon(id, iconHash, options) {
  return dynamicMakeURL(`/icons/${id}/${iconHash}`, iconHash, options);
}

export function roleIcon(roleId, roleIconHash, options) {
  return makeURL(`/role-icons/${roleId}/${roleIconHash}`, options);
}

export function splash(guildId, splashHash, options) {
  return makeURL(`/splashes/${guildId}/${splashHash}`, options);
}

export function sticker(stickerId, extension = "png") {
  return makeURL(`/stickers/${stickerId}`, { allowedExtensions: ALLOWED_STICKER_EXTENSIONS, extension });
}

export function stickerPackBanner(bannerId, options) {
  return makeURL(`/app-assets/710982414301790216/store/${bannerId}`, options);
}

export function teamIcon(teamId, iconHash, options) {
  return makeURL(`/team-icons/${teamId}/${iconHash}`, options);
}

export function guildScheduledEventCover(scheduledEventId, coverHash, options) {
  return makeURL(`/guild-events/${scheduledEventId}/${coverHash}`, options);
}

function dynamicMakeURL(route, hash, { forceStatic = false, ...options } = {}) {
  return makeURL(
    route,
    !forceStatic && hash.startsWith("a_") ? { ...options, extension: "gif" } : options
  );
}

function makeURL(route, { allowedExtensions = ALLOWED_EXTENSIONS, extension = "webp", size } = {}) {
  extension = String(extension).toLowerCase();

  if (!allowedExtensions.includes(extension)) {
    throw new RangeError(
      `Invalid extension provided: ${extension}\nMust be one of: ${allowedExtensions.join(", ")}`
    );
  }

  if (size && !ALLOWED_SIZES.includes(size)) {
    throw new RangeError(`Invalid size provided: ${size}\nMust be one of: ${ALLOWED_SIZES.join(", ")}`);
  }

  const url = new URL(`${base}${route}.${extension}`);

  if (size) {
    url.searchParams.set("size", String(size));
  }

  return url.toString();
}