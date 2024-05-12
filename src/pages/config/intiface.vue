<script lang="ts" setup>
import { useAppStore } from "@/stores/app";

const appStore = useAppStore();
const config = appStore.config;
</script>

<template>
	<v-row>
		<v-col class="v-col-12 v-col-md-6">
			<v-card>
				<h2>Intiface</h2>
				<div>Intiface server URL</div>
				<v-text-field v-model="config.serverUrl"></v-text-field>
			</v-card>
		</v-col>
		<v-col class="v-col-12 v-col-xl-6">
			<v-card>
				<h2>Linear devices</h2>
				<div class="form-group">
					<div>Time per full range (ms)</div>
					<RangeSlider
						v-model:minValue="config.fullMinTime"
						v-model:maxValue="config.fullMaxTime"
						:min="100"
						:max="5000"
						:step="10"
					></RangeSlider>
				</div>
			</v-card>
		</v-col>
	</v-row>
</template>
