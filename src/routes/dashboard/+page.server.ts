import { API_URL } from '$env/static/private';
import type { Session, SupabaseClient } from '@supabase/supabase-js';
import request from '../../functions/request';
import type { EventType } from '../../types/event_type';
import type { UserProfileType } from '../../types/user_profile_type';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	const profile = await fetchProfile(session, supabase);

	if (profile.userProfile === undefined) {
		throw redirect(302, '/login');
	}

	return {
		events: fetchEvents(profile.userProfile.id),
		profile: profile.userProfile
	};
}) satisfies PageServerLoad;

const fetchEvents = async (userId: string): Promise<Array<EventType>> => {
	const result = await request<{ events: Array<EventType> }>(API_URL + 'event/user/' + userId);
	return result.events;
};

const fetchProfile = async (
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
