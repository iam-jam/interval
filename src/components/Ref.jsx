import React, { useRef, useEffect, useState } from 'react';

export default () => {
  const [name, setName] = useState('Joe');
  const shouldWelcome = useRef(true);
  console.log('Rendering');
  const changeWelcome = () => {
    shouldWelcome.current = !shouldWelcome.current;
    console.log(shouldWelcome.current);
  }
  useEffect(() => {
    console.log('Use effect')
  });
  return (
    <div>
      <button onClick={changeWelcome}>Welcome</button>
      <button onClick={() => {setName(name === 'John' ? 'Joe' : 'John');}}>Change name</button>
      {shouldWelcome.current && <h1>Hello {name}</h1>}
    </div>
  );
};