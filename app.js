// Elements du DOM

const divVies = document.querySelector('.vies');
const message = document.getElementById('message');
const formulaire = document.getElementById('inputBox');
const input = document.getElementById('number');
const essayerBtn = document.getElementById('essayerBtn');
const rejouerBtn = document.getElementById('rejouerBtn');
const body = document.getElementsByTagName('body')[0];

// Modèles de coeurs
const coeurVide = '<ion-icon name="heart-outline"></ion-icon>'
const coeurPlein = '<ion-icon name="heart"></ion-icon>'


// Fond

const bgFroid = 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)';
const bgTiede = 'linear-gradient(to top, #d299c2 0%, #fef9d7 100%)';
const bgChaud = 'linear-gradient(to right, #fa709a 0%, #fee140 100%)';
const bgBouillant = 'linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)';

const bgWin = 'linear-gradient(to right, #f83600 0%, #f9d423 100%)';
const bgLoose = 'linear-gradient(15deg, #13547a 0%, #80d0c7 100%)'; 


// PLAY : 
const play = () => {

    // nombre aléatoire
    const randomNumber = Math.floor(Math.random() * 101);
    const totalVies = 5;
    let vies = totalVies;
    console.log(randomNumber);

    // Actualisation à chaque essai TOUTE LA LOGIQUE

    formulaire.addEventListener('submit',(e) => {
        e.preventDefault();
        const valeurInput = parseInt(input.value); // ex: "3" -> 3

        if(valeurInput < 0 || valeurInput > 100) return;

        if(valeurInput === randomNumber) {
            body.style.backgroundImage = bgWin;
            message.textContent = `BRAVO !!! Le nombre était bien ${randomNumber}`;
            rejouerBtn.style.display= "block";
        }

    if (valeurInput !== randomNumber) {
            if (randomNumber < valeurInput + 3 && randomNumber > valeurInput - 3){
            body.style.backgroundImage = bgBouillant;
            message.textContent = "C'est brûlant !!! 🔥🔥🔥 ";
        }
        else if (randomNumber < valeurInput + 6 && randomNumber > valeurInput - 6){
            body.style.backgroundImage = bgChaud;
            message.textContent = "C'est chaud !!! ";
        }

        else if (randomNumber < valeurInput + 11 && randomNumber > valeurInput - 11){
        body.style.backgroundImage = bgTiede;
        message.textContent = "C'est tiède !!! ";
        }

        else {
            body.style.backgroundImage = bgFroid;
            message.textContent = "C'est froid !!!";
        }
        vies--;
        verifyLoose();
    }
    actualiseCoeurs(vies);

    })

    const verifyLoose = () => {
        if (vies === 0) {
            body.style.backgroundImage = bgLoose;
            body.style.color = '#990000';
            essayerBtn.setAttribute("disabled", "");
            message.textContent = `Vous avez perdu. La réponse était ${randomNumber}`;
        }
    }

    const actualiseCoeurs = (vies) => {
        divVies.innerHTML = "";
        let tableauDeVies = [];
        for(let i = 0; i < vies; i++) {
            tableauDeVies.push(coeurPlein);
        }
        for(let i = 0; i < totalVies - vies; i++) {
            tableauDeVies.push(coeurVide);
        }
        tableauDeVies.forEach(coeur => { // pr chq élmt du tableau, on va l'ajouter en HTML ds la divVies
            divVies.innerHTML += coeur;
        } )
    }

    actualiseCoeurs(vies);

    rejouerBtn.addEventListener('click', () => {
        message.style.display = 'none';
        document.location.reload(true);
        
    })
}

play();

