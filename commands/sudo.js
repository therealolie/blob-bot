exports.data = {
  names:['sudo']
}

exports.handle = (client,msg,args)=>{
  if(msg.author.id!="438767282328436737")return;
  try{
  eval(msg.content.slice(7));
  }catch(err){
    msg.react('❌')
  }
}