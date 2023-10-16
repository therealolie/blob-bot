exports.data = {
  names:['remove','rm','chopwood','chop','cw'],
  args:[
    {type:'string',check:(c,m,a)=>'lrud'.includes(a)||['up','down','left','right'].includes(a)},
  ],
  require_alive:true
}
const { floor, random } = require('math');
exports.handle = (client,msg,args)=>{
  let data = msg.author.data;
  dir = ({'l':[0,-1],'r':[0,1],'u':[-1,0],'d':[1,0]})[args[0][0]];
  let blob = client.funcs.findBlob(data.plots);
	let plot = data.plots[blob[0]]
  let pos = [blob[1]+dir[0],blob[2]+dir[1]];
  if(pos[0]<0||pos[0]>=plot.length)return;
  if(pos[1]<0||pos[1]>=plot[0].length)return;
  let e = plot[pos[0]][pos[1]];
  if(e.type!='tree'){
    msg.reply('thats not a tree');
    return;
  }
  data.inventory.wood = data.inventory.wood ?? 0;
  let gain = e.stage?floor(random()*2+1):0;
  delete e.stage;
  e.type = 'empty'
  data.inventory.wood += gain;
  let out = gain?`You chopped down a tree and got **${gain}** pieces of wood!`:`You chopped down a sapling!`
  if(random()>0.5){
    data.inventory.sapling = data.inventory.sapling ?? 0;
    data.inventory.sapling += 1;
    out += gain?'\nYou also recovered one sapling from the tree!':`\nYou recovered it!`;
  }
  msg.reply(out);
}
