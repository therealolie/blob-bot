exports.data = {
  names:['searchfood','sf'],
  require_alive:true
}

exports.handle = (client,msg,args)=>{
  let data = msg.author.data
  let blob = client.funcs.findBlob(data.plot);
  data.inventory.mango = data.inventory.mango ?? 0;
  let gain = 0;
  for(let a=-1;a<2;a++)for(let b=-1;b<2;b++){
    if(blob[0]+a<0||blob[0]+a>=data.plot.length)continue;
    if(blob[1]+b<0||blob[1]+b>=data.plot[0].length)continue;
    let e = data.plot[blob[0]+a][blob[1]+b];
    if(e.type!='tree')continue;
    if(e.stage<2)continue;
    data.inventory.mango+=e.stage-1;
    gain += e.stage-1;
    e.stage=1;
  }
  if(gain==0)msg.reply('No mangos found!');
  else msg.reply(`Collected ${gain} mangos!`);
}