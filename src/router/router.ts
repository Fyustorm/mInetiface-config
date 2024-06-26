import Attack from "@/pages/config/attack.vue";
import General from "@/pages/config/general.vue";
import Intiface from "@/pages/config/intiface.vue";
import Masochist from "@/pages/config/masochist.vue";
import Mining from "@/pages/config/mining.vue";
import Xp from "@/pages/config/xp.vue";
import ConfigFile from "@/pages/config/file.vue";
import Releases from "@/pages/releases.vue";
import Shortcuts from "@/pages/shortcuts.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{ path: "/", redirect: '/releases' },
	{ path: "/config/file", component: ConfigFile },
	{ path: "/config/intiface", component: Intiface },
	{ path: "/config/attack", component: Attack },
	{ path: "/config/general", component: General },
	{ path: "/config/masochist", component: Masochist },
	{ path: "/config/mining", component: Mining },
	{ path: "/config/xp", component: Xp },
	{ path: "/shortcuts", component: Shortcuts },
	{ path: "/releases", component: Releases },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
