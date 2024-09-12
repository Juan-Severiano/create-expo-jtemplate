import { Toolbox } from 'gluegun/build/types/domain/toolbox';
type STDIO = 'inherit' | 'ignore' | 'pipe' | 'overlapped';
export declare const ONLY_ERRORS: readonly ["ignore", "ignore", "inherit"];
export declare function runSystemCommand({ command, errorMessage, stdio, toolbox, shell, env }: {
    command: string;
    toolbox: Toolbox;
    stdio: readonly [STDIO, STDIO, STDIO] | STDIO | undefined;
    errorMessage: string;
    shell?: boolean;
    env?: Record<string, string>;
}): Promise<never>;
export {};
