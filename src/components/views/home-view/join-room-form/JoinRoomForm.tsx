import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { Form } from 'components/form/Form';
import { Input } from 'components/input/Input';
import { Button } from 'components/button/Button';
import Heading, { headingVariant } from 'components/heading/Heading';
import { API_BASE_ENDPOINT } from 'shared/config/config';

export type JoinRoomFormProps = {
  className?: string;
}

export const JoinRoomForm = ({ className }: JoinRoomFormProps) => {
  const history = useHistory();
  const [error, setError] = useState(null);

  const handleJoinRoom = async (data) => {
    const { name, roomId } = data;

    try {
      const { data } = await axios({ method: 'GET', url: `${API_BASE_ENDPOINT}/rooms/${roomId}` });

      history.push(`/room?roomId=${data.settings.roomId}&name=${name}`);
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  return (
    <div {...{ className }}>
      <Heading as={headingVariant.h2}>Dołącz do pokoju</Heading>
      <Form onSubmit={handleJoinRoom}>
        <Input name="name" placeholder="Imię" autoComplete="off" />
        <Input name="roomId" placeholder="ID pokoju" autoComplete="off" />

        {error && (
          <>
            {error}
            <br />
          </>
        )}

        <Button type="submit">
          Dołącz
        </Button>
      </Form>
    </div>
  );
};
