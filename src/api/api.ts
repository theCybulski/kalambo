import io from 'socket.io-client';

import { API_BASE_ENDPOINT } from 'shared/config/config';

const socket = io(API_BASE_ENDPOINT);

export default socket;