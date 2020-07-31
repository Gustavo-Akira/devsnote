import React from 'react';
import {Box, Title} from './styled';

export default ({data, index, onPress}) => {
  console.log(data);
  return (
    <Box onPress={()=>onPress(data.index)}>
      <Title>{data.item.title}</Title>
    </Box>
  );
}