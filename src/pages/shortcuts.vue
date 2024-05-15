<script lang="ts" setup>
import { useShortcutStore } from "@/stores/shortcut";

const shortcutStore = useShortcutStore();

async function initShortcut() {
	try {
		await shortcutStore.initShortcut();
	} catch (e) {
		return 'Invalid shortcut';
	}
	return true;
}

const rules: any[] = [];
rules.push(initShortcut);
</script>

<template>
	<v-row>
		<v-col class="v-col-12 v-col-md-6">
			<v-card>
				<h2>Shortcuts</h2>
				<v-form>
					<div>Toggle overlay</div>
					<v-text-field v-model="shortcutStore.overlayShortcut" :rules="rules"></v-text-field>
				</v-form>
			</v-card>
		</v-col>
	</v-row>
</template>
