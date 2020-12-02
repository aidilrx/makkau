const Discord = require("discord.js");
const Bot = require('./Bot');
require('dotenv').config();

const PREFIX = "mk";
const commands = {};
const Makkau = new Bot.Bot(
  process.env.token,
  "mk",
  commands
);

Makkau.login();

function greet(channel) {
  // bot.channel.send('Hello there');
  channel.send('Hello There');
}

function ayam(channel) {
    channel.send('Ayam is not here');
}

function hotmilf(c, cmd) {
    c.send("https://pbs.twimg.com/media/EXWDxpRVcAAgijK.jpg");
}

function setPrefix(c, cmd, bot) {
    const args = cmd.slice(1);
    if(args.length < 1 || args[0] === '') {
        c.send('You need to provide the prefix bitch.');
        return;
    }

    bot.setPrefix(args[0]);
    c.send('This bot prefix has been change to '+ bot.prefix);
}

function randomPic(c) {
    let seed = 0;
    while(seed < 200 || seed > 2000) {
        seed = Math.floor(Math.random() * 1500);
    }
    c.send('https://picsum.photos/'+seed);
}

function showCommands(c, cmd, bot) {
    let cmdKeys= Object.keys(bot.commands);
    cmdKeys = cmdKeys.filter(key => key !== '');
    cmdKeys = cmdKeys.sort()

    let msg = "Dude i only have these commands:\n `" + cmdKeys[0] + "`";
    for(let i = 1; i< cmdKeys.length; i++) {
        msg += `, \`\`${cmdKeys[i]}\`\``;
    }
    msg += '';

    let embed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Makkau Commands')
        .setDescription(msg)
        .setThumbnail('https://media.comicbook.com/2017/04/love-live-nico-nico-nii-988962-1280x0.png')
    c.send(embed);
}


const upcomingCommands = [
    ['hotmilf', hotmilf],
    ['prefix', setPrefix],
    ['randompic', randomPic],
    ['ayam', ayam],
    ['commands', showCommands]
]

for(let i in upcomingCommands) {
    Makkau.addCommand(upcomingCommands[i][0], upcomingCommands[i][1]);
}