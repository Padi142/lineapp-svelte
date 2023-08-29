import { PUBLIC_API_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import request from '../../../../../functions/request';
import type { ArtistType } from '../../../../../types/artist_type';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	return {
		artist: fetchArtist(params.artistId),
		eventId: params.eventId
	};
}) satisfies PageServerLoad;

const fetchArtist = async (artistId: string): Promise<ArtistType> => {
	const result = await request<{ artist: ArtistType }>(PUBLIC_API_URL + 'artists/' + artistId);

	return result.artist;
};

export const actions = {
	delete: async ({ request, params, locals: { supabase, getSession } }) => {
		// const session = await getSession();

		const data = await request.formData();
		const artist_uid = data.get('artist_uid')?.toString().trim();

		// const res = await fetch(PUBLIC_API_URL + 'artists/' + artist_uid+'?event_uid='+params.eventId+"&user_uid=" +session?.user.aud, {
		const res = await fetch(PUBLIC_API_URL + 'artists/' + artist_uid, {
			method: 'DELETE'
		});
		// const response = (await res.json()) as { error: string; success: boolean };

		// if (response.success) {
		// 	throw redirect(302, '/dashboard');
		// }
		throw redirect(302, '/dashboard/' + params.eventId);
	}
};
