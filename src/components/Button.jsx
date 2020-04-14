import React from 'react';

export default (props) => {
  return (<button
    className="rounded bg-teal-500 py-2 px-8 text-white"
    onClick={props.onClick}>
    {props.children}
  </button>
  );
};