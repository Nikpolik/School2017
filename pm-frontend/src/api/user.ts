// export async function login(username: string, password: string): Promise<any> {
//     console.log('asking for the token');
//     fetch('http://localhost:3000/login', {
//         method: 'POST',
//         body: JSON.stringify({
//             username,
//             password
//         })
//     }).then((response) => {
//         if(response.status ==200) {
//             console.log('status ok');
//             return response.json();
//         } else {
//             console.log('Network failure: ' + response.status);      
//             throw new Error(response.statusText);      
//         }
//     }).then((json) => {
//         console.log('JSON:');
//         console.log(JSON.stringify(json));
//         return(json);
//     }).catch((error) => {
//         console.log(error);
//     });
// }

export async function login(username: string, password: string): Promise<JSON> {
    console.log('asking ofr the token');
    return fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        })
    }).then((response) => {
        return response.json();
    });
}