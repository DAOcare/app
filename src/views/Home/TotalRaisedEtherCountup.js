import React, { useState, useEffect, useRef } from 'react';
import { useCountUp } from 'react-countup';

export default ({ totalRaised }) => {
  const res = totalRaised.toString().split('.');
  console.log(res);
  const decimals = parseInt(res[1].substring(0, 9));

  const num = res[1];
  const regex = /^0*/g;
  const leadingZeros = num.match(regex);

  const [styles, setStyles] = useState({});
  const ref = useRef(0);
  const { countUp, start, pauseResume, reset, update } = useCountUp({
    start: decimals,
    end: decimals,
    delay: 1000,
    duration: 1,
    redraw: false,
    preserveValue: true, // This line is extremely important, otherwise it always starts from zero!!
  });

  useEffect(() => {
    let timeout;
    if (ref.current !== decimals) {
      ref.current = decimals;
      if (ref.current === 0) {
        if (decimals !== 0) {
          start();
        }
      } else {
        update(decimals);
        setStyles({ color: 'purple', fontWeight: 'bold' });
        timeout = setTimeout(() => setStyles({}), 1000);
      }
    }
    return () => clearTimeout(timeout);
  }, [totalRaised]);

  return (
    <React.Fragment>
      <span style={styles}>
        {res[0]}.{leadingZeros}
        {countUp}
      </span>
    </React.Fragment>
  );
};
