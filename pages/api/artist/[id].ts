import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    const { id } = req.query;

    console.log('1')

    const options1 = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/artists/',
      params: {ids: id},
      headers: {
        'X-RapidAPI-Key': '400be26774msh66cdea547d51b5ep114199jsn7c36fba4ee9b',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
      }
    };

    const options2 = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/artist_overview/',
      params: {id: id},
      headers: {
        'X-RapidAPI-Key': '400be26774msh66cdea547d51b5ep114199jsn7c36fba4ee9b',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
      }
    };

    console.log('2')

    const res1 = await axios.request(options1);

    console.log('3')

    const res2 = await axios.request(options2);

    console.log(res2.data.data.artist)

    const dataToSend = {
      name: res1.data.artists[0].name,
      spotifyId: res1.data.artists[0].id,
      image: res1.data.artists[0].images.length > 0 ? res1.data.artists[0].images[0].url : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', 
      // listeners: res2.data.data.artist.stats.monthlyListeners,
      wRank: res2.data.data.artist.stats.worldRank,
      topSongs: res2.data.data.artist.discography.topTracks.items.slice(0,5).map((song: any) => {
        return {
          image: song.track.album.coverArt.sources.length > 0 ? song.track.album.coverArt.sources[0].url : "https://qph.cf2.quoracdn.net/main-qimg-4ec3bcdfd3c68b7287c07b58da0a99b7.webp",
          name: song.track.name,
          spotifyId: song.track.id,
          by: song.track.artists.items.map((artist: any) => {
            return {
              spotifyId: artist.uri.split(':')[2],
              name: artist.profile.name
            }
          })
        }
      }),
      albums: res2.data.data.artist.discography.albums.items.map((album: any) => {
        return {
          image: album.releases.items[0].coverArt.sources.length > 0 ? album.releases.items[0].coverArt.sources[0].url : "https://qph.cf2.quoracdn.net/main-qimg-4ec3bcdfd3c68b7287c07b58da0a99b7.webp",
          name: album.releases.items[0].name,
          spotifyId: album.releases.items[0].id
        }
      })
    }

    console.log(dataToSend)

    res.status(200).json(dataToSend);
  }
}