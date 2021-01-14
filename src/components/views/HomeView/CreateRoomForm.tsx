import React from "react";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import axios from "axios";

import Form from "components/Form/Form";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import Heading, { headingVariant } from "components/Heading/Heading";
import { API_BASE_ENDPOINT } from "shared/config/config";

const CreateRoomForm: React.FC = observer(() => {
  const history = useHistory();

  const handleCreateRoom = (data) => {
    const { name } = data;

    axios({
      method: "POST",
      url: `${API_BASE_ENDPOINT}/rooms`
    })
      .then(({ data }) => {
        if (data.error) return console.log(new Error(data.error));

        history.push(`/room?roomId=${data}&name=${name}`);
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
