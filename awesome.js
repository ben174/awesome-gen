var awesome = {
    width: 12,
    height: 15,
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    randLetter: function() {
        return awesome.alphabet[Math.floor(Math.random() * this.alphabet.length)];
    },
    init: function() {
        $('#message').keyup(awesome.generate);
        awesome.generate();
    },
    generate: function() {
        awesome.genBoard();
        awesome.genOverlay();
        awesome.whiteOutBoard();
        awesome.drawBoard();
    },
    drawBoard: function() {
        var text = '';
        $(awesome.board).each(function(y, line) {
            $(line).each(function(x, letter) {
                //TODO: Use dom, and elminiate br's
                text += '<span class="color' + awesome.getRandomInt(1, 7) + '">' + letter + '</span>';
            });
            text += '<br />';
        });
        $('.board').html(text);
        text = '';
        $(awesome.overlay).each(function(y, line) {
            $(line).each(function(x, letter) {
                //TODO: Use dom, and elminiate br's
                if(letter == ' ') {
                    letter = '&nbsp;';
                }
                text += '<span class="color' + awesome.getRandomInt(1, 7) + '">' + letter + '</span>';
            });
            text += '<br />';
        });
        $('.overlay').html(text);
    },
    genBoard: function() {
        awesome.board = [];
        for(var y=0;y<awesome.height;y++) {
            line = []
            for(var x=0;x<awesome.width;x++) {
                line.push(awesome.randLetter());
            }
            awesome.board.push(line);
        }
    },
    genOverlay: function() {
        awesome.overlay = [];
        var startLine = (awesome.height/2) - (awesome.getLines().length/2);
        for (var y=0;y<startLine;y++) {
            var line = []
            // surely i can do this better, e.g. python (' ' * width)
            for(var x=0;x<awesome.width;x++) {
                line.push(' ');
            }
            awesome.overlay.push(line);
        }
        $(awesome.getLines()).each(function(y, line) {
            var line = awesome.pad(line, awesome.width, ' ', 3).split('');
            awesome.overlay.push(line)
        });
    },
    whiteOutBoard: function() { 
        $(awesome.overlay).each(function(y, line) {
            $(line).each(function(x, letter) {
                if(letter != '&nbsp;' && letter != ' ') {
                    awesome.board[y][x] = '&nbsp;';
                }
            });
        });
    },
    board: [],
    overlay: [],
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    getLines: function() {
        return $('#message').val().toUpperCase().split(' ');
    },
    pad: function(str, len, pad, dir) {
        // stolen from http://www.webtoolkit.info/javascript-pad.html
        var STR_PAD_LEFT = 1;
        var STR_PAD_RIGHT = 2;
        var STR_PAD_BOTH = 3;
        if (typeof(len) == "undefined") { var len = 0; }
        if (typeof(pad) == "undefined") { var pad = ' '; }
        if (typeof(dir) == "undefined") { var dir = STR_PAD_RIGHT; }
        if (len + 1 >= str.length) {
            switch (dir){
                case STR_PAD_LEFT:
                    str = Array(len + 1 - str.length).join(pad) + str;
                break;

                case STR_PAD_BOTH:
                    var right = Math.ceil((padlen = len - str.length) / 2);
                    var left = padlen - right;
                    str = Array(left+1).join(pad) + str + Array(right+1).join(pad);
                break;

                default:
                    str = str + Array(len + 1 - str.length).join(pad);
                break;
            } // switch
        }
        return str;
    }
};


$(awesome.init);
