"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProjectFiles = void 0;
function generateProjectFiles(authenticationPackage, analyticsPackage, cliResults, files, formattedFiles, navigationPackage, packageManager, stylingPackage, toolbox, internalizationPackage) {
    const { projectName, packages, flags } = cliResults;
    return files.reduce((prev, file) => {
        var _a, _b, _c;
        const template = file;
        let target = file.replace('.ejs', '');
        if ((authenticationPackage === null || authenticationPackage === void 0 ? void 0 : authenticationPackage.name) === 'supabase') {
            target = target.replace('packages/supabase/', '');
        }
        if ((authenticationPackage === null || authenticationPackage === void 0 ? void 0 : authenticationPackage.name) === 'firebase') {
            target = target.replace('packages/firebase/', '');
        }
        target = target.replace('base/', '');
        if ((stylingPackage === null || stylingPackage === void 0 ? void 0 : stylingPackage.name) === 'tamagui') {
            target = target.replace('packages/tamagui/', '');
        }
        else if ((stylingPackage === null || stylingPackage === void 0 ? void 0 : stylingPackage.name) === 'unistyles') {
            target = target.replace('packages/unistyles/', '');
        }
        else if ((stylingPackage === null || stylingPackage === void 0 ? void 0 : stylingPackage.name) === 'nativewind') {
            target = target.replace('packages/nativewind/', '');
        }
        else if ((stylingPackage === null || stylingPackage === void 0 ? void 0 : stylingPackage.name) === 'restyle') {
            target = target.replace('packages/restyle/', '');
        }
        else if ((stylingPackage === null || stylingPackage === void 0 ? void 0 : stylingPackage.name) === 'nativewindui') {
            target = target.replace('packages/nativewindui/', '');
        }
        if ((navigationPackage === null || navigationPackage === void 0 ? void 0 : navigationPackage.name) === 'react-navigation') {
            target = target.replace('packages/react-navigation/App.tsx', 'App.tsx');
            target = target.replace('packages/react-navigation/', '');
        }
        if ((navigationPackage === null || navigationPackage === void 0 ? void 0 : navigationPackage.name) === 'expo-router') {
            target = target.replace('packages/expo-router/', '');
            if (((_a = navigationPackage === null || navigationPackage === void 0 ? void 0 : navigationPackage.options) === null || _a === void 0 ? void 0 : _a.type) === 'stack') {
                target = target.replace('stack/', '');
            }
            if (((_b = navigationPackage === null || navigationPackage === void 0 ? void 0 : navigationPackage.options) === null || _b === void 0 ? void 0 : _b.type) === 'tabs') {
                target = target.replace('tabs/', '');
            }
            if (((_c = navigationPackage === null || navigationPackage === void 0 ? void 0 : navigationPackage.options) === null || _c === void 0 ? void 0 : _c.type) === 'drawer + tabs') {
                target = target.replace('drawer/', '');
            }
        }
        if ((internalizationPackage === null || internalizationPackage === void 0 ? void 0 : internalizationPackage.name) === 'i18next') {
            target = target.replace('packages/i18next/', '');
        }
        if ((analyticsPackage === null || analyticsPackage === void 0 ? void 0 : analyticsPackage.name) === 'vexo-analytics') {
            target = target.replace('packages/vexo-analytics/', '');
        }
        const gen = toolbox.template.generate({
            template,
            target: `./${projectName}/` + target,
            props: {
                authenticationPackage,
                analyticsPackage,
                flags,
                navigationPackage,
                projectName,
                packageManager,
                packages,
                stylingPackage,
                internalizationPackage
            }
        });
        return prev.concat([gen]);
    }, formattedFiles);
}
exports.generateProjectFiles = generateProjectFiles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVQcm9qZWN0RmlsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbGl0aWVzL2dlbmVyYXRlUHJvamVjdEZpbGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLFNBQWdCLG9CQUFvQixDQUNsQyxxQkFBb0QsRUFDcEQsZ0JBQStDLEVBQy9DLFVBQXNCLEVBQ3RCLEtBQWUsRUFDZixjQUFxQixFQUNyQixpQkFBZ0QsRUFDaEQsY0FBOEIsRUFDOUIsY0FBNkMsRUFDN0MsT0FBZ0IsRUFDaEIsc0JBQXFEO0lBRXJELE1BQU0sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxHQUFHLFVBQVUsQ0FBQztJQUVwRCxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUU7O1FBQ2pDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUV0QyxJQUFJLENBQUEscUJBQXFCLGFBQXJCLHFCQUFxQix1QkFBckIscUJBQXFCLENBQUUsSUFBSSxNQUFLLFVBQVUsRUFBRSxDQUFDO1lBQy9DLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLG9CQUFvQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELENBQUM7UUFFRCxJQUFJLENBQUEscUJBQXFCLGFBQXJCLHFCQUFxQix1QkFBckIscUJBQXFCLENBQUUsSUFBSSxNQUFLLFVBQVUsRUFBRSxDQUFDO1lBQy9DLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLG9CQUFvQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELENBQUM7UUFFRCxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFckMsSUFBSSxDQUFBLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxJQUFJLE1BQUssU0FBUyxFQUFFLENBQUM7WUFDdkMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbkQsQ0FBQzthQUFNLElBQUksQ0FBQSxjQUFjLGFBQWQsY0FBYyx1QkFBZCxjQUFjLENBQUUsSUFBSSxNQUFLLFdBQVcsRUFBRSxDQUFDO1lBQ2hELE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELENBQUM7YUFBTSxJQUFJLENBQUEsY0FBYyxhQUFkLGNBQWMsdUJBQWQsY0FBYyxDQUFFLElBQUksTUFBSyxZQUFZLEVBQUUsQ0FBQztZQUNqRCxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN0RCxDQUFDO2FBQU0sSUFBSSxDQUFBLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxJQUFJLE1BQUssU0FBUyxFQUFFLENBQUM7WUFDOUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbkQsQ0FBQzthQUFNLElBQUksQ0FBQSxjQUFjLGFBQWQsY0FBYyx1QkFBZCxjQUFjLENBQUUsSUFBSSxNQUFLLGNBQWMsRUFBRSxDQUFDO1lBQ25ELE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLHdCQUF3QixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFFRCxJQUFJLENBQUEsaUJBQWlCLGFBQWpCLGlCQUFpQix1QkFBakIsaUJBQWlCLENBQUUsSUFBSSxNQUFLLGtCQUFrQixFQUFFLENBQUM7WUFDbkQsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsbUNBQW1DLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDeEUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDNUQsQ0FBQztRQUVELElBQUksQ0FBQSxpQkFBaUIsYUFBakIsaUJBQWlCLHVCQUFqQixpQkFBaUIsQ0FBRSxJQUFJLE1BQUssYUFBYSxFQUFFLENBQUM7WUFDOUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsdUJBQXVCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFBLE1BQUEsaUJBQWlCLGFBQWpCLGlCQUFpQix1QkFBakIsaUJBQWlCLENBQUUsT0FBTywwQ0FBRSxJQUFJLE1BQUssT0FBTyxFQUFFLENBQUM7Z0JBQ2pELE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN4QyxDQUFDO1lBQ0QsSUFBSSxDQUFBLE1BQUEsaUJBQWlCLGFBQWpCLGlCQUFpQix1QkFBakIsaUJBQWlCLENBQUUsT0FBTywwQ0FBRSxJQUFJLE1BQUssTUFBTSxFQUFFLENBQUM7Z0JBQ2hELE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN2QyxDQUFDO1lBQ0QsSUFBSSxDQUFBLE1BQUEsaUJBQWlCLGFBQWpCLGlCQUFpQix1QkFBakIsaUJBQWlCLENBQUUsT0FBTywwQ0FBRSxJQUFJLE1BQUssZUFBZSxFQUFFLENBQUM7Z0JBQ3pELE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN6QyxDQUFDO1FBQ0gsQ0FBQztRQUVELElBQUksQ0FBQSxzQkFBc0IsYUFBdEIsc0JBQXNCLHVCQUF0QixzQkFBc0IsQ0FBRSxJQUFJLE1BQUssU0FBUyxFQUFFLENBQUM7WUFDL0MsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUVELElBQUksQ0FBQSxnQkFBZ0IsYUFBaEIsZ0JBQWdCLHVCQUFoQixnQkFBZ0IsQ0FBRSxJQUFJLE1BQUssZ0JBQWdCLEVBQUUsQ0FBQztZQUNoRCxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxRCxDQUFDO1FBRUQsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFDcEMsUUFBUTtZQUNSLE1BQU0sRUFBRSxLQUFLLFdBQVcsR0FBRyxHQUFHLE1BQU07WUFDcEMsS0FBSyxFQUFFO2dCQUNMLHFCQUFxQjtnQkFDckIsZ0JBQWdCO2dCQUNoQixLQUFLO2dCQUNMLGlCQUFpQjtnQkFDakIsV0FBVztnQkFDWCxjQUFjO2dCQUNkLFFBQVE7Z0JBQ1IsY0FBYztnQkFDZCxzQkFBc0I7YUFDdkI7U0FDRixDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzVCLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQztBQUNyQixDQUFDO0FBcEZELG9EQW9GQyJ9