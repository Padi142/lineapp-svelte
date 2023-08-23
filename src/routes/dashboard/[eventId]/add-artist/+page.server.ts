import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import { API_URL } from '$env/static/private';
import type { Session, SupabaseClient } from '@supabase/supabase-js';
import type { UserProfileType } from '../../../../types/user_profile_type';
import { PUBLIC_DEFAULT_EVENT_PHOTO } from '$env/static/public';
import request from '../../../../functions/request';
import type { ArtistType } from '../../../../types/artist_type';

const schema = z.object({
	artist_name: z.string(),
	description: z.string(),
	start_time: z.string(),
	end_time: z.string(),
	spotify_link: z.string(),
	instagram_link: z.string(),
	artist_photo: z.string().default(PUBLIC_DEFAULT_EVENT_PHOTO)
});

export const load = async ({ locals: { supabase, getSession }, params }) => {
	// Server API:
	const form = await superValidate(schema);

	const eventId = params.eventId;

	// Always return { form } in load and form actions.
	return { form: form, eventId: eventId };
};

export const actions = {
	default: async ({ request, params }) => {
		const eventId = params.eventId;

		const form = await superValidate(request, schema);
		console.log(form);
		if (!form.valid) {
			return fail(400, { form });
		} else {
			const body = JSON.stringify({
				artist_name: form.data.artist_name,
				artist_description: form.data.description,
				start_time: form.data.start_time,
				end_time: form.data.end_time,
				event_uid: eventId,
				spotify_link: form.data.spotify_link,
				instagram_link: form.data.instagram_link,
				artist_photo: form.data.artist_photo
			});

			const res = await fetch(API_URL + 'artists', {
				method: 'POST',
				body: body,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			});

			const response = (await res.json()) as { message: string; success: boolean; id: string };

			if (response.success) {
				throw redirect(302, '/dashboard/' + eventId);
			}

			return { form };
		}
	}
};
