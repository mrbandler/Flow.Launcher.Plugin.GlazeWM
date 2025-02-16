/**
 * Plugin settings.
 *
 * @export
 */
export type Settings = {
    /**
     * Flag, whether to focus the workspace after moving a window.
     *
     * @type {boolean}
     */
    focusWorkspaceAfterMove: boolean;
};

/**
 * Default settings.
 *
 * @export
 * @type {Settings}
 */
export const defaults: Settings = {
    focusWorkspaceAfterMove: true,
};
