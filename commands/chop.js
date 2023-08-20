exports.data = {
  names:['chopwood','chop','cw'],
  args:[
    {type:'string',check:(c,m,a)=>'lrud'.includes(a)||['up','down','left','right'].includes(a)},
  ],
  require_alive:true
}
const { floor, random } = require('math');
exports.handle = (client,msg,args)=>{
  let data = msg.author.data;
  dir = ({'l':[0,-1],'r':[0,1],'u':[-1,0],'d':[1,0]})[args[0][0]];
  let blob = client.funcs.findBlob(data.plot);
  let pos = [blob[0]+dir[0],blob[1]+dir[1]];
  if(pos[0]<0||pos[0]>=data.plot.length)return;
  if(pos[1]<0||pos[1]>=data.plot[0].length)return;
  let e = data.plot[pos[0]][pos[1]];
  if(e.type!='tree'){
    msg.reply('thats not a tree');
    return;
  }
  if(!e.stage){
    msg.reply('not grown yet!');
    return;
  }
  data.inventory.wood = data.inventory.wood ?? 0;
  delete e.stage;
  e.type = 'empty'
  let gain = floor(random()*2+1)
  data.inventory.wood += gain;
  let out = `You chopped down a tree and got **${gain}** pieces of wood!`
  if(random()>0.5){
    data.inventory.sapling = data.inventory.sapling ?? 0;
    data.inventory.sapling += 1;
    out += '\nYou also recovered one sapling from the tree!';
  }
  msg.reply(out);
}