//chargement du module HTTP.
const http = require('http');
const express = require('express');
const app = express();
const SocketIo = require('socket.io');


//création du serveur HTTP.
var httpServer = http.createServer(app);

app.set('view engine', 'pug');
app.use('/css', express.static('css'));
app.use('/images', express.static('images'));
app.use('/js', express.static('js'));
app.use('/node_modules', express.static('node_modules'));
app.use('/semantic', express.static('semantic'));



app.get('/', function(req, res){
  res.render('index');
});


/**
  Le Serveur WebSocket associé au serveur HTTP.
  URL : ws://[adresse IP/nom de domaine]:8888/

  Ce serveur accepte une requête HTTP upgrade et établit
  une connexion persistante basée sur WebSocket.
**/

/**
  On installe et on utilise le package socket.io.
  La documentation est ici : 
  - https://www.npmjs.com/package/socket.io
  - https://github.com/socketio/socket.io
  - http://socket.io/
**/


//var socketIO = require('socket.io');

//  On utilise utilise la fonction obtenue avec notre serveur HTTP.
//var socketIOWebSocketServer = socketIO(httpServer);

/**
  Gestion de l'évènement 'connection' : correspond à la gestion
  d'une requête WebSocket provenant d'un client WebSocket.
**/
//socketIOWebSocketServer.on('connection', function (socket) {

  // socket : Est un objet qui représente la connexion WebSocket établie entre le client WebSocket et le serveur WebSocket. 

  /**
    On attache un gestionnaire d'évènement à un évènement personnalisé 'unEvenement'
    qui correspond à un événement déclaré coté client qui est déclenché lorsqu'un message
    a été reçu en provenance du client WebSocket.
  **/
  //socket.on('unEvenement', function (message) {

    // Affichage du message reçu dans la console.
    //console.log(message);

    // Envoi d'un message au client WebSocket.
    //socket.emit('unAutreEvenement', {texte: 'Message bien reçu !'});
    /**
      On déclare un évènement personnalisé 'unAutreEvenement'
      dont la réception sera gérée coté client.
    **/
    
  //});

//});


var idInterval;
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

function getShade() {
  return Math.floor(Math.random() * 256);
};

function getRandomColor() {
  return `rgb(${getShade()}, ${getShade()}, ${getShade()})`;
};

function movingSquare(square, mouse) {
    clearInterval(idInterval);
    idInterval = setInterval(function(){
    
    if (parseFloat(square.y) > (mouse.y - parseFloat(square.height) / 2)) {
      if(parseFloat(square.y) <= 0){
          square.y = (parseFloat(square.y) - 0) + 'px';
      } else {
          square.y = (parseFloat(square.y) - 2) + 'px';
      }
  } else {
      if (parseFloat(square.y) < (mouse.y - parseFloat(square.height) / 2)) {
          if(parseFloat(square.y) >= 411){
              square.y = (parseFloat(square.y) + 0) + 'px';
          } else {
              square.y = (parseFloat(square.y) + 2) + 'px';
          }
          
      }
  }

  if (parseFloat(square.x) > (mouse.x - parseFloat(square.width) / 2)) {
      if(parseFloat(square.x) <= 0){
          square.x = (parseFloat(square.x) - 0) + 'px';
      } else {
          square.x = (parseFloat(square.x) - 2) + 'px';
      }
  } else {
      if (parseFloat(square.x) < (mouse.x - parseFloat(square.width) / 2)) {
          if(parseFloat(square.x) >= 1222){
              square.x = (parseFloat(square.x) + 0) + 'px';
          } else {
              square.x = (parseFloat(square.x) + 2) + 'px';
          }
          
      }
    }
  }, 10);
};

var collisionDetection = function (square, food) {

  var squareLeft = parseFloat(square.x);
  var squareTop = parseFloat(square.y);
  var squareHeight = parseFloat(square.height);
  var squareWidth = parseFloat(square.width);

  if(parseFloat(food.x) > squareLeft + squareWidth
    || parseFloat(food.x) < squareLeft - parseFloat(food.width)
    || parseFloat(food.y )> squareTop + squareHeight
    || parseFloat(food.y) < squareTop - parseFloat(food.height)){
      return false;
  } else {
      return true;
  }

};

// nouvelle instance de 'serveur' websocket
let socketIo = new SocketIo(httpServer);

// Objet vide pour accueillir les nouveaux squares.
let squares = {};
let foods = {};

// let food = {
//   x: getRandomInt(1222) + 'px',
//   y: getRandomInt(412) + 'px',
//   id: 'food' + getRandomInt(500000000),
//   color: getRandomColor()
// }

var Food = function(){
  this.x = getRandomInt(1222) + 'px';
  this.y = getRandomInt(412) + 'px';
  this.id = 'food' + getRandomInt(500000000);
  this.color = getRandomColor();
  this.width = '8px';
  this.height = '8px';

  this.collisionDetection = function(square){

    var squareLeft = parseFloat(square.x);
    var squareTop = parseFloat(square.y);
    var squareHeight = parseFloat(square.height);
    var squareWidth = parseFloat(square.width);

    if(parseFloat(this.x) > squareLeft + squareWidth
    || parseFloat(this.x) < squareLeft - parseFloat(this.width)
    || parseFloat(this.y )> squareTop + squareHeight
    || parseFloat(this.y) < squareTop - parseFloat(this.height)){
      return false;
    } else {
      return true;
    }
  }.bind(this);
};


// - Variable vide pour l'instant qui contiendra a chaque fois la référence d'une new Food.
var food;

let foodInterval;
socketIo.on('connection', function(websocketConnection){
    console.log('Connexion établie en back');
    

    // - Pour chaque connexion on a un square.
    let square = {
      x: '0px',
      y: '0px',
      id: 'square' + getRandomInt(50000000000),
      color: getRandomColor(),
      height: '40px',
      width: '40px'
    };
    

    
    
    let count = 0;
    let foodTable = [];

    // Le square crée pour la connexion en cours est ajouté dans l'objet vide.
    squares[square.id] = square;
    //console.log('Squares : ', squares);

    // Envoi du square et de la food coté client.
    websocketConnection.emit('drawSquare', square);

   foodInterval = setInterval(function(){
     // - On attribue ici à la variable food, une nouvelle food à chaque fois.
     food = new Food();

     // - on push la food dans le tableau pour garder sa référene à l'instant T. On bouclera le tableau par la suite pour retrouver la référence (collision par exemple).
     foodTable.push(food);
     
     // - On l'envoi au server avec l'émit. Du coup, toutes les 0.8 sec une nouvelle food est créée et envoyé au front.
      socketIo.emit('drawFood', food);
    }, 800);
    
    // Quand on reçoit les coordonnées de la souris on les utilises pour faire bouger les squares et détecter les collisions avec les food
	websocketConnection.on('movingMouse', function(mouse){
        //console.log('mouse reçu au back : ', mouse);

        // - Cette fonction créée plus haut sert à faire bouger le carré en fonction des mouvements de la souris.
        movingSquare(square, mouse);


        // - Parcours du tableau de food pour gérer les collisions avec la méthode collisionDetection codée plus haut.
        for(let i = 0; i < foodTable.length; i++){
          if(foodTable[i].collisionDetection(square)){
            socketIo.emit('removeFood', foodTable[i]);
            console.log('Collision :', foodTable[i].id);
          }
        };
        // Envoi à tous, les coordonnées du carré à jour.
        socketIo.emit('drawSquare', square);
  });

  // Si il y a une déconnexion on envoi l'objet contenant les données du square en front
  socketIo.on('disconnect', function(square){
    // On supprime le square stocké dans l'objet squares
    delete squares[square.id];

    // On envoi les donnée du square en front pour le supprimer du DOM.
    socketIo.emit('removeSquare', square);
  });
});