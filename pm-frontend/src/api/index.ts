export default async function apiCall(path: string, method: string, secure: boolean, body?: any): Promise<any> {
    let headers = new Headers();
    const baseUrl = 'http://localhost:9100/'
    const url = baseUrl + path
    console.log(url);
    headers.set('Content-Type', 'application/json');
    const token = localStorage.getItem('token');
    if(secure) {
        if(!token) {
            throw new Error('Tried to get secure resource but you are not logged in');
        }
        headers.set('x-access-token', token);        
    }
    const options: any = {
        method,
        headers,
    }
    if(body) {
        options.body = JSON.stringify(body)        
    }
    return fetch(url, options).then((response) => {
        if(response.status == 403) {
            console.log('something bad happened');
        }
        return response.json();
    });
}