import { ResponseType, fetch as tauri_fetch, FetchOptions as TauriFetchOptions } from "@tauri-apps/api/http";
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
		console.log("Fetch tauri")
		return fetchTauri(url, options);
	} else {
		return fetchWeb(url, options);
	}
}

async function fetchTauri(
	url: string,
	options?: FetchOptions | undefined
): Promise<Response> {
	let tauriOptions : TauriFetchOptions = {
		method: "GET",
		responseType: ResponseType.Text
	};

	if (options !== undefined) {
		tauriOptions = {
			...tauriOptions,
			...options
		}
	}
	const response = await tauri_fetch<string>(url, tauriOptions);
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
