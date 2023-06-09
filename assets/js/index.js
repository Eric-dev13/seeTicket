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


// Requête d'authentification + requete pour obtenir la liste des évenements
const showEvents = async () => {
    const evenements = await getData(`https://front.apirecette.digitick-ppe.com/v1.1/distribution/salesChannels/13357/calendar/day/${getDateNow()}?lang=fr`);
    console.log('Evenements', evenements._embedded.hours)
    root.innerHTML += `
                <div class="d-flex justify-content-end py-3">
                    <select id="langues" class="custom-select text-bg-dark rounded p-1" style="width: 150px;">
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                    </select>
                </div>

                <h1 class="text-center fw-bold mb-4">Nos évenements</h1>
                `

    evenements._embedded.hours.map(evenement => {
        root.innerHTML += `
                <div data-showId = "${evenement.showId}" class="eventDetail d-flex flex-column align-items-center justify-content-center mb-2" style="cursor:pointer;">
                    <div class="card" style="width: 18rem;">
                        <img src="assets/img/bg.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title fw-bold">${evenement.eventName}</h5>
                            <small class="text-muted fw-semibold">${evenement.dateStart}</small>
                        </div>
                    </div>
                </div>
            `
    });

    getDetailPrices()
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
    // root.innerHTML = `
    //     <div class="d-flex justify-content-end py-3">
    //         <select id="langues" class="custom-select text-bg-dark rounded p-1" style="width: 150px;">
    //             <option value="fr">Français</option>
    //             <option value="en">English</option>
    //             <option value="es">Español</option>
    //         </select>
    //     </div>
    //     <div>
    //         <img src="assets/img/bg.jpg" class="img-thumbnail mb-2" alt="...">
    //         <div class="w-100 d-flex justify-content-end mb-3">
    //             <a href="#"class="text-bg-primary rounded px-2">+infos</a>
    //         </div>

    //         <div class="accordion" id="accordionExample">
    //             <div class="accordion-item">
    //                 <h2 class="accordion-header">
    //                     <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
    //                         Places
    //                     </button>
    //                 </h2>
    //                 <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
    //                     <div class="accordion-body">
    // `;
    root.innerHTML = ``;
    data.forEach(element => {
        root.innerHTML += `
        <div class="border p-2 rounded mb-3">
            <h4>${element.name}</h4>
            <p>${element.requiredDocument}</p>
            <div class="d-flex justify-content-between">
                <p>${element.valueCents}</p>
                <div>
            </div>
            
            
        </div>
        `;
    })
    // root.innerHTML += `    
    //                     </div>
    //                 </div>
    //             </div>
    //             <div class="accordion-item">
    //                 <h2 class="accordion-header">
    //                     <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
    //                         Coordonnées
    //                     </button>
    //                 </h2>
    //                 <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
    //                     <div class="accordion-body">
    //                         <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
    //                     </div>
    //                 </div>
    //             </div>
    //             <div class="accordion-item">
    //                 <h2 class="accordion-header">
    //                     <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
    //                         Paiements
    //                     </button>
    //                 </h2>
    //                 <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
    //                     <div class="accordion-body">
    //                         <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
    //                     </div>
    //                 </div>
    //             </div>
    //             <div class="accordion-item">
    //                 <h2 class="accordion-header">
    //                     <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
    //                         Description
    //                     </button>
    //                 </h2>
    //             <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
    //                 <div class="accordion-body">
    //                     <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
    //                 </div>
    //             </div>
    //         </div>
    //             </div>
            
    //     </div>
    // `
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
