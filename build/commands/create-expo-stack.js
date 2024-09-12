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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util = require('util');
const utilities_1 = require("../utilities");
const constants_1 = require("../constants");
const types_1 = require("../types");
const clearStylingPackages_1 = __importDefault(require("../utilities/clearStylingPackages"));
const validateProjectName_1 = require("../utilities/validateProjectName");
const prompts_1 = require("@clack/prompts");
const clearNavigationPackages_1 = __importDefault(require("../utilities/clearNavigationPackages"));
const command = {
    name: 'create-expo-stack',
    description: 'Create a new Expo project',
    run: (toolbox) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const { filesystem: { exists, removeAsync }, parameters: { first, options }, print: { error, info, highlight, success, warning }, prompt } = toolbox;
        const printSomethingWentWrong = () => {
            info(`\nOops, something went wrong while creating your project 😢`);
            info(`\nIf this was unexpected, please open an issue: https://github.com/roninoss/create-expo-stack#reporting-bugs--feedback`);
            info('');
        };
        if (options.help || options.h) {
            (0, utilities_1.showHelp)(info, highlight, warning);
            return;
        }
        // Conditionally skip running the CLI
        const useDefault = (options.default !== undefined && options.default) || (options.d !== undefined && options.d);
        const skipCLI = options.nonInteractive;
        const useBlankTypescript = options.nativewindui == undefined ? options.blank || false : (options.blank && options.nativewindui) || false;
        // Check if any of the options were passed in via the command
        const optionsPassedIn = types_1.availablePackages.some((condition) => options[condition] !== undefined);
        // Set the default options
        let cliResults = constants_1.defaultOptions;
        cliResults.flags.packageManager = (0, utilities_1.getPackageManager)(toolbox, cliResults);
        // START INPUT VALIDATION
        try {
            // Validation: check if the user passed in the tabs/drawer option without passing in either expo router or react navigation. If so, throw an error
            if ((options.tabs || options['drawer+tabs']) &&
                !options.reactNavigation &&
                !options['react-navigation'] &&
                !options.reactnavigation &&
                !options.expoRouter &&
                !options['expo-router'] &&
                !options.exporouter &&
                // nativewindui applies the expo router option by default
                !options.nativewindui) {
                // throw an error without a stack trace
                throw constants_1.navigationValidationError;
            }
            yield (0, utilities_1.renderTitle)(toolbox);
            (0, prompts_1.intro)(`Let's get started!`);
            // Prompt the user for the project name if it is not passed in via the command
            // - TODO: simplify this if statement to clarify what is being checked
            if (!first && (options.ignite || !(useDefault || optionsPassedIn || skipCLI || useBlankTypescript))) {
                const name = yield (0, prompts_1.text)({
                    message: 'What do you want to name your project?',
                    placeholder: constants_1.DEFAULT_APP_NAME
                });
                if ((0, prompts_1.isCancel)(name)) {
                    (0, prompts_1.cancel)('Cancelled... 👋');
                    return process.exit(0);
                }
                // if name is undefined or empty string, use default name
                cliResults.projectName = (name && name.toString()) || constants_1.DEFAULT_APP_NAME;
            }
            else {
                // Destructure the results but set the projectName if the first param is passed in
                cliResults.projectName = first || constants_1.DEFAULT_APP_NAME;
                const pathSegments = cliResults.projectName.split('/');
                cliResults.projectName = pathSegments.pop(); // get last segment as the project name
            }
            // Validate the provided project name; check if the directory already exists
            // - We may or may not be interactive, so conditionally pass in prompt.
            // - Ignore validation if the overwrite option is passed in.
            if (options.overwrite) {
                cliResults.flags.overwrite = true;
            }
            if (options.eas) {
                cliResults.flags.eas = true;
            }
            yield (0, validateProjectName_1.validateProjectName)(exists, removeAsync, !(useDefault || optionsPassedIn || skipCLI || useBlankTypescript) ? prompt : null, cliResults.projectName, cliResults.flags.overwrite);
        }
        catch (err) {
            if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
                error(`error: ${err}`);
            }
            if (err === '') {
                // user cancelled/exited the interactive CLI
                return void success(`\nCancelled... 👋 \n`);
            }
            if (err === constants_1.navigationValidationError) {
                // user tried passing in tabs/drawer option without passing in either expo router or react navigation
                return void error(`\n${constants_1.navigationValidationError}\n`);
            }
            if (err.message.includes(constants_1.projectNameValidationError)) {
                return void success(`\nCancelled... 👋 \n`);
            }
            // we keep this around so we can check what went wrong
            if (process.env.NODE_ENV !== 'test') {
                // Delete all files with projectName
                yield removeAsync(cliResults.projectName);
            }
            printSomethingWentWrong();
            throw err;
        }
        // END INPUT VALIDATION
        // Determine remaining options, run interactive CLI if necessary, and generate project
        try {
            // Check if user wants to create an opinionated stack prior to running the configurable CLI
            if (options.ignite) {
                yield (0, utilities_1.runIgnite)(toolbox, cliResults.projectName, cliResults);
            }
            else {
                // Check if the user wants to not install dependencies and/or not initialize git, update cliResults accordingly
                cliResults.flags.noInstall =
                    options.noInstall || (typeof options.install === 'boolean' && !options.install) || false;
                cliResults.flags.noGit = options.noGit || (typeof options.git === 'boolean' && !options.git) || false;
                // Validate import alias string forward slash and asterisk
                if (typeof options.importAlias === 'string') {
                    if (!options.importAlias.endsWith('/*')) {
                        throw new Error('Import alias must end in `/*`, for example: `@/*` or `~/`');
                    }
                }
                cliResults.flags.importAlias = options.importAlias !== false && options['import-alias'] !== false;
                if (!(useDefault || optionsPassedIn || skipCLI || useBlankTypescript)) {
                    //  Run the CLI to prompt the user for input
                    cliResults = yield (0, utilities_1.runCLI)(toolbox, cliResults.projectName);
                }
                // Update the cliResults with the options passed in via the command
                // Navigation packages
                if (options.reactNavigation || options['react-navigation'] || options.reactnavigation) {
                    // Add react-navigation package
                    cliResults.packages.push({
                        name: 'react-navigation',
                        type: 'navigation',
                        options: {
                            type: options.tabs ? 'tabs' : options['drawer+tabs'] ? 'drawer + tabs' : 'stack'
                        }
                    });
                }
                if (options.expoRouter || options['expo-router'] || options.exporouter) {
                    // Add expo-router package
                    cliResults.packages.push({
                        name: 'expo-router',
                        type: 'navigation',
                        options: {
                            type: options.tabs ? 'tabs' : options['drawer+tabs'] ? 'drawer + tabs' : 'stack'
                        }
                    });
                }
                // Styling packages
                if (options.nativewind) {
                    // Check if there is already a styling library added and remove it if so
                    cliResults = (0, clearStylingPackages_1.default)(cliResults);
                    // Add nativewind package
                    cliResults.packages.push({
                        name: 'nativewind',
                        type: 'styling'
                    });
                }
                else if (options.nativewindui) {
                    cliResults = (0, clearStylingPackages_1.default)(cliResults);
                    cliResults = (0, clearNavigationPackages_1.default)(cliResults);
                    const parsedComponents = (_d = (_c = (_b = (_a = options === null || options === void 0 ? void 0 : options.selectedComponents) === null || _a === void 0 ? void 0 : _a.split(',')) === null || _b === void 0 ? void 0 : _b.map((c) => c.trim())) === null || _c === void 0 ? void 0 : _c.filter((item) => constants_1.nativeWindUIOptions.includes(item))) !== null && _d !== void 0 ? _d : [];
                    const selectedComponents = parsedComponents.length
                        ? Array.from(new Set([...parsedComponents, 'text']))
                        : constants_1.nativeWindUIOptions;
                    cliResults.packages.push({
                        name: 'nativewindui',
                        type: 'styling',
                        options: {
                            selectedComponents: options.blank ? ['text'] : selectedComponents
                        }
                    });
                    cliResults.packages.push({
                        name: 'expo-router',
                        type: 'navigation',
                        options: {
                            type: options.tabs ? 'tabs' : options['drawer+tabs'] ? 'drawer + tabs' : 'stack'
                        }
                    });
                }
                else if (options.tamagui) {
                    cliResults = (0, clearStylingPackages_1.default)(cliResults);
                    // Add tamagui package
                    cliResults.packages.push({
                        name: 'tamagui',
                        type: 'styling'
                    });
                }
                else if (options.unistyles) {
                    cliResults = (0, clearStylingPackages_1.default)(cliResults);
                    // Add unistyles package
                    cliResults.packages.push({
                        name: 'unistyles',
                        type: 'styling'
                    });
                }
                else if (options.stylesheet) {
                    cliResults = (0, clearStylingPackages_1.default)(cliResults);
                    // Add stylesheet package
                    cliResults.packages.push({
                        name: 'stylesheet',
                        type: 'styling'
                    });
                }
                else if (options.restyle) {
                    try {
                        cliResults = (0, clearStylingPackages_1.default)(cliResults);
                        // Add stylesheet package
                        cliResults.packages.push({
                            name: 'restyle',
                            type: 'styling'
                        });
                    }
                    catch (error) {
                        console.log({ error });
                    }
                }
                // if there is no style package, add stylesheet
                else if (cliResults.packages.find((p) => p.type === 'styling') === undefined) {
                    cliResults.packages.push({
                        name: 'stylesheet',
                        type: 'styling'
                    });
                }
                // Authentication packages
                if (options.supabase) {
                    // Add supabase package
                    cliResults.packages.push({
                        name: 'supabase',
                        type: 'authentication'
                    });
                }
                if (options.firebase) {
                    // Add firebase package
                    cliResults.packages.push({
                        name: 'firebase',
                        type: 'authentication'
                    });
                }
                // Internalization packages
                if (options.i18next) {
                    cliResults.packages.push({
                        name: 'i18next',
                        type: 'internationalization'
                    });
                }
                // Analytics packages
                if (options.vexoAnalytics || options['vexo-analytics'] || options.vexoanalytics) {
                    cliResults.packages.push({ name: 'vexo-analytics', type: 'analytics' });
                }
                // By this point, all cliResults should be set
                info('');
                highlight('Your project configuration:');
                info(`${util.inspect(cliResults, false, null, true /* enable colors */)}`);
                info('');
                highlight('To recreate this project, run:');
                // Function that outputs a string given the CLI results and the packageManager. The outputted string should be a command that can be run to recreate the project
                const generateRerunScript = (cliResults) => {
                    var _a, _b;
                    let script = `npx create-expo-stack@latest ${cliResults.projectName} `;
                    const isNativeWindUISelected = cliResults.packages.some((p) => p.name === 'nativewindui');
                    if (isNativeWindUISelected) {
                        script += '--nativewindui ';
                        const nativeWindUIComponents = (_b = (_a = cliResults.packages.find((p) => p.name === 'nativewindui')) === null || _a === void 0 ? void 0 : _a.options.selectedComponents) !== null && _b !== void 0 ? _b : [];
                        // we do this to account for older stored config e.g that has selectable text in it
                        const onlyValidComponents = nativeWindUIComponents.filter((c) => constants_1.nativeWindUIOptions.includes(c));
                        if (onlyValidComponents.length === 0) {
                            script += '--blank ';
                        }
                        else if (onlyValidComponents.length !== constants_1.nativeWindUIOptions.length) {
                            script += `--selected-components=${onlyValidComponents.join(',')} `;
                        }
                        // this should always be expo router for nwui
                        const chosenNavigationOption = cliResults.packages.find((p) => p.type === 'navigation');
                        const hasNavigationPackage = chosenNavigationOption !== undefined;
                        const navigationType = chosenNavigationOption.options.type;
                        if (hasNavigationPackage) {
                            // NOTE we don't need to add expo-router since its currently getting automatically added with nativewindui
                            // NOTE stack is default so doesn't need to applied.
                            if (navigationType === 'tabs') {
                                script += '--tabs ';
                            }
                            else if (navigationType === 'drawer + tabs') {
                                script += '--drawer+tabs ';
                            }
                        }
                    }
                    else {
                        // Add the packages
                        cliResults.packages.forEach((p) => {
                            var _a, _b;
                            script += `--${p.name} `;
                            // If the package is a navigation package, add the type if it is tabs
                            if (p.type === 'navigation') {
                                if (((_a = p.options) === null || _a === void 0 ? void 0 : _a.type) === 'tabs') {
                                    script += '--tabs ';
                                }
                                else if (((_b = p.options) === null || _b === void 0 ? void 0 : _b.type) === 'drawer + tabs') {
                                    script += '--drawer+tabs ';
                                }
                            }
                        });
                    }
                    // Check if the user wants to skip installing packages
                    if (cliResults.flags.noInstall) {
                        script += '--no-install ';
                    }
                    // Check if the user wants to skip initializing git
                    if (cliResults.flags.noGit) {
                        script += '--no-git ';
                    }
                    // Check if the user wants to overwrite the project directory
                    if (!cliResults.flags.importAlias) {
                        script += '--no-import-alias ';
                    }
                    // Add the package manager
                    if (cliResults.flags.packageManager !== 'npm') {
                        script += `--${cliResults.flags.packageManager}`;
                    }
                    if (cliResults.flags.eas) {
                        script += ` --eas`;
                    }
                    return script;
                };
                const packageManager = (0, utilities_1.getPackageManager)(toolbox, cliResults);
                warning(`  ${generateRerunScript(cliResults)}`);
                const { packages } = cliResults;
                // Define props to be passed into the templates
                const authenticationPackage = packages.find((p) => p.type === 'authentication') || undefined;
                const navigationPackage = packages.find((p) => p.type === 'navigation') || undefined;
                // if there is no styling package, add the stylesheet package
                const stylingPackage = packages.find((p) => p.type === 'styling');
                const internalizationPackage = packages.find((p) => p.type === 'internationalization');
                const analyticsPackage = packages.find((p) => p.type === 'analytics');
                let files = [];
                files = (0, utilities_1.configureProjectFiles)(authenticationPackage, files, navigationPackage, stylingPackage, analyticsPackage, toolbox, cliResults, internalizationPackage);
                // Once all the files are defined, format and generate them
                let formattedFiles = [];
                formattedFiles = (0, utilities_1.generateProjectFiles)(authenticationPackage, analyticsPackage, cliResults, files, formattedFiles, navigationPackage, packageManager, stylingPackage, toolbox, internalizationPackage);
                yield (0, utilities_1.printOutput)(cliResults, formattedFiles, toolbox, stylingPackage);
            }
        }
        catch (err) {
            if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
                error(`error: ${err}`);
            }
            if (err === '') {
                // user cancelled/exited the interactive CLI
                return void success(`\nCancelled... 👋 \n`);
            }
            if (err.message.includes(constants_1.bunInstallationError)) {
                return void success(`\nCancelled to install recommended version of Bun.... 👋 \n`);
            }
            if (process.env.NODE_ENV !== 'test') {
                // Delete all files with projectName
                yield removeAsync(cliResults.projectName);
            }
            printSomethingWentWrong();
            throw err;
        }
    })
};
exports.default = command;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWV4cG8tc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvY3JlYXRlLWV4cG8tc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFN0IsNENBU3NCO0FBQ3RCLDRDQU9zQjtBQUN0QixvQ0FBeUQ7QUFDekQsNkZBQXFFO0FBQ3JFLDBFQUF1RTtBQUN2RSw0Q0FBK0Q7QUFDL0QsbUdBQTJFO0FBRTNFLE1BQU0sT0FBTyxHQUFtQjtJQUM5QixJQUFJLEVBQUUsbUJBQW1CO0lBQ3pCLFdBQVcsRUFBRSwyQkFBMkI7SUFDeEMsR0FBRyxFQUFFLENBQU8sT0FBTyxFQUFFLEVBQUU7O1FBQ3JCLE1BQU0sRUFDSixVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQ25DLFVBQVUsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFDOUIsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUNuRCxNQUFNLEVBQ1AsR0FBRyxPQUFPLENBQUM7UUFFWixNQUFNLHVCQUF1QixHQUFHLEdBQUcsRUFBRTtZQUNuQyxJQUFJLENBQUMsNkRBQTZELENBQUMsQ0FBQztZQUNwRSxJQUFJLENBQ0Ysd0hBQXdILENBQ3pILENBQUM7WUFDRixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUM7UUFDRixJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzlCLElBQUEsb0JBQVEsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBRW5DLE9BQU87UUFDVCxDQUFDO1FBRUQscUNBQXFDO1FBQ3JDLE1BQU0sVUFBVSxHQUFHLENBQUMs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