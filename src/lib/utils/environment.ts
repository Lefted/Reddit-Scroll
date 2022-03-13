import { browser } from '$app/env';
import { getLogger } from '$utils/logging';
import dotenv from 'dotenv';

const logger = getLogger('env');

class EnvUtil {
	static instance: EnvUtil;

	constructor() {
		if (!browser) {
			dotenv.config();
		}
	}

	static getInstance(): EnvUtil {
		if (!EnvUtil.instance) {
			EnvUtil.instance = new EnvUtil();
		}
		return EnvUtil.instance;
	}

	env(name: string) {
		if (browser) return undefined;
		const value = process.env[name];

		if (!value) {
			logger.error(`Environment variable ${name} is not set`);
			throw new Error(`Environment variable ${name} is not set`);
		}

		return process.env[name];
	}
}

export default EnvUtil.getInstance();
