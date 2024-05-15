type ReleaseDTO = {
	tag_name: string;
	name: string;
	draft: boolean;
	prerelease: boolean;
	published_at: Date;
	assets: AssetDTO[];
};

export type { ReleaseDTO };
