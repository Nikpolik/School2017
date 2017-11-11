export async function login(username: string, password: string): Promise<any> {
    console.log('asking ofr the token');
    console.log({username, password});
    let headers = new Headers();
    headers.set('Content-Type', 'application/json');

    return fetch('http://localhost:3000/authenticate', {
        method: 'POST',
        headers,
        body: JSON.stringify({username, password})
    }).then((response) => {
        return response.json();
    });
}