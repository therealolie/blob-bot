const recipes = {
  "plank": [["wood"],["plank","plank"]]
}
exports.data = {
  names:['craft'],
  args:[
    {type:'string',check:(c,m,a)=>a in recipes}
  ]
}
exports.handle = (client,msg,args)=>{
  let recipe = recipes[args[0]]
  let inv = JSON.parse(JSON.stringify(msg.author.data.inventory));
  for(let a of recipe[0]){
    if(!(a in inv)||inv[a]==0){
      msg.reply('Not enough materials!');
      return;
    }
    inv[a]-=1;
  }
  for(let a of recipe[1]){
    inv[a] = 1+(inv[a]??0);
  }
  msg.author.data.inventory = inv;
  msg.reply('Crafted!');
}