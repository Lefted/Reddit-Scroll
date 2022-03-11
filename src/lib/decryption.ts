// decrypt a string using a key
import EnvUtil from '$lib/envUtil';
import { createDecipheriv } from 'crypto';

const INITIALIZATION_VECTOR = EnvUtil.env('INITIALIZATION_VECTOR');

if (!INITIALIZATION_VECTOR) {
	throw new Error('INITIALIZATION_VECTOR environment variable is not set');
}

const ivBuffer = Buffer.from(INITIALIZATION_VECTOR, 'hex');

export default async function decryptString(message, keyBuffer): Promise<string> {
	const decipher = createDecipheriv('aes256', keyBuffer, ivBuffer);
	const decryptedMessage = decipher.update(message, 'hex', 'utf8') + decipher.final('utf8');
	return decryptedMessage;
}
