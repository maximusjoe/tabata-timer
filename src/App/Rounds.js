import React from 'react';
import { Text } from '../components';

const Rounds = ({ round }) => (
  <Text tag="h2" size="30px">
    Rounds Left:
    {' '}
    {round - 1}
  </Text>
);

export { Rounds };
