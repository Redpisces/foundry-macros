const DISPLAY_CHAT_MESSAGE = true;


function makeChatMessage(content, whisperTargets) {
	let chatMessageData = {
		type: CONST.CHAT_MESSAGE_TYPES.OOC,
		content: content,
		user: game.user._id,
		whisper: whisperTargets,
	};
	return ChatMessage.create(chatMessageData);
};

//check for selected token
if (!actors) {
	console.log("You must have at least 1 actor selected.");
	return;
}
let heroPointsGiven=0;
//iterate over selected tokens
for (let token of canvas.tokens.controlled) {
	let actor = token.actor;
	let heroPoint;

	//skip anything without the hero point resource
	try {
		let actorHeroPoints = actor.data.data.resources.heroPoints;

		//skip max hero points and reduce excessive hero points
		if (actorHeroPoints.value == actorHeroPoints.max) {
			console.log(actor.name, "has max hero points.");
			continue;
		} else if (actorHeroPoints.value > actorHeroPoints.max) {
			console.log(actor.name, "has too many hero points and has been capped.");
			heroPoint = actorHeroPoints.max;
		} else {
			heroPointsGiven += 1;
			heroPoint = actorHeroPoints.value + 1;
		}
	} catch {
		console.log(actor.name, "cannot have hero points.");
		continue;
	}

	let update = {
		'data.resources.heroPoints.value': heroPoint
	}

	let updated = await actor.update(update)
	console.log(actor.name, "gains 1 hero point");
	
	if (DISPLAY_CHAT_MESSAGE){
		let usersGivenHeroPoints = [];
		Object.keys(actor.data.permission).forEach(p=>usersGivenHeroPoints.push(p));
		makeChatMessage (`${actor.name} gained 1 hero point`,usersGivenHeroPoints);
	}
}


ui.notifications.notify(`Granted ${heroPointsGiven} hero points`);
