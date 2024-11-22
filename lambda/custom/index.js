/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Adam Pippert Facts for a fact"
 *  Alexa: "Here's your Adam fact: ..."
 */

const Alexa = require('ask-sdk-core');

const ADAM_PIPPERT_FACTS = [
    "Adam Pippert can leap tall buildings in a single bound.",
    "Adam is capable of making Chuck Norris cry.",
    "Adam came from humble beginnings. What the hell happened?",
    "Adam once got attacked in a hotel room suite in Las Vegas.  He got a black eye, but didn't have to pay for the hotel.",
    "Traditionally, in his family, all oldest male children go by their middle name.",
    "33 is his lucky number.",
    "The only person ever to defeat Adam in a spelling bee later became a nun.",
    "Adam has lived in 5 states.",
    "Adam's favorite brand of pen is Zebra.",
    "Adam will eat almost anything, but prefers Asian food if given a choice.",
    "Adam used to work in Chinese restaurants, but used to hate the food. Now, he loves it!",
    "Adam didn't get less than 100% on a school assignment until the 2nd grade.",
    "Adam never received any disciplinary action the entire time he was in school.",
    "Adam's favorite toys growing up were Transformers and Legos.",
    "Adam's favorite game to play at a casino is Pai Gow Poker.",
    "Adam wrote stories in elementary school about two twins who built a satellite.  They were not very good stories.  He was 9.  What do you expect?",
    "Adam can play many musical instruments. Go check out his YouTube channel to hear him play!",
    "Adam has a 6 pound Pomeranian named Teddy.",
    "Adam's favorite colors are blue, black, silver, and white."
];

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        return GetNewFactHandler.handle(handlerInput);
    }
};

const GetNewFactHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetNewFactIntent';
    },
    handle(handlerInput) {
        const factIndex = Math.floor(Math.random() * ADAM_PIPPERT_FACTS.length);
        const randomFact = ADAM_PIPPERT_FACTS[factIndex];
        const speakOutput = `Here's your Adam fact: ${randomFact}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard('Adam Pippert Facts', randomFact)
            .getResponse();
    }
};

const HelpHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can ask me to tell you a fact about Adam, or you can say exit. What would you like to do?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.error(`Error handled: ${error.message}`);
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        GetNewFactHandler,
        HelpHandler,
        CancelAndStopHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
