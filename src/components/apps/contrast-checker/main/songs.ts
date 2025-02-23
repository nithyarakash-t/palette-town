import { environment } from '../../../../environments/environment';
import { tracklist } from './tracklist';

export type Track = {
    name: string,
    artist: string,
    length: string
}

const usedSongs = new Set<string>();
export function getSongs(count: number = 5): Track[] {
    const numSongs = Math.min(count, tracklist.length);
    let availableSongs = tracklist.filter(track => !usedSongs.has(track.name));
    
    // Reset history if we don't have enough songs
    if (availableSongs.length < numSongs) {
        usedSongs.clear();
        availableSongs = tracklist;
    }
    
    const shuffled = structuredClone(availableSongs);
    
    // Fisher-Yates shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
        const randomBuffer = new Uint32Array(1);
        crypto.getRandomValues(randomBuffer);
        const j = randomBuffer[0] % (i + 1);
        
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    const selectedSongs = shuffled.slice(0, numSongs);
    selectedSongs.forEach(song => usedSongs.add(song.name));
    
    return selectedSongs;
}

/*********
 * 
 * DUMP
 * 
 * 
 * **/
// Add the interface for Spotify API responses
interface SpotifyToken {
    access_token: string;
    token_type: string;
    expires_in: number;
}
interface SpotifyTrack {
    track: {
        name: string;
        artists: { name: string }[];
        duration_ms: number;
    };
}
export const realtimeTrackList:Track[] = [];
export async function loadSpotifyPlaylist(playlistId: string): Promise<Track[]> {
    try {
        // First, get the access token
        const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(`${environment.spotify.clientId}:${environment.spotify.clientSecret}`)
            },
            body: 'grant_type=client_credentials'
        });

        const tokenData: SpotifyToken = await tokenResponse.json();

        // Then, fetch the playlist
        const playlistResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            headers: {
                'Authorization': `Bearer ${tokenData.access_token}`
            }
        });

        const playlistData = await playlistResponse.json();
        
        // Convert Spotify track format to our Track format
        const tracks: Track[] = playlistData.items.map((item: SpotifyTrack) => ({
            name: item.track.name,
            artist: item.track.artists[0].name,
            length: formatDuration(item.track.duration_ms)
        }));

        return tracks;
    } catch (error) {
        console.error('Error loading Spotify playlist:', error);
        return structuredClone(tracklist);
    }
}
function formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}.${seconds.toString().padStart(2, '0')}`;
}
export const playlistId = '3fFhzl5TVYXoHGVCTeTEGv';
// const dynamicTracklist = await loadSpotifyPlaylist(playlistId);
// realtimeTrackList.push(...dynamicTracklist);
