//check for selected token
if (!actors) {
			console.log("You must have at least 1 actor selected.");
		  return;
		}
		
//iterate over selected tokens
for (let token of canvas.tokens.controlled){
	let actor = token.actor;
	let heroPoint;

//skip anything without the hero point resource
	try{
		let actorHeroPoints = actor.data.data.resources.heroPoints;
		
		//skip max hero points and reduce excessive hero points
		if (actorHeroPoints.value == actorHeroPoints.max){
			console.log(actor.name,"has max hero points.");
			continue;
		} else if (actorHeroPoints.value > actorHeroPoints.max){
			console.log(actor.name,"has too many hero points and has been capped.");
			heroPoint=actorHeroPoints.max;
		} else {
			heroPoint=actorHeroPoints.value+1;
		}
	} catch {
		console.log(actor.name,"cannot have hero points.");
		continue;
	}

	let update={'data.resources.heroPoints.value':heroPoint}

	let updated = await actor.update(update)
	console.log(actor.name,"gains 1 hero point");
}