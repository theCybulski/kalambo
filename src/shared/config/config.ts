const apiBaseEndpoint = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://kalambury-be.herokuapp.com';
  }
  // else development
  return 'http://localhost:4000';
};

const appBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://kalambury-be.herokuapp.com';
  }
  // else development
  return 'localhost:3000';
};

export const API_BASE_ENDPOINT = apiBaseEndpoint();
export const APP_BASE_URL = appBaseUrl();
