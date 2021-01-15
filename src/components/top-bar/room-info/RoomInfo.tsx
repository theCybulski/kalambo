import React from 'react';

import Heading, { headingVariant } from 'components/heading/Heading';
import { Button } from 'components/button/Button';

import { Timer } from '../timer/Timer';
import styles from './RoomInfo.module.scss';

export type RoomInfoProps = {
  drawingPlayerName: string;
  adminName: string;
  handleSetPlayerReady: () => void;
  roomId: string;
  isRoundOn: boolean;
  isLocalPlayerReady: boolean;
  roundStartedAt: Date;
  roundLength: number;
}

export const RoomInfo = ({
  adminName,
  drawingPlayerName,
  handleSetPlayerReady,
  roomId,
  isRoundOn,
  isLocalPlayerReady,
  roundStartedAt,
  roundLength,
}: RoomInfoProps) => (
  <div className={styles.wrapper}>
    <Heading as={headingVariant.h3} className={styles.info}>
      Pokój: {roomId}
      <span>
        Admin: {adminName}
        {drawingPlayerName && ` | Rysujący: ${drawingPlayerName}`}
      </span>
    </Heading>
    {!isRoundOn ? (
      <Button
        onClick={handleSetPlayerReady}
        data-cy="btn-ready"
      >
        {isLocalPlayerReady ? 'Jeszcze chwilę' : 'Grajmy'}
      </Button>
    ) : (
      <Timer
        isOn={isRoundOn}
        startedAt={roundStartedAt}
        duration={roundLength}
      />
    )}
  </div>
);
