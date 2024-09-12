import { Toolbox } from 'gluegun/build/types/domain/toolbox';
import { AvailablePackages, CliResults } from '../types';
export declare function configureProjectFiles(authenticationPackage: AvailablePackages | undefined, files: string[], navigationPackage: AvailablePackages | undefined, stylingPackage: AvailablePackages | undefined, analyticsPackage: AvailablePackages | undefined, toolbox: Toolbox, cliResults: CliResults, internalizationPackage: AvailablePackages | undefined): string[];
