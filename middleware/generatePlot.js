const {floor,random} = require('math')

function randint(min,max){
  return floor(random()*(max-min)+min);
}
exports.onMsg = (client,msg) => {
  if(!client.fs.existsSync(`user_data/${msg.author.id}.json`)){
    let plot = [];
    for(let a=0;a<4;a++){
      plot.push([])
      for(let b=0;b<4;b++){
        plot[a].push({type:"empty"})
      }
    }
    let amt = randint(3,6)
    for(let a=0;a<amt;){
      let x = randint(0,4);
      let y = randint(0,4);
      if(plot[x][y].type!="empty")continue;
      plot[x][y] = {type:"tree",stage:2};
      a++;
    }
    while(true){
      let x = randint(0,4);
      let y = randint(0,4);
      if(plot[x][y].type!="empty")continue;
      plot[x][y] = {type:"blob",alive:true};
      break;
    }
    let data = {plot:plot,money:100,inventory:{},time:1*new Date()};
    client.funcs.save(msg.author.id,data);
  }
}