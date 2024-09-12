"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bunInstallationError = exports.projectNameValidationError = exports.navigationValidationError = exports.nativeWindUIOptions = exports.defaultOptions = exports.DEFAULT_APP_NAME = exports.TITLE_TEXT = void 0;
exports.TITLE_TEXT = 'create expo stack';
exports.DEFAULT_APP_NAME = 'my-expo-app';
exports.defaultOptions = {
    projectName: exports.DEFAULT_APP_NAME,
    packages: [],
    flags: {
        noGit: false,
        noInstall: false,
        overwrite: false,
        importAlias: '~/',
        packageManager: undefined,
        eas: false
    }
};
exports.nativeWindUIOptions = [
    'action-sheet',
    'activity-indicator',
    'activity-view',
    'avatar',
    'bottom-sheet',
    'date-picker',
    'picker',
    'progress-indicator',
    'ratings-indicator',
    'slider',
    'text',
    'toggle'
];
exports.navigationValidationError = `You must pass in either --react-navigation or --expo-router if you want to use the --tabs or --drawer+tabs options`;
exports.projectNameValidationError = `A project with the name`;
exports.bunInstallationError = 'Cancelled to install recommended version of Bun.';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFYSxRQUFBLFVBQVUsR0FBRyxtQkFBbUIsQ0FBQztBQUVqQyxRQUFBLGdCQUFnQixHQUFHLGFBQWEsQ0FBQztBQUVqQyxRQUFBLGNBQWMsR0FBZTtJQUN4QyxXQUFXLEVBQUUsd0JBQWdCO0lBQzdCLFFBQVEsRUFBRSxFQUFFO0lBQ1osS0FBSyxFQUFFO1FBQ0wsS0FBSyxFQUFFLEtBQUs7UUFDWixTQUFTLEVBQUUsS0FBSztRQUNoQixTQUFTLEVBQUUsS0FBSztRQUNoQixXQUFXLEVBQUUsSUFBSTtRQUNqQixjQUFjLEVBQUUsU0FBUztRQUN6QixHQUFHLEVBQUUsS0FBSztLQUNYO0NBQ0YsQ0FBQztBQUVXLFFBQUEsbUJBQW1CLEdBQXlCO0lBQ3ZELGNBQWM7SUFDZCxvQkFBb0I7SUFDcEIsZUFBZTtJQUNmLFFBQVE7SUFDUixjQUFjO0lBQ2QsYUFBYTtJQUNiLFFBQVE7SUFDUixvQkFBb0I7SUFDcEIsbUJBQW1CO0lBQ25CLFFBQVE7SUFDUixNQUFNO0lBQ04sUUFBUTtDQUNULENBQUM7QUFFVyxRQUFBLHlCQUF5QixHQUFHLG9IQUFvSCxDQUFDO0FBQ2pKLFFBQUEsMEJBQTBCLEdBQUcseUJBQXlCLENBQUM7QUFDdkQsUUFBQSxvQkFBb0IsR0FBRyxrREFBa0QsQ0FBQyJ9