import { fetch as tauri_fetch } from "@tauri-apps/api/http";
import { isTauri } from "./tauri";

type FetchOptions = {
	method: "POST" | "GET" | "PUT" | "DELETE";
	headers?: any;
	body?: any;
};

type Response = {
	text: string;
	headers: any;
};

async function fetchInterop(
	url: string,
	options?: FetchOptions
): Promise<Response> {
	if (isTauri()) {
		return fetchTauri(url, options);
	} else {
		return fetchWeb(url, options);
	}
}

async function fetchTauri(
	url: string,
	options?: FetchOptions | undefined
): Promise<Response> {
	const response = await tauri_fetch(url, options);
	return { text: response.data as string, headers: response.headers };
}

async function fetchWeb(
	url: string,
	options?: FetchOptions | undefined
): Promise<Response> {
	const response = await fetch(url, options);

	const text = await response.text();
	return { text, headers: response.headers };
}

export { fetchInterop };
