<script lang="ts" setup>
import { useAppStore } from "@/stores/app";

const appStore = useAppStore();
const config = appStore.config;
</script>

<template>
	<v-row>
		<v-col class="v-col-12 v-col-xl-6">
			<v-card class="pb-8">
				<h2>Feedback</h2>
				<div class="form-group">
					<div>Intensity (%)</div>
					<RangeSlider
						v-model:minValue="config.minimumFeedback"
						v-model:maxValue="config.maximumFeedback"
						:min="0"
						:max="100"
						:step="1"
					></RangeSlider>
				</div>

				<div class="form-group mt-4">
					<div>Intensity lost per tick (20 ticks/s)</div>
					<Slider
						:min="0.1"
						:max="20"
						:step="0.1"
						v-model="config.feedbackScoreLostPerTick"
						hide-details
					></Slider>
				</div>
			</v-card>
		</v-col>
		<v-col class="v-col-12 v-col-xl-6">
			<v-card class="pb-8">
				<h2>Score</h2>
				<div class="form-group">
					<div>Score lost per tick (20 ticks/s)</div>
					<Slider
						:min="0.001"
						:max="1"
						:step="0.001"
						v-model="config.scoreLostPerTick"
						hide-details
					></Slider>
				</div>
			</v-card>
		</v-col>
	</v-row>
</template>
