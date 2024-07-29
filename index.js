const Discord = require("discord.js");
require('dotenv').config();
const Client = require("./handlers/ClientStart.js");
const client = new Client();
// start bot
client.start();


// Distube
const DisTube = require("distube")
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { SpotifyPlugin } = require("@distube/spotify");
client.distube = new DisTube.DisTube(client, {
    plugins: [new SpotifyPlugin() , new SoundCloudPlugin()],
    leaveOnEmpty: true,
    leaveOnFinish: true,
    emptyCooldown: 20,
    emitNewSongOnly: false,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    nsfw: true
});

client.distube
    .on("playSong", (queue, song) => {
        const Embed = new Discord.EmbedBuilder()
            .setTitle('Now Playing')
            .setDescription(`Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`)
            .setColor('Green')
        queue.textChannel.send({ embeds: [Embed] })
    })
    .on("addSong", (queue, song) => queue.textChannel.send(
        `-> Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    .on("empty", queue => queue.textChannel.send("Voice channel is empty! Leaving the channel..."))
    .on("finish", queue => queue.textChannel.send("Queue Finished!"))

// AntiCrash
process.on("unhandledRejection", (reason, p) => {
    console.log("unhandledRejection");
    console.log(reason, p);
    client.channels.cache.get('1137652594613948446').send(`${reason}`);
});
process.on("uncaughtException", (err, origin) => {
    console.log("uncaughtException");
    console.log(err, origin);
    client.channels.cache.get('1137652594613948446').send(`${err}`);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log("uncaughtExceptionMonitor");
    console.log(err, origin);
    client.channels.cache.get('1137652594613948446').send(`${err}`);
});