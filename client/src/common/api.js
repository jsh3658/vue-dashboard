import axios from 'axios';
import JSONbig from 'json-bigint';

// const async = axios;
const getAsyncCall = (type, url) => {
    const config = {
        headers: {
            'content-type': 'application/json;'
        },
        transformResponse: (res) => {
            return JSONbig.parse(res);
        }
    };
    return axios[type.toLowerCase()](url, config)
};

export default getAsyncCall;