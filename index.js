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

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.5024c565-b6f9-4711-a1d9-fda80da53598"; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing facts about Adam.
 */
var ADAM_PIPPERT_FACTS = [
    "Adam Pippert can leap tall buildings in a single bound.",
    "Adam is capable of making Chuck Norris cry.",
    "Adam came from humble beginnings. What the hell happened?",
    "Adam once got attacked in a hotel room suite in Las Vegas.  He got a black eye, but didn't have to pay for the hotel.",
    "Adam is not the only member of his family to go by his middle name.  Traditionally, in his family, all oldest male children go by their middle name.",
    "If there were a planet named after Adam, it would be in the M33 galaxy, as 33 is his lucky number.",
    "The only person ever to defeat Adam in a spelling bee later became a nun.",
    "Adam has lived in 5 states.  These include Virginia, Maryland, Oklahoma, Nevada, and Oregon.",
    "Adam's favorite brand of pen is Zebra.",
    "Adam will eat almost anything, but prefers Asian food if given a choice.  He used to work in Chinese restaurants, and got used to the food when working in these establishments.",
    "Adam didn't get less than 100% on a school assignment until the 2nd grade.  He also never received any disciplinary action the entire time he was in school.",
    "Adam's favorite toys growing up were Transformers and Legos.  Today, he still has several Lego models in his home office, and considers them amongst the items he'd save in a fire.",
    "Adam's favorite game to play at a casino is Pai Gow Poker.",
    "Adam wrote stories in elementary school about two twins who built a sattelite.  They were not very good stories.  He was 9.  What do you expect?",
    "Adam owns a 15 passenger van, because he's so popular that this was the only way to handle requests from his friends who wanted to hang out with him.",
    "Adam has a 6 pound Pomeranian named Teddy.  If you own a dog, he is cuter than your dog.  Guaranteed, or your money back.",
    "Adam is like the Pied Piper, except he doesn't play the flute or wear green tights.",
    "Adam's favorite colors are blue, black, silver, and white.  He estimated 95% of his clothes are exclusively these 4 colors."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * AdamPippertFacts is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var AdamPippertFacts = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
AdamPippertFacts.prototype = Object.create(AlexaSkill.prototype);
AdamPippertFacts.prototype.constructor = AdamPippertFacts;

AdamPippertFacts.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("AdamPippertFacts onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

AdamPippertFacts.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("AdamPippertFacts onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
AdamPippertFacts.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("AdamPippertFacts onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

AdamPippertFacts.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Adam Pippert Facts to tell you a fact about Adam, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random Adam fact from the Adam facts list
    var factIndex = Math.floor(Math.random() * ADAM_PIPPERT_FACTS.length);
    var fact = ADAM_PIPPERT_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your Adam Pippert fact: " + fact;

    response.tellWithCard(speechOutput, "AdamPippertFacts", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the AdamPippertFacts skill.
    var AdamFacts = new AdamPippertFacts();
    AdamFacts.execute(event, context);
};

