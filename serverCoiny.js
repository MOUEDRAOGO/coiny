
/********************************************

******      CHARGEMENT DES MODULES    ******

********************************************/


// const fs = require('fs');
const http = require('http');

const express = require('express');
const app = express();

const server = http.createServer(app);

// const path = require('path')
// Const SocketIO = require('socket.io')

app.use("/musique", express.static(__dirname + '../public/Assets/musique'));
app.use("/cv", express.static(__dirname + '../public/Assets/CV'));
app.use("/images", express.static(__dirname + '../public/Assets/images'));
app.use("/css", express.static(__dirname + '../public/css'));
app.use("/js", express.static(__dirname + '../public/js'));




app.get('/', function (req, res) {
    res.sendFile('indexCoiny.html', { root: '../html' });
});



/********************************************

******          HTTP serveur           ******

********************************************/


//         // /********************************************/

//         // // MONGODB

//         // /********************************************/

//         // const mongodb = require('mongodb');

//         // mongodb.MongoClient.connect('mongodb://localhost:27017/sharkooBackEnd', function (error, client) {
//         //     if (!error) {
//         //         let players = client.db('sharkooBackEnd').collection('players');
//         //         players.find({}).toArray(function (error, documents) {
//         //            res.render('nomdelaDiv', {liste: data, title: 'nomdelaDiv'});

//         //             });


//         //             response.writeHead(statusCode, {
//         //                 'Content-Length': responseBody.length,
//         //                 'Content-Type': 'text/html;charset=utf-8'
//         //             });
//         //             response.write(responseBody, function () {
//         //                 response.end();
//         //             });
//         //         })
//         //     }
//         // }); // fin mongodb.MongoClient.connect






//     });
// }); // fin server.on


/********************************************/

// socket.IO

/********************************************/


const SocketIo = require('socket.io');

let socketIo = new SocketIo(server);


// let tabConnection = [];
// var tabShark = [];

// tabConnection.push(socket);

// websocketConnection.on('shark', function (message) {
//     tabShark.push(message);
//     for (var i = 0; tabShark[i]; i++) {
//         if (tabShark[i].identifiant == message.identifiant) {
//             console.log(tabShark);
//             tabShark[i].top = message.top;
//             tabShark[i].left = message.left;
//         }
//     }
//     console.log(tabShark);

//     websocketConnection.emit('caractShark', tabShark);



// });

// websocketConnection.on('sharkBuild', function (message) {
//     tabShark.push(message);
//     console.log(tabShark);
// });






socketIo.on('connection', function (websocketConnection) { // reponse et validation du handshake

    // Que faire en cas de réception de l'action IdentifiantRequin1.
    websocketConnection.on('IdentifiantRequin1', function (dataIdentifiantRequin1) { // .on regleJeu
        websocketConnection.broadcast.emit('IdentifiantRequin1', dataIdentifiantRequin1); // broadcast = diffuse a tous les joueurs sauf moi

    });

    // Que faire en cas de réception de l'action IdentifiantRequin2.
    websocketConnection.on('IdentifiantRequin2', function (dataIdentifiantRequin2) { // .on regleJeu
        websocketConnection.broadcast.emit('IdentifiantRequin2', dataIdentifiantRequin2); // broadcast = diffuse a tous les joueurs sauf moi

    });


    // Que faire en cas de réception de l'action InitJeuDom.
    websocketConnection.on('InitJeuDom', function (dataInitJeuDom) { // .on InitJeuDom
        websocketConnection.broadcast.emit('InitJeuDom'); // broadcast = diffuse a tous les joueurs sauf moi
    });



    // Que faire en cas de réception de l'action mouseClickRegleJeu.
    websocketConnection.on('mouseClickRegleJeu', function (dataRegleJeu) { // .on regleJeu
        websocketConnection.broadcast.emit('mouseClickRegleJeu', dataRegleJeu); // broadcast = diffuse a tous les joueurs sauf moi

    });


    // Que faire en cas de réception de l'action boutonRejouer.
    websocketConnection.on('boutonRejouer', function (dataReload) { // .on boutonRejouer
        websocketConnection.broadcast.emit('boutonRejouer', dataReload); // broadcast = diffuse a tous les joueurs sauf moi

    });


    // Que faire en cas de réception de l'action boutonInterrogation.
    websocketConnection.on('boutonInterrogation', function (dataBoutonInterrogation) { // .on boutonInterrogation
        websocketConnection.broadcast.emit('boutonInterrogation', dataBoutonInterrogation); // broadcast = diffuse a tous les joueurs sauf moi

    });


    // Que faire en cas de réception de l'action keyDown.
    websocketConnection.on('keyDown', function (dataKeydown) { // .on keyDown
        websocketConnection.broadcast.emit('keyDown', dataKeydown); // broadcast = diffuse a tous les joueurs sauf moi

    });







    // La déconnexion on envoie l'objet contenant les méta données du carré au front-end pour qu'il soit supprimé.
    websocketConnection.on('disconnect', function () {

        socketIo.emit('removeSquare', square);
    });
}); // fin socketIo.on










/********************************************/

// Ecoute serveur

/********************************************/

server.listen(8888, function () {
    console.log('CONNECTED TO serverSocketIoV3.js !');
});