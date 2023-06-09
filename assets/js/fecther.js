
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
