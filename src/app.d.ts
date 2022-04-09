/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	interface Locals {
		username: string;
	}
	// interface Platform {}
	interface Session {
		username: string;
	}
	// interface Stuff {}
}
