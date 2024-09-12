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
exports.easConfigure = void 0;
const prompts_1 = require("@clack/prompts");
const systemCommand_1 = require("./systemCommand");
function easConfigure(cliResults, packageManager, toolbox) {
    return __awaiter(this, void 0, void 0, function* () {
        const { print: { info, success, warning, error }, system } = toolbox;
        if (cliResults.flags.noInstall) {
            error('Eas configuration requires installing dependencies, please remove the --no-install flag and try again.');
            process.exit(1);
        }
        const { projectName } = cliResults;
        info('Configuring EAS...');
        info(``);
        const easOutput = yield system.spawn(`eas --version`);
        if (easOutput === null || easOutput === void 0 ? void 0 : easOutput.error) {
            warning('EAS CLI not found, to continue please install it globally');
            info(``);
            const shouldInstall = yield (0, prompts_1.confirm)({
                message: `Install EAS CLI?`
            });
            info(``);
            if ((0, prompts_1.isCancel)(shouldInstall)) {
                (0, prompts_1.cancel)('Cancelled... 👋');
                return process.exit(0);
            }
            if (shouldInstall) {
                let packageManagerToUse = packageManager;
                // bun has no global install
                if (packageManager === 'bun') {
                    const packageManagerToUseResult = yield (0, prompts_1.select)({
                        message: "We can't use bun to install global packages, please select a package manager to use:",
                        options: [
                            { value: 'npm', label: 'npm' },
                            { value: 'yarn', label: 'yarn' },
                            { value: 'pnpm', label: 'pnpm' }
                        ]
                    });
                    if ((0, prompts_1.isCancel)(packageManagerToUseResult)) {
                        (0, prompts_1.cancel)('Cancelled... 👋');
                        return process.exit(0);
                    }
                    packageManagerToUse = packageManagerToUseResult;
                }
                info(`We'll use ${packageManagerToUse} install -g eas-cli`);
                info(``);
                yield (0, systemCommand_1.runSystemCommand)({
                    command: `${packageManagerToUse} install -g eas-cli`,
                    toolbox,
                    errorMessage: 'Error installing EAS CLI',
                    stdio: undefined
                });
            }
        }
        yield (0, systemCommand_1.runSystemCommand)({
            command: `cd ${projectName} && eas build:configure -p all`,
            errorMessage: 'Error configuring EAS',
            stdio: 'inherit',
            toolbox
        });
        success('EAS configured!');
        info(`Now we'll generate the native code for your project`);
        yield (0, systemCommand_1.runSystemCommand)({
            command: `cd ${projectName} && ${packageManager} run prebuild`,
            errorMessage: 'Error generating native code',
            stdio: 'inherit',
            toolbox
        });
        success('Native code generated!');
    });
}
exports.easConfigure = easConfigure;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuRWFzQ29uZmlndXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxpdGllcy9ydW5FYXNDb25maWd1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EsNENBQW1FO0FBRW5FLG1EQUFtRDtBQUVuRCxTQUFzQixZQUFZLENBQ2hDLFVBQXNCLEVBQ3RCLGNBQThCLEVBQzlCLE9BQWdCOztRQUVoQixNQUFNLEVBQ0osS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQ3hDLE1BQU0sRUFDUCxHQUFHLE9BQU8sQ0FBQztRQUVaLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUMvQixLQUFLLENBQUMsd0dBQXdHLENBQUMsQ0FBQztZQUVoSCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLENBQUM7UUFFRCxNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsVUFBVSxDQUFDO1FBRW5DLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNULE1BQU0sU0FBUyxHQUFHLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUV0RCxJQUFJLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxLQUFLLEVBQUUsQ0FBQztZQUNyQixPQUFPLENBQUMsMkRBQTJELENBQUMsQ0FBQztZQUNyRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDVCxNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUEsaUJBQU8sRUFBQztnQkFDbEMsT0FBTyxFQUFFLGtCQUFrQjthQUM1QixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFVCxJQUFJLElBQUEsa0JBQVEsRUFBQyxhQUFhLENBQUMsRUFBRSxDQUFDO2dCQUM1QixJQUFBLGdCQUFNLEVBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDMUIsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLENBQUM7WUFFRCxJQUFJLGFBQWEsRUFBRSxDQUFDO2dCQUNsQixJQUFJLG1CQUFtQixHQUFHLGNBQWMsQ0FBQztnQkFFekMsNEJBQTRCO2dCQUM1QixJQUFJLGNBQWMsS0FBSyxLQUFLLEVBQUUsQ0FBQztvQkFDN0IsTUFBTSx5QkFBeUIsR0FBRyxNQUFNLElBQUEsZ0JBQU0sRUFBQzt3QkFDN0MsT0FBTyxFQUFFLHNGQUFzRjt3QkFDL0YsT0FBTyxFQUFFOzRCQUNQLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFOzRCQUM5QixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRTs0QkFDaEMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7eUJBQ2pDO3FCQUNGLENBQUMsQ0FBQztvQkFFSCxJQUFJLElBQUEsa0JBQVEsRUFBQyx5QkFBeUIsQ0FBQyxFQUFFLENBQUM7d0JBQ3hDLElBQUEsZ0JBQU0sRUFBQyxpQkFBaUIsQ0FBQyxDQUFDO3dCQUMxQixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3pCLENBQUM7b0JBRUQsbUJBQW1CLEdBQUcseUJBQTJDLENBQUM7Z0JBQ3BFLENBQUM7Z0JBRUQsSUFBSSxDQUFDLGFBQWEsbUJBQW1CLHFCQUFxQixDQUFDLENBQUM7Z0JBQzVELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFFVCxNQUFNLElBQUEsZ0NBQWdCLEVBQUM7b0JBQ3JCLE9BQU8sRUFBRSxHQUFHLG1CQUFtQixxQkFBcUI7b0JBQ3BELE9BQU87b0JBQ1AsWUFBWSxFQUFFLDBCQUEwQjtvQkFDeEMsS0FBSyxFQUFFLFNBQVM7aUJBQ2pCLENBQUMsQ0FBQztZQUNMLENBQUM7UUFDSCxDQUFDO1FBRUQsTUFBTSxJQUFBLGdDQUFnQixFQUFDO1lBQ3JCLE9BQU8sRUFBRSxNQUFNLFdBQVcsZ0NBQWdDO1lBQzFELFlBQVksRUFBRSx1QkFBdUI7WUFDckMsS0FBSyxFQUFFLFNBQVM7WUFDaEIsT0FBTztTQUNSLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRTNCLElBQUksQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO1FBRTVELE1BQU0sSUFBQSxnQ0FBZ0IsRUFBQztZQUNyQixPQUFPLEVBQUUsTUFBTSxXQUFXLE9BQU8sY0FBYyxlQUFlO1lBQzlELFlBQVksRUFBRSw4QkFBOEI7WUFDNUMsS0FBSyxFQUFFLFNBQVM7WUFDaEIsT0FBTztTQUNSLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Q0FBQTtBQXhGRCxvQ0F3RkMifQ==