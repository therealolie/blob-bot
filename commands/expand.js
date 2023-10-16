const { floor, random } = require('math')
exports.data = {
  names:['explore','ex'],
  args:[
    {type:'string',check:(c,m,a)=>['d','down','r','right','horizontal','h','vertical','v'].includes(a)},
    {type:'int',check:(c,m,a)=>true,default:1}
  ]
}
exports.handle = (client,msg,args)=>{
  let dir = 0;
  if(['r','right','horizontal','h'].includes(args[0])){
    dir = 1;
  }
  let data = msg.author.data;
  let new_cells = dir?data.plot.length:data.plot[0].length;
  let size = dir?data.plot[0].length:data.plot.length;
  for(let i=0;i<args[1];i++){
    if(dir?size>=15:size>=9){
      msg.reply('Maxxed out in this direction!');
      return;
    }
    if(data.money<new_cells*5){
      msg.reply('You dont have enough money!');
      return;
    }
    data.money -= new_cells*5;
    if(dir == 0){
      data.plot.push([])
      for(let a=0;a<new_cells;a++){
        if(random()>0.75)
          data.plot[size].push({type:'tree',stage:floor(random()*4)});
        else data.plot[size].push({type:'empty'});
      }
    }else{
      for(let a=0;a<data.plot.length;a++){
        if(random()>0.75)
          data.plot[a].push({type:'tree',stage:floor(random()*4)});
        else data.plot[a].push({type:'empty'});
      }
    }
  }
  msg.reply(client.funcs.emojifyplot(data.plot))
}