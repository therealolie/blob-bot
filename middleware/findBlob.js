exports.init = (client) => {
  client.funcs.findBlob = (plot)=>{
    for(let a in plot)
      for(let b in plot[a])
        if(plot[a][b].type == 'blob')return [1*a,1*b];
    return [-1,-1];
  }
}