const tickTime = 12*60*60*1000;
//12 hours - 43200000ms 
const { floor, random } = require('math')
function updatePlot(client,id){
	let data = client.funcs.load(id);
	if(data.time>1690000000000)data.time=floor(data.time/tickTime);
	if(data.plot){
		data.plots=[data.plot];
		delete data.plot;
	}
	while(data.time<floor(1*new Date()/tickTime)){
		if(data.inventory['mango']>0){
			data.inventory['mango']-=1;
		}else{
			let [p,x,y] = client.funcs.findBlob(data.plots);
			data.plots[p][x][y].alive = false;
		}
		for(let plot of data.plots)
		for(let a in plot)
			for(let b in plot[a]){
				let p = plot[a][b];
				if(p.type=="tree"&&p.stage<3)
					if(random()>0.75)p.stage+=1;
			}
		data.time+=1;
	}
	client.funcs.save(id,data)
}
exports.onMsg = (client,msg) => {
	updatePlot(client,msg.author.id);
}
exports.init = client => {
	client.funcs.updatePlot = updatePlot;
}
