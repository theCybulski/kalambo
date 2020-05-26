import React from 'react';

import * as Styled from './TopBarStyles';

const TopBar: React.FC = () => {
  return (
    <Styled.Wrapper>
      <Styled.Grid>
        <Styled.InfoWrapper>
          <Styled.Info>
            Room: 198 543
            <span>Admin: Eric Koston</span>
          </Styled.Info>
          <Styled.Timer>01:30</Styled.Timer>
        </Styled.InfoWrapper>
        <Styled.ControlsWrapper>
          <h1>Controls</h1>
        </Styled.ControlsWrapper>
      </Styled.Grid>
    </Styled.Wrapper>
  );
};

export default TopBar;
