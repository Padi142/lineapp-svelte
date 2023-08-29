import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';
import type { Session, SupabaseClient } from '@supabase/supabase-js';
import { PUBLIC_DEFAULT_EVENT_PHOTO } from '$env/static/public';
import type { UserProfileType } from '../../../../types/user_profile_type';
import type { EventType } from '../../../../types/event_type';
import request from '../../../../functions/request';

const schema = z.object({
	event_name: z.string().min(1),
	description: z.string(),
	start_time: z.string(),
	end_time: z.string(),
	event_logo: z.string(),
	website_link: z.string(),
	instagram_link: z.string(),
	tickets_link: z.string()
});

export const load = async ({ locals: { supabase, getSession }, params }) => {
	const session = await getSession();
	const profile = await fetchProfile(session, supabase);

	const event = await fetchEvent(params.eventId);

	if (event.creator_uid !== profile.userProfile?.id) {
		throw redirect(302, '/dashboard');
	}

	const form = await superValidate(event, schema);
	// Always return { form } in load and form actions.
	return { form: form, userProfile: profile, event: event };
};

const fetchEvent = async (eventId: string): Promise<EventType> => {
	const result = await request<{ event: EventType }>(PUBLIC_API_URL + 'event/' + eventId);

	return result.event;
};

export const actions = {
	default: async ({ request, params }) => {
		const form = await superValidate(request, schema);
		if (!form.valid) {
			return fail(400, { form });
		} else {
			const body = JSON.stringify({
				event_name: form.data.event_name,
				description: form.data.description,
				start_time: form.data.start_time,
				end_time: form.data.end_time,
				event_logo: form.data.event_logo,
				website_link: form.data.website_link,
				instagram_link: form.data.instagram_link,
				tickets_link: form.data.tickets_link,
				event_uid: params.eventId
			});

			const res = await fetch(PUBLIC_API_URL + 'event', {
				method: 'PUT',
				body: body,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			});

			const response = (await res.json()) as { message: string; success: boolean; uid: string };

			if (response.success) {
				throw redirect(302, '/dashboard/' + params.eventId);
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
