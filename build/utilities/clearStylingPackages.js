"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function clearStylingPackages(cliResults) {
    const stylingPackageIndex = cliResults.packages.findIndex((p) => p.type === 'styling');
    if (stylingPackageIndex !== -1) {
        cliResults.packages.splice(stylingPackageIndex, 1);
    }
    return cliResults;
}
exports.default = clearStylingPackages;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYXJTdHlsaW5nUGFja2FnZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbGl0aWVzL2NsZWFyU3R5bGluZ1BhY2thZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsU0FBd0Isb0JBQW9CLENBQUMsVUFBc0I7SUFDakUsTUFBTSxtQkFBbUIsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQztJQUN2RixJQUFJLG1CQUFtQixLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDL0IsVUFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUNELE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUM7QUFORCx1Q0FNQyJ9