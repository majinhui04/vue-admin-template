const TokenKey = 'Admin-Token';
const UserKey = 'Admin-uuid';

export function getToken() {
    return sessionStorage.getItem(TokenKey);
}

export function setToken(token) {
    return sessionStorage.setItem(TokenKey, token);
}

export function removeToken() {
    sessionStorage.removeItem(TokenKey);
}

export function getUserInfo() {
    try {
        return JSON.parse(sessionStorage.getItem(UserKey));
    } catch (e) {
        return null;
    }
}

export function setUserInfo(data) {
    return sessionStorage.setItem(UserKey, JSON.stringify(data));
}

export function removeUserInfo() {
    return sessionStorage.removeItem(UserKey);
}
