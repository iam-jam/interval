import React, { useState, useRef, useEffect } from 'react'
import Button from './Button';
import classNames from 'classnames';
import nextTick from 'logic/nextTick';
import { formatTimer } from 'utils/time';

import { 
  PLAYBACK_WORK,
  PLAYBACK_REST,
  PLAYBACK_FINISHED,
  PLAYBACK_PAUSED 
} from 'constants/playBack';

export default ({ reps, repSecs, restSecs, onPlayFinish }) => {

  const [seconds, setSeconds] = useState(1);
  const [playbackState, setPlaybackState] = useState(PLAYBACK_WORK);
  const [rep, setRep] = useState(1);
  const savedCallback = useRef();

  const defaulClassNames = (defaultNames) => {
    let defaults = {};
    for (const defaultName of defaultNames) {
      defaults[defaultName] = true;
    }
    return defaults;
   };

  const reset = () => {
    onPlayFinish();
  }

  const togglePause = () => {
    if (playbackState === PLAYBACK_WORK) {
      setPlaybackState(PLAYBACK_PAUSED);
    }
    else {
      setPlaybackState(PLAYBACK_WORK);
    }
  }

  function intCallback() {

    const {
      nextSecond,
      nextState,
      nextRep
    } = nextTick({
      totalReps: Number(reps),
      secondsPerRep: Number(repSecs),
      secondsPerRest: Number(restSecs),
      currentState: playbackState,
      currentSecond: seconds,
      currentRep: Number(rep)
    });
    setSeconds(nextSecond);
    setPlaybackState(nextState);
    setRep(nextRep);

  }

  useEffect(() => {
    // This is re-assigned everytime the state changes, i.e. count
    savedCallback.current = intCallback;
  });

  useEffect(() => {
    // Setting up the interval

    function tick() {
      savedCallback.current();
    }
    if (
      playbackState !== PLAYBACK_PAUSED
      && playbackState !== PLAYBACK_FINISHED
      ) {
      let int = setInterval(tick, 1000);
      return () => clearInterval(int);
    }
  }, [playbackState]);

  const getRepDots = () => {
    let dots = [];
    const dotClasses = defaulClassNames([
      'mx-2',
      'rounded-full',
      'border-white',
      'border',
      'w-6',
      'h-6',
      'text-center',
      'flex',
      'items-center',
      'justify-center',
      'text-sm',
    ]);
    for (let i = 1; i <= reps; i++) {
      const isDone = (i < rep || (rep === reps && playbackState === PLAYBACK_FINISHED));
      dots.push(
        <p key={i}
          className={classNames({
            ...dotClasses,
            'bg-white': isDone,
            'text-gray-900': isDone
          })}>
          {i}
        </p>
      );
    }
    return dots;
  };

  const messageClasses = defaulClassNames([
    'rounded-full',
     'bg-red-600',
     'py-2',
     'px-4',
     'text-white',
     'text-sm',
     'font-bold',
     'uppercase',
     'w-24',
     'text-center',
     'leading-none',
     'transition-colors',
     'duration-75'
  ]);

  const verbs = {}; 
  verbs[PLAYBACK_PAUSED] = 'Paused';
  verbs[PLAYBACK_WORK] = 'Work';
  verbs[PLAYBACK_REST] = 'Rest';
  verbs[PLAYBACK_FINISHED] = 'Finished';
  const verb = verbs[playbackState] || verbs[PLAYBACK_WORK];

  const message = 
    <p
      className={classNames({
        ...messageClasses,
        'bg-orange-600': playbackState === PLAYBACK_PAUSED,
        'bg-red-600': playbackState === PLAYBACK_REST,
        'bg-green-600': playbackState === PLAYBACK_WORK,
        'bg-yellow-600': playbackState === PLAYBACK_FINISHED,
      })}>
      {verb}
    </p>

  const counter =
    <p className="text-5xl font-mono">{formatTimer(seconds)}</p>

  const repDots =
    <div className="flex justify-center w-full">
      {getRepDots()}
    </div>

  return (
    <div className="Play">
      <div className="bg-gray-900 text-white py-10 px-4 rounded-t-lg flex flex-col items-center justify-center">
        {message}
        {counter}
        {repDots}
      </div>
      <div className="actions p-4 flex items-center justify-around">
        <Button onClick={togglePause}>Toggle pause</Button>
        <Button onClick={reset}>Reset</Button>
      </div>
    </div>
  )
};