export const authenticate = async () => {
    const id = 'apidigicsi';
    const password = 'R89x2seXL';

    const credentials = `${id}:${password}`;
    const encodedCredentials = btoa(credentials);

    try {
        const authResponse = await fetch('https://front.apirecette.digitick-ppe.com/v1.1/authorization/token', {
            method: 'POST',
            headers: {
                'accept': 'application/hal+json',
                'Authorization': `Basic ${encodedCredentials}`
            }
        });

        if (authResponse.ok) {
            const authData = await authResponse.json();
            console.log('Token d\'accès :', authData.accessToken);
            localStorage.setItem('token', authData.accessToken);
            return authData.accessToken;
        } else {
            throw new Error('Erreur lors de l\'authentification.');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}
