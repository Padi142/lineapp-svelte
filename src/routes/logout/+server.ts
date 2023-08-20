import { redirect } from '@sveltejs/kit';

export const GET = async ({ url, locals: { supabase } }) => {
	await supabase.auth.signOut();
	throw redirect(303, '/');
};
