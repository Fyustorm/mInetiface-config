// Utilities
import { isRegistered, register, unregister } from "@tauri-apps/api/globalShortcut";
import { WebviewWindow } from "@tauri-apps/api/window";
import { defineStore } from "pinia";
import { useAppStore } from "./app";
import { isTauri } from "@/tauri/tauri";

export const useShortcutStore = defineStore(
	"shortcut",
	() => {
		const overlayShortcut = ref("Ctrl+F12");
		const lastOverlayShortcut = ref("");
		const overlayActivated = ref(false);
		const appStore = useAppStore();

		async function initShortcut() {
			const mainWindow = WebviewWindow.getByLabel("main");

			if (await isRegistered(overlayShortcut.value)) {
				await unregister(overlayShortcut.value);
			}

			if (lastOverlayShortcut.value !== '' && await isRegistered(lastOverlayShortcut.value)) {
				await unregister(lastOverlayShortcut.value);
			}

			lastOverlayShortcut.value = overlayShortcut.value;

			return await register(overlayShortcut.value, async (_shortcut) => {
				if (await mainWindow?.isVisible()) {
					hideWindow();
				} else {
					showOverlay();
				}
			});
		}

		async function showOverlay() {
			const mainWindow = WebviewWindow.getByLabel("main");

			if (mainWindow === null) {
				return;
			}
			overlayActivated.value = true;

			const root = getThemeDiv();
			
			root.style.setProperty("--v-theme-background", "transparent");

			await mainWindow.setFullscreen(true);
			await mainWindow.setDecorations(false);
			await mainWindow.setAlwaysOnTop(true);
			await mainWindow.show();
		}

		async function disableOverlay() {
			const mainWindow = WebviewWindow.getByLabel("main");

			if (mainWindow === null) {
				return;
			}
			overlayActivated.value = false;

			const root = getThemeDiv();
			root.style.setProperty("--v-theme-background", "");

			await mainWindow.setDecorations(true);
			await mainWindow.setFullscreen(false);
			await mainWindow.setAlwaysOnTop(false);
		}

		function hideWindow() {
			const mainWindow = WebviewWindow.getByLabel("main");

			if (mainWindow === null) {
				return;
			}

			mainWindow.hide();
			appStore.writeFile();
		}

		function getThemeDiv(): HTMLDivElement {
			const root = document.querySelector(
				"[class*='v-theme']"
			) as HTMLDivElement;
			return root;
		}

		if (isTauri()) {
			initShortcut();
		}

		return { overlayShortcut, hideWindow, showOverlay, initShortcut, disableOverlay, overlayActivated };
	},
	{ persist: true }
);
