/*jslint node: true, nomen: true, es5: true*/

'use strict';
var _ = require('underscore');

var newPiece = function (position, type, color) {
    return {
        position: position,
        type: type,
        color: color
    };
};

var initialPosition = function () {
    var i,
        officers = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
        ip = [];

    for (i = 1; i <= 8; i = i + 1) {
        ip.push(newPiece([i, 8], officers[i - 1], 'b'));
        ip.push(newPiece([i, 7], 'P', 'b'));

        ip.push(newPiece([i, 2], 'P', 'w'));
        ip.push(newPiece([i, 1], officers[i - 1], 'w'));
    }

    return ip;
};

var locatedAt = function (piece, coordinate) {
    return piece.position[0] === coordinate[0] && piece.position[1] === coordinate[1];
};

var updatePosition = function (position, moves) {
    if (moves.length === 0) {
        return position;
    }

    var move = _.first(moves),
        newPosition = _.chain(position)
            .reject(function (piece) {  // Remove any possibly take pieces.
                return locatedAt(piece, move[1]);
            })
            .map(function (piece) { // Move the piece.
                if (locatedAt(piece, move[0])) {
                    piece.position = move[1];
                }
                return piece;
            })
            .value();

    return updatePosition(newPosition, _.rest(moves));
};

var prettyPosition = function (position) {
    var i, p, x, y, icon,
        board = [];

    for (i = 0; i < 8; i = i + 1) {
        board.push(['__', '__', '__', '__', '__', '__', '__', '__']);
    }

    for (i = 0; i < position.length; i = i + 1) {
        p = position[i];
        x = p.position[0] - 1;
        y = p.position[1] - 1;
        icon = p.color + p.type;

        board[7 - y][x] = icon;
    }

    return board;
};

exports.newPiece = newPiece;
exports.initialPosition = initialPosition;
exports.updatePosition = updatePosition;
exports.prettyPosition = prettyPosition;