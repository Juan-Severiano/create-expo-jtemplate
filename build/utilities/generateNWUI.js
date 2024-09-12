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
exports.generateNWUI = void 0;
const constants_1 = require("../constants");
const getPackageManager_1 = require("./getPackageManager");
const systemCommand_1 = require("./systemCommand");
const prompts_1 = require("@clack/prompts");
function generateNWUI(cliResults, toolbox) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const isNativeWindUISelected = cliResults.packages.some((p) => p.name === 'nativewindui');
        if (!isNativeWindUISelected) {
            return;
        }
        const s = (0, prompts_1.spinner)();
        const runnerType = (0, getPackageManager_1.getPackageManagerRunnerX)(toolbox, cliResults);
        const nativeWindUIComponents = (_a = cliResults.packages.find((p) => p.name === 'nativewindui').options.selectedComponents) !== null && _a !== void 0 ? _a : [];
        // we do this to account for older stored config e.g that has selectable text in it
        const onlySupportedComponents = nativeWindUIComponents.filter((component) => constants_1.nativeWindUIOptions.includes(component));
        const finalComponents = Array.from(new Set([...onlySupportedComponents, 'text']));
        s.start(`Adding nativewindui components...`);
        const flags = cliResults.flags.noInstall
            ? `--yes --no-install -d ${cliResults.projectName}`
            : `--yes -d ${cliResults.projectName}`;
        // --yes accepts installing packages without prompting
        const runCommand = runnerType === 'npx' ? `${runnerType} --yes` : runnerType;
        if (process.env.NODE_ENV === 'development') {
            toolbox.print.info(`${runCommand} nwui-cli@^0.4.1 add ${flags} ${finalComponents.join(' ')}`);
        }
        // @latest is getting cached when using bunx
        yield (0, systemCommand_1.runSystemCommand)({
            command: `${runCommand} nwui-cli@^0.4.1 add ${flags} ${finalComponents.join(' ')}`,
            errorMessage: 'Error adding nativewindui components',
            toolbox,
            stdio: systemCommand_1.ONLY_ERRORS,
            // for some reason running as shell breaks nwui when running in ci
            shell: false,
            // this is how we pass env variables to the child process when not running as shell
            env: Object.assign(Object.assign({}, process.env), (process.env.NODE_ENV === 'development' ? { API_BASE_URL: 'https://nativewindui.com' } : {}))
        });
        s.stop('Nativewindui components added!');
    });
}
exports.generateNWUI = generateNWUI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVOV1VJLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxpdGllcy9nZW5lcmF0ZU5XVUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBRUEsNENBQW1EO0FBQ25ELDJEQUErRDtBQUMvRCxtREFBZ0U7QUFDaEUsNENBQXlDO0FBRXpDLFNBQXNCLFlBQVksQ0FBQyxVQUFzQixFQUFFLE9BQXVCOzs7UUFDaEYsTUFBTSxzQkFBc0IsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxjQUFjLENBQUMsQ0FBQztRQUUxRixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUM1QixPQUFPO1FBQ1QsQ0FBQztRQUVELE1BQU0sQ0FBQyxHQUFHLElBQUEsaUJBQU8sR0FBRSxDQUFDO1FBRXBCLE1BQU0sVUFBVSxHQUFHLElBQUEsNENBQXdCLEVBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRWpFLE1BQU0sc0JBQXNCLEdBQzFCLE1BQUEsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssY0FBYyxDQUFDLENBQUMsT0FBTyxDQUFDLGtCQUFrQixtQ0FBSSxFQUFFLENBQUM7UUFFOUYsbUZBQW1GO1FBQ25GLE1BQU0sdUJBQXVCLEdBQUcsc0JBQXNCLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQywrQkFBbUIsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUV0SCxNQUFNLGVBQWUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyx1QkFBdUIsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEYsQ0FBQyxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1FBRTdDLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsU0FBUztZQUN0QyxDQUFDLENBQUMseUJBQXlCLFVBQVUsQ0FBQyxXQUFXLEVBQUU7WUFDbkQsQ0FBQyxDQUFDLFlBQVksVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXpDLHNEQUFzRDtRQUN0RCxNQUFNLFVBQVUsR0FBRyxVQUFVLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7UUFFN0UsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxhQUFhLEVBQUUsQ0FBQztZQUMzQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLFVBQVUsd0JBQXdCLEtBQUssSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoRyxDQUFDO1FBRUQsNENBQTRDO1FBQzVDLE1BQU0sSUFBQSxnQ0FBZ0IsRUFBQztZQUNyQixPQUFPLEVBQUUsR0FBRyxVQUFVLHdCQUF3QixLQUFLLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNsRixZQUFZLEVBQUUsc0NBQXNDO1lBQ3BELE9BQU87WUFDUCxLQUFLLEVBQUUsMkJBQVc7WUFFbEIsa0VBQWtFO1lBQ2xFLEtBQUssRUFBRSxLQUFLO1lBRVosbUZBQW1GO1lBQ25GLEdBQUcsa0NBQ0UsT0FBTyxDQUFDLEdBQUcsR0FDWCxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxZQUFZLEVBQUUsMEJBQTBCLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQ2hHO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FBQTtBQWxERCxvQ0FrREMifQ==