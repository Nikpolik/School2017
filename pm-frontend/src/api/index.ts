export default async function apiCall(url: string, body: any, method: string): Promise<any> {
    let headers = new Headers();
    headers.set('Content-Type', 'application/json');
    return fetch(url, {
        method,
        headers,
        body: JSON.stringify(body)
    }).then((response) => {
        return response.json();
    });
}