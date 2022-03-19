import React from 'react';
import useHotKeys from 'react-hotkeys-hook';

import { Text, Button } from '../components';

const Controls = ({ onToggle, isStarted }) => {
  useHotKeys('space, enter', (e) => {
    e.preventDefault();
    onToggle();
  });

  return (
    <React.Fragment>
      <Button type={isStarted ? 'danger' : 'success'} onClick={onToggle}>
        {isStarted ? 'Stop' : 'Start'}
      </Button>
      <Text size="14px"></Text>
    </React.Fragment>
  );
};

export { Controls };
