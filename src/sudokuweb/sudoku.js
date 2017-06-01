/**
 * Created by renny on 27/05/17.
 */

$(document).ready(function(){
    var board = $('#board');
    var original_values = [
        [0, 0, 3,  0, 2, 0,  6, 0, 0],
        [9, 0, 0,  3, 0, 5,  0, 0, 1],
        [0, 0, 1,  8, 0, 6,  4, 0, 0],
        [0, 0, 8,  1, 0, 2,  9, 0, 0],
        [7, 0, 0,  0, 0, 0,  0, 0, 8],
        [0, 0, 6,  7, 0, 8,  2, 0, 0],
        [0, 0, 2,  6, 0, 9,  5, 0, 0],
        [8, 0, 0,  2, 0, 3,  0, 0, 9],
        [0, 0, 5,  0, 1, 0,  3, 0, 0]
    ];

    var zeros = [
        [0, 0, 1,  6, 0, 9,  0, 0, 0],
        [0, 8, 0,  2, 3, 4,  0, 0, 0],
        [0, 5, 0,  0, 0, 7,  0, 0, 0],
        [5, 0, 8,  0, 0, 0,  0, 6, 0],
        [4, 3, 0,  0, 0, 0,  0, 8, 7],
        [0, 7, 0,  0, 0, 0,  5, 0, 3],
        [0, 0, 0,  8, 0, 0,  0, 3, 0],
        [0, 0, 0,  7, 6, 1,  0, 2, 0],
        [0, 0, 0,  3, 0, 5,  9, 0, 0]
    ];
    function fillSudoku(values){
        for(var i = 0; i < 9; i++){
            for(var j = 0; j < 9; j++){
                if(values[i][j] != 0)
                    board.find("#"+i+"_"+j).val(values[i][j]);
                else
                    board.find("#"+i+"_"+j).val('');
            }
        }
    }
    function isValid(values, val,  x, y){
        return checkRow(values, val,  x, y) && checkColumn(values, val, x, y) && checkQuadrant(values, val, x, y)
    }

    function checkQuadrant(values, value, x, y){
        var quadrants = {
            0: { x: [0, 2], y: [0, 2]},
            1: { x: [0, 2], y: [3, 5]},
            2: { x: [0, 2], y: [6, 8]},
            3: { x: [3, 5], y: [0, 2]},
            4: { x: [3, 5], y: [3, 5]},
            5: { x: [3, 5], y: [6, 8]},
            6: { x: [6, 8], y: [0, 2]},
            7: { x: [6, 8], y: [3, 5]},
            8: { x: [6, 8], y: [6, 8]}
        };
        var pos = quadrants[getQuadrant(x,y)];
        for(var i = pos['x'][0]; i <= pos['x'][1]; i++){
            for(var j = pos['y'][0]; j <= pos['y'][1]; j++){
                if(i != x && j != y && values[i][j] == value)
                    return false;
            }
        }
        return true;
    }
    function getQuadrant(x, y){
        if((x >= 0 && x <= 2) && (y >= 0 && y <= 2))
            return 0;
        if((x >= 0 && x <= 2) && (y >= 3 && y <= 5))
            return 1;
        if((x >= 0 && x <= 2) && (y >= 6 && y <= 8))
            return 2;
        if((x >= 3 && x <= 5) && (y >= 0 && y <= 2))
            return 3;
        if((x >= 3 && x <= 5) && (y >= 3 && y <= 5))
            return 4;
        if((x >= 3 && x <= 5) && (y >= 6 && y <= 8))
            return 5;
        if((x >= 6 && x <= 8) && (y >= 0 && y <= 2))
            return 6;
        if((x >= 6 && x <= 8) && (y >= 3 && y <= 5))
            return 7;
        if((x >= 6 && x <= 8) && (y >= 6 && y <= 8))
            return 8;
    }
    function checkRow(values, value, x, y){
        var x1 = x;
        for(var y1 = 0 ; y1 < 9; y1++) {
            if(y1 != y  && values[x1][y1] == value)
                return false;
        }
        return true;
    }
    function checkColumn(values, value, x, y){
        var y1 = y;
        for(var x1 = 0 ; x1 < 9; x1++) {
            if(x1 != x  && values[x1][y1] == value)
                return false;
        }
        return true;
    }

    function solve(values){
        if(isSolved(values)){
            fillSudoku(values);
            return true;
        }
        var pos = getRemaining(values);
        var x = pos['x'];
        var y = pos['y'];
        for(var num = 1; num <= 9; num++){
            if(isValid(values, num, x, y)) {
                values[x][y] = num;
                fillSudoku(values);
                if (solve(values)) {
                    return true;
                }
                values[x][y] = 0;
                fillSudoku(values);
            }
        }
        return false;
    }
    function isSolved(values){
        for(var i = 0; i < 9; i++){
            for(var j = 0; j < 9; j++){
                if(values[i][j] == 0)
                    return false;
            }
        }
        return true;
    }

    function getRemaining(values){
        for(var i = 0; i < 9; i++){
            for(var j = 0; j < 9; j++){
                if(values[i][j] == 0)
                    return {x: i, y: j};
            }
        }
        return null;
    }

    $('input').change(function(){
        var val = $(this).val();
        var x = $(this).attr("data-x");
        var y = $(this).attr("data-y");
        if(isValid(values, x, y)){
            alert("is valid");
            values[x][y] = val;
        }
        else{
            alert("is invalid");
        }
    });

    fillSudoku(zeros);
    solve(zeros);
});
