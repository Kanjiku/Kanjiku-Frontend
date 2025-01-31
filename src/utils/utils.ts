

export async function request<T>(url: string, method: string = "GET", body: any = null): Promise<T> {
	const payload: RequestInit = {
		method,
		headers: {
			"Content-Type": "application/json"
		}
	};

	if (!(method === "GET" || method === "HEAD")) {
		payload.body = JSON.stringify(body);
	}

	const response = await fetch(url, payload);

	if (response.status == 200) {
		return await response.json();
	}

	let error = null;
	try {
		error = await response.json();
		console.log(error.status !== undefined);
		if (error.status !== undefined) {
			error = { msg: error.status + " " + error.description };
		}
	} catch {
		error = { msg: response.status + " " + response.statusText };
	}
	console.error(error);
	throw error;
}

export type ValidationResult = {
	valid: boolean;
	message: string;
};

export function createValid(message?: string): ValidationResult {
	return {
		valid: true,
		message: message ?? ""
	};
}

export function createInvalid(message?: string): ValidationResult {
	return {
		valid: false,
		message: message ?? ""
	};
}