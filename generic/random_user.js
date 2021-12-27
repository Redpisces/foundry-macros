const ACTIVE_ONLY = false;
const IGNORE_GM = true;
let results = [];

let idx = 0;
for (const [id, user] of game.users.entries()) {
	if ((!IGNORE_GM || user.role < CONST.USER_ROLES.GAMEMASTER) && (!ACTIVE_ONLY || user.active)) {
		idx += 1;
		results.push({
			text: user.data.name,
			range: [idx, idx]
		});
	}
}

let table = new RollTable({
	_id: randomID(16),
	name: (ACTIVE_ONLY ? "Active Users" : "Users"),
	description: (ACTIVE_ONLY ? "Active Users" : "Users"),
	results: results,
	formula: `1d${results.length}`,
});

table.draw()