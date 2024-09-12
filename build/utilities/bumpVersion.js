"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
function bumpVersion(type) {
    if (['major', 'minor', 'patch'].includes(type)) {
        try {
            (0, child_process_1.execSync)(`npm version ${type}`, { stdio: 'inherit' });
            console.log(`${type.charAt(0).toUpperCase() + type.slice(1)} version bumped successfully.`);
        }
        catch (error) {
            console.error(`Error bumping the ${type} version:`, error);
        }
    }
    else {
        console.error('Invalid version type. Please use "major", "minor", or "patch".');
    }
}
// Get the argument from the command line
const versionType = process.argv[2];
bumpVersion(versionType);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVtcFZlcnNpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbGl0aWVzL2J1bXBWZXJzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQXlDO0FBRXpDLFNBQVMsV0FBVyxDQUFDLElBQVk7SUFDL0IsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDL0MsSUFBSSxDQUFDO1lBQ0gsSUFBQSx3QkFBUSxFQUFDLGVBQWUsSUFBSSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQzlGLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsSUFBSSxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0QsQ0FBQztJQUNILENBQUM7U0FBTSxDQUFDO1FBQ04sT0FBTyxDQUFDLEtBQUssQ0FBQyxnRUFBZ0UsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7QUFDSCxDQUFDO0FBRUQseUNBQXlDO0FBQ3pDLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDIn0=