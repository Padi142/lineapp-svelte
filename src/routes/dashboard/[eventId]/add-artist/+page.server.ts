import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import { API_URL } from '$env/static/private';
import type { Session, SupabaseClient } from '@supabase/supabase-js';
import type { UserProfileType } from '../../../../types/user_profile_type';
import { PUBLIC_DEFAULT_EVENT_PHOTO } from '$env/static/public';
import request from '../../../../functions/request';
import type { ArtistType } from '../../../../types/artist_type';
import type { EventType } from '../../../../types/event_type';
import { format } from 'date-fns';
import { parseTimeToDateTime } from '../../../../functions/parse_hour';

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

	const event = await fetchEvent(eventId);
	const lineup = await fetchLineup(eventId);

	if (lineup.length !== 0) {
		let startTime = new Date(Date.parse(lineup[lineup.length - 1].end_time));
		let endTime = new Date(Date.parse(lineup[lineup.length - 1].end_time));

		endTime.setHours(endTime.getHours() + 1);

		form.data.start_time = format(startTime, 'yyyy-MM-dd hh:mm');
		form.data.end_time = format(endTime, 'yyyy-MM-dd hh:mm');
	} else {
		let startTime = new Date(Date.parse(event.start_time));
		startTime.setHours(startTime.getHours() + 1);

		form.data.start_time = format(startTime, 'yyyy-MM-dd hh:mm');
		startTime.setHours(startTime.getHours() + 1);

		form.data.end_time = format(startTime, 'yyyy-MM-dd hh:mm');
	}

	// Always return { form } in load and form actions.
	return { form: form, eventId: eventId };
};

const fetchEvent = async (eventId: string): Promise<EventType> => {
	const result = await request<{ event: EventType }>(API_URL + 'event/' + eventId);

	return result.event;
};

const fetchLineup = async (eventId: string): Promise<Array<ArtistType>> => {
	const result = await request<{ artists: Array<ArtistType> }>(
		API_URL + 'event/artists/' + eventId
	);

	return result.artists;
};

export const actions = {
	default: async ({ request, params }) => {
		const eventId = params.eventId;

		const form = await superValidate(request, schema);

		if (!form.valid) {
			return fail(400, { form });
		} else {
			const event = await fetchEvent(eventId);
			let startTime = new Date(Date.parse(event.start_time));
			let endTime = new Date(Date.parse(event.end_time));

			const artistStartTime = parseTimeToDateTime(form.data.start_time);
			const artistEndTime = parseTimeToDateTime(form.data.end_time);

			if (artistStartTime.getHours() < 8) {
				startTime.setFullYear(endTime.getFullYear(), endTime.getMonth(), endTime.getDate());
			}
			startTime.setHours(artistStartTime.getHours());
			startTime.setMinutes(artistStartTime.getMinutes());
			startTime.setSeconds(0);
			startTime.setMilliseconds(0);

			if (artistEndTime.getHours() < 8) {
				endTime.setFullYear(endTime.getFullYear(), endTime.getMonth(), endTime.getDate());
			}
			endTime.setHours(artistEndTime.getHours());
			endTime.setMinutes(artistEndTime.getMinutes());
			endTime.setSeconds(0);
			endTime.setMilliseconds(0);

			const body = JSON.stringify({
				artist_name: form.data.artist_name,
				artist_description: form.data.description,
				start_time: format(startTime, 'yyyy-MM-dd hh:mm'),
				end_time: format(endTime, 'yyyy-MM-dd hh:mm'),
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
