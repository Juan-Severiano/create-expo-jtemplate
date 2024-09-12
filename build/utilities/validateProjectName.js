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
exports.validateProjectName = void 0;
const prompts_1 = require("@clack/prompts");
function validateProjectName(exists, removeAsync, prompt, projectName, overwrite) {
    return __awaiter(this, void 0, void 0, function* () {
        const s = (0, prompts_1.spinner)();
        if (!exists(projectName)) {
            return;
        }
        if (overwrite) {
            yield removeAsync(projectName);
            return;
        }
        const shouldDeleteExistingProject = yield (0, prompts_1.confirm)({
            message: `A folder with the name '${projectName}' already exists. Do you want to delete it?`,
            initialValue: true
        });
        if ((0, prompts_1.isCancel)(shouldDeleteExistingProject)) {
            (0, prompts_1.cancel)('Cancelled... 👋');
            return process.exit(0);
        }
        if (shouldDeleteExistingProject) {
            s.start('Deleting existing project. This may take a minute...');
            yield removeAsync(projectName);
            s.stop(`Deleted existing directory: ${projectName}`);
            return;
        }
        throw new Error(`A project with the name '${projectName}' already exists.`);
    });
}
exports.validateProjectName = validateProjectName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGVQcm9qZWN0TmFtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvdmFsaWRhdGVQcm9qZWN0TmFtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBb0U7QUFJcEUsU0FBc0IsbUJBQW1CLENBQ3ZDLE1BQXNDLEVBQ3RDLFdBQTZDLEVBQzdDLE1BQTRCLEVBQzVCLFdBQW1CLEVBQ25CLFNBQWtCOztRQUVsQixNQUFNLENBQUMsR0FBRyxJQUFBLGlCQUFPLEdBQUUsQ0FBQztRQUVwQixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUM7WUFDekIsT0FBTztRQUNULENBQUM7UUFFRCxJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQ2QsTUFBTSxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFL0IsT0FBTztRQUNULENBQUM7UUFFRCxNQUFNLDJCQUEyQixHQUFHLE1BQU0sSUFBQSxpQkFBTyxFQUFDO1lBQ2hELE9BQU8sRUFBRSwyQkFBMkIsV0FBVyw2Q0FBNkM7WUFDNUYsWUFBWSxFQUFFLElBQUk7U0FDbkIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxJQUFBLGtCQUFRLEVBQUMsMkJBQTJCLENBQUMsRUFBRSxDQUFDO1lBQzFDLElBQUEsZ0JBQU0sRUFBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQzFCLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixDQUFDO1FBRUQsSUFBSSwyQkFBMkIsRUFBRSxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxLQUFLLENBQUMsc0RBQXNELENBQUMsQ0FBQztZQUNoRSxNQUFNLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUMsSUFBSSxDQUFDLCtCQUErQixXQUFXLEVBQUUsQ0FBQyxDQUFDO1lBQ3JELE9BQU87UUFDVCxDQUFDO1FBRUQsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsV0FBVyxtQkFBbUIsQ0FBQyxDQUFDO0lBQzlFLENBQUM7Q0FBQTtBQXJDRCxrREFxQ0MifQ==