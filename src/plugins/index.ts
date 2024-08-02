/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from "./vuetify";
import pinia from "../stores";
import router from "../router/router";
import VueMatomo  from "vue-matomo";

// Types
import type { App } from "vue";

export function registerPlugins(app: App) {
	const matomoOptions = {
		host: 'https://matomo.fyustorm.ovh/',
  		siteId: 1,
		router: router,
		
	};
	app.use(vuetify).use(router).use(pinia).use(VueMatomo, matomoOptions);
}
