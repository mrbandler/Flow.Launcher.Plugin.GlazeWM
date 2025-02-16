import { JSONRPCResponse, Params } from "flow-launcher-helper/lib/types.js";
import { Methods } from "../methods.js";

/**
 * Abstract command.
 *
 * @export
 * @abstract
 * @class Command
 * @template Param
 */
export abstract class Command<Param extends Params> {
    /**
     * Creates an instance of Command.
     *
     * @param {string} [icon="assets/logo.png"]
     * @memberof Command
     */
    protected constructor(protected readonly icon: string = "assets/logo.png") {}

    /**
     * Method of the command.
     *
     * @readonly
     * @abstract
     * @type {Methods}
     * @memberof Command
     */
    public abstract get method(): Methods;

    /**
     * Checks whether the command should be displayed.
     *
     * @abstract
     * @param {string} query The query to check against
     * @return {boolean} Flag, whether to display or not
     * @memberof Command
     */
    public abstract shouldDisplay(query: string): boolean;

    /**
     * Returns the Flow entry of the command that is displayed to the user.
     *
     * @abstract
     * @return {JSONRPCResponse<Methods>} JSON RPC responses for the Flow launcher.
     * @memberof Command
     */
    public abstract entry(): JSONRPCResponse<Methods>;

    /**
     * Checks whether the command can build for a given parameter.
     *
     * @abstract
     * @param {Param} param Parameter to check against
     * @return {boolean} Flag, whether the command can build or not
     * @memberof Command
     */
    public abstract canBuild(param: Param): boolean;

    /**
     * Builds the command.
     *
     * @abstract
     * @param {Param} param Flow parameter
     * @return {string[]} Collection of Glaze commands to execute
     * @memberof Command
     */
    public abstract build(param: Param): string[];
}
