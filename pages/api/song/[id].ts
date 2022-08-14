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
        'X-RapidAPI-Key': '400be26774msh66cdea547d51b5ep114199jsn7c36fba4ee9b',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
      }
    };

    const lyricsOptions = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/track_lyrics/',
      params: {id: id},
      headers: {
        'X-RapidAPI-Key': '400be26774msh66cdea547d51b5ep114199jsn7c36fba4ee9b',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
      }
    };

    console.log('1');

    const { data } = await axios.request(trackOptions);

    console.log('2');

    const response = await axios.request(lyricsOptions);

    let lyrics

    if(response.data.length === 0) {
      lyrics = false
    } else {
      lyrics = response.data.lyrics.lines.map((line: any) => `${line.words}`)
    }

    const dataToSend = {
      lyrics,
      shortLyrics: lyrics.slice(0,5),
      type: data.tracks[0].album.album_type,
      artist: data.tracks[0].artists.map((item: any) => `${item.name}`),
      album: data.tracks[0].album.album_type === 'single' ? null : {
        id: data.tracks[0].album.id,
        name: data.tracks[0].album.name, 
      },
      name: data.tracks[0].name,
      image: data.tracks[0].album.images[0].url,
      uri: data.tracks[0].uri,
      releaseDate: data.tracks[0].album.releaseDate
    }

    // console.log(dataToSend);

    res.status(200).json(dataToSend);
  }
}
