exports.init = (client) => {
  client.funcs.findBlob = (plots)=>{
	  for(let p in plots)
    for(let a in plots[p])
      for(let b in plots[p][a])
        if(plots[p][a][b].type == 'blob')return [1*p,1*a,1*b];
    return [-1,-1,-1];
  }
}
