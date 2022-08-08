import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../../utils';
import { Artist, Album, Song } from '../../types';

interface IProps {
  albums: Artist[]
  songs: Song[]
  artists: Artist[]
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