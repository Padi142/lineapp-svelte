import type { UserProfileType } from '../types/user_profile_type';

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		return { session, undefined };
	}

	const { data: profile } = await supabase
		.from('profiles')
		.select(`id, username, full_name, website, avatar_url`)
		.eq('id', session.user.id)
		.single();

	if (profile === null) {
		return { session, undefined };
	}
	var profileType: UserProfileType = {
		id: profile!.id,
		username: profile!.username,
		avatar_url: profile!.avatar_url,
		website: profile!.website,
		full_name: profile!.full_name
	};
	return { session, profileType };
};
