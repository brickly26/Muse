import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../utils/client';
import axios from 'axios';
import { allLikesQuery } from '../../../utils/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    const { searchTerm } = req.query;

    const options = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/search/',
      params: {q: searchTerm, type: 'multi', offset: '0', limit: '10', numberOfTopResults: '5'},
      headers: {
        'X-RapidAPI-Key': '86b7532091msh9b196d9d3f89ea8p1208abjsnfc4f668a0342',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
      }
    };

    const { data } = await axios.request(options);

    const { artists, tracks, albums } = data

    const myAlbums = albums?.items.map((album: any) => ({
      _id: `${album.data.uri}`,
      type: 'album',
      name: `${album.data.name}`,
      by: album.data.artists.items.map((item: any) => `${item.profile.name}`),
      image: `${album.data.coverArt.sources[0].url}`
    }));

    const myArtists = artists?.items.map((artist: any) => ({
      _id: `${artist.data.uri}`,
      type: 'artist',
      name: `${artist.data.profile.name}`,
      image: `${artist.data.visuals.avatarImage?.sources[0].url}`
    }));

    const myTracks = tracks?.items.map((track: any) => ({
      _id: `${track.data.uri}`,
      type: 'song',
      name: `${track.data.name}`,
      by: track.data.artists.items.map((item: any) => `${item.profile.name}`),
      image: `${track.data.albumOfTrack.coverArt.sources[0].url}`
    }));

    const likes = await client.fetch(allLikesQuery());

    const response = {
      likes: likes,
      albums: myAlbums,
      artists: myArtists,
      tracks: myTracks
    }

    res.status(200).json(response);
  }
}
