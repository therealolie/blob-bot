let prices = {
  "mango": 6,
  "wood": 9,
  "sapling": 6,
  "plank": 7,
}
exports.data = {
  names:['sell'],
  args:[
    {type:'string',check:(c,m,a)=>a in prices},
    {type:'int',check:(c,m,a)=>a>0,default:1}
  ]
}
exports.handle = (client,msg,args)=>{
  let data = msg.author.data;
  if(!(args[0] in data.inventory)||data.inventory[args[0]]<args[1]){
    msg.reply('You dont have enough of that item!');
    return;
  }
  data.inventory[args[0]] -= args[1];
  data.money += args[1]*prices[args[0]];
  msg.reply(`sold ${args[1]} ${args[0]} for ${args[1]*prices[args[0]]}$.`)
}