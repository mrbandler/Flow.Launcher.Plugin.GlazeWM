import { Params } from "flow-launcher-helper/lib/types.js";
import { Command } from "../command.js";
import { FocusDirectionCommand } from "./focus.js";

/**
 * All window command instances.
 *
 * @type {Command<Params>[]}
 */
export const commands: Command<Params>[] = [
    new FocusDirectionCommand("left"),
    new FocusDirectionCommand("right"),
    new FocusDirectionCommand("up"),
    new FocusDirectionCommand("down"),
];
