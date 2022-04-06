/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	import type { user } from "@prisma/client";

	interface Locals {
		user: user;
	}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}
