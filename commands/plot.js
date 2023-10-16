exports.data = {
	names:['plot','p']
}

exports.handle = (client,msg,args)=>{
	let data = msg.author.data;
	let out = "";
	let amt = 0;
	for(let a in data.inventory)amt+=data.inventory[a];
	if(amt != 0){
		out += "inventory:\n";
		for(let e in data.inventory)
			if(data.inventory[e])
				out += client.data.emojis[e] + e + ' x' + data.inventory[e]+'\n';
		out += "\n";
	}
	out += client.funcs.emojifyplot(data.plot);
	msg.reply(out);
}
