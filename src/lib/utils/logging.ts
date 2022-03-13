
class Logger {
	prefix: string;
	static currentGroup: string;

	constructor(prefix: string) {
		this.prefix = prefix;
	}

	info(message: string) {
		console.info(`[${this.prefix}] ${message}`);
	}

	error(message: string) {
		console.error(`[${this.prefix}] ${message}`);
	}

	warn(message: string) {
		console.warn(`[${this.prefix}] ${message}`);
	}

	debug(message: string) {
		console.debug(`[${this.prefix}] ${message}`);
	}

	startGroup() {
		if (Logger.currentGroup !== this.prefix) {
			console.groupEnd();
			console.group(this.prefix);
			Logger.currentGroup = this.prefix;
		}
		return this;
	}
}

export function getLogger(prefix: string) {
	return new Logger(prefix);
}