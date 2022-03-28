// decrypt a string using a key
import { createDecipheriv } from "crypto";
import type { CipherKey, BinaryLike } from "crypto";

const INITIALIZATION_VECTOR = import.meta.env.VITE_INITIALIZATION_VECTOR as string;

const ivBuffer: BinaryLike = Buffer.from(INITIALIZATION_VECTOR, "hex");
let savedKey: CipherKey;

export async function decryptString(
	message: string,
	keyBuffer: CipherKey = savedKey
): Promise<string> {
	const decipher = createDecipheriv("aes256", keyBuffer, ivBuffer);
	const decryptedMessage = decipher.update(message, "hex", "utf8") + decipher.final("utf8");
	return decryptedMessage;
}

export function saveKey(key: CipherKey) {
	savedKey = key;
}

export function isUnlocked() {
	return !!savedKey;
}
