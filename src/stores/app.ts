// Utilities
import { isTauri } from "@/tauri/tauri";
import { invoke } from "@tauri-apps/api";
import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { defineStore } from "pinia";

export const useAppStore = defineStore(
	"app",
	() => {
		const confPath = ref("");

		const config: MinetifaceConf = reactive({
			serverUrl: "127.0.0.1:12345",
			minimumFeedback: 1,
			maximumFeedback: 30,
			maximumScore: 80,
			feedbackScoreLostPerTick: 2,
			scoreLostPerTick: 0.05,
			maximumSecondsKeepScore: 30,
			fullMaxTime: 5000,
			fullMinTime: 100,
			masochistEnabled: true,
			masochistMultiplier: 1,
			masochistInstantPointsMultiplier: 1,
			masochistDurationMultiplier: 1,
			xpEnabled: true,
			xpMultiplier: 1,
			xpInstantPointsMultiplier: 1,
			xpDurationMultiplier: 1,
			miningEnabled: true,
			minePointsMultiplier: 1,
			mineInstantPointsMultiplier: 1,
			mineDurationMultiplier: 1,
			blocksScore: undefined,
			defaultBlockScore: 1,
			attackEnabled: true,
			attackMultiplier: 1,
			attackInstantPointsMultiplier: 1,
			attackDurationMultiplier: 1,
		});

		const configLoaded = ref(false);

		const savedConfig = ref({});

		async function loadConfig(path: string) {
			let contents = await readTextFile(path);

			const conf = <MinetifaceConf>JSON.parse(contents);
			if (conf === null) {
				return;
			}

			Object.assign(config, conf);
			saveConfigState();
			configLoaded.value = true;
			confPath.value = path;
		}

		function discardConfig() {
			confPath.value = "";
			configLoaded.value = false;
		}

		function saveConfigState() {
			Object.assign(savedConfig.value, config);
		}

		const changed = computed(() => {
			return JSON.stringify(savedConfig.value) !== JSON.stringify(config);
		});

		function writeFile() {
			writeTextFile(confPath.value, JSON.stringify(config, null, "\t"));
			saveConfigState();
		}

		if (!isTauri()) {
			configLoaded.value = true;
		}

		return {
			config,
			configLoaded,
			saveConfigState,
			changed,
			confPath,
			writeFile,
			loadConfig,
			discardConfig,
		};
	},
	{
		persist: {
			paths: ['confPath'],
			afterRestore: (ctx) => {
				if (ctx.store.confPath === '') {
					return;
				}
				invoke("expand_scope", { filePath: ctx.store.confPath });
				ctx.store.loadConfig(ctx.store.confPath);
			}
		},
	}
);
