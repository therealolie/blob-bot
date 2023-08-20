require('express')().get("/",(a,b)=>{b.send("hello world!")}).listen(3000,()=>console.log('host working'))

const { Client } = require('discord.js');
const client = new Client({ intents: 37377, partials: [1, 3] })
client.fs = require('fs');
client.funcs = {}
client.data = {}
client.funcs.save = (user,data) => {
  client.fs.writeFileSync(`user_data/${user}.json`,JSON.stringify(data));
};
client.funcs.load = (user) => {
  return JSON.parse(client.fs.readFileSync(`user_data/${user}.json`))
};

const {floor,random} = require('math')
function randint(min,max){
  return floor(random()*(max-min)+min);
}

let commands = {};
let command_data = {}
let middleware = [];
(async ()=>{
  for(let a of client.fs.readdirSync('commands')){
    let b = require(`./commands/${a}`);
    b.data.names.forEach(e=>{
      commands[e] = b.handle;
      command_data[e] = b.data;
    })
    if('init' in b)b.init(client);
  }
})();
(async ()=>{
  for(let a of client.fs.readdirSync('middleware')){
    let b = require(`./middleware/${a}`);
    if('init' in b)b.init(client);
    if('onMsg'in b)middleware.push(b.onMsg);
  }
})();


client.on('ready', () => {
	console.log('bot working')
});


client.on('messageCreate', msg => {
  if(!msg.content.startsWith('b!')) return;

  for(let a of middleware){
    a(client,msg);
  }
  
  msg.author.data = client.funcs.load(msg.author.id);
  
  let cmd = msg.content.split(' ')[0].slice(2).toLowerCase();
  if(!(cmd in commands)){
    msg.reply('command not found!')
    return;
  }
  let args = msg.content.split(' ').slice(1);
  if(command_data[cmd].require_alive){
    let blob = client.funcs.findBlob(plot);
    if(msg.author.data.plot[blob[0]][blob[1]].alive==false){
      msg.reply('Your blob is dead! Ask someone to b!revive you.\nMake sure to have enough mangos next time.');
      return;
    }
  }
  if("args" in command_data[cmd]){
    let new_args = [];
    let req_args = command_data[cmd].args
    let type_testers = {
      "string":(e)=>e,
      "int":(e)=>{
        if(!/^\d+$/.test(e))return 'undefined';
        return parseInt(e);
      }
    }
    for(let a in req_args){
      let temp;
      if(a in args)temp = type_testers[req_args[a].type](args[a]);
      else temp = req_args[a].default;
      if(temp=='undefined'){
        msg.reply('wrong argument type detected');
        return;
      }
      if(!req_args[a].check(client,msg,temp)){
        msg.reply('wrong argument detected');
        return;
      }
      new_args.push(temp);
    }
    args = new_args;
  }
  
  commands[cmd](client,msg,args);

  client.funcs.save(msg.author.id,msg.author.data);
})
client.login(process.env['DISCORD_TOKEN']);