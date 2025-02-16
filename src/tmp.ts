// flow.on("query", params => {
//     const [query] = z
//         .array(z.string())
//         .parse(params)
//         .map(s => s.toLowerCase());

//     const glaze = new WmClient();
//     glaze.onConnect(async () => {
//         const results: JSONRPCResponse<Events>[] = [];
//         let focusedWindow: Window | undefined;
//         let focusedWorkspace: Workspace | undefined;

//         const { focused } = await glaze.queryFocused();
//         const { windows } = await glaze.queryWindows();
//         const { workspaces } = await glaze.queryWorkspaces();
//         const { bindingModes } = await glaze.queryBindingModes();
//         const { tilingDirection } = await glaze.queryTilingDirection();

//         if (focused.type === ContainerType.WINDOW) {
//             focusedWindow = focused as Window;
//         } else if (focused.type === ContainerType.WORKSPACE) {
//             focusedWorkspace = focused as Workspace;
//         }

//         if (focusedWindow) {
//             const dirs = ["left", "right", "up", "down"];

//             // Existing direction results
//             const directionResults: JSONRPCResponse<Events>[] = [
//                 ...dirs.map(
//                     dir =>
//                         ({
//                             title: `Focus ${dir}`,
//                             method: "focus-direction",
//                             params: [dir],
//                             iconPath: "assets/logo.png",
//                         }) as JSONRPCResponse<Events>
//                 ),
//                 ...dirs.map(
//                     dir =>
//                         ({
//                             title: `Move ${dir}`,
//                             method: "move-direction",
//                             params: [dir],
//                             iconPath: "assets/logo.png",
//                         }) as JSONRPCResponse<Events>
//                 ),
//             ];

//             // New workspace navigation results
//             const workspaceNavigationResults: JSONRPCResponse<Events>[] = [
//                 {
//                     title: "Move to recent workspace",
//                     method: "move-to-recent-workspace",
//                     params: [],
//                     iconPath: "assets/logo.png",
//                 },
//                 {
//                     title: "Move to next workspace",
//                     method: "move-to-next-workspace",
//                     params: [],
//                     iconPath: "assets/logo.png",
//                 },
//                 {
//                     title: "Move to previous workspace",
//                     method: "move-to-previous-workspace",
//                     params: [],
//                     iconPath: "assets/logo.png",
//                 },
//             ];

//             const workspaceResults: JSONRPCResponse<Events>[] = workspaces.map(ws => ({
//                 title: `Move to workspace ${ws.name}`,
//                 method: "move-to-named-workspace",
//                 params: [ws.name],
//                 iconPath: "assets/logo.png",
//             }));

//             // Filter based on query
//             if (!query) {
//                 results.push(...directionResults, ...workspaceResults, ...workspaceNavigationResults);
//             } else {
//                 // Existing focus handling...

//                 if (query.includes("move")) {
//                     // Check for workspace match first
//                     const hasWorkspaceMatch = workspaces.some(ws =>
//                         query.toLowerCase().includes(ws.name.toLowerCase())
//                     );

//                     // Check for navigation keywords
//                     const hasNavigationMatch = ["next", "previous", "prev", "recent"].some(nav =>
//                         query.toLowerCase().includes(nav)
//                     );

//                     // Add filtered workspace results
//                     const filteredWorkspaces = workspaceResults.filter(
//                         r =>
//                             !query.split(" ").some(word => workspaces.map(w => w.name).includes(word)) ||
//                             (r.params && r.params[0] && query.toLowerCase().includes(String(r.params[0]).toLowerCase()))
//                     );
//                     results.push(...filteredWorkspaces);

//                     // Filter navigation results based on keywords
//                     if (hasNavigationMatch) {
//                         const filteredNavigation = workspaceNavigationResults.filter(r => {
//                             const queryLower = query.toLowerCase();
//                             switch (r.method) {
//                                 case "move-to-next-workspace":
//                                     return queryLower.includes("next");
//                                 case "move-to-previous-workspace":
//                                     return queryLower.includes("previous") || queryLower.includes("prev");
//                                 case "move-to-recent-workspace":
//                                     return queryLower.includes("recent");
//                                 default:
//                                     return false;
//                             }
//                         });
//                         results.push(...filteredNavigation);
//                     } else if (!hasWorkspaceMatch && !query.split(" ").some(word => dirs.includes(word))) {
//                         // Add all navigation results if no specific filters
//                         results.push(...workspaceNavigationResults);
//                     }

//                     // Only add direction moves if no workspace or navigation matches
//                     if (!hasWorkspaceMatch && !hasNavigationMatch) {
//                         const moveResults = directionResults.filter(r => r.method === "move-direction");
//                         if (!query.split(" ").some(word => dirs.includes(word))) {
//                             results.push(...moveResults);
//                         } else {
//                             results.push(
//                                 ...moveResults.filter(
//                                     r => r.params && r.params[0] && query.includes(String(r.params[0]))
//                                 )
//                             );
//                         }
//                     }
//                 }
//             }
//         }

//         flow.showResult(...results);
//         glaze.closeConnection();
//     });
// });

// setup(flow);
