import React from 'react';
import { Container, Center } from '../components';

import { Controls } from './Controls';
import { Setup } from './Setup';
import { Rounds } from './Rounds';
import { Timer } from './Timer';
import { Text } from '../components';

import { useTabataHook } from './useTabataHook';

const App = () => {
  const initialTabataState = {
    rounds: 5,
    workMin: 45,
    workMax: 90,
    work: 60,
    rest: 10,
    restPercent: 60,
    isStarted: false,
    isFinished: false,
  };

  const {
    tabata, startTabata, stopTabata, handleTabataChange,
  } = useTabataHook(initialTabataState);

  return (
    <>
      {/* set background color to green when tabata is started */}
      {tabata.isStarted && <style>
        {`
        body {
          background-color: ${(tabata.work === 0) ? 'red' : 'green'};
        }
      `}
      </style>}


      <Container>
        <div style={{
          fontSize: "2rem", textAlign: "center"
        }}><Text tag="h1" size="40px">
            Tabata Timer Randomizer
          </Text></div>
        {tabata.isStarted ? (
          <React.Fragment>
            <Rounds round={tabata.rounds} />
            <Center>
              <Timer work={tabata.work} rest={tabata.rest} />
            </Center>
          </React.Fragment>
        ) : (
          <Setup onChange={({ target }) => handleTabataChange(target)} />
        )}
        <Center>
          <Controls
            onToggle={() => {
              if (!tabata.isStarted) {
                startTabata();
              } else {
                stopTabata();
              }
            }}
            isStarted={tabata.isStarted}
          />
        </Center>
      </Container>
    </>
  );
};

export { App };
