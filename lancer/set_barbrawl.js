// Run this as a script macro in a world to set up the barbrawl defaults for that world, reset all actors' bars to that and set all places tokens to the new bars.
const npc_bars = {
  bar1: {
    id: "bar1",
    ignoreMin: true,
    ignoreMax: false,
    mincolor: "#FF0000",
    maxcolor: "#80FF00",
    position: "bottom-inner",
    attribute: "derived.hp",
    visibility: CONST.TOKEN_DISPLAY_MODES.HOVER,
    subdivisions: 2,
    subdivisionsOwner: false,
  },
  bar2: {
    id: "bar2",
    ignoreMax: true,
    ignoreMin: false,
    mincolor: "#700000",
    maxcolor: "#ff0000",
    position: "bottom-inner",
    attribute: "derived.heat",
    visibility: CONST.TOKEN_DISPLAY_MODES.HOVER,
    subdivisions: 2,
    subdivisionsOwner: false,
  },
  burn: {
    id: "burn",
    mincolor: "#992222",
    maxcolor: "#992222",
    position: "top-outer",
    attribute: "burn",
    visibility: CONST.TOKEN_DISPLAY_MODES.OWNER,
  },
  overshield: {
    id: "overshield",
    mincolor: "#222299",
    maxcolor: "#222299",
    position: "top-outer",
    attribute: "overshield",
    visibility: CONST.TOKEN_DISPLAY_MODES.OWNER,
  },
};
const player_bars= {
  bar1: {
    id: "bar1",
    ignoreMin: true,
    ignoreMax: false,
    mincolor: "#FF0000",
    maxcolor: "#80FF00",
    position: "bottom-inner",
    attribute: "derived.hp",
    ownervisibility: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
    otherVisibility: CONST.TOKEN_DISPLAY_MODES.HOVER,
  },
  bar2: {
    id: "bar2",
    ignoreMax: true,
    ignoreMin: false,
    mincolor: "#700000",
    maxcolor: "#ff0000",
    position: "bottom-inner",
    attribute: "derived.heat",
    ownervisibility: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
    otherVisibility: CONST.TOKEN_DISPLAY_MODES.HOVER,
  },
  burn: {
    id: "burn",
    mincolor: "#992222",
    maxcolor: "#992222",
    position: "top-outer",
    attribute: "burn",
    ownervisibility: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
    otherVisibility: CONST.TOKEN_DISPLAY_MODES.HOVER,
  },
  overshield: {
    id: "overshield",
    mincolor: "#222299",
    maxcolor: "#222299",
    position: "top-outer",
    attribute: "overshield",
    ownervisibility: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
    otherVisibility: CONST.TOKEN_DISPLAY_MODES.HOVER,
  },
};

await game.settings.set("barbrawl", "defaultResources", npc_bars);

// :warning: Reset all actors' prototype token bars
await Promise.all(game.actors.map(a => a.update({ "token.flags.barbrawl.-=resourceBars": null })));

// Reset the bars on all existing tokens
await Promise.all(
  game.scenes.map(s => {
    const updates = s.tokens.map(t => {
      if (t.data.disposition === 1){
        return {
          _id: t.id,
          "displayName":CONST.TOKEN_DISPLAY_MODES.HOVER,
          "flags.barbrawl.resourceBars": player_bars,
        };
      } else {
        return {
          _id: t.id,
          "flags.barbrawl.resourceBars": npc_bars,
          "displayName":CONST.TOKEN_DISPLAY_MODES.HOVER,
        };
      }
    });
    return s.updateEmbeddedDocuments("Token", updates);
  })
);

ui.notifications.info("Done");
// vim:ft=javascript:
