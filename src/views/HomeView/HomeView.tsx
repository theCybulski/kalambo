import React from 'react';
import 'mobx-react-lite/batchingForReactDom';
import { observer } from 'mobx-react';

const HomeView: React.FC = observer(() => {
  const viewName = 'Home view';

  return (
    <div>
      <h1>{viewName}</h1>
    </div>
  );
});

export default HomeView;
