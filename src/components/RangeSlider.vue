<script setup lang="ts">
import { useDisplay } from "vuetify";

defineProps({
	min: Number,
	max: Number,
	step: Number,
});

const minValue = defineModel<number>("minValue", { required: true });
const maxValue = defineModel<number>("maxValue", { required: true });

const rangeModel: Ref<[number, number]> = ref([minValue.value, maxValue.value]);

const { mobile } = useDisplay();

function sliderChanged(value: [number, number]) {
	minValue.value = value[0];
	maxValue.value = value[1];
}
</script>

<template>
	<v-range-slider
		:min="min"
		:max="max"
		:step="step"
		v-model="rangeModel"
		@update:modelValue="sliderChanged"
		hide-details
		:thumb-label="mobile ? 'always' : false"
		:class="mobile ? 'mt-8' : undefined"
	>
		<template v-slot:default>
			<div>Hello</div>
		</template>
		<template v-slot:prepend>
			<div class="d-flex flex-column justify-end align-center" v-if="!mobile">
				<v-text-field
					v-model.number="minValue"
					:step="step"
					style="width: 90px"
					type="number"
					variant="outlined"
					hide-details
					single-line
				>
					<template v-slot:append-inner>
						<div class="range-slider-textbox-title">Min</div>
					</template></v-text-field
				>
			</div>
		</template>
		<template v-slot:append v-if="!mobile">
			<v-text-field
				v-model.number="maxValue"
				:step="step"
				style="width: 90px"
				type="number"
				variant="outlined"
				hide-details
				single-line
			>
				<template v-slot:append-inner>
					<div class="range-slider-textbox-title">Max</div>
				</template>
			</v-text-field>
		</template>
	</v-range-slider>
</template>

<style lang="scss" scoped>
.range-slider-textbox-title {
	position: absolute;
	bottom: -1.5em;
	left: 0;
	right: 0;
	margin-left: auto;
	margin-right: auto;
	width: 80px;
	text-align: center;
	font-size: 0.8em;
}
</style>
