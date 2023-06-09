export const authenticate = async () => {
    const id = 'apidigicsi';
    const password = 'R89x2seXL';

    const credentials = `${id}:${password}`;
    const encodedCredentials = btoa(credentials);

    const requestOptions = {
        method: 'POST',
        headers: {
            'accept': 'application/hal+json',
            'Authorization': `Basic ${encodedCredentials}`
        },
    };
    return fetch('https://front.apirecette.digitick-ppe.com/v1.1/authorization/token', requestOptions)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('token', data.accessToken);
            return data;
            }
        );
}

