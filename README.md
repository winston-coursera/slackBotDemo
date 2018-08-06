# slackBotDemo
Finished code from the live demo at our 8/6 learners club meeting.

Checkout, create a bot token in your desired slack workspace, build and add the info to your local `.env` file, and then run `npm start` from the root directory after installing. Prepare for chaos.

You can add bots to your integrations via the workspace administrator preferences panels.

Oh yeah, I forgot - make sure to add your bot to one or two channels. One will cause the bot to tell you to add it to another every message so, you know, opt for two channels. Or maybe just keep it at one. This is a tech demo and would likely get pretty annoying if you add it to two channels IRL.

Also plz refactor this if you plan on reusing it for anything. The whole channels list issue is a bit of a deal, and message objects recieved without text properties (editing a message sends one of these) will crash this in it's current state.
