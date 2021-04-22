const request = require('request-promise-native');
const config = require('./config');

const restClient = {
    getToken: (keys) => {
        const options = {
            method: 'POST',
            uri: `${config.apiBaseUrl}/v1/token`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            auth: {
                'user': keys.apiConsumerKey,
                'pass': keys.apiConsumerSecret
            },
            form: {
                'grant_type': 'client_credentials'
            },
            json: true
        };

        return request(options)
            .then((body) => {
                return body;
            });
    },

    getBranch: (dprn, token) => {
        const options = {
            uri: `${config.apiBaseUrl}/fif-branch/branches/${dprn}`,
            headers: {
                'Accept': 'application/vnd.fif.api.v1+json',
            },
            auth: {
                'bearer': token,
            },
            json: true
        };

        return request(options)
            .then((body) => {
                return body;
            });
    },

    getMaster: (token) => {
        const options = {
            uri: `${config.apiBaseUrl}/fif-extracts/extracts/master`,
            headers: {
                'Accept': 'application/vnd.fif.api.v1+json',
            },
            auth: {
                'bearer': token,
            },
            json: true
        };

        return request(options)
            .then((body) => {
                return body;
            });
    }
};

module.exports = restClient;
