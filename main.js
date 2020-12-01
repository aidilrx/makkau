const Discord = require("discord.js");
const client = new Discord.Client();

const PREFIX = "mk";

const COMMANDS = [];

client.on("ready", function () {
  console.log("Makkau is online");
});

client.on("message", function (msg) {
  if (!msg.content.startsWith(PREFIX) || msg.author.bot) return;

  console.log(msg.content.startsWith(PREFIX));

  const args = msg.content.slice(PREFIX.length).split(/ +/);

  if(args.length < 1) return;
  
  const commands = args.shift().toLowerCase();
  
  if (commands.length < 1) {
    msg.channel.send("Makkau is here bitch!");
  } else if (commands == "ayam") {
    msg.channel.send("Ayam is not here.");
  } else if (commands == "hotmilf") {
    msg.channel.send("https://pbs.twimg.com/media/EXWDxpRVcAAgijK.jpg");
  }
});

client.login("NzgzMzczNzYwNjU2MzEwMjky.X8Zzqg.7_zFmw9YeiADaekTQZoBXr0jKKY");
