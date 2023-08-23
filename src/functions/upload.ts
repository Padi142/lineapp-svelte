import type { SupabaseClient } from '@supabase/supabase-js';

export const uploadAvatar = async (
	bucket: string,
	path: string,
	files: FileList,
	supabase: SupabaseClient
) => {
	try {
		if (!files || files.length === 0) {
			throw new Error('You must select an image to upload.');
		}

		const file = files[0];
		const fileExt = file.name.split('.').pop();
		const filePath = `${path}/${Math.random()}.${fileExt}`;

		let { error } = await supabase.storage.from(bucket).upload(filePath, file);

		if (error) {
			throw error;
		}

		const { data } = await supabase.storage.from(bucket).getPublicUrl(filePath);

		if (data === null) {
			return undefined;
		}

		return data.publicUrl;
	} catch (error) {
		if (error instanceof Error) {
			alert(error.message);
		}
		return undefined;
	}
};
