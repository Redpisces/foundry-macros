let token = canvas.tokens.controlled[0];

if (!token) {
	ui.notifications.error("You must have at least 1 actor selected.");
	return;
}

let effects = token.actor.data.effects;
let id;
for(var ele of effects.values()){
    if (ele.data.flags.core.statusId === 'lockon'){
        id = ele.data._id;
        break;
    }
}

console.log(effects)

console.log(id)

if (id === undefined){
    let effect = {
        id: "lockon",
        label: "Lock On",
        icon: `systems/lancer/assets/icons/white/condition_lockon.svg`,
    };
    
    token.actor.createEmbeddedDocuments("ActiveEffect",
                                        [{
                                            label: game.i18n.localize(effect.label),
                                        icon: effect.icon,
                                        origin: token.actor.uuid,
                                        flags: { core: { statusId: effect.id } }
                                        }]
    );
    
} else {
    
 token.actor.deleteEmbeddedDocuments("ActiveEffect",[id]) 
}
