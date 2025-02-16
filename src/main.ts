import { Flow } from "flow-launcher-helper";
import { Params } from "flow-launcher-helper/lib/types.js";
import { z } from "zod";
import { Methods } from "./methods.js";
import { Glaze } from "./glaze.js";
import { Command, commands } from "./commands/index.js";
import { Settings, defaults } from "./settings.js";

const groupedCommands = commands.reduce((acc, cmd) => {
    if (!acc.has(cmd.method)) acc.set(cmd.method, []);
    acc.get(cmd.method)!.push(cmd);

    return acc;
}, new Map<Methods, Command<Params>[]>());

const flow = new Flow<Methods, Settings>("assets/logo.png");

flow.on("query", params => {
    const [query] = z
        .array(z.string())
        .parse(params)
        .map(s => s.toLowerCase());

    const entries = commands.filter(cmd => cmd.shouldDisplay(query)).map(cmd => cmd.entry());
    flow.showResult(...entries);
});

groupedCommands.forEach((cmds, method) => {
    flow.on(method, param => {
        const cmd = cmds.find(cmd => cmd.canBuild(param));
        if (!cmd) return;

        const glaze = new Glaze(false);
        glaze.exec(cmd.build(param));
    });
});

flow.run();
