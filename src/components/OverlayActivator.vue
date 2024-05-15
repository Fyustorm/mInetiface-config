<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { useShortcutStore } from "@/stores/shortcut";

const shortcutStore = useShortcutStore();
const appStore = useAppStore();
</script>

<template>
	<div class="overlayActions" v-if="appStore.configLoaded">
		<v-tooltip v-if="!shortcutStore.overlayActivated" :text="'Toggle overlay (' + shortcutStore.overlayShortcut + ')'">
			<template v-slot:activator="{ props }">
				<v-btn
					icon="mdi-dock-window"
					color="primary"
					v-bind="props"
					@click="shortcutStore.showOverlay"
				>
				</v-btn>
			</template>
		</v-tooltip>
		<v-tooltip v-if="shortcutStore.overlayActivated" :text="'Disable overlay'">
			<template v-slot:activator="{ props }">
				<v-btn
					icon="mdi-window-restore"
					color="primary"
					v-bind="props"
					@click="shortcutStore.disableOverlay"
					class="mr-2"
				>
				</v-btn>
			</template>
		</v-tooltip>
		<v-tooltip v-if="shortcutStore.overlayActivated" :text="'Hide overlay (' + shortcutStore.overlayShortcut + ')'">
			<template v-slot:activator="{ props }">
				<v-btn
					icon="mdi-close"
					color="error"
					v-bind="props"
					@click="shortcutStore.hideWindow"
				>
				</v-btn>
			</template>
		</v-tooltip>
	</div>
</template>

<style scoped>
.overlayActions {
	position: fixed;
	z-index: 2000;
	top: 10px;
	right: 10px;
}
</style>
