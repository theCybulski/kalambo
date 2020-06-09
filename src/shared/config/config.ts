const apiBaseEndpoint = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:4000';
  }
  if (process.env.NODE_ENV === 'production') {
    return 'https://kalambury-be.herokuapp.com';
  }
};

const appBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'localhost:3000';
  }
  if (process.env.NODE_ENV === 'production') {
    return 'https://kalambury-be.herokuapp.com';
  }
};

export const API_BASE_ENDPOINT = apiBaseEndpoint();
export const APP_BASE_URL = appBaseUrl();
