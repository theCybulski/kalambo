const setApiEndpoint = () => {
    if (process.env.NODE_ENV === 'development') {
        // Running locally
        return 'http://192.168.0.14:4000';
    }
    if (process.env.NODE_ENV === 'production') {
        // TODO: change after establishing production server
        return 'http://thecybulski.com';
    }
};

export const API_BASE_ENDPOINT = setApiEndpoint();