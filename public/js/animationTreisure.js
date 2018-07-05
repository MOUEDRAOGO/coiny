/************* GESTES TREISURE */

var gestesDuTreisure = {
    treisureOpen: [{
        largeurMasque: '1058px',
        hauteurMasque: '465px',
        topDeImage: '-1px',
        leftDeImage: '-1px',

    }
    ],



}; // fin du gestesDuTreisure
console.log('gestesDuTreisure ok')

window.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded');

    //met le compteur et le nombre de pixel a 0
    var decalageLeft = -1;
    console.log('decalageLeft -5 ok')

    var pixelLeft = -5;
    console.log('pixelLeft -5 ok')

    // on definit le decalageTop
    var decalageTop = 200;

    //recupere le masque treisureContainer et le sprite treisureContenu
    var treisureContainerAOuvrir = document.getElementById('treisureContainer');
    console.log('var treisureContainerAOuvrir ok');
    var treisureContenuAInserer = document.getElementById('treisureContenu');
    console.log('var treisureContenuAInserer ok');

    // definit la vitesse de deplacement
    var vitesseTreisureOpen = 5;
    console.log('vitesseTreisureOpen ok')

    // definit la continuité du geste selectionné
    var continuerTreisureOpen = true;
    console.log(' var continuerTreisureOpen ok')

    // cree une fonction de l'animation du geste selectionné afin de pouvoir la manipuler
    var animationSharkRun = function (i) {

        console.log('var animationSharkRun ok');

        treisureContainerAOuvrir.style.width = gestesDuTreisure.treisureOpen[i].largeurMasque;
        console.log('gestesDuTreisure.treisureOpen[i].largeurMasque ok')

        treisureContainerAOuvrir.style.height = gestesDuTreisure.treisureOpen[i].hauteurMasque;
        console.log('gestesDuTreisure.treisureOpen[i].hauteurMasque ok')

        treisureContenuAInserer.style.top = gestesDuTreisure.treisureOpen[i].topDeImage;
        console.log('gestesDuTreisure.treisureOpen[i].topDeImage ok')

        treisureContenuAInserer.style.left = gestesDuTreisure.treisureOpen[i].leftDeImage;
        console.log('gestesDuTreisure.treisureOpen[i].leftDeImage ok')


        if (i + 1 >= gestesDuTreisure.treisureOpen.length) {

            // Si le i est supérieur au nombre de décomposition pour l'animation,
            // on réinitialise le compteur globalement.
            compteurAnimationTreisure = 0;
        }
    };

    // Ce compteur est initialisé à 0 à l'extérieur de la fonction animationSharkRun un seule fois au chargement du document.
    var compteurAnimationTreisure = 0;

    //ecoute les touches du clavier
    window.addEventListener("keydown", function (event) {
        console.log('keydown');
        // if (decalageLeft > 1920 - 334) { 


        //                 decalageLeft += vitesseTreisureOpen; //incrementation horizontal

        //             }

    }); // fin du Keydown

}); /*fin du window addEventListener */