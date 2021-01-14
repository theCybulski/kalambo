import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import axios from "axios";

import Form from "components/Form/Form";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import Heading, { headingVariant } from "components/Heading/Heading";
import { API_BASE_ENDPOINT } from "shared/config/config";

const JoinRoomForm: React.FC = observer(() => {
  const history = useHistory();
  const [error, setError] = useState(null);

  const handleJoinRoom = async (data) => {
    const { name, roomId } = data;

    try {
      const { data } = await axios({ method: "GET", url: `${API_BASE_ENDPOINT}/rooms/${roomId}` });

      history.push(`/room?roomId=${data.settings.roomId}&name=${name}`);
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  return (
    <>
      <Heading as={headingVariant.h2}>Join existing room</Heading>
      <Form onSubmit={handleJoinRoom}>
        <Input name="name" placeholder="Your name" autoComplete="off"/>
        <Input name="roomId" placeholder="Room ID" autoComplete="off"/>

        {error && (
          <>
            {error}
            <br/>
          </>
        )}

        <Button type="submit">Join Room</Button>
      </Form>
    </>
  );
});

export default JoinRoomForm;
