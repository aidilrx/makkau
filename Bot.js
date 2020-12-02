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
      console.log("This bot is now online");
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

module.exports = {
    Bot: Bot
}