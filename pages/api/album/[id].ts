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
        'X-RapidAPI-Key': '6237b50470msh86fd63969ea5839p131026jsn52861ba968f6',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
      }
    };

    const options2 = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/artist_overview/',
      params: {id: id},
      headers: {
        'X-RapidAPI-Key': '6237b50470msh86fd63969ea5839p131026jsn52861ba968f6',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
      }
    };

    const res1 = await axios.request(options1);

    const res2 = await axios.request(options2);

    const dataToSend = {
      name: res1.
    }

    res.status(200).json(dataToSend);
  }
}
