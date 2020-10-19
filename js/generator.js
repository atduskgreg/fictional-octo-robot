var tracery = require('tracery-grammar');


var grammar = tracery.createGrammar(require('./data/rooms.json'));
  
grammar.addModifiers(tracery.baseEngModifiers);




module.exports = grammar;