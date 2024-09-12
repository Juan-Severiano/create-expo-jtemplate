import { ExistsResult } from 'fs-jetpack/types';
import { GluegunPrompt } from 'gluegun';
export declare function validateProjectName(exists: (path: string) => ExistsResult, removeAsync: (path?: string) => Promise<void>, prompt: GluegunPrompt | null, projectName: string, overwrite: boolean): Promise<void>;
