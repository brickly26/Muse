import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../utils/client';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    const { searchTerm } = req.query;

    const options = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/search/',
      params: {q: searchTerm, type: 'multi', offset: '0', limit: '10', numberOfTopResults: '5'},
      headers: {
        'X-RapidAPI-Key': '6237b50470msh86fd63969ea5839p131026jsn52861ba968f6',
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
      image: album.data?.coverArt?.sources[0]?.url ? `${album.data.coverArt.sources[0].url}` : "https://qph.cf2.quoracdn.net/main-qimg-4ec3bcdfd3c68b7287c07b58da0a99b7.webp",
      spotifyId: `${album.data.uri.split(':')[2]}`
    }));

    console.log(myAlbums[0].image)

    const myArtists = artists?.items.map((artist: any) => ({
      _id: `${artist.data.uri}`,
      type: 'artist',
      name: `${artist.data.profile.name}`,
      image: artist.data.visuals.avatarImage ? `${artist.data.visuals.avatarImage?.sources[0].url}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      spotifyId: `${artist.data.uri.split(':')[2]}`
    }));

    const myTracks = tracks?.items.map((track: any) => ({
      _id: `${track.data.uri}`,
      type: 'song',
      name: `${track.data.name}`,
      by: track.data.artists.items.map((item: any) => `${item.profile.name}`),
      image: track.data.albumOfTrack.coverArt.sources[0].url ? `${track.data.albumOfTrack.coverArt.sources[0].url}` : "https://qph.cf2.quoracdn.net/main-qimg-4ec3bcdfd3c68b7287c07b58da0a99b7.webp",
      spotifyId: `${track.data.id}`
    }));

    const response = {
      albums: myAlbums,
      artists: myArtists,
      tracks: myTracks
    }

    res.status(200).json(response);
  }
}
