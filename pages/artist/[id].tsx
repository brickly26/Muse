import React from 'react';
import axios from 'axios';

import { BASE_URL } from '../../utils';

interface IProps {
  
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