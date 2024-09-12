import { CliResults } from '../types';
interface AppConfig {
    name: string;
    cliResults: CliResults;
}
export declare const saveConfig: (config: AppConfig) => Promise<void>;
export declare const loadConfigs: () => Promise<AppConfig[]>;
export {};
