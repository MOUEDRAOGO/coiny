var ConstructeurShark = function () {

    this.id = '';

    this.gestesDuShark = { // je creer un objet qui rassemble tous les gestes de mon personnage
        sharkAttack: [{ // je cree un tableau avec toutes les images du geste sharkAttack
            largeurMasque: '340px', // je definis la largeur de la fenetre du masque
            hauteurMasque: '259px', // je definis la hauteur de la fenetre du masque
            topDeImage: '-5px', // je definis les coordonnees Top de l'image 0 a inserer
            leftDeImage: '-5px', //* je definis les coordonnees Left de l'image 0 a inserer */

        }, {
            largeurMasque: '340px',
            hauteurMasque: '259px',
            topDeImage: '-5px',
            leftDeImage: '-355px',
        }, {
            largeurMasque: '340px',
            hauteurMasque: '259px',
            topDeImage: '-5px',
            leftDeImage: '-705px',
        }, {
            largeurMasque: '340px',
            hauteurMasque: '259px',
            topDeImage: '-5px',
            leftDeImage: '-1055px',
        }],

        sharkRun: [{
            largeurMasque: '334px',
            hauteurMasque: '225px',
            topDeImage: '-5px',
            leftDeImage: '-5px',

        }, {
            largeurMasque: '334px',
            hauteurMasque: '225px',
            topDeImage: '-5px',
            leftDeImage: '-349px',
        }, {
            largeurMasque: '334px',
            hauteurMasque: '225px',
            topDeImage: '-5px',
            leftDeImage: '-693px',
        }, {
            largeurMasque: '334px',
            hauteurMasque: '225px',
            topDeImage: '-5px',
            leftDeImage: '-1037px',
        }, {
            largeurMasque: '334px',
            hauteurMasque: '225px',
            topDeImage: '-5px',
            leftDeImage: '-1381px',
        }, {
            largeurMasque: '334px',
            hauteurMasque: '225px',
            topDeImage: '-5px',
            leftDeImage: '-1725px',
        }, {
            largeurMasque: '334px',
            hauteurMasque: '225px',
            topDeImage: '-5px',
            leftDeImage: '-2069px',
        }, {
            largeurMasque: '334px',
            hauteurMasque: '225px',
            topDeImage: '-5px',
            leftDeImage: '-2413px',
        }, {
            largeurMasque: '334px',
            hauteurMasque: '225px',
            topDeImage: '-5px',
            leftDeImage: '-2757px',
        }, {
            largeurMasque: '334px',
            hauteurMasque: '225px',
            topDeImage: '-5px',
            leftDeImage: '-3101px',
        }, {
            largeurMasque: '334px',
            hauteurMasque: '225px',
            topDeImage: '-5px',
            leftDeImage: '-3445px',
        }, {
            largeurMasque: '334px',
            hauteurMasque: '225px',
            topDeImage: '-5px',
            leftDeImage: '-3789px',
        }, {
            largeurMasque: '334px',
            hauteurMasque: '225px',
            topDeImage: '-5px',
            leftDeImage: '-4133px',
        }, {
            largeurMasque: '334px',
            hauteurMasque: '225px',
            topDeImage: '-5px',
            leftDeImage: '-4477px',
        }],
    }; // fin du gestesDuSharkAttack 

    this.decalageLeftShark = -5; // largeur de depart
    this.decalageTop = 200; // hauteur de depart  var randomHeight = Math.random() * (gameHeight * 0.9 - topBackground) + topBackground; // 0.9 pour reduire la hauteur du ramdom afin que le poisson n apparaisse pas hors du cadre du jeu
    this.vitesseShark = 10; // vitesse deplacement shark
    this.continuerSharkRun = true;
    this.compteurPourAnimationRequin = 0;

    this.sharkContainerADeplacer = document.getElementById('sharkContainer');
    this.sharkContenuAInserer = document.getElementById('sharkContenu');

    this.animationSharkRun = function (i) {

        this.sharkContainerADeplacer.style.width = this.gestesDuShark.sharkAttack[i].largeurMasque;
        //console.log('gestesDuShark.sharkRun[i].largeurMasque ok')

        this.sharkContainerADeplacer.style.height = this.gestesDuShark.sharkAttack[i].hauteurMasque;
        //console.log('gestesDuShark.sharkRun[i].hauteurMasque ok')

        this.sharkContenuAInserer.style.top = this.gestesDuShark.sharkAttack[i].topDeImage;
        //console.log('gestesDuShark.sharkRun[i].topDeImage ok')

        this.sharkContenuAInserer.style.left = this.gestesDuShark.sharkAttack[i].leftDeImage;
        //console.log('gestesDuShark.sharkRun[i].leftDeImage ok')

        if (i + 1 >= this.gestesDuShark.sharkAttack.length) {
            // Si le i est supérieur au nombre de décomposition pour l'animation,
            // on réinitialise le compteur
            this.compteurPourAnimationRequin = 0;
        }
    };
};