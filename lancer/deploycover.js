//creates a copy of an actor specified by an id with mirroring and image set by position relative to first controled actor at location of click

const ID = "MQLuD2F4ASsLChCF";
const TOKEN_IMAGES = {above:"Player_Data/Cover1.webp", below:"Player_Data/Cover2.webp"};

const CONTROLED_TOKENS = canvas.tokens.controlled;

//check to make sure there is a valid token selected
if (CONTROLED_TOKENS[0] == undefined) {
    ui.notifications.error("deploy cover: You must have at least 1 actor selected.");
    return;
}

const TOKEN = CONTROLED_TOKENS[0];

//get base actor, and check if it is valid
let baseActor = game.actors.get(ID);
if (baseActor === undefined) {
    ui.notifications.error("deploy cover: Invalid actor ID");
    return;
}

//note to self, learn promise event handling stuff
await new Promise(resolve => {setTimeout(resolve, 10)});
await captureClick(async (event, position, grid) => {
    //maintain selected tokens if you have "clear selected token on selecting empty space"
    canvas.tokens.selectObjects(TOKEN)

    //get active scene
    let thisScene = game.scenes.viewed;
    
    //creates temporary duplicate of baseActor token to use as a template
    let tokenForId = await thisScene.createEmbeddedDocuments("Token", [baseActor.data.token], {temporary: true});
    tokenForId = duplicate(tokenForId[0]);
    
    //center token on grid coordinate of click (more or less, struggles with hexes)
    tokenForId.x = grid[0] - (0.5 * canvas.grid.grid.w);
    tokenForId.y = grid[1] - (0.5 * canvas.grid.grid.h);
   
    //assign rest of token data
    tokenForId.actorId = baseActor.id;
    tokenForId.img = TOKEN.center.y < position.y ? TOKEN_IMAGES.below : TOKEN_IMAGES.above ;
    tokenForId.mirrorX = TOKEN.center.x < position.x ? false : true;
    
    await thisScene.createEmbeddedDocuments("Token", [tokenForId]);
});


//I DO NOT UNDERSTAND THIS FUCNTION, BUT IT WORKS
async function captureClick(fn, remove = true){
    const m = () => canvas.app.renderer.plugins.interaction.mouse.getLocalPosition(canvas.app.stage);
    const c = (p) => canvas.grid.getCenter(p.x,p.y);
    return await new Promise(async (resolve) => {
        $(document.body).on("click", async (e) => {
            if(remove) $(document.body).off("click");
            resolve(fn(e,m(),c(m())));
        });
    });
}
