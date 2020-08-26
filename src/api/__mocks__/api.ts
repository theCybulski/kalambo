class socket {
  on(eventName: string, callback: (x?: unknown) => void) {
    switch (eventName) {
      case 'msgFromServer':
        callback({
          id: 'test123',
          avatar: '',
          timestamp: new Date().toString(),
          player: 'Test player',
          message: 'Some test message',
          isCorrect: false,
        });
        break;

      default:
        callback('');
    }
  }

  emit() {
    return jest.fn();
  }

  removeAllListeners() {
    return;
  }
}

export default new socket();
