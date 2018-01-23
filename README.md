# Bulding your first basic bot on Discord
Hello and welcome to building you first basic bot on Discord! By the end of this tutorial your bot will be able to log into discord, respond to messages, and perform basic moderation functions. We will be writing our bot in discord.js, a common library for developing bots in node.js. This tutorial is for Windows users ONLY.

First you'll want to setup your bot account.
The Reactiflux community created a great step-by-step guide for setting up a discord bot account [here.](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token)
Be sure to keep your bot token, we'll need it later.

Once you've created the bot and added to a server, next you need to setup node js on your computer. You can download node.js from [here.](https://nodejs.org/en/)

After you've completed the setup of node.js, created a folder on your desktop; in my case I've named it "TutorialBot", but you can name it whatever you like. Open a command window and navigate to the folder you've just created. Shift + right-click on an empty spot in the folder and click on "Open command window here". 
![](https://i.imgur.com/lc4OjoL.png)

Once you have a command window open, type in `npm init` in order to initialize the folder so it can be used with node.js. You will prompted to type in information, but just press enter for all of them for now; you can edit them later. After you've done that you'll need to install discord.js so you can connect to Discord. run `npm install discord.js --save`. This will install discord.js to the project. Leave this command prompt open for later.

Once discord.js has been installed, you can start writing your bot. Right click on an empty space in the folder, go to "New", and click on "Text Document". Rename the file to index.js. If it asks you if you would like to change the extension, click "Yes". Open the file in a text editor of your choice; if you don't have a text editor installed, right-click on the file and hit "Edit", this will open the file in Notepad. 
![](https://i.imgur.com/fJYQmS7.png)

Now you can begin writing code! To make sure node.js is working try this:
```javascript
console.log("Hello, World!");
```

Put this into the file and save it. Then open go back to your command prompt window and run `node index.js`. This will start you program. Your program should print this: 

![](https://i.imgur.com/gJP2opk.png)

So what did that do? `console` is a built-in object in javascript that allows for interacting with the console. `.log` means to access the log function of the console. `("Hello, World!")` means to give the log function the text "Hello, World!" and run it. The log function prints the text it recieves to the console.

Now that that's working, let's connect to discord and start setting up our bot. Let's erase what we have so far and replace it with this:
```javascript
var Discord = require("discord.js");
var client = new Discord.Client();

client.on("ready", () => {
	console.log("Logged into Discord Successfully!");
});

client.login("your-bot-token");
```
Woah! What's going on here? Let's break it down piece by piece. `var Discord = require("discord.js");` This line of code gets the discord.js library so we can use it in our code; it also assigns the word "Discord" as a reference to the library. `var client = new Discord.Client();` This creates a new discord client using discord.js and assigns it to "client". This will be needed to login to discord. `new Discord.Client();` simply generates a new client from the discord.js library we got earlier. `client.on("ready", () => {` This will run a function (a container for code) when the bot is ready. `console.log("Logged into Discord Successfully!");` This will log a message to the console once the bot is ready. `});` This tells node.js that the function as ended and all code after it isn't inside the function. Finally, `client.login("your-bot-token");` tells discord.js to attempt to log into discord with the provided token. Replace `your-bot-token` with the token you got earlier when creating your bot.

Press Ctrl + C to stop your bot. Now run `node index.js`. We should see this:

![](https://i.imgur.com/JUnRWCR.png)

You might have also noticed that your bot is online in Discord. Congratulations! You've connected your bot to Discord! Next let's make it respond to messages. Let's add this to the end of our file:
```javascript
client.on("message", (msg) => {
	if (msg.content == ";;ping")
    	msg.reply("Pong!");
});
```
Save it and run `node index.js`. Try typing ";;ping" into a channel, the bot should reply like this:

![](https://media.giphy.com/media/3oFzmoVpEXCeLp3piE/giphy.gif)

So what do each of these new lines do? `client.on("message", (msg) => {` waits for when the client receives a discord message in any channel, on any server. `if (msg.content == ";;ping")` checks to see if the content of the message is ";;ping". `msg.reply("Pong!");` replies to the message with "Pong!". And like last time, `});` ends the function.

Now you bot can respond to pings, but that's not very useful. Something else we could do would be add a simple command that deletes the past 100 or so messages in the channel. In order to do that, let's change
```
	if (msg.content == ";;ping")
    	msg.reply("Pong!");
```
        to this:
        
```javascript
    if (msg.content == ";;ping")
    	msg.reply("Pong!");
    else if (msg.content == ";;clear") 
    	msg.channel.bulkDelete(100);
```
If you save it and run `node index.js` now your bot now you can use a new command!

![](https://media.giphy.com/media/3oFzmiRPJUbqa5L2yA/giphy.gif)

You know the drill, `else if (msg.content == ";;nuke")` checks to see if the messsage content is ";;clear" only if the first check of ";;ping" didn't work. This makes it so if the message is ";;ping" it wont try to check to see if it's ";;clear". Next `msg.channel.bulkDelete(100);` gets the channel the message was sent in and runs the `bulkDelete` function. This function takes in a number, and deletes that many messages from the channel. (Note: Your bot will need to have the "Manage Messages" permission on your server in order for this to work.) Since we give it the number 100, it's going to delete 100 messages.

And there you go! You have a simple bot that logs into discord and can perform basic moderation functions. Here's what your code should look like all together.

```javascript
var Discord = require("discord.js");
var client = new Discord.Client();

client.on("ready", () => {
	console.log("Logged into Discord Successfully!");
});

client.login("your-bot-token");

client.on("message", (msg) => {
    if (msg.content == ";;ping")
    	msg.reply("Pong!");
    else if (msg.content == ";;nuke") 
    	msg.channel.bulkDelete(100);
});
```

I do see a few ways we can improve this however. First since the two variables we declare at the top are never going to be modified, let's change them to constants.
```javascript
const Discord = require("discord.js");
const client = new Discord.Client();
```
Next we have another issue, the bot token is in the middle of our main file, this is a security risk and makes chaning the token more difficult. Lets make a seperate file in our folder and name it `token.js`. Inside token.js, let's put this:
```javascript
module.exports.token = "your-bot-token";
```
What is `module.exports`? 
`module` is another built-in object like `console`. It allows you to access what happens when this javascript file gets loaded by another file. everything in the `exports` propterty of `module` gets loaded. So when we set the `token` property of `exports` we can use the value stored in it (in this case our bot token)
 later. Lets go back to our original file and change this line:
 ```javascript
 client.login("your-bot-token");
 ```
 to this:
 ```javascript
 client.login(require("./token.js").token);
 ```
 
This will load the token.js file and access the `token` property of `module.exports` we set earlier. This value contans our bot's token, so our bot loads normally. 

And that's all for this tutorial! If you want more information on how to use discord.js or node.js check out the documentation below.

[https://discord.js.org/#/docs/main/stable/general/faq]([https://discord.js.org/#/docs/main/stable/general/faq)

[https://nodejs.org/docs/latest-v7.x/api/]([https://nodejs.org/docs/latest-v7.x/api/)

