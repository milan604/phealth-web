import Cookie from "js.cookie";


export function authHeader() {
    return {
        'Accept': 'application/json',
        'access-token': Cookie.get('accesstoken'),
        'client': Cookie.get('client'),
        'Content-Type': 'application/json', // TODO: verify from request headers
        'expiry': Cookie.get('expiry'),
        'uid': Cookie.get('uid')
    }
}

export default authHeader
