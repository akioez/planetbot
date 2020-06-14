const Discord = require('discord.js');
const fs = require('fs')
const axios = require('axios');
const config = require('./config.json')
const Kitsu = require('kitsu.js')
const aq = require('animequote')
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://yukioroot:ACnologiA777@planet-j9yo7.mongodb.net/Data?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
// Config Variables

const prefix = config.prefix
const color = config.color
const token = config.token

// Bot Client 

const bot = new Discord.Client({
    disableEveryone: true
});


// Bot Collections 

bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection();
bot.categories = fs.readdirSync(`./commands/`);

["command"].forEach(handler =>{
    require(`./handlers/${handler}`)(bot)
});


// Status change and bot ready

bot.on('ready', () =>{
    function randomStatus(){
        let statuses = [
            "with the stars 🌠",
            `${prefix}help`
        ]
        let rstatus = [Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(statuses[rstatus], {type:'PLAYING'});
        
    }; setInterval(randomStatus, 30000)

    console.log(`${bot.user.username} is online.`)

})

// Message Event 

bot.on('message', async message =>{  


    if(message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase()
    if(cmd.length == 0) return;

    let command = bot.commands.get(cmd)
    if(!command) return;
    if(command) command.run(bot, message, args)
})

// Bot Login 

bot.login(token)