import { useState, useEffect } from 'react';

import {
  start, endRound, warning, end,
} from '../audio';

const defaultTabata = {
  rounds: 5,
  workMin: 15,
  workMax: 25,
  work: 60,
  rest: 10,
  restPercent: 60,
  isStarted: false,
  isFinished: false,
};

const useTabataHook = (initialTabataState = defaultTabata) => {
  const [initialTabata, setInitialTabata] = useState(initialTabataState);
  const [tabata, setTabata] = useState(initialTabata);
  const randWork = Math.floor(Math.random() * (tabata.workMax - tabata.workMin + 1)) + tabata.workMin;
  initialTabata.work = randWork;

  useEffect(() => {
    initialTabata.rest = Math.floor(initialTabata.work * (initialTabata.restPercent / 100));
  }, [tabata.rounds], [tabata.isStarted]);

  useEffect(() => {
    console.log("mount");
    initialTabata.rest = Math.floor(initialTabata.work * (initialTabata.restPercent / 100));
  }, []);





  const startTabata = () => setTabata({
    ...tabata,
    isStarted: true,
    work: randWork,
    rest: initialTabata.rest,
  });
  const stopTabata = () => setTabata(initialTabataState);

  const audio = new Audio();

  const playSound = (sound) => {
    audio.src = sound;
    audio.play();
  };

  console.log("Rest Time:" + tabata.rest);
  console.log("init: " + initialTabata.rest);

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
        }, 1000);
      }

      if (work === 0) {
        timer = setInterval(() => {
          setTabata({
            ...tabata,
            rest: rest - 1,
          });
        }, 1000);
      }

      if (rest === 0 && work === 0) {
        setTabata({
          ...tabata,
          rounds: rounds - 1,
          work: initialTabata.work,
          rest: Math.floor(randWork * tabata.restPercent / 100),
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
