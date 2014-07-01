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
            .reject(function (piece) {  // Remove any possibly taken pieces.
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

var unitize = function (value) {
    if (value === 0) {
        return 0;
    }
    if (value < 0) {
        return -1;
    }
    return 1;
};

var occupiedSquare = function (position, coordinate) {
    return _.some(position, function (piece) {
        return locatedAt(piece, coordinate);
    });
};

var freePath = function (position, from, to) {
    var i, cs,
        dx = to[0] - from[0],
        dy = to[1] - from[1],
        squaresInPath = _.max([Math.abs(dx), Math.abs(dy)]),
        udx = unitize(dx),
        udy = unitize(dy);

    for (i = 1; i < squaresInPath; i = i + 1) {
        cs = [from[0] + i * udx, from[1] + i * udy];

        if (occupiedSquare(position, cs)) {
            return false;
        }
    }

    return true;
};

var oppositeColor = function (pieceA, pieceB) {
    if (pieceA.color === 'b' && pieceB.color === 'w') {
        return true;
    }
    if (pieceA.color === 'w' && pieceB.color === 'b') {
        return true;
    }
    return false;
};

var canCapture = function (position, coordinate, attackingPiece) {
    var pieceToCapture = _.find(position, function (piece) {
        return locatedAt(piece, coordinate);
    });

    if (pieceToCapture === undefined) {
        return false;
    }

    if (oppositeColor(pieceToCapture, attackingPiece)) {
        return true;
    }

    return false;
};

var pawnMoves = function (position, pawn) {
    var moves = [],
        cc = pawn.position,
        direction = 1,
        startRank = 2,
        moveCandidate;

    if (pawn.color === 'b') {
        direction = -1;
        startRank = 7;
    }

    moveCandidate = [cc[0], cc[1] + direction];

    if (!occupiedSquare(position, moveCandidate)) {
        moves.push([cc, moveCandidate]);
    }

    if (cc[1] === startRank) {
        moveCandidate = [cc[0], cc[1] + 2 * direction];

        if (!occupiedSquare(position, moveCandidate) && freePath(position, cc[0], moveCandidate)) {
            moves.push([cc, moveCandidate]);
        }
    }

    moveCandidate = [cc[0] + 1, cc[1] + direction];

    if (canCapture(position, moveCandidate, pawn)) {
        moves.push([cc, moveCandidate]);
    }

    moveCandidate = [cc[0] - 1, cc[1] + direction];

    if (canCapture(position, moveCandidate, pawn)) {
        moves.push([cc, moveCandidate]);
    }

    return moves;
};

exports.newPiece = newPiece;

exports.initialPosition = initialPosition;
exports.updatePosition = updatePosition;
exports.prettyPosition = prettyPosition;

exports.freePath = freePath;
exports.pawnMoves = pawnMoves;