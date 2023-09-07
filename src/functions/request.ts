// Make the `request` function generic

import type { Session, SupabaseClient } from '@supabase/supabase-js';
import type { UserProfileType } from '../types/user_profile_type';
import { PUBLIC_API_URL } from '$env/static/public';
import type { EventType } from '../types/event_type';

// to specify the return data type:
function request<TResponse>(
	url: string,
	// `RequestInit` is a type for configuring
	// a `fetch` request. By default, an empty object.
	config: RequestInit = {}

	// This function is async, it will return a Promise:
): Promise<TResponse> {
	// Inside, we call the `fetch` function with
	// a URL and config given:
	return (
		fetch(url, config)
			// When got a response call a `json` method on it
			.then((response) => response.json())
			// and return the result data.
			.then((data) => data as TResponse)
	);

	// We also can use some post-response
	// data-transformations in the last `then` clause.
}

export default request;

export const fetchEvents = async (userId: string): Promise<Array<EventType>> => {
	const result = await request<{ events: Array<EventType> }>(
		PUBLIC_API_URL + 'event/user/' + userId
	);
	return result.events;
};

export const fetchProfile = async (
	session: Session | null,
	supabase: SupabaseClient
): Promise<{ session: Session | null; userProfile: UserProfileType | undefined }> => {
	if (!session) {
		return { session: session, userProfile: undefined };
	}

	const { data: profile } = await supabase
		.from('profiles')
		.select(`id, username, full_name, website, avatar_url`)
		.eq('id', session.user.id)
		.single();

	if (profile === null) {
		return { session: session, userProfile: undefined };
	}
	var userProfile: UserProfileType = {
		id: profile!.id,
		username: profile!.username,
		avatar_url: profile!.avatar_url,
		website: profile!.website,
		full_name: profile!.full_name
	};
	return { session: session, userProfile: userProfile };
};
