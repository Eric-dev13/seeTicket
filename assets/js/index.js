import { authenticate } from './auth.js';
import { getData } from './fecther.js';


// Click sur le btn d'authentification
document.querySelector('#auth').addEventListener('click', async () => {
    const token = await authenticate();
    console.log('Token', token);
});


const getDateNow = () => {
    // Obtention de la date actuelle
    var date = new Date();

    // Obtention de l'année, du mois et du jour
    var annee = date.getFullYear();
    var mois = ("0" + (date.getMonth() + 1)).slice(-2); // Les mois commencent à partir de 0
    var jour = ("0" + date.getDate()).slice(-2);

    // Formatage de la date
    return (annee + "-" + mois + "-" + jour);
}


// Requête d'authentification + requete pour obtenir la liste des évenements
const start = async () => {
    let token = await authenticate();
    console.log('Token: ',token);
    const evenements = await getData(`https://front.apirecette.digitick-ppe.com/v1.1/distribution/salesChannels/13357/calendar/day/2023-06-09?lang=fr`);
    console.log('Evenements', evenements._embedded.hours)
    root.innerHTML += `
                <div class="d-flex justify-content-end w-100 align-items-center py-3">
                    <select id="langues" class="custom-select bg-dark text-white" style="width: 150px;">
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                    </select>
                </div>

                <h1 class="text-center fw-bold">Nos évenements</h1>
                `

    evenements._embedded.hours.map(evenement => {
        root.innerHTML += `
            <a href="#" data-showId = "${evenement.showId}" class="eventDetail">
                <div class="d-flex flex-column align-items-center justify-content-center mb-2">
                    <div class="card" style="width: 18rem;">
                        <img src="assets/img/bg.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title fw-bold">${evenement.eventName}</h5>
                            <small class="text-muted fw-semibold">${evenement.dateStart}</small>

                        </div>
                    </div>
                </div>
            </a>
            `
    });
    getDetailPrices()
}


// Place un écouteur sur chaque évenement pour requêter les offres de prix
const getDetailPrices = () => {
    const allEventDetail = document.querySelectorAll('.eventDetail')
    for (let index = 0; index < allEventDetail.length; index++) {
        const element = allEventDetail[index];
        allEventDetail[index].addEventListener('click', async () => {
            const showId = allEventDetail[index].getAttribute('data-showId');
            const eventPrices = await getData(`https://front.apirecette.digitick-ppe.com/v1.1/distribution/salesChannels/13357/shows/${showId}/prices`)
            console.log('Détail', eventPrices._embedded.prices[0]);
        });
    }
}


// AU CHARGEMENT DE LA PAGE
start();
