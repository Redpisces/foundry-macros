const SPEAK_PRIVATE = true;
const PLAYER_OWNED_ONLY = true;
const ACTOR_TYPES = ["character"];

function makeChatMessage(content){
	let chatMessageData = {
		type:CONST.CHAT_MESSAGE_TYPES.OOC,
		content:content,
		user:game.user._id,
		speaker: ChatMessage.getSpeaker(),
	};
	if (SPEAK_PRIVATE){chatMessageData.whisper=[game.user.id]};
	let c = ChatMessage.create(chatMessageData);
};

function getPlayerCharacters(){
	let pcs = game.actors.filter(pc=>ACTOR_TYPES.includes(pc.data.type));
	
	if (PLAYER_OWNED_ONLY){
		const players = game.users.filter(player=>player.role!=CONST.USER_ROLES.GAMEMASTER);

		let playerIDs=new Array();

		players.forEach(pc=>playerIDs.push(pc.id));

		return pcs.filter(pc=> Object.keys(pc.data.permission).some(r=>playerIDs.includes(r)));
	} else {
		return pcs
	}
}

const playerCharacters = getPlayerCharacters();

let returnString="<table><tr><th>character</th><th>languages</th></tr>";

playerCharacters.forEach(pc=>{
	returnString+="<tr><td>"+pc.name+"</td><td>";
	pc.data.data.traits.languages.value.forEach(
		function(lang,idx,array){
			returnString+=lang;
			if (idx != array.length -1){returnString+=", "};
		}
	);
	returnString+="</td></tr>";
});
returnString+="</table>";
makeChatMessage(returnString);
