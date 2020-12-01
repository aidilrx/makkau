const Discord = require("discord.js");

class Bot {
  constructor(token, prefix, commands) {
    this.token = token;
    this.prefix = prefix || "mk";
    this.bot = new Discord.Client();
    this.commands = commands || {};

    if (!this.commands.hasOwnProperty('')) {
      let prefix = this.prefix;
      this.commands[""] = function (channel) {
        channel.send("Hello this is " + prefix);
      };
    }
  }

  setPrefix(new_prefix) {
    this.prefix = new_prefix;
  }

  login(token) {
    //console.log(this.token);
    if (!(this.token || token)) {
      console.log("There is no token set. You need to set one.");
      return;
    }

    this.start();

    this.bot.login(token ? token : this.token);
  }

  start() {
    this.bot.on("ready", () => {
      //console.log("This bot is online");
    });

    this.bot.on("message", (msg) => {
      // do nothing if message is not start with prefix
      //console.log(msg.content.startsWith(this.prefix));
      //console.log(msg.author.bot);
      if (!msg.content.startsWith(this.prefix) || msg.author.bot) return;

      const args = msg.content.slice(this.prefix.length).split(/ +/);
      // console.log(args);

      const commands = args.slice(1);
      const channel = msg.channel;

      if (this.commands.hasOwnProperty(commands[0])) {
        this.commands[commands[0]](channel, commands, this);
      } else if (
        args.length < 0 ||
        (commands == "" && this.commands.hasOwnProperty(""))
      ) {
        this.commands[""](channel, commands);
      } else {
        msg.channel.send("No such command");
      }
    });
  }

  addCommand(command, func) {
      if(this.commands.hasOwnProperty(command)) {
          console.log('This bot has already have this command. Try something else. maybe later i provide overide');
          return;
      }
      this.commands[command] = func;
  }
}
const commands = {};
const Makkau = new Bot(
  "NzgzMzczNzYwNjU2MzEwMjky.X8Zzqg.7_zFmw9YeiADaekTQZoBXr0jKKY",
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