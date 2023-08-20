const { EmbedBuilder } = require('discord.js');

function reply(content){
  const embed = new EmbedBuilder()
	.setColor(0x3399ff)
	.setTitle(`${this.author.username} - ${this.author.data.money}$`)
	.setDescription(content)
	.setTimestamp()
  this.channel.send({ embeds: [embed] });
}

exports.onMsg = (client,msg) => {
  msg.reply = reply;
}