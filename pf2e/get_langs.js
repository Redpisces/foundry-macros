const SPEAK_PRIVATE = true;
const PLAYER_OWNED_ONLY = true;
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
    let characters = game.actors.filter(pc => ACTOR_TYPES.includes(pc.data.type));

    //FILTER OUT UNDESIRABLE CLASSES

    characters = characters.filter(char => !isForbiddenClass(char));

    if (PLAYER_OWNED_ONLY) {
        return characters.filter(pc => pc.hasPlayerOwner);
    } else {
        return characters
    }
}


let returnString = "<table><tr><th>character</th><th>languages</th></tr>";

getPlayerCharacters().forEach(pc => {
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
makeChatMessage(returnString);
