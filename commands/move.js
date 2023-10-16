exports.data = {
  names:['move','mv','m'],
  args:[
    {type:'string',check:(c,m,a)=>'lrud'.includes(a)||['up','down','left','right'].includes(a)},
    {type:'int',check:(c,m,a)=>a>=0,default:1}
  ],
  require_alive:true
}
exports.handle = (client,msg,args)=>{
    let blob = client.funcs.findBlob(msg.author.data.plots);
  let plot = msg.author.data.plots[blob[0]];
  dir = ({'l':[0,-1],'r':[0,1],'u':[-1,0],'d':[1,0]})[args[0][0]];
  for(let a=0;a<args[1];a++){
    let blob = client.funcs.findBlob(msg.author.data.plots).slice(1);
    let next = [blob[0]+dir[0],blob[1]+dir[1]];
    if(next[0]<0||next[0]>=plot.length)break;
    if(next[1]<0||next[1]>=plot[0].length)break;
    let b = plot[next[0]][next[1]];
    if(b.type!="empty")break;
    b = JSON.parse(JSON.stringify(b));
    plot[next[0]][next[1]] = JSON.parse(JSON.stringify(plot[blob[0]][blob[1]]));
    plot[blob[0]][blob[1]] = b;
  }
  msg.reply(client.funcs.emojifyplot(plot))
}
