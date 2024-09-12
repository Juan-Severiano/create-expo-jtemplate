"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function clearNavigationPackages(cliResults) {
    const stylingPackageIndex = cliResults.packages.findIndex((p) => p.type === 'navigation');
    if (stylingPackageIndex !== -1) {
        cliResults.packages.splice(stylingPackageIndex, 1);
    }
    return cliResults;
}
exports.default = clearNavigationPackages;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYXJOYXZpZ2F0aW9uUGFja2FnZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbGl0aWVzL2NsZWFyTmF2aWdhdGlvblBhY2thZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsU0FBd0IsdUJBQXVCLENBQUMsVUFBc0I7SUFDcEUsTUFBTSxtQkFBbUIsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxZQUFZLENBQUMsQ0FBQztJQUMxRixJQUFJLG1CQUFtQixLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDL0IsVUFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUNELE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUM7QUFORCwwQ0FNQyJ9