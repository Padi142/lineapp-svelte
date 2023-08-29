export interface SpotifyArtistType {
	artist_name: string;
	artist_photos: SpotifyArtistPhoto[];
	artist_url: string;
	artist_description: string;
}

export interface SpotifyArtistPhoto {
	height: number;
	width: number;
	url: string;
}
