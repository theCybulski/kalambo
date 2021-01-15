import React from 'react';

import { Button, BUTTON_VARIANTS } from 'components/button/Button';

import styles from './Controls.module.scss';
import Heading, { headingVariant } from '../../heading/Heading';
import { BUTTON_ICON_VARIANTS, ButtonIcon } from '../../button-icon/ButtonIcon';

export type ControlsProps = {
  isEverybodyReady: boolean;
  onStartRound: () => void;
  isRoundOn: boolean;
  isAdmin: boolean;
  roundNo: number;
  score: string;
}

export const Controls = ({
  isEverybodyReady,
  isRoundOn,
  isAdmin,
  roundNo,
  onStartRound,
  score = '0',
}: ControlsProps) => (
  <div className={styles.wrapper}>
    <div className={styles.left}>
      {isAdmin && !isRoundOn ? (
        <Button
          onClick={onStartRound}
          disabled={!isEverybodyReady || isRoundOn}
          data-cy="btn-start-round"
          variant={BUTTON_VARIANTS.ORANGE}
        >
          Start
        </Button>

      ) : (
        <Heading
          as={headingVariant.h3}
          className={styles.roundCounter}
          data-cy="round-counter"
        >
          Runda #{roundNo}
        </Heading>
      )}
    </div>
    <div className={styles.right}>
      <ButtonIcon
        variant={BUTTON_ICON_VARIANTS.SCORE_BOARD}
        className={styles.scoreBoard}
      >
        {score}
      </ButtonIcon>
      <ButtonIcon variant={BUTTON_ICON_VARIANTS.SETTINGS} />
    </div>
  </div>
);
