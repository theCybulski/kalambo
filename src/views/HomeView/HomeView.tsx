import React from 'react';

import { CreateRoomForm } from 'components/views/home-view/create-room-form/CreateRoomForm';
import { JoinRoomForm } from 'components/views/home-view/join-room-form/JoinRoomForm';

import styles from './HomeView.module.scss';

export const HomeView = () => (
  <div className={styles.wrapper}>
    <div className={styles.formsWrapper}>

      <CreateRoomForm className={styles.formCreate} />
      <JoinRoomForm />

    </div>
  </div>
);
