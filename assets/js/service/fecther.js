// Requête GET sur une route privée
export const getData = async (url) => {
    const token = localStorage.getItem('token');

    // GET request using fetch inside useEffect React hook
    const requestOptions = {
        method: 'GET',
        headers: {
            'accept': 'application/hal+json',
            'Authorization': `Bearer ${token}`
        },
    };
    return fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
                return data;
            }
        );
}

// Requête POST sur une route privée
export const postData = async (url) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'accept': 'application/hal+json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    };
    return fetch('url', requestOptions)
        .then(response => response.json())
        .then(data => {
            return data;
            }
        ).catch((error) => {
            console.log(error.message);
        });
}
