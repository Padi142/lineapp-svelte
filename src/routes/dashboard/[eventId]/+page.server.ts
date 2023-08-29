import { PUBLIC_API_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import request from '../../../functions/request';
import type { ArtistType } from '../../../types/artist_type';
import type { EventType } from '../../../types/event_type';

import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	return {
		event: fetchEvent(params.eventId),
		artists: fetchLineup(params.eventId)
	};
}) satisfies PageServerLoad;

const fetchEvent = async (eventId: string): Promise<EventType> => {
	const result = await request<{ event: EventType }>(PUBLIC_API_URL + 'event/' + eventId);

	return result.event;
};

const fetchLineup = async (eventId: string): Promise<Array<ArtistType>> => {
	const result = await request<{ artists: Array<ArtistType> }>(
		PUBLIC_API_URL + 'event/artists/' + eventId
	);

	return result.artists;
};

export const actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const event_uid = data.get('event_uid')?.toString().trim();

		const res = await fetch(PUBLIC_API_URL + 'event/delete/' + event_uid, {
			method: 'GET'
		});
		// const response = (await res.json()) as { error: string; success: boolean };

		// if (response.success) {
		// 	throw redirect(302, '/dashboard');
		// }
		throw redirect(302, '/dashboard');

		return;
	}
};
