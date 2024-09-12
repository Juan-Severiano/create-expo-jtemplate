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
exports.runCLI = void 0;
const prompts_1 = require("@clack/prompts");
const gluegun_1 = require("gluegun");
const constants_1 = require("../constants");
const configStorage_1 = require("./configStorage");
const getPackageManager_1 = require("./getPackageManager");
// based on eas default bun version https://docs.expo.dev/build-reference/infrastructure/#ios-server-images
const minBunVersion = '1.1.13'; // or greater
function runCLI(toolbox, projectName) {
    return __awaiter(this, void 0, void 0, function* () {
        const { parameters: { options }, print: { info, success, warning, highlight } } = toolbox;
        // Set the default options
        const cliResults = constants_1.defaultOptions;
        // Project name already validated, just set cliResults
        cliResults.projectName = projectName;
        cliResults.flags.overwrite = !!options.overwrite;
        cliResults.flags.eas = !!options.eas;
        // Clear default packages
        cliResults.packages = [];
        // Check whether the user has any saved create expo stack configurations
        const savedConfigs = yield (0, configStorage_1.loadConfigs)();
        // If the user has saved configurations, ask if they would like to use them
        if (savedConfigs.length > 0) {
            const useSavedConfig = yield (0, prompts_1.confirm)({
                message: 'Would you like to use a saved configuration?',
                initialValue: false
            });
            if ((0, prompts_1.isCancel)(useSavedConfig)) {
                (0, prompts_1.cancel)('Cancelled... 👋');
                return process.exit(0);
            }
            if (useSavedConfig) {
                const savedConfigSelect = yield (0, prompts_1.select)({
                    message: 'Which saved configuration would you like to use?',
                    options: savedConfigs.map((config) => ({ value: config.name, label: config.name }))
                });
                if ((0, prompts_1.isCancel)(savedConfigSelect)) {
                    (0, prompts_1.cancel)('Cancelled... 👋');
                    return process.exit(0);
                }
                const selectedConfig = savedConfigs.find((config) => config.name === savedConfigSelect);
                if (selectedConfig) {
                    cliResults.packages = selectedConfig.cliResults.packages;
                    cliResults.flags = selectedConfig.cliResults.flags;
                    success(`Using saved configuration: ${selectedConfig.name}`);
                    return cliResults;
                }
                else {
                    warning('Saved configuration not found, continuing with default configuration.');
                }
            }
        }
        // Ask about TypeScript
        const shouldUseTypescript = yield (0, prompts_1.confirm)({
            message: 'Would you like to use TypeScript with this project?',
            initialValue: true
        });
        if ((0, prompts_1.isCancel)(shouldUseTypescript)) {
            (0, prompts_1.cancel)('Cancelled... 👋');
            return process.exit(0);
        }
        if (shouldUseTypescript) {
            success('Good call, now using TypeScript! 🚀');
        }
        else {
            success(`Wrong answer, we're gonna use Typescript.`);
        }
        const defaultPackageManagerVersion = (0, getPackageManager_1.getDefaultPackageManagerVersion)();
        if (cliResults.flags.packageManager) {
            if (options.bun || options.pnpm || options.npm || options.yarn) {
                cliResults.flags.packageManager = options.bun ? 'bun' : options.pnpm ? 'pnpm' : options.npm ? 'npm' : 'yarn';
            }
            else {
                const shouldUseDefaultPackageManager = yield (0, prompts_1.confirm)({
                    message: `\nWe've detected ${cliResults.flags.packageManager} ${defaultPackageManagerVersion ? `v${defaultPackageManagerVersion}` : ''} as your preferred package manager.\nWould you like to continue using it?`,
                    initialValue: true
                });
                if ((0, prompts_1.isCancel)(shouldUseDefaultPackageManager)) {
                    (0, prompts_1.cancel)('Cancelled... 👋');
                    return process.exit(0);
                }
                if (!shouldUseDefaultPackageManager) {
                    const packageManagerSelect = yield (0, prompts_1.select)({
                        message: 'Gotcha! Which package manager would you like to use?',
                        options: [
                            { value: 'npm', label: 'npm' },
                            { value: 'yarn', label: 'yarn' },
                            { value: 'pnpm', label: 'pnpm' },
                            { value: 'bun', label: 'bun' }
                        ],
                        initialValue: 'npm'
                    });
                    if ((0, prompts_1.isCancel)(packageManagerSelect)) {
                        (0, prompts_1.cancel)('Cancelled... 👋');
                        return process.exit(0);
                    }
                    cliResults.flags.packageManager = packageManagerSelect;
                }
            }
        }
        else {
            if (options.bun || options.pnpm || options.npm || options.yarn) {
                cliResults.flags.packageManager = options.bun ? 'bun' : options.pnpm ? 'pnpm' : options.npm ? 'npm' : 'yarn';
            }
            else {
                const packageManagerSelect = yield (0, prompts_1.select)({
                    message: 'Which package manager would you like to use?',
                    options: [
                        { value: 'npm', label: 'npm' },
                        { value: 'yarn', label: 'yarn' },
                        { value: 'pnpm', label: 'pnpm' },
                        { value: 'bun', label: 'bun' }
                    ]
                });
                if ((0, prompts_1.isCancel)(packageManagerSelect)) {
                    (0, prompts_1.cancel)('Cancelled... 👋');
                    return process.exit(0);
                }
                cliResults.flags.packageManager = packageManagerSelect;
            }
        }
        const navigationSelect = yield (0, prompts_1.select)({
            message: 'What would you like to use for Navigation?',
            options: [
                { value: 'react-navigation', label: 'React Navigation' },
                { value: 'expo-router', label: 'Expo Router' },
                { value: undefined, label: 'None' }
            ],
            initialValue: 'expo-router'
        });
        if ((0, prompts_1.isCancel)(navigationSelect)) {
            (0, prompts_1.cancel)('Cancelled... 👋');
            return process.exit(0);
        }
        if (navigationSelect) {
            const navigationType = yield (0, prompts_1.select)({
                message: 'What type of navigation would you like to use?',
                options: [
                    { value: 'stack', label: 'Stack' },
                    { value: 'tabs', label: 'Tabs' },
                    { value: 'drawer + tabs', label: 'Drawer + Tabs' }
                ]
            });
            if ((0, prompts_1.isCancel)(navigationType)) {
                (0, prompts_1.cancel)('Cancelled... 👋');
                return process.exit(0);
            }
            cliResults.packages.push({
                name: navigationSelect,
                type: 'navigation',
                options: {
                    type: navigationType
                }
            });
            // If the user is using a version of bun that is anything but version 1.0.22, communicate a message
            if (cliResults.flags.packageManager === 'bun' &&
                defaultPackageManagerVersion &&
                gluegun_1.semver.lt(defaultPackageManagerVersion, minBunVersion)) {
                warning('⚠️' + ' ' + ` We've detected you're using Bun v${defaultPackageManagerVersion}.`);
                info('');
                warning(`Some packages may not work correctly if you continue. We recommend using the latest version of Bun or at-least v${minBunVersion}.`);
                warning(`For more information, visit https://github.com/oven-sh/bun/issues/8406`);
                info('');
                warning(`To upgrade to Bun run:`);
                info('');
                highlight(`bun upgrade`);
                info('');
                warning(`or visit bun.sh/docs/installation for other installation methods (e.g. via Homebrew, npm, etc).`);
                info('');
                const shouldContinue = yield (0, prompts_1.confirm)({
                    message: `Would you like to continue without upgrading Bun?`,
                    initialValue: false
                });
                if ((0, prompts_1.isCancel)(shouldContinue) || !shouldContinue) {
                    throw new Error(constants_1.bunInstallationError);
                }
                success(`Great, we'll use ${navigationSelect}!`);
            }
            else if (cliResults.flags.packageManager === 'bun' && !defaultPackageManagerVersion) {
                warning('⚠️' + ' ' + ` We've detected you're using Bun but we are unable to determine which version you are using.`);
                info('');
                warning(`We recommend using the latest version of Bun or at-least v${minBunVersion}. If you continue with an earlier version, some packages may not work correctly.`);
                warning(`For more information, visit https://github.com/oven-sh/bun/issues/8406`);
                info('');
                warning(`To check your version of Bun, run:`);
                info('');
                highlight(`bun -version`);
                info('');
                warning(`To upgrade Bun run:`);
                info('');
                highlight(`bun upgrade`);
                info('');
                warning(`or visit bun.sh/docs/installation for other installation methods (e.g. via Homebrew, npm, etc).`);
                info('');
                const shouldContinue = yield (0, prompts_1.confirm)({
                    message: `Would you like to continue with your current version of Bun?`,
                    initialValue: false
                });
                if ((0, prompts_1.isCancel)(shouldContinue) || !shouldContinue) {
                    throw new Error(constants_1.bunInstallationError);
                }
                success(`Great, we'll use ${navigationSelect}!`);
            }
        }
        else {
            success(`No problem, skipping navigation for now.`);
        }
        const stylingSelect = yield (0, prompts_1.select)({
            message: 'What would you like to use for styling?',
            options: navigationSelect === 'expo-router'
                ? [
                    { value: 'nativewindui', label: 'NativeWindUI' },
                    { value: 'nativewind', label: 'NativeWind' },
                    { value: 'restyle', label: 'Restyle' },
                    { value: 'stylesheet', label: 'StyleSheet' },
                    { value: 'tamagui', label: 'Tamagui (experimental)' },
                    { value: 'unistyles', label: 'Unistyles' }
                ]
                : [
                    { value: 'nativewind', label: 'NativeWind' },
                    { value: 'restyle', label: 'Restyle' },
                    { value: 'stylesheet', label: 'StyleSheet' },
                    { value: 'tamagui', label: 'Tamagui (experimental)' },
                    { value: 'unistyles', label: 'Unistyles' }
                ],
            initialValue: navigationSelect === 'expo-router' ? 'nativewindui' : 'nativewind'
        });
        if ((0, prompts_1.isCancel)(stylingSelect)) {
            (0, prompts_1.cancel)('Cancelled... 👋');
            return process.exit(0);
        }
        if (stylingSelect === 'nativewindui') {
            const selectedComponents = yield (0, prompts_1.multiselect)({
                message: 'Which components would you like to explore?',
                options: [
                    { value: 'action-sheet', label: 'Action Sheet' },
                    { value: 'activity-indicator', label: 'Activity Indicator' },
                    { value: 'activity-view', label: 'Activity View' },
                    { value: 'avatar', label: 'Avatar' },
                    { value: 'bottom-sheet', label: 'Bottom Sheet' },
                    { value: 'date-picker', label: 'Date Picker' },
                    { value: 'picker', label: 'Picker' },
                    { value: 'progress-indicator', label: 'Progress Indicator' },
                    { value: 'ratings-indicator', label: 'Ratings Indicator' },
                    { value: 'slider', label: 'Slider' },
                    // We always include text so we don't need to provide this option
                    // { value: 'text', label: 'Text' },
                    { value: 'toggle', label: 'Toggle' }
                ],
                required: false,
                initialValues: constants_1.nativeWindUIOptions
            });
            if ((0, prompts_1.isCancel)(selectedComponents)) {
                (0, prompts_1.cancel)('Cancelled... 👋');
                return process.exit(0);
            }
            cliResults.packages.push({
                name: 'nativewindui',
                type: 'styling',
                options: {
                    selectedComponents: Array.from(new Set([...selectedComponents, 'text']))
                }
            });
            success(`You'll be styling with ease using NativeWindUI!`);
        }
        else {
            cliResults.packages.push({ name: stylingSelect, type: 'styling' });
            success(`You'll be styling with ease using ${stylingSelect.toString().charAt(0).toUpperCase() + stylingSelect.toString().slice(1)}!`);
        }
        const authenticationSelect = yield (0, prompts_1.select)({
            message: 'What would you like to use for authentication?',
            options: [
                { value: undefined, label: 'None' },
                { value: 'supabase', label: 'Supabase' },
                { value: 'firebase', label: 'Firebase' }
            ]
        });
        if ((0, prompts_1.isCancel)(authenticationSelect)) {
            (0, prompts_1.cancel)('Cancelled... 👋');
            return process.exit(0);
        }
        if (authenticationSelect) {
            cliResults.packages.push({ name: authenticationSelect, type: 'authentication' });
        }
        else {
            success(`No problem, skipping authentication for now.`);
        }
        const easEnabled = yield (0, prompts_1.confirm)({
            message: `Do you want to setup EAS`,
            initialValue: false
        });
        if ((0, prompts_1.isCancel)(easEnabled)) {
            (0, prompts_1.cancel)('Cancelled... 👋');
            return process.exit(0);
        }
        if (easEnabled) {
            cliResults.flags.eas = true;
            success(`We'll setup EAS for you.`);
        }
        else {
            success(`No problem, skipping eas for now.`);
        }
        // Offer user ability to save configuration
        const shouldSaveConfig = yield (0, prompts_1.confirm)({
            message: 'Would you like to save this configuration for future use?',
            initialValue: false
        });
        if ((0, prompts_1.isCancel)(shouldSaveConfig)) {
            (0, prompts_1.cancel)('Cancelled... 👋');
            return process.exit(0);
        }
        if (shouldSaveConfig) {
            const name = yield (0, prompts_1.text)({
                message: 'What do you want to name this configuration?',
                placeholder: 'Default'
            });
            if ((0, prompts_1.isCancel)(name)) {
                (0, prompts_1.cancel)('Cancelled... 👋');
                return process.exit(0);
            }
            yield (0, configStorage_1.saveConfig)({ name, cliResults });
        }
        return cliResults;
    });
}
exports.runCLI = runCLI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuQ0xJLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxpdGllcy9ydW5DTEkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsNENBQXNGO0FBR3RGLHFDQUFpQztBQUNqQyw0Q0FBeUY7QUFVekYsbURBQTBEO0FBQzFELDJEQUFzRTtBQUV0RSwyR0FBMkc7QUFDM0csTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLENBQUMsYUFBYTtBQUU3QyxTQUFzQixNQUFNLENBQUMsT0FBZ0IsRUFBRSxXQUFtQjs7UUFDaEUsTUFBTSxFQUNKLFVBQVUsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUN2QixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsRUFDN0MsR0FBRyxPQUFPLENBQUM7UUFFWiwwQkFBMEI7UUFDMUIsTUFBTSxVQUFVLEdBQUcsMEJBQWMsQ0FBQztRQUVsQyxzREFBc0Q7UUFDdEQsVUFBVSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDckMsVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDakQsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFFckMseUJBQXlCO1FBQ3pCLFVBQVUsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBRXpCLHdFQUF3RTtRQUN4RSxNQUFNLFlBQVksR0FBRyxNQUFNLElBQUEsMkJBQVcsR0FBRSxDQUFDO1FBRXpDLDJFQUEyRTtRQUMzRSxJQUFJLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDNUIsTUFBTSxjQUFjLEdBQUcsTUFBTSxJQUFBLGlCQUFPLEVBQUM7Z0JBQ25DLE9BQU8sRUFBRSw4Q0FBOEM7Z0JBQ3ZELFlBQVksRUFBRSxLQUFLO2FBQ3BCLENBQUMs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