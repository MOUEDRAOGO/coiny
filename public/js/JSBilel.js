window.addEventListener('DOMContentLoaded', function(){


    var game = function(){
       
        

        var foodInterval;
        var socketIo = io('http://192.168.105.117:8888');
        //var socketIo = io('http://192.168.0.30:8888');
        //var socketIo = io('http://192.168.1.21:8888');

        console.log('Connexion établie en en Front');
        window.addEventListener('mousemove', function(event){
            // Objet contenant les déplacements de la souris pour être envoyés au Back.
            var mouse = {
                y: event.clientY,
                x: event.clientX
            }
            
            // A chaque déplacement de souris on envoi les coordonnées au back.
            socketIo.emit('movingMouse', mouse);
        });

        // Reception des données nécéssaires pour déssiner un square. 
        socketIo.on('drawSquare', function(square){
            //console.log('SQUARE : ', square);
            var playerSquare = document.getElementById(square.id);
                if(playerSquare === null){
                    playerSquare = document.createElement('div');
                    playerSquare.id = square.id;
                    gameFrame.appendChild(playerSquare);
                };
                playerSquare.style.left = square.x;
                playerSquare.style.top = square.y;
                playerSquare.style.position = 'absolute';
                playerSquare.style.width = '40px';
                playerSquare.style.height = '40px';
                playerSquare.style.border = '1px solid black';
                playerSquare.style.backgroundColor = square.color;
                //console.log('PlayerSquare : ', playerSquare)
        });


        // Réception des données nécéssaire pour déssiner la food
        var foodTableFront = [];
        socketIo.on('drawFood', function(food){
            
            var divFood = document.getElementById(food.id);
                if(!divFood){
                    divFood = document.createElement('div');
                    divFood.id = food.id;
                    divFood.style.position = 'absolute';
                    divFood.style.border = '1px solid black';
                    divFood.style.width = food.width;
                    divFood.style.height = food.height;
                    divFood.style.borderRadius = '5px';
                    divFood.style.backgroundColor = food.color;
                    divFood.style.top = food.y;
                    divFood.style.left = food.x;
                    gameFrame.appendChild(divFood);
                    foodTableFront.push(food);
                }
                    socketIo.emit('drawFood', food);
        });

        // socketIo.on('removeSquare', function(square){
        //     var divPlayer = document.getElementById(square.id);
        //     if(divPlayer){
        //         divPlayer.parentNode.removeChild(divPlayer); 
        //     }
        // });
        
        socketIo.on('removeFood', function(food){
            for(var i = 0; i < foodTableFront.length; i++){
                if(food.id === foodTableFront[i].id){
                    var divFoodToRemove = document.getElementById(foodTableFront[i].id);
                    console.log(divFoodToRemove);
                    divFoodToRemove.remove();
                }
            }
        });

        var disconnect = document.getElementById('disconnect');
        disconnect.addEventListener('click', function(event){
            window.close();
            socketIo.emit('disconnect', square);
        });

        socketIo.on('removeSquare', function(square){
            var playerSquare = document.getElementById(square.id);
            if(playerSquare){
                playerSquare.parentNode.removeChild(playerSquare);
            }
        });
    };

    var launch = document.getElementById('launch');
    

    launch.addEventListener('click', function(){
        game();
    });

    
});