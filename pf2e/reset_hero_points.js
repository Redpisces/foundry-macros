const DISPLAY_CHAT_MESSAGE = true;

function logWithNotify(message) {
	console.log(message);
	ui.notifications.notify(message);
}

function getChars() {
	let returnedActors = []
	game.actors.forEach(a => {
		if (hasProperty(a, 'data.data.resources.heroPoints')) {
			returnedActors.push(a);
		};
	});
	return returnedActors;
}

let confirmation = await Dialog.confirm({
	title: 'Reset all hero points',
	content: `<p>this will reset ALL PCs' hero points to 1 </p><p>Are you sure?</p>`,
});

if (!confirmation)
	return;

const update = {
	'data.resources.heroPoints.value': 1
}
let returnedActors = getChars();
for (actor of returnedActors) {
	let updated = await actor.update(update)
}
logWithNotify(`reset ${returnedActors.length} characters' hero points`);
