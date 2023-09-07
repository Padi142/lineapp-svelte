import { fetchProfile } from '../../functions/request';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	const profile = await fetchProfile(session, supabase);

	if (profile.userProfile === undefined) {
		return {
			profile: undefined
		};
	}

	return {
		profile: profile.userProfile
	};
}) satisfies PageServerLoad;
