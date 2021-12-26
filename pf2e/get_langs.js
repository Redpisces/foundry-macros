const SPEAK_PRIVATE = true;
const PLAYER_OWNED_ONLY = true;
const ACTIVE_ONLY = false;

const ACTOR_TYPES = ["character"];
const IGNORED_CLASSES = ["Animal Companion"];

function isForbiddenClass(character) {
	for (let [key, value] of character.items.entries()) {
		if (value.data.type === "class")
			return IGNORED_CLASSES.includes(value.name);
	}
	return false;
};

function makeChatMessage(content) {
	let chatMessageData = {
		type: CONST.CHAT_MESSAGE_TYPES.OOC,
		content: content,
		user: game.user._id,
		speaker: ChatMessage.getSpeaker(),
	};
	if (SPEAK_PRIVATE) {
		chatMessageData.whisper = [game.user.id]
	};
	let c = ChatMessage.create(chatMessageData);
};

function getPlayerCharacters() {

	//filter characters
	let characters = game.actors;

	if (ACTOR_TYPES) {
		characters = characters.filter(pc => ACTOR_TYPES.includes(pc.data.type));
	}

	if (IGNORED_CLASSES) {
		characters = characters.filter(char => !isForbiddenClass(char));
	}

	//filter users
	let validUsers = game.users;

	if (ACTIVE_ONLY) {
		validUsers = validUsers.filter(u => u.active);
	}
	if (PLAYER_OWNED_ONLY) {
		validUsers = validUsers.filter(u => u.role < CONST.USER_ROLES.GAMEMASTER);
	}

	let validUserIds = [];
	validUsers.forEach(u => validUserIds.push(u.data._id));

	//filter characters by users
	characters = characters.filter(function(char) {
		let owners = Object.keys(char.data.permission);
		for (let id of owners) {
			if (validUserIds.includes(id))
				return true;
		}
		return false;
	});

	return characters;

}

//construct chat message content
let returnString = "<table><tr><th>character</th><th>languages</th></tr>";

getPlayerCharacters()
	.forEach(pc => {
		returnString += "<tr><td>" + pc.name + "</td><td>";
		pc.data.data.traits.languages.value.forEach(
			function(lang, idx, array) {
				returnString += lang;
				if (idx != array.length - 1) {
					returnString += ", "
				};
			}
		);
		returnString += "</td></tr>";
	});
returnString += "</table>";

//output
makeChatMessage(returnString);
