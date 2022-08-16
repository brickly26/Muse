import React from 'react';
import axios from 'axios';

import { BASE_URL } from '../../utils';

interface IProps {
  name: string;
  spotifyId: string;
  image: string;
  wRank: number;
  topSongs: {
    image: string;
    name: string;
    spotifyId: string;
    by: {
      spotifyId: string;
      name: string;
    }[]
  }[];
  albums: {
    image: string;
    name: string;
    spotifyId: string;
  }[]
}

const artist = ({ artistDetails }: IProps) => {
  return (
    <div>artist</div>
  );
}

export const getServerSideProps = async ({
  params: { id }
}: {
  params: { id: string }
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/artist/${id}`);

  return {
    props: { artistDetails: data }
  }
}

export default artist;