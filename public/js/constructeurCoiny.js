var ConstructeurCoiny = function (randomHeight) {

    this.imageCoiny = {

        src: '../public/Assets/images/Gold_Coin_PNG_Clipart-663.png',
        position: Math.random() * (gameHeight * 0.9 - topBackground) + topBackground,
    }; // fin du gestesDuFish1

    /**** ANIMATION COINY ****** */

    //Création du div en html

    this.coiny = window.document.createElement('div');
    this.coiny.id = 'coiny1Container';
    this.coiny.style.top = offset + 'px';

    this.coinyContenuADeplacer = window.document.createElement('img');
    this.coinyContenuADeplacer.id = 'coinyContenu';
    this.coinyContenuADeplacer.src = '../public/Assets/images/Gold_Coin_PNG_Clipart-663.png';

    //console.log('var coinyContenuADeplacer ok ')

    this.coiny.appendChild(this.coinyContenuADeplacer); // j insere le contenu recupere ds le container

    //On rattache le container créé dynamiquement au DOM
    window.document.getElementsByTagName('body')[0].appendChild(this.coiny);

    this.continuerCreationCoiny = true;
    // console.log('var continuerCreationCoiny OK')

    // this.decalageLeftFish1Reverse = 2000; // definit la zone de depart/creation du fish1 (en dehors de l'ecran)
    // console.log('decalageLeftFish1Reverse -5 ok')

    // definit la vitesse de creation des pieces
    // this.vitesseCreationCoiny = 0.5;
    // console.log('vitesseCreationCoiny ok')

    this.removeCoiny = 0;



    /********SCORING */


    var divScoreCoiny1 = window.document.getElementById('scoreCoiny1');
    var divScoreCoiny2 = window.document.getElementById('scoreCoiny2');

    var scoreValueCoiny1 = divScoreCoiny1.innerHTML; // je recupere la valeur du score 1
    //console.log(scoreValue);
    var scoreValueCoiny2 = divScoreCoiny2.innerHTML; // je recupere la valeur du score 2

    // var winner = scoreValueCoiny1 > scoreValueCoiny2 || scoreValueCoiny2 > scoreValueCoiny1 // definition du score a realiser pour gagner
    // var matchNul = scoreValueCoiny1 == scoreValueCoiny2

     // gestion du score
        // 
        scoreValueCoiny1++;
        divScoreCoiny1.innerHTML = scoreValueCoiny1; // je remets le nouveau score ds la div score 1

        scoreValueCoiny2++;
        divScoreCoiny2.innerHTML = scoreValueCoiny2; // je remets le nouveau score ds la div score 2

        // gestion win & loose
        if (scoreValueCoiny1 > scoreValueCoiny2) { // si scoreValueCoiny1 > scoreValueCoiny2, scoreValueCoiny1 gagne dc je lui affiche la div win
            window.document.getElementById('win').style.display = "block";
            window.document.getElementById('treisureContainer').style.display = "block";
        }
        if (scoreValueCoiny2 > scoreValueCoiny1) { // si scoreValueCoiny2 > scoreValueCoiny1, scoreValueCoiny2 gagne dc je lui affiche la div win
            window.document.getElementById('win').style.display = "block";
            window.document.getElementById('treisureContainer').style.display = "block";
        }

    if (scoreValueCoiny1 < scoreValueCoiny2 && window.document.getElementById('gameover').style.display === "") {
        try {
            that.coiny.remove();
        } catch (err) {
            that.coiny.parentNode.removeChild(that.coiny);
        }
    if (scoreValueCoiny2 < scoreValueCoiny1 && window.document.getElementById('gameover').style.display === "") {
        try {
            that.coiny.remove();
        } catch (err) {
            that.coiny.parentNode.removeChild(that.coiny);
        }


       
    }

    /******** fin SCORING */

}
if (that.continuerCreationCoiny && that.removeCoiny == 0) {
    that.continuerCreationCoiny(i);
} else {
    // console.log('animation stop !!'); 
}

// that.decalageLeftFish1Reverse -= that.vitesseCreationCoiny // inversion du sens de deplacement

that.coiny.style.left = that.decalageLeftFish1Reverse + 'px';
// console.log('coiny.style.left ok')

this.continuerCreationCoiny(0);
};