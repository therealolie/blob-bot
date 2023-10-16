exports.data = {
  names:['revive','rev'],
  args:[
    {type:'string',check:(c,m,a)=>/^<@\d+>$/.test(a)&&c.fs.existsSync(`user_data/${a.slice(2,-1)}.json`)}
  ]
}
exports.handle = (client,msg,args)=>{
  client.funcs.updatePlot(client,args[0].slice(2,-1));
  let data = client.funcs.load(args[0].slice(2,-1));
  let temp = client.funcs.findBlob(data.plots);
  let blob = data.plots[temp[0]][temp[1]][temp[2]];
  if(blob.alive){
    msg.reply("This user's blob hasn't died!");
    return;
  }
  if(!(msg.author.data.inventory.mango>=10)){
    msg.reply("You don't have enough mangos!")
    return;
  }
  msg.author.data.inventory.mango -= 10;
  blob.alive = true;
  client.funcs.save(args[0].slice(2,-1),data);
  msg.reply('Blob revived!');
}
