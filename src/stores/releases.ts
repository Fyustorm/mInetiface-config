// Utilities
import { ReleaseDTO } from "@/releases/releaseDTO";
import { fetch } from "@tauri-apps/api/http";
import { defineStore } from "pinia";

export const useReleasesStore = defineStore(
	"releases",
	() => {
		const releases: Ref<Release[]> = ref([]);

		async function loadMinetifaceReleases() {
			releases.value.splice(0);

			let page = 1;
			let hasMore = false;

			do {
				const releasesResp = await fetch<ReleaseDTO[]>(
					`https://api.github.com/repos/Fyustorm/minetiface/releases?page=${page}&per_page=100`,
					{
						method: "GET",

						headers: {
							"User-Agent": "Tauri",
							"Content-Type": "application/json; charset=utf-8",
						},
					}
				);

				if (!releasesResp.ok) {
					return;
				}

				const releasesDTO = releasesResp.data;
				for (const releaseDTO of releasesDTO) {
					const release: Release = {
						modVersion: releaseDTO.tag_name.split(/[-_]/)[1],
						mcVersion: releaseDTO.tag_name.split(/[-_]/)[0],
						fabricLink: null,
						forgeLink: null,
						publishedDate: releaseDTO.published_at,
						preRelease: releaseDTO.prerelease
					};

					for (const asset of releaseDTO.assets) {
						if (asset.name.toLocaleLowerCase().includes("forge")) {
							release.forgeLink = asset.browser_download_url;
						} else {
							release.fabricLink = asset.browser_download_url;
						}
					}

					if (release.fabricLink !== null || release.forgeLink !== null) {
						releases.value.push(release);
					}
				}
				hasMore =  "link" in releasesResp.headers && releasesResp.headers.link.includes('rel="next"');
				page++;
			} while (hasMore);
		}

		return { releases, loadMinetifaceReleases };
	},
	{ persist: true }
);
