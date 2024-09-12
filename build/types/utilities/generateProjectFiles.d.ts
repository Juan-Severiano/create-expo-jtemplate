import { Toolbox } from 'gluegun/build/types/domain/toolbox';
import { AvailablePackages, CliResults, PackageManager } from '../types';
export declare function generateProjectFiles(authenticationPackage: AvailablePackages | undefined, analyticsPackage: AvailablePackages | undefined, cliResults: CliResults, files: string[], formattedFiles: any[], navigationPackage: AvailablePackages | undefined, packageManager: PackageManager, stylingPackage: AvailablePackages | undefined, toolbox: Toolbox, internalizationPackage: AvailablePackages | undefined): any[];
