<script lang="ts" setup>
import { useReleasesStore } from "@/stores/releases";
import { useDate } from "vuetify";

const loading = ref(false);
const mcVersionFilter: Ref<string | null> = ref(null);
const modVersionFilter: Ref<string | null> = ref(null);
const loaderTypeFilter = ref("all");

const releasesStore = useReleasesStore();

if (releasesStore.releases.length === 0) {
	loadReleases();
}

async function loadReleases() {
	loading.value = true;
	try {
		await releasesStore.loadMinetifaceReleases();
	} finally {
		loading.value = false;
	}
}

const filteredReleases = computed(() => {
	return releasesStore.releases
		.filter(
			(r) =>
				mcVersionFilter.value === null ||
				r.mcVersion.toLowerCase().includes(mcVersionFilter.value)
		)
		.filter(
			(r) =>
				modVersionFilter.value === null ||
				r.modVersion.toLowerCase().includes(modVersionFilter.value)
		)
		.filter(
			(r) =>
				loaderTypeFilter.value === "all" ||
				(loaderTypeFilter.value === "fabric" && r.fabricLink !== null) ||
				(loaderTypeFilter.value === "forge" && r.forgeLink !== null)
		);
});

const mcVersions = computed(() => {
	const versions: string[] = [];
	releasesStore.releases.forEach((r) => {
		const version = r.mcVersion.toLowerCase().trim();
		if (!versions.includes(version)) {
			versions.push(version);
		}
	});
	return versions;
});

const modVersions = computed(() => {
	const versions: string[] = [];
	releasesStore.releases.forEach((r) => {
		const version = r.modVersion.toLowerCase().trim();
		if (!versions.includes(version)) {
			versions.push(version);
		}
	});
	return versions;
});

const headers = [
	{
		title: "Minecraft version",
		key: "mcVersion",
	},
	{
		title: "Mod version",
		key: "modVersion",
	},
	{
		title: "Fabric",
		key: "fabricLink",
	},
	{
		title: "Forge",
		key: "forgeLink",
	},
	{
		title: "Published at",
		key: "publishedDate",
	},
];

</script>

<template>
	<v-row>
		<v-col class="v-col-12 v-col-xl-6">
			<v-card
				><h2>Releases</h2>
				<v-btn @click="loadReleases">Refresh</v-btn>

				<div class="form-group">
					<div>Loader type</div>
					<v-radio-group v-model="loaderTypeFilter" inline>
						<v-radio label="All" value="all"></v-radio>
						<v-radio label="Fabric" value="fabric"></v-radio>
						<v-radio label="Forge" value="forge"></v-radio>
					</v-radio-group>

					<v-row>
						<v-col>
							<v-combobox
								clearable
								label="Minecraft version"
								:items="mcVersions"
								v-model="mcVersionFilter"
							></v-combobox>
						</v-col>
						<v-col>
							<v-combobox
								clearable
								label="Mod version"
								:items="modVersions"
								v-model="modVersionFilter"
							></v-combobox>
						</v-col>
					</v-row>
				</div>

				<v-data-table
					:items="filteredReleases"
					:headers="headers"
					:loading="loading"
					:sortBy="[{ key: 'publishedDate', order: 'desc' }]"
					multi-sort
				>
					<template v-slot:loading>
						<v-skeleton-loader type="table-row@10"></v-skeleton-loader>
					</template>
					<template v-slot:item.fabricLink="{ value }">
						<v-btn
							icon="mdi-download"
							:href="value"
							v-if="value !== null"
						></v-btn>
					</template>
					<template v-slot:item.forgeLink="{ value }">
						<v-btn
							icon="mdi-download"
							:href="value"
							v-if="value !== null"
						></v-btn>
					</template>
					<template v-slot:item.publishedDate="{ value }">
						{{ useDate().format(value, 'fullDate')  }}
					</template>
				</v-data-table>
			</v-card>
		</v-col>
	</v-row>
</template>
