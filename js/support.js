// 游戏基础逻辑文件

function getPosTop(i, j){
    return 20 + i * 120;
}

function getPosLeft(i, j){
    return 20 + j * 120;
}

function getNumberBackgroundColor(number){
    switch (number) {
        case 2:
            return "rgb(236, 228, 219)";
            break;
        case 4:
            return "rgb(235, 224, 203)";
            break;
        case 8:
            return "rgb(232, 180, 129)";
            break;
        case 16:
            return "rgb(232, 154, 108)";
            break;
        case 32:
            return "rgb(230, 131, 103)";
            break;
        case 64:
            return "rgb(228, 104, 71)";
            break;
        case 128:
            return "rgb(232, 208, 127)";
            break;
        case 256:
            return "rgb(232, 205, 114)";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#3365a5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6bc";
            break;
        case 8192:
            return "#93c";
            break;
    
        default:
            return "black";
    }
}

function getNumberColor(number){
    if(number <= 4){
        return "rgb(117, 110, 102)";
    }else{
        return "white";
    }
}


function setScore(score){
    $('#score').text(score);
} 

function nospace(board){
    for(var i=0; i<4; i++){
        for(var j=0; j<4; j++){
            if(board[i][j] == 0){
                return false;
            }
        }
    }
    return true;
}

function noBlockHorizontal(row, col1, col2, board){
    for(var i = col1+1; i< col2; i++){
        if(board[row][i] != 0){
            return false;
        }
    }
    return true;
}

function noBlockVertical(col, row1, row2, board){
    for(var i = row1+1; i<row2; i++){
        if(board[i][col] != 0){
            return false;
        }
    }
    return true;
}

function canMoveLeft(board){
    for(var i=0; i<4; i++){
        for(var j=0; j<4; j++){
            if(board[i][j] != 0 && j != 0){
                if(board[i][j-1] == 0 || board[i][j] == board[i][j-1]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight(board){
    for(var i=0; i<4; i++){
        for(var j=3; j>=0; j--){
            if(board[i][j] != 0 && j != 3){
                if(board[i][j+1] == 0 || board[i][j] == board[i][j+1]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp(board){
    for(var j=0; j<4; j++){
        for(var i=1; i<4; i++){
            if(board[i][j]!= 0){
                if( board[i-1][j]==0 || board[i][j] == board[i-1][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(board){
    for(var j=0; j<4; j++){
        for(var i=2; i>=0;i--){
            if(board[i][j] != 0){
                if(board[i+1][j] == 0 || board[i][j] == board[i+1][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function noMove(board){
    if(canMoveLeft (board)|| canMoveRight(board) || canMoveUp(board) || canMoveDown(board)){
        return false;
    }else{
        return true;
    }
}