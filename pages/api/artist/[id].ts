import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    const { id } = req.query;

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

    const res1 = await axios.request(options1);

    const res2 = await axios.request(options2);

    console.log(res1)

    const dataToSend = {
      name: res1
    }

    res.status(200).json(dataToSend);
  }
}