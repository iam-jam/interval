import nextTick from './nextTick'; 
import { 
  PLAYBACK_WORK,
  PLAYBACK_REST,
  PLAYBACK_FINISHED 
} from 'constants/playBack'

it('The next second begins in a rep', () => {
  expect(nextTick({
      currentState: PLAYBACK_WORK,
      totalReps: 2,
      secondsPerRep: 5,
      secondsPerRest: 3,
      wasResting: false,
      currentSecond: 2,
      currentRep: 1
    }))
    .toMatchObject({
      nextSecond: 3,
      nextState: PLAYBACK_WORK,
      nextRep: 1
    });
});

it('The next second begins in a rest', () => {
  expect(nextTick({
      currentState: PLAYBACK_REST,
      totalReps: 4,
      secondsPerRep: 5,
      secondsPerRest: 3,
      wasResting: true,
      currentSecond: 2,
      currentRep: 1
    }))
    .toMatchObject({
      nextSecond: 3,
      nextState: PLAYBACK_REST,
      nextRep: 1
    });
});

it('A rest begins following a rep', () => {
  expect(nextTick({
      currentState: PLAYBACK_WORK,
      totalReps: 5,
      secondsPerRep: 5,
      secondsPerRest: 3,
      wasResting: false,
      currentSecond: 5,
      currentRep: 2
    }))
    .toMatchObject({
      nextSecond: 1,
      nextState: PLAYBACK_REST,
      nextRep: 2
    });
});

it('A rep begins following a rest', () => {
  expect(nextTick({
      currentState: PLAYBACK_REST,
      totalReps: 5,
      secondsPerRep: 10,
      secondsPerRest: 3,
      wasResting: true,
      currentSecond: 3,
      currentRep: 2
    }))
    .toMatchObject({
      nextSecond: 1,
      nextState: PLAYBACK_WORK,
      nextRep: 3
    });
});

it('The cycle finishes following the last rep', () => {
  expect(nextTick({
      currentState: PLAYBACK_WORK,
      totalReps: 5,
      secondsPerRep: 10,
      secondsPerRest: 3,
      wasResting: false,
      currentSecond: 10,
      currentRep: 5
    }))
    .toMatchObject({
      nextSecond: 10,
      nextState: PLAYBACK_FINISHED,
      nextRep: 5
    });
});

it('There\s no rest on a 1 rep cycle', () => {
  expect(nextTick({
      currentState: PLAYBACK_WORK,
      totalReps: 1,
      secondsPerRep: 7,
      secondsPerRest: 3,
      wasResting: false,
      currentSecond: 7,
      currentRep: 1
    }))
    .toMatchObject({
      nextSecond: 7,
      nextState: PLAYBACK_FINISHED,
      nextRep: 1
    });
});

it('The cycle finishes after 2 reps', () => {
  expect(nextTick({
      currentState: PLAYBACK_WORK,
      totalReps: 2,
      secondsPerRep: 30,
      secondsPerRest: 5,
      wasResting: false,
      currentSecond: 30,
      currentRep: 2
    }))
    .toMatchObject({
      nextSecond: 30,
      nextState: PLAYBACK_FINISHED,
      nextRep: 2
    });
});
