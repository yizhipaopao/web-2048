// 游戏逻辑
$(document).keydown((event)=>{
    switch (event.keyCode){
        case 37://left
        // moveLeft() 
        // 1.要完成向左移动的逻辑 2.返回值是blooean类型，判断是否可以向左移动
            if(moveLeft()){
                setScore(score);
                generateOneNumber();
                setTimeout("isgameover()", 400);
            }
            break;
        case 38://up
            if(moveUp()){
                setScore(score);
                generateOneNumber();
                setTimeout("isgameover()", 400);
            }
            break;
        case 39://right
            if(moveRight()){
                setScore(score);
                generateOneNumber();
                setTimeout("isgameover()", 400);
            }
            break;
        case 40://down
            if(moveDown()){
                setScore(score);
                generateOneNumber();
                setTimeout("isgameover()", 400);
            }
            break;
    }
})

function isgameover(){
    if(noMove(board)){
        gameover();
    }
}

function gameover(){
    $("#gameover").css('display','block');
}

function clearAdded(){
    for(var i = 0; i< 4; i++){
        for(var j = 0; j< 4; j++){
            added[i][j] = 0;
        }
    }
}

function moveLeft(){
    // 判断能否移动     
    if(!canMoveLeft(board)){
        return false;
    }
    clearAdded();
    for(var i=0; i<4; i++){
        for(var j=1; j<4; j++){ //第一列的数字无法向左移动
            if(board[i][j] != 0){ //当前数字格有值
                for(var k=0; k<j; k++){
                    // 落脚位置是否为空 && 中间没有障碍物
                    // if(board[i][k] == 0 && noBlockHorizontal(i , k, j, board)){
                    if(board[i][k] == 0){
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if(board[i][k] == board[i][j] && noBlockHorizontal(i , k, j, board)){
                    // }else if(board[i][k] == board[i][j]){
                        // add
                        if(added[i][k] != 0){
                            showMoveAnimation(i,j,i,k+1);
                            board[i][k+1] = board[i][j];
                            board[i][j] = 0;
                        }else{
                            showMoveAnimation(i,j,i,k);
                            board[i][k] += board[i][j];
                            board[i][j] = 0;
                            added[i][k] = 1;
                            score += board[i][k];
                        }
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    
    return true;

}

function moveRight(){
    if(!canMoveRight){
        return false;
    }
    clearAdded();
    for(var i=0; i<4; i++){
        for(var j=2; j>=0; j--){
            if(board[i][j] != 0){
                for(var k=3; k>j; k--){
                    if(board[i][k]==0){
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    }else if(board[i][k]==board[i][j] && noBlockHorizontal(i , j, k, board)){
                        if(added[i][k]!=0){
                            showMoveAnimation(i,j,i,k-1);
                            board[i][k-1] = board[i][j];
                            board[i][j] = 0;
                        }else{
                            showMoveAnimation(i,j,i,k);
                            board[i][k] += board[i][j]
                            added[i][k]++;
                            board[i][j] = 0;
                            score += board[i][k]
                        }
                    }
                }
            }
            
        }
    }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }
    clearAdded();
    for(var j=0; j<4; j++){
        for(var i=1; i<4; i++){
            if(board[i][j] != 0){
                for(var k=0; k<i; k++){
                    if(board[k][j]==0){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if(board[k][j] == board[i][j] && noBlockVertical(j,k,i,board)){
                        if(added[k][j] != 0){
                            showMoveAnimation(i,j,k+1,j);
                            board[k+1][j] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        }else{
                            showMoveAnimation(i,j,k,j);
                            board[k][j] += board[i][j];
                            board[i][j] = 0;
                            added[k][j]++;
                            score += board[k][j];
                            continue;
                        }
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }
    clearAdded();
    for(var j=0; j<4; j++){
        for(var i=2; i>=0; i--){
            if(board[i][j] != 0){
                for(var k=3; k>i; k--){
                    if(board[k][j] == 0){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] =0;
                    }else if(board[k][j] == board[i][j] && noBlockVertical(j,i,k,board)){
                        if(added[k][j] != 0){
                            showMoveAnimation(i,j,k-1,j);
                            board[k-1][j] = board[i][j];
                            board[i][j] = 0;
                        }else{
                            showMoveAnimation(i,j,k,j);
                            board[k][j] += board[i][j];
                            board[i][j] =0;
                            score += board[k][j];
                            added[k][j]++;
                        }
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}