"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runIgnite = void 0;
const getPackageManager_1 = require("./getPackageManager");
function runIgnite(toolbox, projectName, cliResults) {
    return __awaiter(this, void 0, void 0, function* () {
        const { print: { success }, system } = toolbox;
        const packageManager = (0, getPackageManager_1.getPackageManager)(toolbox, cliResults);
        success('Running Ignite CLI to create an opinionated stack...');
        yield system.spawn(`npx ignite-cli@$latest new ${projectName} --packager=${packageManager} --yes`, {
            shell: true,
            stdio: 'inherit'
        });
    });
}
exports.runIgnite = runIgnite;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuSWduaXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxpdGllcy9ydW5JZ25pdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EsMkRBQXdEO0FBR3hELFNBQXNCLFNBQVMsQ0FBQyxPQUFnQixFQUFFLFdBQW1CLEVBQUUsVUFBc0I7O1FBQzNGLE1BQU0sRUFDSixLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFDbEIsTUFBTSxFQUNQLEdBQUcsT0FBTyxDQUFDO1FBRVosTUFBTSxjQUFjLEdBQUcsSUFBQSxxQ0FBaUIsRUFBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFOUQsT0FBTyxDQUFDLHNEQUFzRCxDQUFDLENBQUM7UUFDaEUsTUFBTSxNQUFNLENBQUMsS0FBSyxDQUFDLDhCQUE4QixXQUFXLGVBQWUsY0FBYyxRQUFRLEVBQUU7WUFDakcsS0FBSyxFQUFFLElBQUk7WUFDWCxLQUFLLEVBQUUsU0FBUztTQUNqQixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQUE7QUFiRCw4QkFhQyJ9