import axios from 'axios';

const DEFAULT_TIMEOUT = 15000;

let requestIndex = 0;
const cancelRequestMap = {};

export default function configureTimeout(config) {
    requestIndex += 1;
    const currentRequestIndex = requestIndex;
    config.cancelToken = new axios.CancelToken((cancelExecutor) => {
        cancelRequestMap[currentRequestIndex] = cancelExecutor;
    });

    const timeout = config.timeout || DEFAULT_TIMEOUT;
    setTimeout(() => {
        if (cancelRequestMap[currentRequestIndex] instanceof Function) {
            cancelRequestMap[currentRequestIndex]('ECONNABORTED');
            cancelRequestMap[currentRequestIndex] = null;
        }
    }, timeout);

    return config;
}
