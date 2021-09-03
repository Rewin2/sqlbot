const Discord = require("discord.js");
module.exports = {
    name: "m3bansorgu",
    description: "Hexi girilen kişinin ban sebebini atınca benim surad.",
    execute(message, args, connection, izinliRol) {
        const discEmbed = new Discord.MessageEmbed()
        .setFooter("RewinSQLSystem")
        if (message.member.roles.cache.find(r => r.id === izinliRol.id)) {
            let hex = args[1]
            if (hex.startsWith("steam:") === false) {
                hex = `steam:${hex}`
            }
            connection.query("SELECT * FROM m3_banlist WHERE steam = ?",hex,(err,result) => {
                let user = result[0]
                if (user) {
                    let itemler = []
                    discEmbed.setColor("GREEN")
                    .setAuthor(`${hex.replace("steam:","")} Ban Sorgu`)
                    .setDescription(`||${user.reason}|| **Sebebi İle Sunucudan Yasaklanmıştır.**`)
                    message.channel.send(discEmbed)
                } else {
                    discEmbed.setColor("RED")
                    .setAuthor("İşlem Başarısız!")
                    .setDescription("Bu HexID Banlı Değil.")
                    message.channel.send(discEmbed)
                    return;
                }
            })
        } else {
            discEmbed.setColor("RED")
            .setAuthor("İşlem Başarısız!")
            .setDescription("Bunu yapmak için gereken yetkiye sahip değilsiniz!")
            message.channel.send(discEmbed)
            return;
        }
    }
}

// Help for discord : rewin#0008

// Yardım için discord : rewin#0008