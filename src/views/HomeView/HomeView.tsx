import React from 'react';
import { observer } from 'mobx-react';
import CreateRoomForm from 'components/views/HomeView/CreateRoomForm';

import * as Styled from './HomeViewStyles';
import JoinRoomForm from 'components/views/HomeView/JoinRoomForm';

const HomeView: React.FC = observer(() => {
  return (
    <Styled.Wrapper>
      <Styled.FormsWrapper>
        <CreateRoomForm />
        <br />
        <br />
        <br />
        <JoinRoomForm />
      </Styled.FormsWrapper>
    </Styled.Wrapper>
  );
});

export default HomeView;
