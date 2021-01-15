import React, { useEffect, useMemo, useState } from 'react';

import Heading, { headingVariant } from '../../heading/Heading';

import styles from './Timer.module.scss';

export type TimerProps = {
  isOn: boolean;
  startedAt: Date;
  duration: number;
}

export const Timer = ({ isOn, startedAt, duration }: TimerProps) => {
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    if (isOn) {
      const timerInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const startTime = new Date(startedAt).getTime();

        const isTimeUp = currentTime - startTime >= duration;

        setTimer(duration - (currentTime - startTime));

        if (isTimeUp) clearInterval(timerInterval);
      }, 1000);

      return () => clearInterval(timerInterval);
    }
    setTimer(0);
  }, [isOn, duration, startedAt]);

  const displayTimer = useMemo(() => {
    const min = Math.floor(timer / 60000);
    const sec = parseInt(((timer % 60000) / 1000).toFixed(0), 10);

    if (sec === 0 && min === 0) return '0:00';

    return `${min}:${sec < 10 ? `0${sec}` : sec}`;
  }, [timer]);

  return (
    <Heading
      as={headingVariant.h3}
      className={styles.wrapper}
      data-cy="round-timer"
    >
      {displayTimer}
    </Heading>
  );
};
