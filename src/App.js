import React, { useState } from 'react';

import Play from './components/Play';
import Button from './components/Button';

function App() {

  const [isPlaying, setIsPlaying] = useState(false);
  const [reps, setReps] = useState(3);
  const [train, setTrain] = useState(30);
  const [rest, setRest] = useState(5);

  const handlePlayFinish = () => {
    setIsPlaying(false);
  }

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    switch (name) {
      case 'rest':
        setRest(value);
        break;
      case 'train':
        setTrain(value);
        break;
      case 'reps':
        setReps(value);
        break;
    }
  }

  return (
    <div className="App max-w-md mx-auto shadow-lg bg-white rounded-lg">
      {!isPlaying ?
        <div className="flex flex-col p-4 items-center">
          <input
            className="text-center text-4xl"
            type="text"
            name="rest"
            placeholder="Rest"
            value={rest} 
            onChange={handleInputChange} />
          <input
            className="text-center text-4xl"
            type="text"
            name="train" 
            placeholder="Train"
            value={train}
            onChange={handleInputChange}/>
          <input
            className="text-center text-4xl"
            type="text"
            name="reps" 
            placeholder="Reps"
            value={reps}
            onChange={handleInputChange}/>
            <Button onClick={() => setIsPlaying(true)}>Start</Button>
        </div>
        :
        <Play
          reps={reps}
          repSecs={train}
          restSecs={rest}
          onPlayFinish={handlePlayFinish} />
      }
    </div>
  );
}

export default App;
