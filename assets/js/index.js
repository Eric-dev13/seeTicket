import { authenticate } from './security/auth.js';
import { getData } from './service/fecther.js';

// Stockage du token d'authentification
let token = '';

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


// Requete pour obtenir la liste des évenements
const showEvents = async () => {
    const evenements = await getData(`https://front.apirecette.digitick-ppe.com/v1.1/distribution/salesChannels/13357/calendar/day/${getDateNow()}?lang=fr`);
    console.log('Evenements', evenements._embedded.hours)
    root.innerHTML = `
                <div class="d-flex justify-content-end py-3">
                    <select id="langues" class="custom-select text-bg-dark rounded p-1" style="width: 150px;">
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                    </select>
                </div>

                <h1 class="text-center fw-bold mb-4">Nos évenements</h1>
                ${eventDetail(evenements)}
                `
    getDetailPrices();
}

const eventDetail = (evenements) =>{
    let data= '';
    evenements._embedded.hours.map(evenement => { 
        data += `
                <div data-showId = "${evenement.showId}" class="eventDetail d-flex flex-column align-items-center justify-content-center mb-4" style="cursor:pointer;">
                    <div class="card" style="width: 18rem;">
                        <img src="assets/img/bg.jpg" class="card-img-top" alt="...">
                        <div class="card-body p-0">
                            <h5 class="card-title fw-bold text-center">${evenement.eventName}</h5>
                            <p class="text-muted fw-semibold text-center">${evenement.dateStart.split(' ')[0]}</p>
                        </div>
                    </div>
                </div>
            `
    });
     return data;
}


// Place un écouteur sur chaque évenement pour requêter les offres de prix.
const getDetailPrices = () => {
    const allEventDetail = document.querySelectorAll('.eventDetail');
    for (let index = 0; index < allEventDetail.length; index++) {
        const element = allEventDetail[index];
        allEventDetail[index].addEventListener('click', async () => {
            const showId = allEventDetail[index].getAttribute('data-showId');
            const eventPrices = await getData(`https://front.apirecette.digitick-ppe.com/v1.1/distribution/salesChannels/13357/shows/${showId}/prices`)
            console.log('Détail', eventPrices._embedded.prices);
            showDetail(eventPrices._embedded.prices);
        });
    }
}

const showDetail = (data) => {
    root.innerHTML = `
    <div class="accordion" id="accordionExample">
        <div class="accordion-item">
            <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Places
            </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                ${getContent(data)}
                <div class="footer d-flex justify-content-between align-items-center p-2 mb-3" style="background-color: #40E0D0;">
                    <h2 class="text-white m-0">Total</h2>
                    <h2 class="text-white m-0"><span id="totalPrice">0</span></h2>
                </div>
            </div>
        </div>

        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Coordonnées
                </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <h6 class="mb-3">Ajoute ton adresse e-mail pour recevoir ton billet</h6>
                    <form>
                        <div class="mb-3">
                            <label for="email" class="form-label">Adresse e-mail</label>
                            <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
                        </div>
                        <div class="mb-3">
                            <label for="emailConfirmation" class="form-label">Confirmation de l'adresse e-mail</label>
                            <input type="email" class="form-control" id="emailConfirmation">
                        </div>
                    </form>
                </div> 
            </div>
        </div>

        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseTwo">
                    Paiement
                </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
            </div>
        </div>

        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Description
                </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
            </div>
        </div>
    
    </div>

    <a href="" class="btn btn-secondary my-3 w-100 rounded-pill fw-bold fs-5">Ajouter</a>
    `;
}

function getContent(data) {
    let content = '';
    data.forEach(element => {
        const price = (element.valueCents / 100).toFixed(0);
        content += `
            <div class="border p-2 rounded mb-3">
                <h4>${element.name}</h4>
                <small>${element.requiredDocument}</small>
                <div class="d-flex justify-content-between align-items-center">
                    <p class="price"${price} €</p>
                    <div class="d-flex justify-content-between">
                        <button class="quantity-btn minus-btn"><i class="fas fa-minus"></i></button>
                        <span class="quantity">0</span>
                        <button class="quantity-btn plus-btn"><i class="fas fa-plus"></i></button>
                    </div>
                </div>
            </div>
        `;
    });
    return content;
}

// Authentification sur l'api See Tickets + affichage les évenements.
const start = async () => {
    // Authentification
    token = await authenticate();
    console.log('Token: ', token);
    // affichage les évenements
    showEvents()
}

// AU CHARGEMENT DE LA PAGE
start()
