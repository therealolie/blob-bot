let emojis = {
  "empty": "<:em:1142832629637451819>",
  "tree_0":"<:pa:1142917740970115154>",
  "tree_1":"<:tr:1142917773639557210>",
  "tree_2":"<:1m:1142917674746253433>",
  "tree_3":"<:2m:1142917674746253433>",
  "blob_a":"<:ba:1142843061647462512>",
  "blob_d":":skull:",
  "mango":"<:ma:1142843198679568425>",
  "wood":"<:lo:1142843099735924836>",
  "sapling":":seedling:",
  "plank":"<:pl:1142843176189689926>"
}

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

exports.init = (client) => {
  client.data.emojis = emojis;
}