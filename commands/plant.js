exports.data = {
  names:['plant','p'],
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
  if(e.type!='empty'){
    msg.reply('This spot isnt empty!');
    return;
  }
  data.inventory.sapling = data.inventory.sapling ?? 0;
  if(data.inventory.sapling<1){
    msg.reply('You dont have saplings!');
    return;
  }
  data.inventory.sapling -= 1;
  e.type = 'tree';
  e.stage = 0;
  msg.reply('You planted a sapling!\n'+client.funcs.emojifyplot(data.plot));
}