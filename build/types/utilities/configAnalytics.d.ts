import { Analytics, AuthenticationSelect, CliFlags, Internalization, NavigationSelect, NavigationTypes, PackageManager, SelectedComponents, StylingSelect } from '../types';
export declare function storeConfigAnalytics({ timestamp, cesVersion, authType, internalization, nativeWindUIComponents, navigationLibrary, navigationType, packageManager, packageManagerVersion, stylingLibrary, eas, importAlias, noGit, noInstall, overwrite, os, osPlatform, osArch, osRelease, analytics }: {
    timestamp: string;
    cesVersion: string;
    authType?: AuthenticationSelect;
    navigationLibrary?: NavigationSelect;
    navigationType?: NavigationTypes;
    stylingLibrary?: StylingSelect;
    packageManager: PackageManager;
    packageManagerVersion: string;
    internalization?: Internalization;
    nativeWindUIComponents?: SelectedComponents[];
    os: string;
    osPlatform: string;
    osArch: string;
    osRelease: string;
    analytics: Analytics;
} & Partial<CliFlags>): Promise<void>;
