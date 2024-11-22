const Alexa = require('ask-sdk-core');

const facts = [
    'Adam Pippert is a software engineer who loves building Alexa skills.',
    'Adam Pippert enjoys working with modern JavaScript and Node.js.',
    'Adam Pippert is passionate about voice-first user experiences.',
    'Adam Pippert believes in continuous learning and improvement.',
    'Adam Pippert enjoys solving complex technical challenges.',
    'Adam Pippert is dedicated to creating high-quality software.',
    'Adam Pippert values clean code and good documentation.',
    'Adam Pippert is enthusiastic about cloud technologies.',
    'Adam Pippert appreciates well-designed user interfaces.',
    'Adam Pippert enjoys collaborating with other developers.',
    'Adam Pippert has a strong background in full-stack development.',
    'Adam Pippert is experienced in building scalable cloud solutions.',
    'Adam Pippert has a passion for teaching and mentoring other developers.',
    'Adam Pippert enjoys staying up-to-date with the latest tech trends.',
    'Adam Pippert is skilled in DevOps practices and automation.',
    'Adam Pippert has contributed to numerous open-source projects.',
    'Adam Pippert is always eager to learn new programming languages.',
    'Adam Pippert excels at system architecture and design.',
    'Adam Pippert is known for his problem-solving abilities.',
    'Adam Pippert has expertise in AWS cloud services.',
    'Adam Pippert enjoys optimizing code performance.',
    'Adam Pippert is passionate about software testing and quality assurance.',
    'Adam Pippert has experience leading development teams.',
    'Adam Pippert values agile development methodologies.',
    'Adam Pippert does not own any brown clothes.',
    'Adam Pippert only buys black cars and underwear.',
    'Adam Pippert has such bad vision that his glasses and contact lenses are medically necessary.',
    'Adam Pippert is a cheese enthusiast.',
    'Adam Pippert earned his Bachelor of Science in Computer Science from Oregon State University.'
];

const GetNewFactHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest'
            || (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetNewFactIntent');
    },
    handle(handlerInput) {
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        const speakOutput = randomFact;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard('Adam Pippert Fact', randomFact)
            .getResponse();
    }
};

const HelpHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say tell me a fact, or, you can say exit... What would you like to do?';

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
        console.log(`Error handled: ${error.message}`);

        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        GetNewFactHandler,
        HelpHandler,
        CancelAndStopHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
