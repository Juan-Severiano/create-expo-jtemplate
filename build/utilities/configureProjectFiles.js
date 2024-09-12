"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureProjectFiles = void 0;
const os_1 = __importDefault(require("os"));
const getPackageManager_1 = require("./getPackageManager");
const configAnalytics_1 = require("./configAnalytics");
function configureProjectFiles(authenticationPackage, files, navigationPackage, stylingPackage, analyticsPackage, toolbox, cliResults, internalizationPackage) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    // Define the files common to all templates to be generated
    let baseFiles = [
        'base/tsconfig.json.ejs',
        'base/app.json.ejs',
        'base/App.tsx.ejs',
        'base/babel.config.js.ejs',
        'base/package.json.ejs',
        'base/.gitignore.ejs',
        'base/prettier.config.js.ejs'
    ];
    if ((stylingPackage === null || stylingPackage === void 0 ? void 0 : stylingPackage.name) === 'stylesheet') {
        baseFiles = baseFiles.concat([
            'base/components/Container.tsx.ejs',
            'base/components/ScreenContent.tsx.ejs',
            'base/components/EditScreenInfo.tsx.ejs'
        ]);
    }
    const packageManager = (0, getPackageManager_1.getPackageManager)(toolbox, cliResults);
    if ((stylingPackage === null || stylingPackage === void 0 ? void 0 : stylingPackage.name) === 'nativewindui') {
        let nativewindUIFiles = [
            'base/tsconfig.json.ejs',
            'base/app.json.ejs',
            'base/babel.config.js.ejs',
            'base/package.json.ejs',
            'base/.gitignore.ejs',
            'base/prettier.config.js.ejs',
            'packages/expo-router/metro.config.js.ejs',
            'packages/nativewindui/components/BackButton.tsx.ejs',
            'packages/nativewindui/components/Button.tsx.ejs',
            'packages/nativewindui/components/Container.tsx.ejs',
            'packages/nativewindui/components/EditScreenInfo.tsx.ejs',
            'packages/nativewindui/components/HeaderButton.tsx.ejs',
            'packages/nativewindui/components/ScreenContent.tsx.ejs',
            'packages/nativewindui/components/TabBarIcon.tsx.ejs',
            'packages/nativewindui/components/ThemeToggle.tsx.ejs',
            'packages/nativewindui/lib/useColorScheme.tsx.ejs',
            'packages/nativewindui/lib/useHeaderSearchBar.tsx.ejs',
            'packages/nativewindui/lib/cn.ts.ejs',
            'packages/nativewindui/theme/colors.ts.ejs',
            'packages/nativewindui/theme/index.ts.ejs',
            'packages/nativewindui/tailwind.config.js.ejs',
            'packages/nativewindui/nativewind-env.d.ts.ejs',
            'packages/nativewindui/global.css.ejs'
        ];
        const nativeWindUIStackFiles = [
            'packages/nativewindui/stack/app/_layout.tsx.ejs',
            'packages/nativewindui/stack/app/index.tsx.ejs',
            'packages/nativewindui/stack/app/modal.tsx.ejs',
            'packages/nativewindui/stack/app/+not-found.tsx.ejs',
            'packages/nativewindui/stack/app/+html.tsx.ejs'
        ];
        const nativewindUITabsFiles = [
            'packages/nativewindui/tabs/app/(tabs)/_layout.tsx.ejs',
            'packages/nativewindui/tabs/app/(tabs)/index.tsx.ejs',
            'packages/nativewindui/tabs/app/(tabs)/two.tsx.ejs',
            'packages/nativewindui/tabs/app/_layout.tsx.ejs',
            'packages/nativewindui/tabs/app/modal.tsx.ejs',
            'packages/nativewindui/tabs/app/+not-found.tsx.ejs',
            'packages/nativewindui/tabs/app/+html.tsx.ejs'
        ];
        const nativewindUIDrawerFiles = [
            'packages/nativewindui/drawer/app/_layout.tsx.ejs',
            'packages/nativewindui/drawer/app/(drawer)/_layout.tsx.ejs',
            'packages/nativewindui/drawer/app/(drawer)/index.tsx.ejs',
            'packages/nativewindui/drawer/app/(drawer)/(tabs)/_layout.tsx.ejs',
            'packages/nativewindui/drawer/app/(drawer)/(tabs)/index.tsx.ejs',
            'packages/nativewindui/drawer/app/(drawer)/(tabs)/two.tsx.ejs',
            'packages/nativewindui/drawer/app/modal.tsx.ejs',
            'packages/nativewindui/drawer/app/+not-found.tsx.ejs',
            'packages/nativewindui/drawer/app/+html.tsx.ejs'
        ];
        if (((_a = navigationPackage === null || navigationPackage === void 0 ? void 0 : navigationPackage.options) === null || _a === void 0 ? void 0 : _a.type) === 'stack') {
            nativewindUIFiles = [...nativewindUIFiles, ...nativeWindUIStackFiles];
        }
        else if (((_b = navigationPackage === null || navigationPackage === void 0 ? void 0 : navigationPackage.options) === null || _b === void 0 ? void 0 : _b.type) === 'tabs') {
            nativewindUIFiles = [...nativewindUIFiles, ...nativewindUITabsFiles];
        }
        else if (((_c = navigationPackage === null || navigationPackage === void 0 ? void 0 : navigationPackage.options) === null || _c === void 0 ? void 0 : _c.type) === 'drawer + tabs') {
            nativewindUIFiles = [...nativewindUIFiles, ...nativewindUIDrawerFiles];
        }
        files = nativewindUIFiles;
    }
    else {
        files = [...baseFiles];
        // add nativewind files if needed
        // modify base files with nativewind specifications
        if ((stylingPackage === null || stylingPackage === void 0 ? void 0 : stylingPackage.name) === 'nativewind') {
            const nativewindFiles = [
                'packages/nativewind/components/Container.tsx.ejs',
                'packages/nativewind/components/ScreenContent.tsx.ejs',
                'packages/nativewind/components/EditScreenInfo.tsx.ejs',
                'packages/nativewind/tailwind.config.js.ejs',
                'packages/nativewind/app-env.d.ts',
                'packages/nativewind/metro.config.js',
                'packages/nativewind/global.css'
            ];
            files = [...files, ...nativewindFiles];
        }
        // add tamagui files if needed
        // modify base files with tamagui specifications
        if ((stylingPackage === null || stylingPackage === void 0 ? void 0 : stylingPackage.name) === 'tamagui') {
            const tamaguiFiles = [
                'packages/tamagui/tamagui.config.ts.ejs',
                'packages/tamagui/components/Container.tsx.ejs',
                'packages/tamagui/components/ScreenContent.tsx.ejs',
                'packages/tamagui/components/EditScreenInfo.tsx.ejs'
            ];
            files = [...files, ...tamaguiFiles];
        }
        // add restyle files if needed
        // modify base files with restyle specifications
        if ((stylingPackage === null || stylingPackage === void 0 ? void 0 : stylingPackage.name) === 'restyle') {
            const restyleFiles = [
                'packages/restyle/components/Container.tsx.ejs',
                'packages/restyle/components/ScreenContent.tsx.ejs',
                'packages/restyle/components/EditScreenInfo.tsx.ejs',
                'packages/restyle/theme/theme.ts.ejs',
                'packages/restyle/theme/Box.tsx.ejs',
                'packages/restyle/theme/Text.tsx.ejs',
                'packages/restyle/theme/index.ts.ejs'
            ];
            files = [...files, ...restyleFiles];
        }
        // add unistyles files if needed
        // modify base files with unis specifications
        if ((stylingPackage === null || stylingPackage === void 0 ? void 0 : stylingPackage.name) === 'unistyles') {
            const unistylesFiles = [
                'packages/unistyles/components/Container.tsx.ejs',
                'packages/unistyles/components/ScreenContent.tsx.ejs',
                'packages/unistyles/components/EditScreenInfo.tsx.ejs',
                'packages/unistyles/breakpoints.ts.ejs',
                'packages/unistyles/theme.ts.ejs',
                'packages/unistyles/unistyles.ts.ejs'
            ];
            files = [...files, ...unistylesFiles];
        }
        // add react navigation files if needed
        // modify base files with react navigation specifications
        if ((navigationPackage === null || navigationPackage === void 0 ? void 0 : navigationPackage.name) === 'react-navigation') {
            let reactNavigationFiles = [
                'packages/react-navigation/App.tsx.ejs',
                'packages/react-navigation/navigation/index.tsx.ejs'
            ];
            // add the necessary components for the navigation
            if ((stylingPackage === null || stylingPackage === void 0 ? void 0 : stylingPackage.name) === 'restyle') {
                reactNavigationFiles.push('packages/restyle/components/Button.tsx.ejs');
                reactNavigationFiles.push('packages/restyle/components/BackButton.tsx.ejs');
            }
            else if ((stylingPackage === null || stylingPackage === void 0 ? void 0 : stylingPackage.name) === 'nativewind') {
                reactNavigationFiles.push('packages/nativewind/components/Button.tsx.ejs');
                reactNavigationFiles.push('packages/nativewind/components/BackButton.tsx.ejs');
            }
            else if ((stylingPackage === null || stylingPackage === void 0 ? void 0 : stylingPackage.name) === 'unistyles') {
                reactNavigationFiles.push('packages/unistyles/components/Button.tsx.ejs');
                reactNavigationFiles.push('packages/unistyles/components/BackButton.tsx.ejs');
            }
            else if ((stylingPackage === null || stylingPackage === void 0 ? void 0 : stylingPackage.name) === 'tamagui') {
                reactNavigationFiles.push('packages/tamagui/components/Button.tsx.ejs');
                reactNavigationFiles.push('packages/tamagui/components/BackButton.tsx.ejs');
            }
            else {
                reactNavigationFiles.push('base/components/Button.tsx.ejs');
                reactNavigationFiles.push('base/components/BackButton.tsx.ejs');
            }
            // if it's a stack, add the stack files) {
            if (((_d = navigationPackage === null || navigationPackage === void 0 ? void 0 : navigationPackage.options) === null || _d === void 0 ? void 0 : _d.type) === 'stack') {
                reactNavigationFiles = [
                    ...reactNavigationFiles,
                    'packages/react-navigation/screens/details.tsx.ejs',
                    'packages/react-navigation/screens/overview.tsx.ejs'
                ];
            }
            else if (((_e = navigationPackage === null || navigationPackage === void 0 ? void 0 : navigationPackage.options) === null || _e === void 0 ? void 0 : _e.type) === 'tabs') {
                // it's a tab navigator
                reactNavigationFiles = [
                    ...reactNavigationFiles,
                    'packages/react-navigation/navigation/tab-navigator.tsx.ejs',
                    'packages/react-navigation/screens/modal.tsx.ejs',
                    'packages/react-navigation/screens/one.tsx.ejs',
                    'packages/react-navigation/screens/two.tsx.ejs'
                ];
                // add the necessary components for the navigation
                reactNavigationFiles.push('base/components/TabBarIcon.tsx.ejs');
                reactNavigationFiles.push('base/components/HeaderButton.tsx.ejs');
            }
            else if (((_f = navigationPackage === null || navigationPackage === void 0 ? void 0 : navigationPackage.options) === null || _f === void 0 ? void 0 : _f.type) === 'drawer + tabs') {
                // it's a drawer navigator
                reactNavigationFiles = [
                    ...reactNavigationFiles,
                    'packages/react-navigation/navigation/drawer-navigator.tsx.ejs',
                    'packages/react-navigation/navigation/tab-navigator.tsx.ejs',
                    'packages/react-navigation/screens/home.tsx.ejs',
                    'packages/react-navigation/screens/modal.tsx.ejs',
                    'packages/react-navigation/screens/one.tsx.ejs',
                    'packages/react-navigation/screens/two.tsx.ejs'
                ];
                // add the necessary components for the navigation
                reactNavigationFiles.push('base/components/TabBarIcon.tsx.ejs');
                reactNavigationFiles.push('base/components/HeaderButton.tsx.ejs');
            }
            // Remove the base App.tsx.ejs file since we'll be using the one from react-navigation
            files = files.filter((file) => file !== 'base/App.tsx.ejs');
            files = [...files, ...reactNavigationFiles];
        }
        // add expo router files if needed
        // modify base files with expo router specifications
        if ((navigationPackage === null || navigationPackage === void 0 ? void 0 : navigationPackage.name) === 'expo-router') {
            let expoRouterFiles = ['packages/expo-router/expo-env.d.ts', 'packages/expo-router/metro.config.js.ejs'];
            if ((stylingPackage === null || stylingPackage === void 0 ? void 0 : stylingPackage.name) === 'restyle') {
                expoRouterFiles.push('packages/restyle/components/Button.tsx.ejs');
            }
            else if ((stylingPackage === null || stylingPackage === void 0 ? void 0 : stylingPackage.name) === 'nativewind') {
                expoRouterFiles.push('packages/nativewind/components/Button.tsx.ejs');
            }
            else if ((stylingPackage === null || stylingPackage === void 0 ? void 0 : stylingPackage.name) === 'unistyles') {
                expoRouterFiles.push('packages/unistyles/components/Button.tsx.ejs');
            }
            else if ((stylingPackage === null || stylingPackage === void 0 ? void 0 : stylingPackage.name) === 'tamagui') {
                expoRouterFiles.push('packages/tamagui/components/Button.tsx.ejs');
            }
            else if ((stylingPackage === null || stylingPackage === void 0 ? void 0 : stylingPackage.name) === 'stylesheet') {
                expoRouterFiles.push('base/components/Button.tsx.ejs');
            }
            // if it's a stack, add the stack files) {
            if (((_g = navigationPackage === null || navigationPackage === void 0 ? void 0 : navigationPackage.options) === null || _g === void 0 ? void 0 : _g.type) === 'stack') {
                expoRouterFiles = [
                    ...expoRouterFiles,
                    'packages/expo-router/stack/app/_layout.tsx.ejs',
                    'packages/expo-router/stack/app/details.tsx.ejs',
                    'packages/expo-router/stack/app/index.tsx.ejs',
                    'packages/expo-router/stack/app/+not-found.tsx.ejs',
                    'packages/expo-router/stack/app/+html.tsx.ejs'
                ];
                // add the necessary components for the navigation
            }
            else if (((_h = navigationPackage === null || navigationPackage === void 0 ? void 0 : navigationPackage.options) === null || _h === void 0 ? void 0 : _h.type) === 'tabs') {
                // it's a tab navigator
                expoRouterFiles = [
                    ...expoRouterFiles,
                    'packages/expo-router/tabs/app/(tabs)/_layout.tsx.ejs',
                    'packages/expo-router/tabs/app/(tabs)/index.tsx.ejs',
                    'packages/expo-router/tabs/app/(tabs)/two.tsx.ejs',
                    'packages/expo-router/tabs/app/_layout.tsx.ejs',
                    'packages/expo-router/tabs/app/modal.tsx.ejs',
                    'packages/expo-router/tabs/app/+not-found.tsx.ejs',
                    'packages/expo-router/tabs/app/+html.tsx.ejs'
                ];
                // add the necessary components for the navigation
                expoRouterFiles.push('base/components/TabBarIcon.tsx.ejs');
                expoRouterFiles.push('base/components/HeaderButton.tsx.ejs');
            }
            else {
                // it's a drawer + tabs navigator
                expoRouterFiles = [
                    ...expoRouterFiles,
                    'packages/expo-router/drawer/app/_layout.tsx.ejs',
                    'packages/expo-router/drawer/app/+not-found.tsx.ejs',
                    'packages/expo-router/drawer/app/+html.tsx.ejs',
                    'packages/expo-router/drawer/app/(drawer)/_layout.tsx.ejs',
                    'packages/expo-router/drawer/app/(drawer)/index.tsx.ejs',
                    'packages/expo-router/drawer/app/(drawer)/(tabs)/_layout.tsx.ejs',
                    'packages/expo-router/drawer/app/(drawer)/(tabs)/index.tsx.ejs',
                    'packages/expo-router/drawer/app/(drawer)/(tabs)/two.tsx.ejs',
                    'packages/expo-router/drawer/app/modal.tsx.ejs'
                ];
                // add the necessary components for the navigation
                expoRouterFiles.push('base/components/TabBarIcon.tsx.ejs');
                expoRouterFiles.push('base/components/HeaderButton.tsx.ejs');
            }
            // Remove the base App.tsx.ejs file since we'll be using index.tsx from expo-router
            files = files.filter((file) => file !== 'base/App.tsx.ejs');
            files = [...files, ...expoRouterFiles];
        }
        // add supabase files if needed
        if ((authenticationPackage === null || authenticationPackage === void 0 ? void 0 : authenticationPackage.name) === 'supabase') {
            const supabaseFiles = ['packages/supabase/utils/supabase.ts.ejs', 'packages/supabase/.env.ejs'];
            files = [...files, ...supabaseFiles];
        }
        // add supabase files if needed
        if ((authenticationPackage === null || authenticationPackage === void 0 ? void 0 : authenticationPackage.name) === 'firebase') {
            const firebaseFiles = [
                'packages/firebase/utils/firebase.ts.ejs',
                'packages/firebase/metro.config.js.ejs',
                'packages/firebase/.env.ejs'
            ];
            files = [...files, ...firebaseFiles];
        }
        // add vexo analytics files if needed
        if ((analyticsPackage === null || analyticsPackage === void 0 ? void 0 : analyticsPackage.name) == 'vexo-analytics') {
            const vexoFiles = ['packages/vexo-analytics/.env.ejs'];
            files = [...files, ...vexoFiles];
        }
        // add i18next files if needed
        if ((internalizationPackage === null || internalizationPackage === void 0 ? void 0 : internalizationPackage.name) === 'i18next') {
            const i18nextFiles = [
                'packages/i18next/core/i18n/fallbackChecker.ts.ejs',
                'packages/i18next/core/i18n/init.ts.ejs',
                'packages/i18next/core/i18n/languageDetector.ts.ejs',
                'packages/i18next/translation/en.json.ejs',
                'packages/i18next/translation/fr.json.ejs',
                'packages/i18next/translation/index.ts.ejs',
                'packages/i18next/components/InternalizationExample.tsx.ejs'
            ];
            files = [...files, ...i18nextFiles];
        }
    }
    // Add npmrc file if user is using pnpm
    if (packageManager === 'pnpm') {
        files.push('base/.npmrc.ejs');
    }
    const packageManagerVersion = (0, getPackageManager_1.getVersionForPackageManager)(cliResults.flags.packageManager);
    const cesConfig = Object.assign(Object.assign({ 
        // Add the version of create expo stack used
        cesVersion: require('../../package.json').version || '2.0.0' }, cliResults), { packageManager: {
            type: cliResults.flags.packageManager,
            version: packageManagerVersion
        }, os: {
            type: os_1.default.type(),
            platform: os_1.default.platform(),
            arch: os_1.default.arch(),
            kernelVersion: os_1.default.release()
        } });
    toolbox.filesystem.write(`./${cliResults.projectName}/cesconfig.json`, JSON.stringify(cesConfig, null, 2));
    const pkg = require('../../package.json');
    (0, configAnalytics_1.storeConfigAnalytics)({
        timestamp: new Date().toISOString(),
        cesVersion: pkg.version,
        authType: authenticationPackage === null || authenticationPackage === void 0 ? void 0 : authenticationPackage.name,
        navigationLibrary: navigationPackage === null || navigationPackage === void 0 ? void 0 : navigationPackage.name,
        navigationType: (_j = navigationPackage === null || navigationPackage === void 0 ? void 0 : navigationPackage.options) === null || _j === void 0 ? void 0 : _j.type,
        stylingLibrary: stylingPackage === null || stylingPackage === void 0 ? void 0 : stylingPackage.name,
        packageManager: cliResults.flags.packageManager,
        packageManagerVersion,
        internalization: internalizationPackage === null || internalizationPackage === void 0 ? void 0 : internalizationPackage.name,
        nativeWindUIComponents: (_k = stylingPackage === null || stylingPackage === void 0 ? void 0 : stylingPackage.options) === null || _k === void 0 ? void 0 : _k.selectedComponents,
        eas: cliResults.flags.eas,
        importAlias: cliResults.flags.importAlias,
        noGit: cliResults.flags.noGit,
        noInstall: cliResults.flags.noInstall,
        overwrite: cliResults.flags.overwrite,
        os: os_1.default.type(),
        osPlatform: os_1.default.platform(),
        osArch: os_1.default.arch(),
        osRelease: os_1.default.release(),
        analytics: analyticsPackage === null || analyticsPackage === void 0 ? void 0 : analyticsPackage.name
    });
    return files;
}
exports.configureProjectFiles = configureProjectFiles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJlUHJvamVjdEZpbGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxpdGllcy9jb25maWd1cmVQcm9qZWN0RmlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsNENBQW9CO0FBV3BCLDJEQUFxRjtBQUNyRix1REFBeUQ7QUFFekQsU0FBZ0IscUJBQXFCLENBQ25DLHFCQUFvRCxFQUNwRCxLQUFlLEVBQ2YsaUJBQWdELEVBQ2hELGNBQTZDLEVBQzdDLGdCQUErQyxFQUMvQyxPQUFnQixFQUNoQixVQUFzQixFQUN0QixzQkFBcUQ7O0lBRXJELDJEQUEyRDtJQUMzRCxJQUFJLFNBQVMsR0FBRztRQUNkLHdCQUF3QjtRQUN4QixtQkFBbUI7UUFDbkIsa0JBQWtCO1FBQ2xCLDBCQUEwQjtRQUMxQix1QkFBdUI7UUFDdkIscUJBQXFCO1FBQ3JCLDZCQUE2QjtLQUM5QixDQUFDO0lBRUYsSUFBSSxDQUFBLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxJQUFJLE1BQUssWUFBWSxFQUFFLENBQUM7UUFDMUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFDM0IsbUNBQW1DO1lBQ25DLHVDQUF1QztZQUN2Qyx3Q0FBd0M7U0FDekMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU0sY0FBYyxHQUFHLElBQUEscUNBQWlCLEVBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBRTlELElBQUksQ0FBQSxjQUFjLGFBQWQsY0FBYyx1QkFBZCxjQUFjLENBQUUsSUFBSSxNQUFLLGNBQWMsRUFBRSxDQUFDO1FBQzVDLElBQUksaUJBQWlCLEdBQUc7WUFDdEIsd0JBQXdCO1lBQ3hCLG1CQUFtQjtZQUNuQiwwQkFBMEI7WUFDMUIsdUJBQXVCO1lBQ3ZCLHFCQUFxQjtZQUNyQiw2QkFBNkI7WUFDN0IsMENBQTBDO1lBQzFDLHFEQUFxRDtZQUNyRCxpREFBaUQ7WUFDakQsb0RBQW9E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