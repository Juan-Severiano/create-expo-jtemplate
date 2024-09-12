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
exports.run = void 0;
const gluegun_1 = require("gluegun");
/**
 * Create the cli and kick it off
 */
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const argv = process.env.argv;
        // create a CLI runtime
        const cli = (0, gluegun_1.build)()
            .brand('create-expo-stack')
            .src(__dirname)
            .plugins('./node_modules', {
            matching: 'create-expo-stack-*',
            hidden: true
        })
            .version() // provides default for version, v, --version, -v
            .create();
        // enable the following method if you'd like to skip loading one of these core extensions
        // this can improve performance if they're not necessary for your project:
        // .exclude(['meta', 'strings', 'print', 'filesystem', 'semver', 'system', 'prompt', 'http', 'template', 'patching', 'package-manager'])
        // and run it
        const toolbox = yield cli.run(argv);
        // send it back (for testing, mostly)
        return toolbox;
    });
}
exports.run = run;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBZ0M7QUFFaEM7O0dBRUc7QUFDSCxTQUFzQixHQUFHOztRQUN2QixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztRQUM5Qix1QkFBdUI7UUFDdkIsTUFBTSxHQUFHLEdBQUcsSUFBQSxlQUFLLEdBQUU7YUFDaEIsS0FBSyxDQUFDLG1CQUFtQixDQUFDO2FBQzFCLEdBQUcsQ0FBQyxTQUFTLENBQUM7YUFDZCxPQUFPLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixNQUFNLEVBQUUsSUFBSTtTQUNiLENBQUM7YUFDRCxPQUFPLEVBQUUsQ0FBQyxpREFBaUQ7YUFDM0QsTUFBTSxFQUFFLENBQUM7UUFDWix5RkFBeUY7UUFDekYsMEVBQTBFO1FBQzFFLHdJQUF3STtRQUN4SSxhQUFhO1FBQ2IsTUFBTSxPQUFPLEdBQUcsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXBDLHFDQUFxQztRQUNyQyxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0NBQUE7QUFwQkQsa0JBb0JDIn0=