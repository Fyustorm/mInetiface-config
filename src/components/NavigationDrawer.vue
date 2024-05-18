<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { isTauri } from "@/tauri/tauri";
import { useDisplay } from "vuetify";

const appStore = useAppStore();
const drawer = ref(false);
const { mobile } = useDisplay();

const items = [
	{ title: "Config file", icon: "mdi-file", to: "/config/file" },
	{ title: "Intiface", icon: "mdi-connection", to: "/config/intiface" },
	{ title: "General", icon: "mdi-cog", to: "/config/general" },
	{ title: "Mining", icon: "mdi-pickaxe", to: "/config/mining" },
	{ title: "Attack", icon: "mdi-sword", to: "/config/attack" },
	{ title: "Experience", icon: "mdi-one-up", to: "/config/xp" },
	{
		title: "Masochist",
		icon: "mdi-heart-broken-outline",
		to: "/config/masochist",
	},
];

onMounted(() => {
	drawer.value = !mobile.value;
});
</script>

<template>
	<v-navigation-drawer
		v-model="drawer"
		:permanent="!mobile"
		:location="mobile ? 'bottom' : undefined"
	>
		<v-list>
			<v-list-item prepend-avatar="@/assets/logo.png" title="mInetiface">
			</v-list-item>
		</v-list>
		<v-divider></v-divider>
		<v-list nav>
			<v-list-item :to="'/releases'">
				<v-list-item-title>Download mod</v-list-item-title>
				<template v-slot:prepend>
					<v-icon>mdi-download</v-icon>
				</template>
			</v-list-item>
		</v-list>
		<v-divider></v-divider>
		<v-list>
			<v-list-item prepend-avatar="@/assets/logo.png" title="Config">
			</v-list-item>
		</v-list>
		<v-divider></v-divider>
		<v-list nav>
			<v-list-item
				v-for="item in items"
				:to="item.to"
				:disabled="!appStore.configLoaded && item.to !== '/config/file'"
			>
				<v-list-item-title>{{ item.title }}</v-list-item-title>
				<template v-slot:prepend>
					<v-icon>{{ item.icon }}</v-icon>
				</template>
			</v-list-item>
		</v-list>
		<template v-if="isTauri()">
			<v-divider></v-divider>
			<v-list nav>
				<v-list-item :to="'/shortcuts'">
					<v-list-item-title>Shortcuts</v-list-item-title>
					<template v-slot:prepend>
						<v-icon>mdi-keyboard</v-icon>
					</template>
				</v-list-item>
			</v-list>
		</template>
	</v-navigation-drawer>

	<v-bottom-navigation v-if="mobile" grow hide-on-scroll>
		<v-btn @click.stop="drawer = !drawer">	
			<v-icon>mdi-menu</v-icon>
			<span>Menu</span>
		</v-btn>
	</v-bottom-navigation>
</template>
