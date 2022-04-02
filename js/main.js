var board = new Array();
var score = 0;
var added = new Array();

$(function(){
    newgame();
})

function newgame(){
    // 初始化棋盘格
    init();
    generateOneNumber();
    generateOneNumber();   
}

// 初始化格子数组
function init(){
    setScore(0);
    $("#gameover").css('display','none');
    for(var i=0; i<4; i++){
        board[i] = new Array();
        for(var j=0; j<4; j++){
            board[i][j] = 0;
            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css("top",getPosTop(i, j))
            gridCell.css("left",getPosLeft(i, j))

        }
    }
    for(var i=0; i<4; i++){
        added[i] = new Array();
        for(var j=0; j<4; j++){
            added[i][j] = 0;
        }
    }

    updateBoardView();
}

// 更新数组的前端样式
function updateBoardView(){
    $(".number-cell").remove();
    for(var i=0; i<4; i++){
        for(var j=0; j<4; j++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell = $('#number-cell-'+i+'-'+j);
            if(board[i][j] == 0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css("top",getPosTop(i, j)+50)
                theNumberCell.css("left",getPosLeft(i, j)+50)
            }else{
                theNumberCell.css('width','100px');
                theNumberCell.css('height','100px');
                theNumberCell.css("top",getPosTop(i, j))
                theNumberCell.css("left",getPosLeft(i, j))
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]))
                theNumberCell.css('color',getNumberColor(board[i][j]))
                theNumberCell.text(board[i][j]);
                if(board[i][j] >= 1024){
                    theNumberCell.css('font-size','35px')
                }
            }

        }
    }
}

// 随机生成格子
function generateOneNumber(){
    if(nospace(board)){
        return false;
    }
    // 生成一个随机的位置
   var randx = Math.floor(Math.random()*4);
   var randy = Math.floor(Math.random()*4);
    // 定义一个死循环，完成生成随机空格子
    while(true){
        if(board[randx][randy] == 0){
            break;
        }
        randx = Math.floor(Math.random()*4);
        randy = Math.floor(Math.random()*4);
    }
    // 生成一个随机的数字
    var randNumber = Math.random()<0.5 ? 2 : 4;
    // 在随机位置显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx,randy,randNumber);
    return true;
}

