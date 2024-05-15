<script lang="ts" setup>
import { useAppStore } from "@/stores/app";
import { open } from "@tauri-apps/api/dialog";

const appStore = useAppStore();

async function openConfig() {
	// Open a selection dialog for image files
	const selected = await open({
		multiple: false,
		filters: [
			{
				name: "Config",
				extensions: ["config"],
			},
		],
	});

	if (selected === null || Array.isArray(selected)) {
		return;
	}

	appStore.loadConfig(selected);
}
</script>

<template>
	<v-row>
		<v-col class="v-col-12 v-col-xl-6">
			<v-card
				><h2>Config file</h2>

				<v-alert type="info" class="mt-2">
					<template #text>
						The <b>minetiface.config</b> is created the first time you launch
						your game and should be located in
						<b>{minecraft_folder}/config/minetiface.config</b>
					</template>
				</v-alert>
				<v-btn @click="openConfig" class="mt-4">Load config file</v-btn>

				<div class="field-group mt-4" v-if="appStore.confPath !== ''">
					<div class="text-h6">Current file</div>
					<div class="text-body-1">{{ appStore.confPath }}</div>
				</div>
			</v-card>
		</v-col>
	</v-row>
</template>
