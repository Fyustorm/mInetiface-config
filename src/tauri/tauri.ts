function isTauri() {
	return window.__TAURI_METADATA__ !== undefined;
}

export { isTauri };
