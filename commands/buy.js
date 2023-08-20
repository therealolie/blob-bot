let prices = {
  "mango": 10,
  "wood": 15,
  "sapling": 10,
  "plank": 10,
}
exports.data = {
  names:['buy'],
  args:[
    {type:'string',check:(c,m,a)=>a in prices},
    {type:'int',check:(c,m,a)=>a>0,default:1}
  ]
} 
exports.handle = (client,msg,args)=>{
  let data = msg.author.data;
  if(data.money<args[1]*prices[args[0]]){
    msg.reply('You dont have enough money!');
    return;
  }
  data.money -=args[1]*prices[args[0]];
  data.inventory[args[0]] = args[1] + (data.inventory[args[0]] ?? 0);
  msg.reply(`Bought ${args[1]} ${args[0]} for ${args[1]*prices[args[0]]}$.`)
}