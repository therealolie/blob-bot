exports.data = {
  names:['searchfood','sf'],
  require_alive:true
}

exports.handle = (client,msg,args)=>{
  let data = msg.author.data
  let blob = client.funcs.findBlob(data.plots);
  data.inventory.mango = data.inventory.mango ?? 0;
  let gain = 0;
let plot = data.plots[blob[0]]
  for(let a=-1;a<2;a++)for(let b=-1;b<2;b++){
    if(blob[1]+a<0||blob[1]+a>=plot.length)continue;
    if(blob[2]+b<0||blob[2]+b>=plot[0].length)continue;
    let e = plot[blob[1]+a][blob[2]+b];
    if(e.type!='tree')continue;
    if(e.stage<2)continue;
    data.inventory.mango+=e.stage-1;
    gain += e.stage-1;
    e.stage=1;
  }
  if(gain==0)msg.reply('No mangos found!');
  else msg.reply(`Collected ${gain} mangos!`);
}
