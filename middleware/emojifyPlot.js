exports.init = (client) => {
  client.funcs.emojifyplot = (plot) => {
    const emojiparses = {
      "empty":()=>client.data.emojis["empty"],
      "tree":(data)=>client.data.emojis[`tree_${data.stage}`],
      "blob":(data)=>data.alive?client.data.emojis[`blob_a`]:client.data.emojis[`blob_d`],
    }
    let out = "";
    for(let a of plot){
      for(let b of a){
        out += emojiparses[b.type](b);
      }
      out += "\n";
    }
    return out;
  }
}