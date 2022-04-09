// decrypting, encrypting, hashing, salting util
import type { CipherKey } from "crypto";
import { createDecipheriv, randomBytes, scryptSync, timingSafeEqual } from "crypto";

export function encryptString(key: CipherKey, iv: string, data: string) {
	const cipher = createDecipheriv("aes256", key, iv);
	return cipher.update(data, "utf8", "hex") + cipher.final("hex");
}

export function decryptString(keyBuffer: CipherKey, iv: string, data: string) {
	const decipher = createDecipheriv("aes256", keyBuffer, iv);
	return decipher.update(data, "hex", "utf8") + decipher.final("utf8");
}

export function hashString(password: string, salt: string) {
	return scryptSync(password, salt, 64).toString("hex");
}

export function checkInputWithHash(input: string, hash: string, salt: string) {
	const inputBuffer = scryptSync(input, salt, 64);
	const savedBuffer = Buffer.from(hash, "hex");
	return timingSafeEqual(inputBuffer, savedBuffer);
}

export function newInitializationVector() {
	return randomBytes(16).toString("hex");
}

export function newSalt() {
	return randomBytes(16).toString("hex");
}
