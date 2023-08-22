const recipes = {
  "plank": [{"wood":1},{"plank":2}]
}
exports.data = {
  names:['craft'],
  args:[
    {type:'string',check:(c,m,a)=>a in recipes},
    {type:'int',check:(c,m,a)=>a>0,default:1}
  ]
}
exports.handle = (client,msg,args)=>{
  let inv = JSON.parse(JSON.stringify(msg.author.data.inventory));
  let recipe = recipes[args[0]];
  let amt = 0;
  for(let x=0;x<args[1];x++){
    let allowed = true;
    for(let a in recipe[0])
      if(inv[a]<recipe[0][a])allowed=false;
    if(!allowed)break;
    for(let a in recipe[0])
      inv[a]-=recipe[0][a];
    for(let a in recipe[1]){
      inv[a]=recipe[1][a]+(inv[a]??0);
    }
    amt+=1;
  }
  msg.author.data.inventory = inv;
  msg.reply(amt==0?'not enough ingridients!':amt==1?'Crafted!':`Crafted ${amt} times!`);
}