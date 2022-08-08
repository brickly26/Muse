import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    const { searchTerm } = req.query;

    const options = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/search/',
      params: {q: searchTerm, type: 'multi', offset: '0', limit: '4', numberOfTopResults: '5'},
      headers: {
        'X-RapidAPI-Key': '86b7532091msh9b196d9d3f89ea8p1208abjsnfc4f668a0342',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
      }
    };

    const { data } = await axios.request(options);

    const { artists, tracks, albums } = data

    const myAlbums = albums?.items.map((album: any) => ({
      type: 'album',
      name: `${album.data.name}`,
      by: `${album.data.artists.items.map((item: any) => `${item.profile.name}`)}`,
      image: `${album.data.coverArt.sources[0].url}`
    }));

    const myArtists = artists?.items.map((artist: any) => ({
      type: 'artist',
      name: `${artist.data.profile.name}`,
      image: `${artist.data.visuals.avatarImage.sources[0].url}`
    }));

    const myTracks = tracks?.items.map((track: any) => ({
      type: 'song',
      name: `${track.data.name}`,
      by: `${track.data.artists.items.map((item: any) => `${item.profile.name}`)}`,
      image: `${track.data.albumOfTrack.coverArt.sources[0].url}`
    }));

    const response = {
      albums: myAlbums,
      artists: myArtists,
      tracks: myTracks
    }

    res.status(200).json(response);
  }
}
