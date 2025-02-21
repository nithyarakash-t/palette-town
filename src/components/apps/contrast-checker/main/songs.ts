export type Track = {
    name: string,
    artist: string,
    length: string
}
export const tracklist:Track[] = [
    {
        name: 'Killer Queen',
        artist: 'Queen',
        length: '4.11'
    },
    {
        name: 'Time in a bottle',
        artist: 'Jim Croce',
        length: '5.10'
    },
    {
        name: 'Cult of personality',
        artist: 'Living Color',
        length: '4.05'
    },
    {
        name: 'Boogie Wonderland',
        artist: 'Earth, Wind & Fire',
        length: '4.05'
    },
    {
        name: 'Angeleyes',
        artist: 'ABBA',
        length: '3.56'
    },
    {
        name: 'Crazy little thing called love - remastered',
        artist: 'Queen',
        length: '4.11'
    },
]

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