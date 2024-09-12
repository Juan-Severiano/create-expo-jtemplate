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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTitle = void 0;
const figlet_1 = __importDefault(require("figlet"));
const gradient_string_1 = __importDefault(require("gradient-string"));
const constants_1 = require("../constants");
// expo stack orange gradient
const expoStackTheme = {
    orange: '#f97316',
    between: 'f2940f',
    yellow: '#eab308'
};
function renderTitle(toolbox) {
    return __awaiter(this, void 0, void 0, function* () {
        const cesGradient = (0, gradient_string_1.default)(Object.values(expoStackTheme));
        const { print: { error } } = toolbox;
        yield figlet_1.default.text(constants_1.TITLE_TEXT, {
            font: 'Standard',
            horizontalLayout: 'fitted',
            verticalLayout: 'fitted',
            width: 40,
            whitespaceBreak: true
        }, (err, data) => {
            if (err) {
                error('Something went wrong...');
                return;
            }
            console.log(cesGradient.multiline(data));
        });
        // TODO: this is hacky, figure out a way to do this better
        // set timeout for 1 second so that the title can render before the CLI runs
        yield new Promise((resolve) => setTimeout(resolve, 200));
    });
}
exports.renderTitle = renderTitle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyVGl0bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbGl0aWVzL3JlbmRlclRpdGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUE0QjtBQUM1QixzRUFBdUM7QUFFdkMsNENBQTBDO0FBRzFDLDZCQUE2QjtBQUM3QixNQUFNLGNBQWMsR0FBRztJQUNyQixNQUFNLEVBQUUsU0FBUztJQUNqQixPQUFPLEVBQUUsUUFBUTtJQUNqQixNQUFNLEVBQUUsU0FBUztDQUNsQixDQUFDO0FBRUYsU0FBc0IsV0FBVyxDQUFDLE9BQWdCOztRQUNoRCxNQUFNLFdBQVcsR0FBRyxJQUFBLHlCQUFRLEVBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBRTVELE1BQU0sRUFDSixLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFDakIsR0FBRyxPQUFPLENBQUM7UUFFWixNQUFNLGdCQUFNLENBQUMsSUFBSSxDQUNmLHNCQUFVLEVBQ1Y7WUFDRSxJQUFJLEVBQUUsVUFBVTtZQUNoQixnQkFBZ0IsRUFBRSxRQUFRO1lBQzFCLGNBQWMsRUFBRSxRQUFRO1lBQ3hCLEtBQUssRUFBRSxFQUFFO1lBQ1QsZUFBZSxFQUFFLElBQUk7U0FDdEIsRUFDRCxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUNaLElBQUksR0FBRyxFQUFFLENBQUM7Z0JBQ1IsS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7Z0JBRWpDLE9BQU87WUFDVCxDQUFDO1lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUNGLENBQUM7UUFFRiwwREFBMEQ7UUFDMUQsNEVBQTRFO1FBQzVFLE1BQU0sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDO0NBQUE7QUE5QkQsa0NBOEJDIn0=