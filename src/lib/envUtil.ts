import { browser } from '$app/env';
import dotenv from 'dotenv';

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
		return process.env[name];
	}
}

export default EnvUtil.getInstance();
