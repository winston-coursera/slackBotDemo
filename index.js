const { RTMClient, WebClient } = require('@slack/client');
const words = require('similar-english-words');
const { SLACK_TOKEN } = process.env;

const rtm = new RTMClient(SLACK_TOKEN);
const web = new WebClient(SLACK_TOKEN);

// lil' helperboi
const randomKeyAndValue = (arr) => {
  const key = Math.floor(Math.random() * arr.length);

  return {
    key,
    value: arr[key],
  }
};

// start websocket connect
// using a console.log statement here so it's easier
// to verify that we actually restarted this node app.
console.log('starting...');
rtm.start();

// IMO: easiest way to verify that your bot is running
//      when you're interacting with your chat window.
// This should probably be removed when not DEVing.
// inspo: https://twitter.com/leinweber/status/989267343002951680?lang=en
rtm.on('user_typing', (event) => {
  rtm.sendTyping(event.channel);
});

// This is only getting called when we start our bot.
// A better/but-not-best idea for keeping track of channels
// would be to create a global channels object and then update it
// when members are added and removed
// https://api.slack.com/rtm#events
web.channels.list()
  .then((res) => {
    const { channels } = res;

    // build list of channel ids that the bot is a member of
    const channelIds = channels.filter(x => x.is_member).map(x => x.id);

    // message event listener - gotta' know when a message is
    // being sent so we can be annoying and forward it on!
    rtm.on('message', (event) => {
      const { text, channel } = event;
      const otherChannels = channelIds.filter(x => x !== channel);

      otherChannels.forEach((currChannel) => {
        const textArr = text.split(' ');
        const randomStuff = randomKeyAndValue(textArr);
        const wordsArr = words[randomStuff.value];

        // nit: would probably make more sense to build a new string
        //      array all together instead of modifying the original.
        if (wordsArr && wordsArr.length) {
          textArr[randomStuff.key] = randomKeyAndValue(wordsArr).value;
        }

        const newString = textArr.join(' ');

        rtm.sendMessage(`Hey, I think someone said something along the lines of "${newString}" in another room but I am also not really sure and also I am not a bot.`, currChannel)
          .catch(console.error);
      });
    });
  })
  .catch(console.error);


