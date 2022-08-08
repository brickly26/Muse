import React from 'react';
import { TbMusicOff } from 'react-icons/tb';

interface IProps {
  text: string;
  music: boolean;
}

const NoResults = ({ text, music }: IProps) => {
  return (
    <div>NoResults</div>
  );
}

export default NoResults;