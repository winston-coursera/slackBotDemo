# slackBotDemo
Finished code from the live demo at our 8/6 learners club meeting.

Checkout, create a bot token in your desired slack workspace, build and add the info to your local `.env` file, and then run `npm start` from the root directory after installing. Prepare for chaos.

Also plz refactor this if you plan on reusing it for anything. The whole channels list issue is a bit of a deal, and message objects recieved without text properties (editing a message sends one of these) will crash this in it's current state.
