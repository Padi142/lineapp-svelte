import { API_URL } from '$env/static/private';
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
	const result = await request<{ event: EventType }>(API_URL + 'event/' + eventId);

	return result.event;
};

const fetchLineup = async (eventId: string): Promise<Array<ArtistType>> => {
	const result = await request<{ artists: Array<ArtistType> }>(
		API_URL + 'event/artists/' + eventId
	);

	return result.artists;
};
