document.getElementById("start").addEventListener("click",function Snake(){
    const boardColor = "black";
    const boardBg = "white";
    const popUp = document.getElementById("popup");

    // For sound in the game 
    const food = new Audio();
    const gameOver = new Audio();
    food.src = "./sounds/startGame.wav";
    gameOver.src = "./sounds/endGame.wav"

    let snakeBody = [
        {x:200, y:200},
        {x:190, y:200},
        {x:180, y:200},
        ];
    
        // Step to random food for the snake
    let snakeFood ={
        x:Math.round(Math.random()*17 +1 )*20,
        y:Math.round(Math.random()*15 +3 )*20
    };

    let score=(0);

    let changingDirection = false;
    let dx = 20;
    let dy = 0;

    const canvas = document.getElementById("CanvasScreen");
    ctx = canvas.getContext("2d");
    main();

    document.addEventListener("keydown", change_direction)

    function main(){
        if(has_game_ended()){
            popUp.style.visibility="visible";
            gameOver.play();
            return;
        }
        changingDirection = false;
        // document.onkeypress=function(e)
            setTimeout(function onTick(){
            clear_board();
            move_snake();
            drawSnake();
            main();
        }, 400)
    }

    // draw a border around the canvas
    function clear_board(){
        ctx.fillStyle = boardBg;
        ctx.strokeStyle = boardColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
    }

    function drawSnake(){
        snakeBody.forEach(draw);

        // draw Food for snake
        ctx.fillStyle= "red"
        // ctx.fillRect(snakeFood.x, snakeFood.y, 22, 22)
        ctx.beginPath();
        ctx.arc(snakeFood.x +11, snakeFood.y +11, 11 ,0, 2*Math.PI);
        ctx.fill();

        // draw score area
        ctx.fillStyle= "red";
        ctx.font = "45px 'Caveat', cursive";
        ctx.fillText('See your score: ' + score, 100, 390);

        //Get comment and score in overlay
        document.getElementById('score').innerText = score;
        document.getElementById('comments').innerText = `${
            (score <= 60)
            ?"You can do better 😀 "
            :(score>=60 && score <=90)
            ?" You almost get to 100 😁"
            :(score>=90 && score <=150)
            ?"You are doing great 👏 "
            :(score>=150 && score <=200)
            ?"Well done 🍕"
            :(score>=200 && score <=300)
            ?"WOW you are game Player 🍷 "
            :(score>=300)
            ?"Get Chocolate Ice Cream 🍦"
            :""
        } `;
    }

    function draw(){
        for (let i = 0; i<snakeBody.length; i++){
            ctx.fillStyle= "green"
            ctx.fillRect(snakeBody[i].x, snakeBody[i].y, 20,20);

            ctx.strokeStyle="red"
            ctx.strokeRect(snakeBody[i].x, snakeBody[i].y, 20,20);
        }
    }
 
    function has_game_ended(){
        for(let i = 6; i < snakeBody.length; i++){
            if (snakeBody[i].x === snakeBody[0].x && snakeBody[i].y === snakeBody[0].y) return true; 
        }
        const hitLeftWall = snakeBody[0].x <0;
        const hitRightWall = snakeBody[0].x >  canvas.width - 20;
        const hitTopWall = snakeBody[0].y < 0;
        const hitBottomWall = snakeBody[0].y > canvas.height - 20;
        return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
       
    }

    function change_direction(event){
        const LEFT_KEY = 65; // keypress a
        const RIGHT_KEY = 68; // keypress d
        const UP_KEY = 87; // keypress w
        const DOWN_KEY = 83; // keypress s

        if(changingDirection) return;
        changingDirection = true;
        const keypress = event.keyCode;
        const goingUp = dy === -20;
        const goingDown = dy === 20;
        const goingRight = dx === 20;
        const goingLeft = dx === -20;

        if (keypress===LEFT_KEY && !goingRight){
            dx = -20
            dy = 0
        }
        if (keypress===UP_KEY && !goingDown){
            dx = 0
            dy = -20
        }
        if (keypress===RIGHT_KEY && !goingLeft){
            dx = 20
            dy = 0
        }
        if (keypress===DOWN_KEY && !goingUp){
            dx = 0
            dy = 20
        }
    }


    // head position 
    function move_snake(){
        let snakeX = snakeBody[0].x + dx;
        let snakeY = snakeBody[0].y + dy;
       
            // To get the score when snake eat food 
        if (snakeX == snakeFood.x && snakeY == snakeFood.y){
            score+=10;
            food.play();
            snakeFood ={
                x:Math.round(Math.random()*17 +1 )*20,
                y:Math.round(Math.random()*15 +3 )*20
            } 
        }
        else{
            snakeBody.pop();    
        }
        // To add tail to the score according to score point
        let addTail ={
            x:snakeX,
            y:snakeY
        } 
        snakeBody.unshift(addTail)
    }

    // Popup close button
    document.getElementById("close").addEventListener("click", function(event){
        event.preventDefault();
        popUp.style.visibility="hidden"
    })

    // UI Button control 
    document.getElementById("up").addEventListener("click", function() {
        dx = 0
        dy = -20
    });

    document.getElementById("right").addEventListener("click", function() {
        dx = 20
        dy = 0
    });
    document.getElementById("left").addEventListener("click", function() {
        dx = -20
        dy = 0
    });
    document.getElementById("down").addEventListener("click", function() {
        dx = 0
        dy = 20
    });

})
Snake();