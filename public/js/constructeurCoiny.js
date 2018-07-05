var ConstructeurCoiny = function () {

    this.imageCoiny = {

        src: '../public/Assets/images/coin.jpg',
        position: Math.random() * (gameHeight * 0.9 - topBackground) + topBackground,
    }; // fin du gestesDuFish1

    /**** ANIMATION COINY ****** */

    //Création du div en html

    this.coiny = window.document.createElement('div');
    this.coiny.id = 'coinyContainer';
    this.coiny.style.top = offset + 'px';

    this.coinyContenuADeplacer = window.document.createElement('img');
    this.coinyContenuADeplacer.id = 'coinyContenu';
    this.coinyContenuADeplacer.src = '../public/Assets/images/coin.jpg';

    //console.log('var coinyContenuADeplacer ok ')

    this.coiny.appendChild(this.coinyContenuADeplacer); // j insere le contenu recupere ds le container

    //On rattache le container créé dynamiquement au DOM
    window.document.getElementsByTagName('body')[0].appendChild(this.coiny);

    this.continuerCreationCoiny = true;
    // console.log('var continuerCreationCoiny OK')

    // this.decalageLeftFish1Reverse = 2000; // definit la zone de depart/creation du fish1 (en dehors de l'ecran)
    // console.log('decalageLeftFish1Reverse -5 ok')

    // definit la vitesse de deplacement du fish
    this.vitesseCreationCoiny = 0.5;
    // console.log('vitesseCreationCoiny ok')

    this.removeCoiny = 0;



    /********SCORING */


    var divScoreCoiny1 = window.document.getElementById('scoreCoiny1');
    var divScoreCoiny2 = window.document.getElementById('scoreCoiny2');

    var scoreValueCoiny1 = divScoreCoiny1.innerHTML; // je recupere la valeur du score
    //console.log(scoreValue);
    var scoreValueCoiny2 = divScoreCoiny2.innerHTML; // je recupere la valeur du score

    var scoreValue = scoreValueCoiny1 || scoreValueCoiny2

    var winner = scoreValueCoiny1 > scoreValueCoiny2 || scoreValueCoiny2 > scoreValueCoiny1 // definition du score a realiser pour gagner
    var matchNul = scoreValueCoiny1 == scoreValueCoiny2

    if (scoreValue < winner && window.document.getElementById('gameover').style.display === "") {
        try {
            that.coiny.remove();
        } catch (err) {
            that.coiny.parentNode.removeChild(that.coiny);
        }
        // gestion du score
        scoreValue++;
        divScoreCoiny1.innerHTML = scoreValue; // je remets le nouveau score ds la div score

        // gestion win & loose
        if (scoreValue === winner) { // si score =10, je gagne dc j affiche la div win
            window.document.getElementById('win').style.display = "block";
            window.document.getElementById('treisureContainer').style.display = "block";
        }
    }

    /******** fin SCORING */

}
if (that.continuerCreationCoiny && that.removeFish == 0) {
    that.nageFish1Reverse(i);
} else {
    // console.log('animation stop !!'); 
}

that.decalageLeftFish1Reverse -= that.vitesseCreationCoiny // inversion du sens de deplacement

that.coiny.style.left = that.decalageLeftFish1Reverse + 'px';
// console.log('coiny.style.left ok')

if (parseFloat(that.coiny.style.left) < -parseFloat(that.coiny.style.width) && (that.removeFish == 0)) { // suppression du fish1 qd tte la largeur du masque du fish1 a depassee la limite gauche de l ecran 

    that.removeFish = 1; // si removeFish = 1, je stop l'animation 

    try {
        that.coiny.remove();
    } catch (err) {
        that.coiny.parentNode.removeChild(that.coiny);
    }
    // console.log('suppression fish1 OK ');
}
        });
    };
this.nageFish1Reverse(0);
};