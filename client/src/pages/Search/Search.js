import { Box, Typography, TextField, Button } from '@mui/material'
import React from 'react'

const Search = () => {
  return (
    <Box pt={"108px"}>
      <Typography>Search For Your Favorite Music</Typography>
      <Box>
        <TextField varianet="outlined" />
        <Button varient="contained" size="large">Search</Button>
      </Box>
    </Box>
  )
}

export default Search