"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVersionForPackageManager = exports.getDefaultPackageManagerVersion = exports.getPackageManagerRunnerX = exports.getPackageManager = void 0;
// TODO: Rework this function as it is pretty messy
function getPackageManager(toolbox, cliResults) {
    const { parameters: { options } } = toolbox;
    if (options.npm)
        return 'npm';
    if (options.yarn)
        return 'yarn';
    if (options.pnpm)
        return 'pnpm';
    if (options.bun)
        return 'bun';
    if (cliResults.flags.packageManager && cliResults.flags.packageManager !== 'npm') {
        return cliResults.flags.packageManager;
    }
    // This environment variable is set by npm and yarn but pnpm seems less consistent
    const userAgent = process.env.npm_config_user_agent;
    if (userAgent) {
        if (userAgent.startsWith('yarn')) {
            return 'yarn';
        }
        else if (userAgent.startsWith('pnpm')) {
            return 'pnpm';
        }
        else if (userAgent.startsWith('bun')) {
            return 'bun';
        }
        else {
            return 'npm';
        }
    }
    else if (cliResults.flags.packageManager) {
        // If no user agent is set, assume npm
        return cliResults.flags.packageManager;
    }
    else {
        return 'npm';
    }
}
exports.getPackageManager = getPackageManager;
function getPackageManagerRunnerX(toolbox, cliResults) {
    const { parameters: { options } } = toolbox;
    if (options.npm)
        return 'npx';
    // yarn dlx has issues
    if (options.yarn)
        return 'npx';
    if (options.pnpm)
        return 'pnpx';
    if (options.bun)
        return 'bunx';
    // This environment variable is set by npm and yarn but pnpm seems less consistent
    const userAgent = process.env.npm_config_user_agent;
    if (userAgent) {
        if (userAgent.startsWith('yarn')) {
            // yarn dlx has issues
            return 'npx';
        }
        else if (userAgent.startsWith('pnpm')) {
            return 'pnpx';
        }
        else if (userAgent.startsWith('bun')) {
            return 'bunx';
        }
        else {
            return 'npx';
        }
    }
    else {
        // Determine runner based on cliResults.flags.packageManager
        if (cliResults.flags.packageManager === 'yarn')
            return 'npx'; // yarn dlx has issues
        if (cliResults.flags.packageManager === 'pnpm')
            return 'pnpx';
        if (cliResults.flags.packageManager === 'bun')
            return 'bunx';
        // If no user agent is set, assume npm
        return 'npx';
    }
}
exports.getPackageManagerRunnerX = getPackageManagerRunnerX;
function getDefaultPackageManagerVersion() {
    const userAgent = process.env.npm_config_user_agent;
    if (userAgent) {
        return userAgent.split(' ')[0].split('/')[1];
    }
}
exports.getDefaultPackageManagerVersion = getDefaultPackageManagerVersion;
function getVersionForPackageManager(packageManager) {
    const version = require('child_process').execSync(`${packageManager} --version`);
    return version.toString().replace('\n', '');
}
exports.getVersionForPackageManager = getVersionForPackageManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UGFja2FnZU1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbGl0aWVzL2dldFBhY2thZ2VNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQU1BLG1EQUFtRDtBQUNuRCxTQUFnQixpQkFBaUIsQ0FBQyxPQUFnQixFQUFFLFVBQXNCO0lBQ3hFLE1BQU0sRUFDSixVQUFVLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFDeEIsR0FBRyxPQUFPLENBQUM7SUFFWixJQUFJLE9BQU8sQ0FBQyxHQUFHO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDOUIsSUFBSSxPQUFPLENBQUMsSUFBSTtRQUFFLE9BQU8sTUFBTSxDQUFDO0lBQ2hDLElBQUksT0FBTyxDQUFDLElBQUk7UUFBRSxPQUFPLE1BQU0sQ0FBQztJQUNoQyxJQUFJLE9BQU8sQ0FBQyxHQUFHO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFOUIsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLGNBQWMsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLGNBQWMsS0FBSyxLQUFLLEVBQUUsQ0FBQztRQUNqRixPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxrRkFBa0Y7SUFDbEYsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQztJQUVwRCxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQ2QsSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDakMsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQzthQUFNLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ3hDLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7YUFBTSxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUN2QyxPQUFPLEtBQUssQ0FB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