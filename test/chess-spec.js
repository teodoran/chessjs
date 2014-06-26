/*jslint node: true, es5: true*/
/*global describe, it*/

var should = require('should'),
    c = require('../chess');

describe('Chess', function () {
    'use strict';

    describe('newPiece', function () {
        it('should create new pieces', function () {
            var blackKnigth = c.newPiece([2, 8], 'N', 'b');

            blackKnigth.should.eql({
                position: [2, 8],
                type: 'N',
                color: 'b'
            });
        });
    });

    describe('initialPosition', function () {
        it('should create the initial position', function () {
            var initialPosition = [ { position: [ 1, 8 ], type: 'R', color: 'b' }, { position: [ 1, 7 ], type: 'P', color: 'b' }, { position: [ 1, 2 ], type: 'P', color: 'w' }, { position: [ 1, 1 ], type: 'R', color: 'w' }, { position: [ 2, 8 ], type: 'N', color: 'b' }, { position: [ 2, 7 ], type: 'P', color: 'b' }, { position: [ 2, 2 ], type: 'P', color: 'w' }, { position: [ 2, 1 ], type: 'N', color: 'w' }, { position: [ 3, 8 ], type: 'B', color: 'b' }, { position: [ 3, 7 ], type: 'P', color: 'b' }, { position: [ 3, 2 ], type: 'P', color: 'w' }, { position: [ 3, 1 ], type: 'B', color: 'w' }, { position: [ 4, 8 ], type: 'Q', color: 'b' }, { position: [ 4, 7 ], type: 'P', color: 'b' }, { position: [ 4, 2 ], type: 'P', color: 'w' }, { position: [ 4, 1 ], type: 'Q', color: 'w' }, { position: [ 5, 8 ], type: 'K', color: 'b' }, { position: [ 5, 7 ], type: 'P', color: 'b' }, { position: [ 5, 2 ], type: 'P', color: 'w' }, { position: [ 5, 1 ], type: 'K', color: 'w' }, { position: [ 6, 8 ], type: 'B', color: 'b' }, { position: [ 6, 7 ], type: 'P', color: 'b' }, { position: [ 6, 2 ], type: 'P', color: 'w' }, { position: [ 6, 1 ], type: 'B', color: 'w' }, { position: [ 7, 8 ], type: 'N', color: 'b' }, { position: [ 7, 7 ], type: 'P', color: 'b' }, { position: [ 7, 2 ], type: 'P', color: 'w' }, { position: [ 7, 1 ], type: 'N', color: 'w' }, { position: [ 8, 8 ], type: 'R', color: 'b' }, { position: [ 8, 7 ], type: 'P', color: 'b' }, { position: [ 8, 2 ], type: 'P', color: 'w' }, { position: [ 8, 1 ], type: 'R', color: 'w' } ];

            c.initialPosition().should.eql(initialPosition);
        });
    });

    describe('updatePosition', function () {
        it('should move a single pawn', function () {
            var initialPosition = [ { position: [ 1, 7 ], type: 'P', color: 'b' } ],
                updatedPosition = [ { position: [ 1, 6 ], type: 'P', color: 'b' } ],
                moves = [[[1, 7], [1, 6]]];

            c.updatePosition(initialPosition, moves).should.eql(updatedPosition);
        });

        it('should move a pawn from the initial position', function () {
            var updatedPosition = [ { position: [ 1, 8 ], type: 'R', color: 'b' }, { position: [ 1, 7 ], type: 'P', color: 'b' }, { position: [ 1, 2 ], type: 'P', color: 'w' }, { position: [ 1, 1 ], type: 'R', color: 'w' }, { position: [ 2, 8 ], type: 'N', color: 'b' }, { position: [ 2, 7 ], type: 'P', color: 'b' }, { position: [ 2, 2 ], type: 'P', color: 'w' }, { position: [ 2, 1 ], type: 'N', color: 'w' }, { position: [ 3, 8 ], type: 'B', color: 'b' }, { position: [ 3, 7 ], type: 'P', color: 'b' }, { position: [ 3, 2 ], type: 'P', color: 'w' }, { position: [ 3, 1 ], type: 'B', color: 'w' }, { position: [ 4, 8 ], type: 'Q', color: 'b' }, { position: [ 4, 7 ], type: 'P', color: 'b' }, { position: [ 4, 2 ], type: 'P', color: 'w' }, { position: [ 4, 1 ], type: 'Q', color: 'w' }, { position: [ 5, 8 ], type: 'K', color: 'b' }, { position: [ 5, 7 ], type: 'P', color: 'b' }, { position: [ 5, 4 ], type: 'P', color: 'w' }, { position: [ 5, 1 ], type: 'K', color: 'w' }, { position: [ 6, 8 ], type: 'B', color: 'b' }, { position: [ 6, 7 ], type: 'P', color: 'b' }, { position: [ 6, 2 ], type: 'P', color: 'w' }, { position: [ 6, 1 ], type: 'B', color: 'w' }, { position: [ 7, 8 ], type: 'N', color: 'b' }, { position: [ 7, 7 ], type: 'P', color: 'b' }, { position: [ 7, 2 ], type: 'P', color: 'w' }, { position: [ 7, 1 ], type: 'N', color: 'w' }, { position: [ 8, 8 ], type: 'R', color: 'b' }, { position: [ 8, 7 ], type: 'P', color: 'b' }, { position: [ 8, 2 ], type: 'P', color: 'w' }, { position: [ 8, 1 ], type: 'R', color: 'w' } ],
                moves = [[[5, 2], [5, 4]]];

            c.updatePosition(c.initialPosition(), moves).should.eql(updatedPosition);
        });

        it('should be able to play the first eight moves of the immortal game (A. Anderssen and L. Kieseritzky, 1851)', function () {
            var moves = [[[5, 2], [5, 4]], [[5, 7], [5, 5]],
                         [[6, 2], [6, 4]], [[5, 5], [6, 4]],
                         [[6, 1], [3, 4]], [[4, 8], [8, 4]],
                         [[5, 1], [6, 1]], [[2, 7], [2, 5]]],
                updatedPosition = [ { position: [ 1, 8 ], type: 'R', color: 'b' }, { position: [ 1, 7 ], type: 'P', color: 'b' }, { position: [ 1, 2 ], type: 'P', color: 'w' }, { position: [ 1, 1 ], type: 'R', color: 'w' }, { position: [ 2, 8 ], type: 'N', color: 'b' }, { position: [ 2, 5 ], type: 'P', color: 'b' }, { position: [ 2, 2 ], type: 'P', color: 'w' }, { position: [ 2, 1 ], type: 'N', color: 'w' }, { position: [ 3, 8 ], type: 'B', color: 'b' }, { position: [ 3, 7 ], type: 'P', color: 'b' }, { position: [ 3, 2 ], type: 'P', color: 'w' }, { position: [ 3, 1 ], type: 'B', color: 'w' }, { position: [ 8, 4 ], type: 'Q', color: 'b' }, { position: [ 4, 7 ], type: 'P', color: 'b' }, { position: [ 4, 2 ], type: 'P', color: 'w' }, { position: [ 4, 1 ], type: 'Q', color: 'w' }, { position: [ 5, 8 ], type: 'K', color: 'b' }, { position: [ 6, 4 ], type: 'P', color: 'b' }, { position: [ 5, 4 ], type: 'P', color: 'w' }, { position: [ 6, 1 ], type: 'K', color: 'w' }, { position: [ 6, 8 ], type: 'B', color: 'b' }, { position: [ 6, 7 ], type: 'P', color: 'b' }, { position: [ 3, 4 ], type: 'B', color: 'w' }, { position: [ 7, 8 ], type: 'N', color: 'b' }, { position: [ 7, 7 ], type: 'P', color: 'b' }, { position: [ 7, 2 ], type: 'P', color: 'w' }, { position: [ 7, 1 ], type: 'N', color: 'w' }, { position: [ 8, 8 ], type: 'R', color: 'b' }, { position: [ 8, 7 ], type: 'P', color: 'b' }, { position: [ 8, 2 ], type: 'P', color: 'w' }, { position: [ 8, 1 ], type: 'R', color: 'w' } ];

            c.updatePosition(c.initialPosition(), moves).should.eql(updatedPosition);
        });
    });

    describe('prettyPosition', function () {
        it('should return a chess position formatted for console out-print', function () {
            var pp = [ [ 'bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR' ], [ 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP' ], [ '__', '__', '__', '__', '__', '__', '__', '__' ], [ '__', '__', '__', '__', '__', '__', '__', '__' ], [ '__', '__', '__', '__', '__', '__', '__', '__' ], [ '__', '__', '__', '__', '__', '__', '__', '__' ], [ 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP' ], [ 'wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR' ] ];

            c.prettyPosition(c.initialPosition()).should.eql(pp);
        });
    });
});