// Utilities
import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
	const confPath = ref("");

	const config: MinetifaceConf = reactive({
		serverUrl: "",
		minimumFeedback: 0,
		maximumFeedback: 0,
		maximumScore: 0,
		feedbackScoreLostPerTick: 0,
		scoreLostPerTick: 0,
		maximumSecondsKeepScore: 0,
		fullMaxTime: 0,
		fullMinTime: 0,
		masochistEnabled: false,
		masochistMultiplier: 0,
		masochistInstantPointsMultiplier: 0,
		masochistDurationMultiplier: 0,
		xpEnabled: false,
		xpMultiplier: 0,
		xpInstantPointsMultiplier: 0,
		xpDurationMultiplier: 0,
		miningEnabled: false,
		minePointsMultiplier: 0,
		mineInstantPointsMultiplier: 0,
		mineDurationMultiplier: 0,
		blocksScore: undefined,
		defaultBlockScore: 0,
		attackEnabled: false,
		attackMultiplier: 0,
		attackInstantPointsMultiplier: 0,
		attackDurationMultiplier: 0,
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
		confPath.value = '';
		configLoaded.value = false;
	}

	function saveConfigState() {
		Object.assign(savedConfig.value, config);
	}

	const changed = computed(() => {
		console.log(config);
		return JSON.stringify(savedConfig.value) !== JSON.stringify(config);
	});

	function writeFile() {
		writeTextFile(confPath.value, JSON.stringify(config, null, "\t"));
		saveConfigState();
	}

	return { config, configLoaded, saveConfigState, changed, path: confPath, writeFile, loadConfig, discardConfig };
});
