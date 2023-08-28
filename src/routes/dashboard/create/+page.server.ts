import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import { API_URL } from '$env/static/private';
import type { Session, SupabaseClient } from '@supabase/supabase-js';
import type { UserProfileType } from '../../../types/user_profile_type';
import { PUBLIC_DEFAULT_EVENT_PHOTO } from '$env/static/public';

const schema = z.object({
	event_name: z.string(),
	description: z.string(),
	start_time: z.string(),
	end_time: z.string(),
	creator_uid: z.string().min(1),
	event_logo: z.string().default(PUBLIC_DEFAULT_EVENT_PHOTO)
});

export const load = async ({ locals: { supabase, getSession } }) => {
	// Server API:
	const form = await superValidate(schema);
	const session = await getSession();
	const profile = await fetchProfile(session, supabase);
	if (profile.userProfile !== undefined) {
		form.data.creator_uid = profile.userProfile!.id;
	}

	// Always return { form } in load and form actions.
	return { form: form, userProfile: profile };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, schema);
		if (!form.valid) {
			return fail(400, { form });
		} else {
			const body = JSON.stringify({
				event_name: form.data.event_name,
				description: form.data.description,
				start_time: form.data.start_time,
				end_time: form.data.end_time,
				creator_uid: form.data.creator_uid,
				event_logo: form.data.event_logo
			});

			const res = await fetch(API_URL + 'event', {
				method: 'POST',
				body: body,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			});

			const response = (await res.json()) as { message: string; success: boolean; id: string };

			if (response.success) {
				throw redirect(302, '/dashboard');
			}

			return { form };
		}
	}
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
