let emojis = {
  "empty": "<:em:1142917773639557210>",
  "tree_0":"<:pa:1142917740970115154>",
  "tree_1":"<:tr:1142917708678185132>",
  "tree_2":"<:1m:1142917674746253433>",
  "tree_3":"<:2m:1142917636326441010>",
  "blob_a":"<:bl:1143062002479153244>",
  "blob_d":"<:de:1143061978013773874>",
  "mango":"<:ma:1142843198679568425>",
  "wood":"<:lo:1142843099735924836>",
  "sapling":":seedling:",
  "plank":"<:pl:1142843176189689926>"
}

exports.init = (client) => {
  client.data.emojis = emojis;
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