<script setup lang="ts">
import { useAppStore } from "@/stores/app";

const appStore = useAppStore();
const router = useRouter();

function saveFile() {
	appStore.writeFile();
}
</script>

<template>
	<div class="actions" v-if="appStore.configLoaded && router.currentRoute.value.path.startsWith('/config')">
		<v-btn
			icon="mdi-content-save"
			:disabled="!appStore.changed"
			@click="saveFile"
			color="primary"
		></v-btn>
	</div>
</template>

<style scoped>
.actions {
	position: fixed;
	bottom: 15px;
	right: 15px;
}
</style>
