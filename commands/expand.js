const { floor, random } = require('math')
exports.data = {
  names:['explore','ex'],
  args:[
    {type:'string',check:(c,m,a)=>['d','down','r','right','horizontal','h','vertical','v'].includes(a)}
  ]
}
exports.handle = (client,msg,args)=>{
  let dir = 0;
  if(['l','left','horizontal','h'].includes(args[0])){
    dir = 1;
  }
  let data = msg.author.data;
  let size = dir?data.plot.length:data.plot[0].length;
  if(data.money<size*10){
    msg.reply('You dont have enough money!');
    return;
  }
  data.money -= size*10;
  if(dir == 0){
    let pos = data.plot.length;
    data.plot.push([])
    for(let a=0;a<data.plot[0].length;a++){
      if(random()>0.75)
        data.plot[pos].push({type:'tree',stage:floor(random()*4)});
      else data.plot[pos].push({type:'empty'});
    }
  }else{
    for(let a=0;a<data.plot.length;a++){
      if(random()>0.75)
        data.plot[a].push({type:'tree',stage:floor(random()*4)});
      else data.plot[a].push({type:'empty'});
    }
  }
  msg.reply(client.funcs.emojifyplot(data.plot))
}