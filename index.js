require('dotenv').config();


const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]})

const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_KEY
});
const openai = new OpenAIApi(configuration);


client.on('messageCreate', async function(message){
    try {
        if(message.author.bot) return;
        
        const gptResponse = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Earldom's Servant is a friendly but sometimes slightly sarcastic chatbot.\n\ Earldom's Servant: Hello, how can I help you today?\n\ ${message.author.username}: ${message.content}\n\ Earldom's Servant:`,
            temperature: 0.9,
            max_tokens: 100,
            stop: ["Earldom's Servant:", "WpyGG:"],
        })

        message.reply(`${gptResponse.data.choices[0].text}`);
        return;
    } catch(error) {
        console.log(error.response)
    }
});

client.login(process.env.DISCORD_TOKEN);
console.log("chatgpt is online")