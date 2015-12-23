
var awesome = {
    width: 15,
    height: 20,
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    randLetter: function() {
        return awesome.alphabet[Math.floor(Math.random() * this.alphabet.length)];
    },
    init: function() {
        awesome.genBoard();
        awesome.drawBoard();
    },
    drawBoard: function() {
        var text = '';
        $(awesome.board).each(function(y, line) {
            $(line).each(function(x, letter) {
                text += '<span class="color' + awesome.getRandomInt(1, 7) + '">' + letter + '</span>';
            });
            text += '<br />';
        });
        console.log(text);
        $('.board').html(text);
    },
    genBoard: function() {
        for(var y=0;y<awesome.height;y++) {
            line = []
            for(var x=0;x<awesome.width;x++) {
                line.push(awesome.randLetter());
            }
            awesome.board.push(line);
        }
        console.table(awesome.board);
    },
    board: [],
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
};


$(awesome.init);
