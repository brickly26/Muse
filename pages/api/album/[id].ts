import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    const { id } = req.query;

    const options1 = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/albums/',
      params: {ids: id},
      headers: {
        'X-RapidAPI-Key': '6237b50470msh86fd63969ea5839p131026jsn52861ba968f6',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
      }
    };

    const options2 = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/album_tracks/',
      params: {id: id, offset: '0', limit: '300'},
      headers: {
        'X-RapidAPI-Key': '6237b50470msh86fd63969ea5839p131026jsn52861ba968f6',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
      }
    };

    const res1 = await axios.request(options1);

    const res2 = await axios.request(options2);

    const dataToSend = {
      name: res1.data.albums[0].name,
      image: res1.data.albums[0].images.length > 0 ? res1.data.albums[0].images[0].url : 'https://qph.cf2.quoracdn.net/main-qimg-4ec3bcdfd3c68b7287c07b58da0a99b7.webp',
      spotifyId: res1.data.albums[0].id,
      by: res1.data.albums[0].artists.map((artist: any) => {
        return {
          name: artist.name,
          spotifyId: artist.id
        }
      }),
      releaseDate: res1.data.albums[0].release_date,
      songs: res2.data.data.album.tracks.items.map((song: any) => {
        return {
          spotifyId: song.track.uri.split(':')[2],
          name: song.track.name,
          playCount: parseInt(song.track.playcount).toLocaleString()
        }
      }),
    }

    console.log(dataToSend)

    res.status(200).json(dataToSend);
  }
}
