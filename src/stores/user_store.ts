import { request } from "@/utils/utils";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

type Permissions = {
	admin: boolean;
	early_access: boolean;
	manage_projects: boolean;
	upload_chapters: boolean;
	moderate_avatars: boolean;
	view_hidden: boolean;
}

export type UserInfo = {
	uid: string;
	username: string;
	groups: string[];
	permissions: Permissions;
}

export type UserList = {
	user_count: number;
	users: { [key: string]: string };
}

export const use_user_store = defineStore("user", () => {
	let user: Ref<UserInfo | null> = ref(null);

	let last_checked = null;

	async function login(username: string, password: string): Promise<void> {
		await request("/api/v1/Session/login", "POST", {
			username, password
		});
		await check_session();
	}

	async function logout() {
		await request("/api/v1/Session/logout", "POST");
	}

	async function check_session(): Promise<UserInfo> {
		try {
			user.value = await request<UserInfo>("/api/v1/Session");
		} catch (error) {
			user.value = null;
			throw error;
		}
		return user.value;
	}

	async function get_all_users(): Promise<UserList> {
		return await request<UserList>("/api/v1/User");
	}

	async function get_by_uid(uid: string): Promise<UserInfo> {
		return await request<UserInfo>(`/api/v1/User/${uid}`);
	}

	function is_logged_in() {
		return user.value !== null;
	}

	return {
		user,
		login,
		logout,
		check_session,
		get_all_users,
		get_by_uid,
		is_logged_in
	}
})