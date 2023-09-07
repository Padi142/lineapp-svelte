import { fetchEvents, fetchProfile } from '../../functions/request';
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
