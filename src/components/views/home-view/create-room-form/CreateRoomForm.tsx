import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { Form } from 'components/form/Form';
import { Input } from 'components/input/Input';
import { Button } from 'components/button/Button';
import Heading, { headingVariant } from 'components/heading/Heading';
import { API_BASE_ENDPOINT } from 'shared/config/config';

export type CreateRoomFormProps = {
  className?: string;
}

export const CreateRoomForm = ({ className }: CreateRoomFormProps) => {
  const history = useHistory();

  const handleCreateRoom = (data) => {
    const { name } = data;

    axios({
      method: 'POST',
      url: `${API_BASE_ENDPOINT}/rooms`,
    })
      .then(({ data }) => {
        if (data.error) return console.log(new Error(data.error));

        history.push(`/room?roomId=${data}&name=${name}`);
      })
      .catch(error => console.log(error));
  };

  return (
    <div {...{ className }}>
      <Heading as={headingVariant.h2}>
        Stwórz nowy pokój
      </Heading>
      <Form onSubmit={handleCreateRoom} resetOnSubmit>
        <Input
          name="name"
          placeholder="Imię"
          autoComplete="off"
          data-cy="input-name-create"
          isRequired
        />

        <Button type="submit" data-cy="btn-create-room">
          Stwórz
        </Button>
      </Form>
    </div>
  );
};
