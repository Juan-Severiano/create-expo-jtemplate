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
exports.runSystemCommand = exports.ONLY_ERRORS = void 0;
exports.ONLY_ERRORS = ['ignore', 'ignore', 'inherit'];
function runSystemCommand(_a) {
    return __awaiter(this, arguments, void 0, function* ({ command, errorMessage, stdio, toolbox, shell = true, env }) {
        const { print: { error }, system } = toolbox;
        const result = yield system.spawn(command, {
            shell,
            stdio,
            env
        });
        if (result.error || result.status !== 0) {
            error(`${errorMessage}: ${JSON.stringify(result)}`);
            error(`failed to run command: ${command}`);
            return process.exit(1);
        }
    });
}
exports.runSystemCommand = runSystemCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzdGVtQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvc3lzdGVtQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFJYSxRQUFBLFdBQVcsR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFVLENBQUM7QUFFcEUsU0FBc0IsZ0JBQWdCO3lEQUFDLEVBQ3JDLE9BQU8sRUFDUCxZQUFZLEVBQ1osS0FBSyxFQUNMLE9BQU8sRUFDUCxLQUFLLEdBQUcsSUFBSSxFQUNaLEdBQUcsRUFRSjtRQUNDLE1BQU0sRUFDSixLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFDaEIsTUFBTSxFQUNQLEdBQUcsT0FBTyxDQUFDO1FBRVosTUFBTSxNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUN6QyxLQUFLO1lBQ0wsS0FBSztZQUNMLEdBQUc7U0FDSixDQUFDLENBQUM7UUFFSCxJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUN4QyxLQUFLLENBQUMsR0FBRyxZQUFZLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFcEQsS0FBSyxDQUFDLDBCQUEwQixPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBRTNDLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixDQUFDO0lBQ0gsQ0FBQztDQUFBO0FBakNELDRDQWlDQyJ9