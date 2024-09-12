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
exports.printOutput = void 0;
const prompts_1 = require("@clack/prompts");
const copyBaseAssets_1 = require("./copyBaseAssets");
const getPackageManager_1 = require("./getPackageManager");
const runEasConfigure_1 = require("./runEasConfigure");
const systemCommand_1 = require("./systemCommand");
const generateNWUI_1 = require("./generateNWUI");
function printOutput(cliResults, formattedFiles, toolbox, stylingPackage) {
    return __awaiter(this, void 0, void 0, function* () {
        const { parameters: { options }, print: { info, success, highlight } } = toolbox;
        const { projectName, flags } = cliResults;
        const s = (0, prompts_1.spinner)();
        // Output the results to the user
        s.start('Initializing your project...');
        yield Promise.all(formattedFiles);
        s.stop('Project initialized!');
        s.start('Copying base assets...');
        yield (0, copyBaseAssets_1.copyBaseAssets)(projectName, toolbox);
        s.stop('Base assets copied!');
        // check if npm option is set, otherwise set based on what the system is configure to use
        const packageManager = cliResults.flags.packageManager || (0, getPackageManager_1.getPackageManager)(toolbox, cliResults);
        const isNpm = packageManager === 'npm';
        // seems like all package managers actually support the run command
        const runCommand = `${packageManager} run`;
        const runnerType = (0, getPackageManager_1.getPackageManagerRunnerX)(toolbox, cliResults);
        if (!options.noInstall && !flags.noInstall) {
            s.start(`Installing dependencies using ${packageManager}...`);
            // attempt to improve npm install speeds by disabling audit and progress
            const additionalFlags = packageManager === 'npm' ? '--silent --no-audit --progress=false' : '--silent';
            yield (0, systemCommand_1.runSystemCommand)({
                toolbox,
                command: `cd ${projectName} && ${packageManager} install ${additionalFlags}`,
                stdio: packageManager === 'npm' ? undefined : systemCommand_1.ONLY_ERRORS,
                errorMessage: 'Error installing dependencies'
            });
            s.stop('Dependencies installed!');
            s.start('Updating Expo to latest version...');
            const installCommand = packageManager === 'yarn' ? 'add' : 'install';
            yield (0, systemCommand_1.runSystemCommand)({
                toolbox,
                command: `cd ${projectName} && ${packageManager} ${installCommand} ${additionalFlags} expo@latest`,
                stdio: isNpm ? undefined : systemCommand_1.ONLY_ERRORS,
                errorMessage: 'Error updating expo'
            });
            s.stop('Latest version of Expo installed!');
            s.start('Updating packages to expo compatible versions...');
            yield (0, systemCommand_1.runSystemCommand)({
                toolbox,
                command: `cd ${projectName} && ${runnerType} expo@latest install --fix`,
                errorMessage: 'Error updating packages',
                stdio: undefined
            });
            s.stop('Packages updated!');
            yield (0, generateNWUI_1.generateNWUI)(cliResults, toolbox);
            s.start(`Cleaning up your project...`);
            // format the files with prettier and eslint using installed packages.
            yield (0, systemCommand_1.runSystemCommand)({
                toolbox,
                command: `cd ${projectName} && ${runCommand} format`,
                errorMessage: 'Error formatting code',
                stdio: undefined
            });
            s.stop('Project files formatted!');
        }
        else {
            yield (0, generateNWUI_1.generateNWUI)(cliResults, toolbox);
            s.start(`formatting your project using ${runnerType} prettier...`);
            // Running prettier using global runners against the template.
            // Use --no-config to prevent using project's config (that may have plugins/dependencies)
            yield (0, systemCommand_1.runSystemCommand)({
                toolbox,
                command: `${runnerType} prettier "${projectName}/**/*.{json,js,jsx,ts,tsx}" --no-config --write`,
                errorMessage: 'Error formatting code',
                stdio: systemCommand_1.ONLY_ERRORS
            });
            s.stop('Project files formatted!');
        }
        if (!options.noGit && !flags.noGit && process.env.NODE_ENV !== 'test') {
            s.start(`Initializing git...`);
            // initialize git repo and add first commit
            // get create expo stack version
            const cesVersion = require('../../package.json').version || '2.0.0';
            yield (0, systemCommand_1.runSystemCommand)({
                toolbox,
                command: `cd ${projectName} && git init --quiet && git add . && git commit -m "Initial commit" -m "Generated by create-expo-stack ${cesVersion}" --quiet`,
                errorMessage: 'Error initializing git',
                stdio: 'inherit'
            });
            s.stop(`Git initialized!`);
        }
        if (cliResults.flags.eas) {
            yield (0, runEasConfigure_1.easConfigure)(cliResults, packageManager, toolbox);
        }
        const printVexoSteps = () => {
            info(``);
            highlight('Head over to https://vexo.co to create a new Vexo project.');
            info(``);
            highlight(`Get the API key:`);
            info(`1. Create a new app in your vexo dashboard:`);
            highlight(`https://vexo.co/apps`);
            info(`2. Find your API key on your app settings page.`);
            info(`3. Copy the key and paste it into your .env file.`);
            info(`4. Optionally, follow the docs to get started with Vexo:`);
            highlight(`https://docs.vexo.co/`);
            info(``);
        };
        //	check if packages includes package with name "supabase"
        if (cliResults.packages.some((pkg) => pkg.name === 'supabase')) {
            success(`\nSuccess! 🎉 Now, here's what's next:`);
            info(``);
            highlight('Head over to https://database.new to create a new Supabase project.');
            info(``);
            highlight(`Get the Project URL and anon key from the API settings:`);
            info(`1. Go to the API settings page in the Dashboard.`);
            info(`2. Find your Project URL, anon, and service_role keys on this page.`);
            info(`3. Copy these keys and paste them into your .env file.`);
            info(`4. Optionally, follow one of these guides to get started with Supabase:`);
            highlight(`https://docs.expo.dev/guides/using-supabase/#next-steps`);
            if (cliResults.packages.some((pkg) => pkg.name === 'vexo-analytics')) {
                printVexoSteps();
            }
            success(`Once you're done, run the following to get started: `);
            info(``);
        }
        else if (cliResults.packages.some((pkg) => pkg.name === 'firebase')) {
            success(`\nSuccess! 🎉 Now, here's what's next:`);
            info(``);
            highlight('Head over to https://console.firebase.google.com/ to create a new Firebase project.');
            info(``);
            highlight(`Get the API key and other unique identifiers:`);
            info(`1. Register a web app in your Firebase project:`);
            highlight(`https://firebase.google.com/docs/web/setup#register-app`);
            info(`2. Find your API key and other identifiers.`);
            info(`3. Copy these keys and paste them into your .env file.`);
            info(`4. Optionally, follow one of these guides to get started with Firebase:`);
            highlight(`https://docs.expo.dev/guides/using-firebase/#next-steps`);
            if (cliResults.packages.some((pkg) => pkg.name === 'vexo-analytics')) {
                printVexoSteps();
            }
            success(`Once you're done, run the following to get started: `);
            info(``);
        }
        else {
            if (cliResults.packages.some((pkg) => pkg.name === 'vexo-analytics')) {
                success(`Success! 🎉 Now, here's what's next:`);
                printVexoSteps();
                success(`Once you're done, run the following to get started: `);
            }
            else {
                success('\nSuccess! 🎉 Now, just run the following to get started: ');
            }
            info(``);
        }
        let step = 1;
        if (flags.eas) {
            info(`To build for development:`);
            info(``);
            highlight(`${step}. cd ${projectName}`);
            if (!flags.noInstall)
                highlight(`${++step}. ${packageManager} install`);
            highlight(`${++step}. eas build --profile=development`);
            highlight(`${++step}. ${runCommand} start`);
            info(``);
            step = 1;
            info(`To create a build to share with others:`);
            info(``);
            highlight(`${step}. cd ${projectName}`);
            if (!flags.noInstall)
                highlight(`${++step}. ${packageManager} install`);
            highlight(`${++step}. eas build --profile=preview`);
            info(``);
            info('To add additional ios users:');
            info(``);
            highlight(`eas device:create `);
        }
        else {
            highlight(`${step}. cd ${projectName}`);
            if (flags.noInstall)
                highlight(`${++step}. ${packageManager} install`);
            if (stylingPackage.name === 'unistyles' || stylingPackage.name === 'nativewindui') {
                highlight(`${++step}. npx expo prebuild --clean`);
            }
            highlight(`${++step}. ${runCommand} ios`);
        }
        info(``);
        (0, prompts_1.outro)(`If you're looking to move even faster, I may be able to help!\n- https://x.com/danstepanov`);
    });
}
exports.printOutput = printOutput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbnRPdXRwdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbGl0aWVzL3ByaW50T3V0cHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDRDQUFnRDtBQUdoRCxxREFBa0Q7QUFDbEQsMkRBQWtGO0FBQ2xGLHVEQUFpRDtBQUNqRCxtREFBZ0U7QUFDaEUsaURBQThDO0FBRTlDLFNBQXNCLFdBQVcsQ0FDL0IsVUFBc0IsRUFDdEIsY0FBcUIsRUFDckIsT0FBZ0IsRUFDaEIsY0FBaUM7O1FBRWpDLE1BQU0sRUFDSixVQUFVLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFDdkIsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsRUFDcEMsR0FBRyxPQUFPLENBQUM7UUFFWixNQUFNLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxHQUFHLFVBQVUsQ0FBQztRQUMxQyxNQUFNLENBQUMsR0FBRyxJQUFBLGlCQUFPLEdBQUUsQ0FBQztRQUVwQixpQ0FBaUM7UUFFakMsQ0FBQyxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFFL0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sSUFBQSwrQkFBYyxFQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFFOUIseUZBQXlGO1FBQ3pGLE1BQU0sY0FBYyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsY0FBYyxJQUFJLElBQUEscUNBQWlCLEVBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2pHLE1BQU0sS0FBSyxHQUFHLGNBQWMs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