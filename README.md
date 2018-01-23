# Building your first basic bot on Discord
Hello and welcome! In this tutorial you will learn to build your first basic bot on Discord! By the end of this tutorial your bot will be able to log into discord, respond to messages, and even perform basic moderation functions. We will be writing our bot in discord.js, a common node.js library for developing bots. This tutorial is for Windows users ONLY.

First you'll want to setup your bot account.
The Reactiflux community has created a great step-by-step guide for setting up a discord bot account [here.](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token)
Be sure to keep your bot token, we'll need it later.

Once you've created the bot and added it to a server, next you'll need to setup node.js on your computer. You can download node.js from [here.](https://nodejs.org/en/) Follow the instructions in the installer like you would any program.

After you've completed the setup of node.js, created a folder on your desktop. In my case I've named it "TutorialBot", but you can name it whatever you like. Open a command window and navigate to the folder you've just created. A shortcut for this is to shift + right-click on an empty spot in the folder and click on "Open command window here". 
![](https://i.imgur.com/OGRNrUE.png)

Once you have a command window open, type in `npm init` in order to initialize the folder so it can be used with node.js. You will prompted to type in information, but just press enter for all of them for now, as you can edit them later. After you've done that you'll need to install discord.js so you can connect to Discord. run `npm install discord.js --save`. This will install discord.js to the project so we can use it in our code. Leave this command prompt open for later.

Once discord.js has been installed, you can start writing your bot. Right click on an empty space in the folder, go to "New", and click on "Text Document". Rename the file to index.js. If it asks you if you would like to change the extension, click "Yes". Open the file in a text editor of your choice; if you don't have a text editor installed, right-click on the file and hit "Edit", this will open the file in Notepad. 
![](https://i.imgur.com/fJYQmS7.png)

Now you can begin writing code! To make sure node.js is working try typing this:
```javascript
console.log("Hello, World!");
```

Put this into index.js and save it. Then open go back to your command prompt window and run `node index.js`. This will start your program. You should see this in the command prompt: 

![](https://i.imgur.com/gJP2opk.png)

So what did that do? `console` is a built-in object in javascript that allows for interacting with the console. `.log` tells the computer to access the `log` property of `console`.  `log` is a function, which is a small container for code that can receive input, be run, and give output. By putting`("Hello, World!")`, this tells the computer to run the function with the input `"Hello, World!"`. The `log` function of `console` prints out the text you give it onto the screen, so we see "Hello, World!" printed to our screen. Pretty cool right?

Now that that's working, let's connect to discord and start setting up our bot. Let's erase what we have so far and replace it with this:
```javascript
var Discord = require("discord.js");
var client = new Discord.Client();

client.on("ready", () => {
	console.log("Logged into Discord Successfully!");
});

client.login("your-bot-token");
```
Woah! What's going on here? Let's break it down piece by piece. `var Discord = require("discord.js");` This line of code imports the discord.js library so we can use it in our code; it also assigns the word `Discord` as a reference to the library. `var client = new Discord.Client();` This creates a new Discord client using discord.js and assigns it to the word `client`. This will be needed to login to discord. `new Discord.Client();` simply generates a new client from the discord.js library we imported earlier. `client.on("ready", () => {` This line will run a function when the bot says that it's ready. `console.log("Logged into Discord Successfully!");` This will log a message to the console once the bot is ready. `});` This tells node.js that the function as ended and all code after it isn't inside the function. Finally, `client.login("your-bot-token");` tells discord.js to attempt to log into discord with the provided token. Replace `your-bot-token` with the token you got earlier when creating your bot.

Press Ctrl + C to stop the node.js script you started earlier. Now run `node index.js`. We should see this if all goes well:

![](https://i.imgur.com/JUnRWCR.png)

You might have also noticed that your bot is now online in Discord. Congratulations! You've connected your bot to Discord! Next let's make it respond to messages. Add this to the end of our file:
```javascript
client.on("message", (msg) => {
	if (msg.content == ";;ping")
    	msg.reply("Pong!");
});
```
Save it and run `node index.js`. Try typing ";;ping" into a channel, the bot should reply like this:

![](https://media.giphy.com/media/3oFzmoVpEXCeLp3piE/giphy.gif)

So what do each of these new lines do? `client.on("message", (msg) => {` waits for when the client receives a discord message in any channel, on any server. `if (msg.content == ";;ping")` checks to see if the content of the message is equal to `;;ping`. `msg.reply("Pong!");` replies to the message with "Pong!". And like last time, `});` ends the function.

So Now your bot can respond to pings, but that's not very useful. Something we could do to make it more useful would be add a simple command that deletes the past 100 messages in sent a channel. In order to do that, let's change
```javascript
	if (msg.content == ";;ping")
    	msg.reply("Pong!");
```
        to this:
        
```javascript
    if (msg.content == ";;ping")
    	msg.reply("Pong!");
    else if (msg.content == ";;nuke") 
    	msg.channel.bulkDelete(100);
```
If you save it now and run `node index.js`, you should be able to use a new command!

![](https://media.giphy.com/media/3oFzmiRPJUbqa5L2yA/giphy.gif)
So again, what do these lines do? `else if (msg.content == ";;nuke")` checks to see if the messsage content is equal to `;nuke` only if the first check of `;;ping` didn't work. This makes it so if the message is equal to `;;ping` it wont later try to check to see if it's equal to `;;nuke`. Next `msg.channel.bulkDelete(100);` gets the channel the message was sent in and runs the `bulkDelete` function. This function takes in a number, and deletes that many messages from the channel. (Note: Your bot will need to have the "Manage Messages" permission on your server in order for this to work.) Since we give it the number 100, it's going to delete 100 messages.

And there you go! You now have a simple bot that logs into discord and can perform basic moderation functions. Here's what your code should look like all together.

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

I do see a few ways we can improve this however. First, since the two variables we declare at the top are never going to be modified, let's change them to constants.
```javascript
const Discord = require("discord.js");
const client = new Discord.Client();
```
This will help with performance.
Next we have another issue, the bot token is in the middle of our main index.js file, this is a security risk and makes changing the token more difficult. Lets make a separate file in our folder and name it `token.js`. Inside token.js, let's put this:
```javascript
module.exports.token = "your-bot-token";
```
What is `module.exports`? 
`module` is another built-in object like `console`. It allows you to access what happens when this javascript file gets loaded by another file. everything in the `exports` property of `module` gets loaded. So when we set the `token` property of `exports` we can use the value stored in it (in this case our bot token) later. Lets go back to our original file and change this line:
 ```javascript
 client.login("your-bot-token");
 ```
 to this:
 ```javascript
 client.login(require("./token.js").token);
 ```
 
This will load the token.js file and access the `token` property of `module.exports` we set earlier. This value contains our bot's token, so our bot logs into Discord. The completed code is in the root of this repository.

And that's all for this tutorial! If you want more information on how to use discord.js or node.js check out the documentation below.

[Javascript Tutorial](https://www.tutorialspoint.com/javascript/)

[Discord.js docs](https://discord.js.org/#/docs/main/stable/general/faq)

[Node.js docs](https://nodejs.org/docs/latest-v7.x/api/)

As for an additional challenge, you could try adding a new command or making the bot react to certain messages. Have fun!

