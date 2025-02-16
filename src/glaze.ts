import { ContainerType, WmClient, Window, Workspace, TilingDirection, BindingModeConfig } from "glazewm";

/**
 * Glaze window manager.
 *
 * @export
 * @class Glaze
 */
export class Glaze {
    /**
     * Flag, whether the Glaze window manager has been queried.
     *
     * @type {boolean}
     * @memberof Glaze
     */
    public DidQuery: boolean = false;

    /**
     * Time when the Glaze window manager was queried.
     *
     * @type {number}
     * @memberof Glaze
     */
    public QueryTime: number = -1;

    /**
     * Currently focused window.
     *
     * @type {(Window | undefined)}
     * @memberof Glaze
     */
    public FocusedWindow: Window | undefined = undefined;

    /**
     * Currently focused workspace.
     *
     * @type {(Workspace | undefined)}
     * @memberof Glaze
     */
    public FocusedWorkspace: Workspace | undefined = undefined;

    /**
     * Collection of workspaces.
     *
     * @type {Workspace[]}
     * @memberof Glaze
     */
    public Workspaces: Workspace[] = [];

    /**
     * Collection of windows.
     *
     * @type {Window[]}
     * @memberof Glaze
     */
    public Windows: Window[] = [];

    /**
     * Collection of binding modes.
     *
     * @type {BindingModeConfig[]}
     * @memberof Glaze
     */
    public BindingModes: BindingModeConfig[] = [];

    /**
     * Current tiling direction.
     *
     * @type {TilingDirection}
     * @memberof Glaze
     */
    public TilingDirection: TilingDirection = TilingDirection.HORIZONTAL;

    /**
     * Creates an instance of Glaze.
     *
     * @memberof Glaze
     */
    constructor(queryOnCreate: boolean = true) {
        if (queryOnCreate) this.query();
    }

    /**
     * Queries the current state of the Glaze window manager.
     *
     * @memberof Glaze
     */
    public query(): void {
        const client = new WmClient();
        client.onConnect(async () => {
            const { focused } = await client.queryFocused();
            const { windows } = await client.queryWindows();
            const { workspaces } = await client.queryWorkspaces();
            const { bindingModes } = await client.queryBindingModes();
            const { tilingDirection } = await client.queryTilingDirection();

            if (focused.type === ContainerType.WINDOW) {
                this.FocusedWindow = focused as Window;
            } else if (focused.type === ContainerType.WORKSPACE) {
                this.FocusedWorkspace = focused as Workspace;
            }

            this.FocusedWorkspace = this.FocusedWindow
                ? workspaces.find(ws => ws.id === focused.parentId)
                : this.FocusedWorkspace;

            this.Workspaces = workspaces;
            this.Windows = windows;
            this.BindingModes = bindingModes;
            this.TilingDirection = tilingDirection;
            this.DidQuery = true;
            this.QueryTime = Date.now();

            client.closeConnection();
        });
    }

    /**
     * Execute a given collection of commands.
     *
     * @param {string[]} commands Commands to execute.
     * @memberof Glaze
     */
    public exec(commands: string[]) {
        const client = new WmClient();
        client.onConnect(async () => {
            for (const command of commands) {
                await client.runCommand(command);
            }

            client.closeConnection();
        });
    }
}
