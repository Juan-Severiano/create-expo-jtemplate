import { Toolbox } from 'gluegun/build/types/domain/toolbox';
import { CliResults } from '../types';
export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';
export type PackageManagerRunnerX = 'npx' | 'pnpx' | 'yarn dlx' | 'bunx';
export declare function getPackageManager(toolbox: Toolbox, cliResults: CliResults): PackageManager;
export declare function getPackageManagerRunnerX(toolbox: Toolbox, cliResults: CliResults): PackageManagerRunnerX;
export declare function getDefaultPackageManagerVersion(): string;
export declare function getVersionForPackageManager(packageManager: PackageManager): string;
