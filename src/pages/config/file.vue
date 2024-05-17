<script lang="ts" setup>
import { useAppStore } from "@/stores/app";
import { isTauri } from "@/tauri/tauri";
import { open } from "@tauri-apps/api/dialog";
import { VTextarea } from "vuetify/components/VTextarea";

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

const configTextarea : Ref<VTextarea|null> = ref(null);
function copy() {
	if (configTextarea.value === null) {
		return;
	}

	navigator.clipboard.writeText(configTextarea.value.value);
}

onMounted(() => {
	if (configTextarea.value === null) {
		return;
	}
});
</script>

<template>
	<v-row>
		<v-col class="v-col-12 v-col-xl-6">
			<v-card
				><h2>Config file</h2>

				<template v-if="isTauri()">
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
				</template>
				<template v-if="!isTauri()">
					<v-alert type="info" class="mt-2">
						<template #text>
							<a href="https://github.com/Fyustorm/mInetiface-config"
								><v-btn class="mr-1">Download</v-btn></a
							>
							<b>mInetiface config editor</b> to modify your config file
							directly ingame
						</template>
					</v-alert>
				</template>
				<v-textarea
					variant="outlined"
					class="mt-6"
					rows="25"
					hide-details
					:value="JSON.stringify(appStore.config, null, 4)"
					readonly
					auto-grow
					ref="configTextarea"
				></v-textarea>
				<v-btn class="mt-2" @click="copy">COPY</v-btn>
			</v-card>
		</v-col>
	</v-row>
</template>
