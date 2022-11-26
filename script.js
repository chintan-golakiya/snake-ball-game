$(document).ready(function(){

    $("#gameover").hide();

    // generate random cordinates
    var generateRandomCordinate = function(max,min){
        var cordinates = {
            x:Math.floor(Math.random()*max + min),
            y:Math.floor(Math.random()*max + min)
        }
        return cordinates;
    }

    // check for collision
    var collision = function(x,y,arr){
        var len = arr.length;
        for(var i=0;i<len;i++){
            if(x==arr[i].x && y==arr[i].y)return true;
        }
        return false;
    }

    //adding key listener
    $(document).keydown(function (event){
        let key = event.keyCode;
        console.log(key);
        if( key == 37 && direction != "RIGHT"){
            direction = "LEFT";
        }else if(key == 38 && direction != "DOWN"){
            direction = "UP";
        }else if(key == 39 && direction != "LEFT"){
            direction = "RIGHT";
        }else if(key == 40 && direction != "UP"){
            direction = "DOWN";
        }
    });

    $("#up").click(function (){
        if(direction != "DOWN"){
            direction = "UP";
        }
    });
    $("#left").click(function (){
        if(direction != "RIGHT"){
            direction = "LEFT";
        }
    });
    $("#right").click(function (){
        if(direction != "LEFT"){
            direction = "RIGHT";
        }
    });
    $("#down").click(function (){
        if(direction != "UP"){
            direction = "DOWN";
        }
    });


    var direction = "LEFT";
    const box = 32;
    const boxColor = '#2ecc71';
    const boxBorder = 'black';
    const headColor = "#056F31";
    const foodColor = '#2c3e50';//"#c3ee4c";
    var game;
    var gameScore = 0;
    var gameover = false;
    var snake = [];
    snake.push({x:5,y:7});
    snake.push({x:6,y:7});
    snake.push({x:7,y:7});
    snake.push({x:8,y:7});

    var preDire ="LEFT";

    var food = generateRandomCordinate(17,0);

    //draw Rectangle
    var rect = function(cordinate,color){
        $("canvas").drawRect({
            strokeStyle:boxBorder,
            fillStyle:color,
            fromCenter:false,
            x:cordinate.x*box+1,
            y:cordinate.y*box+1,
            height:box-2,
            width:box-2,
            strokeWidth:1
        });
    }

    var cir = function(cordinate,color){
        $("canvas").drawArc({
            strokeStyle:boxBorder,
            fillStyle:color,
            x:cordinate.x*box+1,
            y:cordinate.y*box+1,
            radius:(box/2)-1,
            start:0,end:360,
            fromCenter:false,
            strokeWidth:0
        });
    }

    var draw = function(){

        $("canvas").clearCanvas();
        cir(food,foodColor);
        for(var i=0;i<snake.length;i++){
            if(i==0)rect(snake[i],headColor);
            else
            rect(snake[i],boxColor);
        }

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if( direction == "LEFT") snakeX -= 1;
        else if( direction == "UP") snakeY -= 1;
        else if( direction == "RIGHT") snakeX += 1;
        else snakeY += 1;


        //check for border
        if(snakeX < 0 || snakeY < 0 || snakeX > 17 || snakeY > 17){
            clearInterval(game);
            gameover = true;
            $("#PlayPause").html("Play");
            $("#gameover").show();
            return;
        }


        //check for self collision
        if(collision(snakeX,snakeY,snake)){
            clearInterval(game);
            gameover = true;
            $("#PlayPause").html("Play");
            $("#gameover").show();
            return;
        }
        //eating food
        if(food.x == snakeX && food.y == snakeY){
            gameScore++;
            $("#score").html(gameScore);
            food = generateRandomCordinate(17,0);
        }else{
        snake.pop();
        }
        snake.unshift({
            x:snakeX,
            y:snakeY
        });



        cir(food,foodColor);
    }



    //methods for play pause controls
    $("#PlayPause").click(function(){
        var value = $("#PlayPause").text();
        console.log(value);
        if(value=="Play"){
            if(gameover){
                snake = [];
                snake.push({x:5,y:7});
                snake.push({x:6,y:7});
                snake.push({x:7,y:7});
                snake.push({x:8,y:7});
                direction = "LEFT";
                food = generateRandomCordinate(17,0);
                gameScore = 0;
                gameover = false;
                $("#score").html(0);
            }
            else{
                direction = preDire;
            }
            $("#gameover").hide();
            game = setInterval(draw,200);
            $("#PlayPause").html("Pause");
        }
        if(value=="Pause"){
            clearInterval(game);
            preDire = direction;
            $("#PlayPause").html("Play");
        }
    });


});
