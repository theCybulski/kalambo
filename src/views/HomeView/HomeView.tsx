import React from "react";

import CreateRoomForm from "components/views/HomeView/CreateRoomForm";
import JoinRoomForm from "components/views/HomeView/JoinRoomForm";

import * as Styled from "./HomeViewStyles";

export const HomeView = () => {
  return (
    <Styled.Wrapper>
      <Styled.FormsWrapper>
        <CreateRoomForm/>
        <br/>
        <br/>
        <br/>
        <JoinRoomForm/>
      </Styled.FormsWrapper>
    </Styled.Wrapper>
  );
};
