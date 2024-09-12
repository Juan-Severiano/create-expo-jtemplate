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
exports.copyBaseAssets = void 0;
function copyBaseAssets(projectName, toolbox) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield toolbox.filesystem.copyAsync(toolbox.filesystem.path(toolbox.plugin.directory, 'templates', 'base/assets'), toolbox.filesystem.path(projectName, 'assets'), {
            overwrite: true
        });
    });
}
exports.copyBaseAssets = copyBaseAssets;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weUJhc2VBc3NldHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbGl0aWVzL2NvcHlCYXNlQXNzZXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVBLFNBQXNCLGNBQWMsQ0FBQyxXQUFtQixFQUFFLE9BQWdCOztRQUN4RSxPQUFPLE1BQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQ3ZDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxhQUFhLENBQUMsRUFDN0UsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxFQUM5QztZQUNFLFNBQVMsRUFBRSxJQUFJO1NBQ2hCLENBQ0YsQ0FBQztJQUNKLENBQUM7Q0FBQTtBQVJELHdDQVFDIn0=