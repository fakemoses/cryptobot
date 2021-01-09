const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const client = new Client()
const path = require('path')
require('dotenv').config()
var http = require('http');
const express = require('express');
const  {callKraken} = require('./middleware')

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT

app.use(express.static(path.join(__dirname, 'public')))

server.listen(PORT, () => console.log('Server running on port ', PORT))

client.on('ready', () => {
    console.log('Bot is up')
})


client.on('message', msg => {

    //Bot to submit amount of money every 5 minutes
    //activate using !cv
    if (msg.content == '!cv') {
        msg.channel.send('Activated')
        setInterval(() => {
            callKraken('XXLMZEUR','XXLM').then(res => {

                //Example of embed. Add more line and field for others.
                //Refer to the documentation https://discordjs.guide/popular-topics/embeds.html
                const embed = new MessageEmbed()
                    .setTitle('Update Crypto!')
                    .addFields(
                        { name: 'Total Money in €: \n', value: res.totalMoney, inline: false },
                        { name: 'Total Money in XLM: \n', value: res.myMoney, inline: false },
                        { name: 'Exchange Rate 1 XLM to Euro: \n', value: res.currentValue, inline: false }
                    )
                msg.channel.send(embed)
            })
        }, 60000*5)
    }
})

client.login(process.env.BOT_TOKEN)