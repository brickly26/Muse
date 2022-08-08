import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../../utils';
import { Like } from '../../types';

interface IProps {
  albums: Like[]
  songs: Like[]
  artists: Like[]
}

const Search = ({ albums, songs, artists }: IProps) => {
  return (
    <div>Search</div>
  );
}

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: 'string' }
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { 
      artists: res.data.artists || null,
      albums: res.data.albums || null,
      songs: res.data.songs || null
    }
  }
}

export default Search;