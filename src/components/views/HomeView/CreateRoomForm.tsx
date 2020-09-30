import React from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStores } from 'hooks/useStores';
import axios from 'axios';
import Form from 'components/Form/Form';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';

import { API_BASE_ENDPOINT } from 'shared/config/config';
import socket from 'api/api';
import Heading, { headingVariant } from '../../Heading/Heading';

const CreateRoomForm: React.FC = observer(() => {
  const {
    playerStore: { setLocalPlayer },
    roomStore: { setRoomSettings },
  } = useStores();
  const history = useHistory();

  const handleCreateRoom = (data) => {
    const { name } = data;

    console.log(socket);
    axios({
      method: 'get',
      url: `${API_BASE_ENDPOINT}/api/v1/create_room?adminName=${name}&socketId=${socket.id}`,
    })
      .then(({ data }) => {
        if (data.error) return console.log(new Error(data.error));
        setLocalPlayer(data.player);
        setRoomSettings(data.room);

        history.push(`/room?id=${data.room.roomNo}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Heading as={headingVariant.h2}>Create new room</Heading>
      <Form onSubmit={handleCreateRoom} resetOnSubmit>
        <Input
          name="name"
          placeholder="Your name"
          autoComplete="off"
          data-cy="input-name-create"
          isRequired
        />

        <Button type="submit" data-cy="btn-create-room">
          Create Room
        </Button>
      </Form>
    </>
  );
});

export default CreateRoomForm;
