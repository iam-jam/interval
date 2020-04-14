import React, { useState, useEffect } from 'react';

const Play = ({secondsPerRep, reps}) => {
  const [progress, setProgress] = useState({rep: 1, seconds: 1});
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    let timer;
    if (!paused) {
      timer = setInterval(() => {
        setProgress(currentProgress => {
          let seconds = currentProgress.seconds;
          let rep = currentProgress.rep;
          if (seconds < secondsPerRep) {
            seconds = seconds + 1;
          }
          else if (rep < reps) {
            seconds = 1;
            rep = rep + 1;
          }
          return {seconds, rep};
        })
      }, 1000);
    }
    return () => { clearInterval(timer) }
  }, [paused]);

  return (
    <div>
      <div>
        <button onClick={() => {setPaused(!paused)}}>
          {paused ? 'Start' : 'Stop'}
        </button>
        <p>{progress.rep}</p>
        <p>{progress.seconds}</p>
      </div>

    </div>
  );
}

export default Play;