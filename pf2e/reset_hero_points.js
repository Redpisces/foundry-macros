const DISPLAY_CHAT_MESSAGE = true;

function getChars() {
	let returnedActors = []
	game.actors.forEach(a => {
		if (hasProperty(a, 'data.data.resources.heroPoints')) {
			returnedActors.push(a);
		};
	});
	return returnedActors;
}

const update = {
	'data.resources.heroPoints.value': 1
}
let returnedActors = getChars();
for (actor of returnedActors) {
	let updated = await actor.update(update)
}

ui.notifications.notify(`reset ${returnedActors.length} characters' hero points`);