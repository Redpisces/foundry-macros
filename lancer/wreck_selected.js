let targets = canvas.tokens.controlled;
for (let t of targets){
    let confirmation = await Dialog.confirm({
        title: 'Example Confirm',
        content: `<p>Are you sure you want to wreck ${t.data.name}?</p>`,
    });
    
    if (!confirmation){
        continue;   
    }
    // CONFIG BELOW:
    // Number of images per size, going from S1 to S3.
    let IMAGES_PER_SIZE = [3, 1, 1];
    // Data path where your images are stored. Image files should be named like 'wreck-s2-1.png'. Last digit should be contiguous (don't have a 'wreck-s1-3.png' if there isn't a 'wreck-s1-2.png')
    let IMAGE_PATH = "lancer_resources/tokens/wrecks/";
    
    // Script:
    let size = t.actor.data.data.derived.mm.Size;
    // Get random number between 1 and N, where n is number of images stored for mech size.
    let rand = Math.ceil(Math.random() * IMAGES_PER_SIZE[size- 1]);
    
    let imgString = `${IMAGE_PATH}wreck-s${size}-${rand}.webp`;
    console.log(`Picked ${imgString} for ${t.name}`);
    
    let data = {
        img: imgString
    };
    t.document.update(data);
    t.refresh();
}
