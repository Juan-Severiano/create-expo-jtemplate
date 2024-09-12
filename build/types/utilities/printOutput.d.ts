import { Toolbox } from 'gluegun/build/types/domain/toolbox';
import { AvailablePackages, CliResults } from '../types';
export declare function printOutput(cliResults: CliResults, formattedFiles: any[], toolbox: Toolbox, stylingPackage: AvailablePackages): Promise<void>;
