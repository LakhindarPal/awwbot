import Interaction from "./Interaction.js";

export async function verifyDiscordRequest(request, env) {
  const signature = request.headers.get("x-signature-ed25519");
  const timestamp = request.headers.get("x-signature-timestamp");
  const publicKey = env.DISCORD_PUBLIC_KEY;
  const body = await request.text();

  if (!signature || !timestamp || !publicKey) {
    return { isValid: false };
  }

  try {
    const timestampData = new TextEncoder().encode(timestamp);
    const bodyData = new TextEncoder().encode(body);
    const message = new Uint8Array([...timestampData, ...bodyData]);

    // function to convert hex String To Uint8Array
    const hexToUint8Array = (hexString) => new Uint8Array(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));

    const signatureData = hexToUint8Array(signature);
    const publicKeyData = hexToUint8Array(publicKey);

    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      publicKeyData,
      {
        name: "NODE-ED25519",
        namedCurve: "NODE-ED25519",
      },
      false,
      ["verify"],
    );

    const isValid = await crypto.subtle.verify(
      "NODE-ED25519",
      await cryptoKey,
      signatureData,
      message
    );

    if (!isValid) {
      return { isValid: false };
    }

    const data = JSON.parse(body);
    const interaction = new Interaction(data);

    return { interaction, isValid: true };
  }
  catch (ex) {
    console.error("Error during signature verification:", ex);
    return { isValid: false };
  }
}