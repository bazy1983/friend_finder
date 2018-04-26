#!/usr/bin/env node
/* eslint-disable no-console */

const Akinator = require('akinator');
const inquirer = require('inquirer');
var bodyParser = require("body-parser");
var path = require("path");




const akinator = new Akinator();






let akiAnswer;
function akinatorFunc(req, res){

akinator.on('question', ({ question, answers, answer, step }) => {
    let akinatorData;
    akiAnswer = "";
    akinatorData = {
        question: question,
        answers: answers
    };
    res.send(akinatorData)
    res.end(); 

    // inquirer.prompt({
    //     type: 'list',
    //     name: 'a',
    //     message: `(${+step + 1}) ${question}`,
    //     choices: answers.map((a, i) => ({
    //         name: a.answer,
    //         value: i,
    //     })),
    // }).then(({ a }) => answer(a));
    akiAnswer = answer
});

akinator.on('guess', ({ guess, name, description }) => {
    inquirer.prompt({
        type: 'confirm',
        name: 'a',
        message: `I think of ${bold(name)}, ${description}`,
    }).then(({ a }) => guess(a));
});

akinator.on('end', (win) => {
    if (win) console.log('Great! Guessed right one more time. I love playing with you!');
    process.reallyExit(0);
});

process.on('exit', () => {
    console.log('Bye!');
});


}

//akinator.start();

function bold(text) {
    return `\u001b[1m${text}\u001b[22m`;
}


