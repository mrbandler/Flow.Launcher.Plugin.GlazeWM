import { Params } from "flow-launcher-helper/lib/types.js";
import { Command } from "./command.js";
import { commands as windowCommands } from "./window/index.js";

export { Command } from "./command.js";

/**
 * All command instances.
 *
 * @type {Command<Params>[]}
 */
export const commands: Command<Params>[] = [...windowCommands];
