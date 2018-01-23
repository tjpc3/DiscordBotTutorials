const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
	console.log("Logged into Discord Successfully!");
});

client.login(require("./token.js").token);

client.on("message", (msg) => {
    if (msg.content == ";;ping")
    	msg.reply("Pong!");
    else if (msg.content == ";;nuke") 
    	msg.channel.bulkDelete(100);
});