import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import { API_URL } from '$env/static/private';
import type { Session, SupabaseClient } from '@supabase/supabase-js';
import { PUBLIC_DEFAULT_EVENT_PHOTO } from '$env/static/public';
import type { EventType } from '../../../../../../types/event_type';
import request from '../../../../../../functions/request';
import type { ArtistType } from '../../../../../../types/artist_type';
import type { UserProfileType } from '../../../../../../types/user_profile_type';

const schema = z.object({
	artist_name: z.string(),
	artist_description: z.string(),
	start_time: z.string(),
	end_time: z.string(),
	spotify_link: z.string(),
	apple_link: z.string(),
	instagram_link: z.string(),
	artist_photo: z.string(),
	artist_uid: z.string()
});

export const load = async ({ locals: { supabase, getSession }, params }) => {
	const session = await getSession();
	const profile = await fetchProfile(session, supabase);

	const event = await fetchEvent(params.eventId);
	const artist = await fetchArtist(params.artistId);

	if (event.creator_uid !== profile.userProfile?.id) {
		throw redirect(302, '/dashboard');
	}

	const form = await superValidate(artist, schema);
	// Always return { form } in load and form actions.
	return { form: form, userProfile: profile, event: event, artist: artist };
};

const fetchEvent = async (eventId: string): Promise<EventType> => {
	const result = await request<{ event: EventType }>(API_URL + 'event/' + eventId);

	return result.event;
};

const fetchArtist = async (artistId: string): Promise<ArtistType> => {
	const result = await request<{ artist: ArtistType }>(API_URL + 'artists/' + artistId);

	return result.artist;
};

export const actions = {
	default: async ({ request, params }) => {
		const form = await superValidate(request, schema);
		if (!form.valid) {
			return fail(400, { form });
		} else {
			console.log(form.data);

			const body = JSON.stringify({
				artist_name: form.data.artist_name,
				artist_description: form.data.artist_description,
				start_time: form.data.start_time,
				end_time: form.data.end_time,
				spotify_link: form.data.spotify_link,
				apple_link: form.data.spotify_link,
				instagram_link: form.data.instagram_link,
				artist_photo: form.data.artist_photo,
				artist_uid: params.artistId
			});

			const res = await fetch(API_URL + 'artists/' + params.artistId, {
				method: 'PUT',
				body: body,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			});

			const response = (await res.json()) as { message: string; success: boolean; uid: string };

			if (response.success) {
				throw redirect(302, '/dashboard/' + params.eventId + '/artist/' + params.artistId);
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
