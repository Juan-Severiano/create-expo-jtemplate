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
exports.loadConfigs = exports.saveConfig = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const CONFIG_DIR = path_1.default.join(os_1.default.homedir(), '.create-expo-stack');
const CONFIG_FILE = path_1.default.join(CONFIG_DIR, 'configurations.json');
const ensureConfigDirExists = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fs_1.promises.mkdir(CONFIG_DIR, { recursive: true });
    }
    catch (error) {
        if (error.code !== 'EEXIST') {
            throw error;
        }
    }
});
const saveConfig = (config) => __awaiter(void 0, void 0, void 0, function* () {
    yield ensureConfigDirExists();
    const configs = yield (0, exports.loadConfigs)();
    yield fs_1.promises.writeFile(CONFIG_FILE, JSON.stringify([...configs, config], null, 2));
});
exports.saveConfig = saveConfig;
const loadConfigs = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fs_1.promises.readFile(CONFIG_FILE, 'utf8');
        return JSON.parse(data);
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        }
        throw error;
    }
});
exports.loadConfigs = loadConfigs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnU3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvY29uZmlnU3RvcmFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQkFBb0M7QUFDcEMsZ0RBQXdCO0FBRXhCLDRDQUFvQjtBQUVwQixNQUFNLFVBQVUsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFlBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0FBQ2pFLE1BQU0sV0FBVyxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLHFCQUFxQixDQUFDLENBQUM7QUFPakUsTUFBTSxxQkFBcUIsR0FBRyxHQUFTLEVBQUU7SUFDdkMsSUFBSSxDQUFDO1FBQ0gsTUFBTSxhQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQzVCLE1BQU0sS0FBSyxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDLENBQUEsQ0FBQztBQUVLLE1BQU0sVUFBVSxHQUFHLENBQU8sTUFBaUIsRUFBaUIsRUFBRTtJQUNuRSxNQUFNLHFCQUFxQixFQUFFLENBQUM7SUFDOUIsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFBLG1CQUFXLEdBQUUsQ0FBQztJQUNwQyxNQUFNLGFBQUUsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqRixDQUFDLENBQUEsQ0FBQztBQUpXLFFBQUEsVUFBVSxjQUlyQjtBQUVLLE1BQU0sV0FBVyxHQUFHLEdBQStCLEVBQUU7SUFDMUQsSUFBSSxDQUFDO1FBQ0gsTUFBTSxJQUFJLEdBQUcsTUFBTSxhQUFFLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNwRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDNUIsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDO1FBQ0QsTUFBTSxLQUFLLENBQUM7SUFDZCxDQUFDO0FBQ0gsQ0FBQyxDQUFBLENBQUM7QUFWVyxRQUFBLFdBQVcsZUFVdEIifQ==