import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import 'mobx-react-lite/batchingForReactDom'

Enzyme.configure({ adapter: new Adapter() });
