import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStores } from 'hooks/useStores';
import Form from 'components/Form/Form';
import Input from 'components/Input/Input';

import socket from 'api/api';
import Button from 'components/Button/Button';
import Heading, { headingVariant } from 'components/Heading/Heading';

const JoinRoomForm: React.FC = observer(() => {
  const {
    playerStore: { setLocalPlayer },
    roomStore: { setRoomSettings, joinRoom },
  } = useStores();
  const history = useHistory();

  const [error, setError] = useState(null);

  const handleJoinRoom = (data) => {
    const roomNo = data.roomNo.replace(/\s/g, '');
    joinRoom(data.name, socket.id, roomNo)
      .then(({ data }) => {
        if (data.error) {
          setError(data.error);
          return console.log(new Error(data.error));
        }

        setLocalPlayer(data.player);
        setRoomSettings(data.room);

        history.push(`/room?id=${data.room.roomNo}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Heading as={headingVariant.h2}>Join existing room</Heading>
      <Form onSubmit={handleJoinRoom}>
        <Input name="name" placeholder="Your name" autoComplete="off" />
        <Input name="roomNo" placeholder="Room number" autoComplete="off" />

        {error && (
          <>
            {error}
            <br />
          </>
        )}

        <Button type="submit">Join Room</Button>
      </Form>
    </>
  );
});

export default JoinRoomForm;
