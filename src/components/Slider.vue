<script setup lang="ts">
import { useDisplay } from "vuetify";

defineProps({
	min: Number,
	max: Number,
	step: Number,
});

const value = defineModel<number>({ required: true });

const { mobile } = useDisplay();
</script>

<template>
	<v-slider
		:min="min"
		:max="max"
		:step="step"
		v-model="value"
		hide-details
		:thumb-label="mobile ? 'always' : false"
		:class="mobile ? 'mt-8' : undefined"
	>
		<template v-slot:prepend v-if="!mobile">
			<div class="d-flex flex-column justify-end align-center">
				<v-text-field
					v-model.number="value"
					:step="step"
					style="width: 90px"
					type="number"
					variant="outlined"
					hide-details
					single-line
				></v-text-field>
			</div>
		</template>
	</v-slider>
</template>
