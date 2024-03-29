import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    const { id } = req.query;

    const trackOptions = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/tracks/',
      params: {ids: id},
      headers: {
        'X-RapidAPI-Key': '6237b50470msh86fd63969ea5839p131026jsn52861ba968f6',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
      }
    };

    const lyricsOptions = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/track_lyrics/',
      params: {id: id},
      headers: {
        'X-RapidAPI-Key': '6237b50470msh86fd63969ea5839p131026jsn52861ba968f6',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
      }
    };

    const { data } = await axios.request(trackOptions);

    const response = await axios.request(lyricsOptions);

    let lyrics

    if(response.data.length === 0) {
      lyrics = false
    } else {
      lyrics = response.data.lyrics.lines.map((line: any) => `${line.words}`)
    }

    const dataToSend = {
      lyrics,
      shortLyrics: lyrics.slice(0,10),
      type: "song",
      artist: data.tracks[0].artists.map((item: any) => {
        return {
          id: item.id,
          name: item.name
        }
      }),
      album: data.tracks[0].album.album_type === 'single' ? null : {
        id: data.tracks[0].album.id,
        name: data.tracks[0].album.name, 
      },
      name: data.tracks[0].name,
      image: data.tracks[0].album.images.length > 0 ? data.tracks[0].album.images[0].url : "https://qph.cf2.quoracdn.net/main-qimg-4ec3bcdfd3c68b7287c07b58da0a99b7.webp",
      uri: data.tracks[0].uri,
      releaseDate: data.tracks[0].album.release_date
    }

    res.status(200).json(dataToSend);
  }
}
