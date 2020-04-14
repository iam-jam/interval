import { 
  PLAYBACK_WORK,
  PLAYBACK_REST,
  PLAYBACK_FINISHED 
} from 'constants/playBack'

export default ({
  totalReps,
  secondsPerRep,
  secondsPerRest,
  currentState,
  currentSecond,
  currentRep
}) => {
  let nextSecond = currentSecond;
  let nextRep = currentRep;
  let nextState = currentState;

  if (
    currentSecond === secondsPerRep 
    && currentState !== PLAYBACK_REST 
    && currentRep !== totalReps
    ) {
    nextState = PLAYBACK_REST;
    nextSecond = 1;
  }
  else {
    if (currentState === PLAYBACK_REST ) {
      if (currentSecond < secondsPerRest) {
        nextSecond = currentSecond + 1;
        nextState = PLAYBACK_REST;
      }
      else {
        nextSecond = 1;
        nextRep = currentRep + 1;
        nextState = PLAYBACK_WORK;
      }
    }
    else if (currentSecond < secondsPerRep) {
      nextSecond = currentSecond + 1;
    }
    else {
      nextState = PLAYBACK_FINISHED;
    }
  }

  return {
    nextSecond,
    nextRep,
    nextState
  }
};