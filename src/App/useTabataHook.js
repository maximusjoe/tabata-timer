import { useState, useEffect } from 'react';

import {
  start, endRound, warning, end,
} from '../audio';

const defaultTabata = {
  rounds: 5,
  workMin: 45,
  workMax: 90,
  work: 60,
  rest: 10,
  restPercent: 60,
  isStarted: false,
  isFinished: false,
};

const useTabataHook = (initialTabataState = defaultTabata) => {
  const [initialTabata, setInitialTabata] = useState(initialTabataState);
  const [tabata, setTabata] = useState(initialTabata);
  const randomWorkTime = Math.floor(Math.random() * (initialTabata.workMax - initialTabata.workMin + 1) + initialTabata.workMin);

  useEffect(() => {
    initialTabata.work = randomWorkTime;
    tabata.work = randomWorkTime;
    tabata.rest = initialTabata.rest;
  }, [tabata.rounds], [tabata.isStarted], []);

  console.log("Init: " + initialTabata.work);
  console.log("Current:" + tabata.work);

  if (Math.floor((initialTabata.work / 2)) === tabata.work) {
    initialTabata.rest = Math.floor(initialTabata.work * (initialTabata.restPercent / 100));
    tabata.rest = initialTabata.rest;
    console.log("trigger");
  }

  if (initialTabata.rounds === tabata.rounds) {
    initialTabata.rest = Math.floor(initialTabata.work * (initialTabata.restPercent / 100));
  }






  const startTabata = () => {
    setTabata({
      ...tabata,
      isStarted: true,
      work: randomWorkTime,
      rest: randomWorkTime * (tabata.restPercent / 100),
    });
    initialTabata.work = randomWorkTime;
  }
  const stopTabata = () => setTabata(initialTabataState);

  const audio = new Audio();

  const playSound = (sound) => {
    audio.src = sound;
    audio.play();
  };

  useEffect(() => {
    const {
      work, rounds, rest, isStarted, isFinished,
    } = tabata;


    if (rest === 0) {
      playSound(start);
    }
    if (work === 0 && rest === initialTabata.rest && isStarted) {
      playSound(endRound);
    }
    if (work <= 3 && work !== 0 && isStarted) {
      playSound(warning);
    }
    if (isFinished) {
      playSound(end);
    }

    let timer;
    if (isStarted && !isFinished) {
      if (work > 0) {
        timer = setInterval(() => {
          setTabata({
            ...tabata,
            work: work - 1,
          });
        }, 400);
      }

      if (work === 0) {
        timer = setInterval(() => {
          setTabata({
            ...tabata,
            rest: rest - 1,
          });
        }, 400);
      }

      if (rest === 0 && work === 0) {
        setTabata({
          ...tabata,
          rounds: rounds - 1,
        });
      }

      if (rounds === 1 && rest === 0 && work === 0) {
        setTabata({ ...initialTabata, isFinished: true });
      }
    } else {
      clearTimeout(timer);
    }

    if (isFinished) {
      setInitialTabata(initialTabataState);
      setTabata(initialTabataState);
    }

    return () => clearTimeout(timer);
  });

  const handleTabataChange = ({ value, name }) => {
    setInitialTabata({
      ...initialTabata,
      [name]: Number(value),
    });
    setTabata({
      ...tabata,
      [name]: Number(value),
    });
  };

  return {
    tabata,
    startTabata,
    stopTabata,
    handleTabataChange,
  };
};

export { useTabataHook };
