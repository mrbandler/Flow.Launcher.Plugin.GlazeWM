import { JSONRPCResponse } from "flow-launcher-helper";
import { Methods } from "../../methods.js";
import { Direction, directions } from "../../direction.js";
import { Command } from "../command.js";

/**
 * Focus direction command (for windows.)
 *
 * @export
 * @class FocusDirectionCommand
 * @extends {Command<Direction>}
 */
export class FocusDirectionCommand extends Command<Direction> {
    /**
     * Direction to focus the window.
     *
     * @private
     * @type {Direction}
     * @memberof FocusDirectionCommand
     */
    private readonly dir: Direction;

    /**
     * Creates an instance of FocusDirectionCommand.
     *
     * @param {Direction} dir Direction to focus the window
     * @memberof FocusDirectionCommand
     */
    constructor(dir: Direction) {
        super();
        this.dir = dir;
    }

    /**
     * Method for the command.
     *
     * @readonly
     * @type {Methods}
     * @memberof FocusDirectionCommand
     */
    public get method(): Methods {
        return "focus-direction";
    }

    /**
     * Checks whether the command should be displayed.
     *
     * @param {string} query The query to check against
     * @return {boolean} Flag, whether to display or not
     * @memberof FocusDirectionCommand
     */
    public shouldDisplay(query: string): boolean {
        if (!query) return true; // Always show on empty query
        if (!query.includes("focus")) return false; // Show on focus query

        // Check for direction in query
        const hasDirection = directions.some(dir => query.includes(dir));
        return !hasDirection || query.includes(this.dir);
    }

    /**
     * Returns the Flow entry of the command that is displayed to the user.
     *
     * @return {JSONRPCResponse<Methods>}
     * @memberof FocusDirectionCommand
     */
    public entry(): JSONRPCResponse<Methods> {
        return {
            method: this.method,
            params: [this.dir],
            title: `Focus ${this.dir}`,
            subtitle: `${this.build(this.dir).join(", ")}`,
            iconPath: this.icon,
        };
    }

    /**
     * Checks whether the command can build for a given parameter.
     *
     * @param {Direction} param Parameter to check against
     * @return {boolean} Flag, whether the command can build or not
     * @memberof FocusDirectionCommand
     */
    public canBuild(param: Direction): boolean {
        return this.dir == param;
    }

    /**
     * Builds the command.
     *
     * @abstract
     * @param {Direction} param Flow parameter
     * @return {string[]} Collection of Glaze commands to execute
     * @memberof Command
     */
    public build(param: Direction): string[] {
        return [`focus --direction ${param}`];
    }
}
