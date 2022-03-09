import { browser } from '$app/env';
import dotenv from 'dotenv';

class EnvUtil {
	static instance;

	constructor() {
		if (!browser) {
			dotenv.config();
		}
	}

	static getInstance() {
		if (!EnvUtil.instance) {
			EnvUtil.instance = new EnvUtil();
		}
		return EnvUtil.instance;
	}

	env(name) {
		if (browser) return undefined;
		return process.env[name];
	}
}

export default EnvUtil.getInstance();
