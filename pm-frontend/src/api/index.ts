export default async function apiCall(url: string, body: any, method: string, secure: boolean): Promise<any> {
    let headers = new Headers();
    headers.set('Content-Type', 'application/json');
    const token = localStorage.getItem('token');
    if(secure) {
        if(!token) {
            throw new Error('Tried to get secure resource but you are not logged in');
        }
        body.token = token;
    }
    return fetch(url, {
        method,
        headers,
        body: JSON.stringify(body)
    }).then((response) => {
        return response.json();
    });
}