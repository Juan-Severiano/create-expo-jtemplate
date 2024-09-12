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
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeConfigAnalytics = void 0;
const google_auth_library_1 = require("google-auth-library");
const googleapis_1 = require("googleapis");
const key_data = 'eyJ0eXBlIjoic2VydmljZV9hY2NvdW50IiwicHJvamVjdF9pZCI6ImNyZWF0ZS1leHBvLXN0YWNrLWFuYWx5dGljcyIsInByaXZhdGVfa2V5X2lkIjoiNTdmZTc1OThmYTRkM2NkNWNhN2E0MmU4OGM1ZWYwMzdjODljNDI3NiIsInByaXZhdGVfa2V5IjoiLS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tXG5NSUlFdkFJQkFEQU5CZ2txaGtpRzl3MEJBUUVGQUFTQ0JLWXdnZ1NpQWdFQUFvSUJBUURndnl6TTV3cFMrUnJRXG5hRmJBZmhwRU15dnhQK1IxV1p6Ykx1Nm1QblpsOVNvZmVHK0hHejdHWWNoZ29ScU9iaEk0MERpL1ZmblA0MVpEXG5kQVZTYXhMSlZSdm9ESHlEUkxRQzcrRE5TWWFEWlRSMXpIdGl6Z2M4UUhxbjV0Qmt0YXdWdWc5ZkhBUFk0MmtBXG4xcjlhdmttakNoM2sxSTNxdFhlbVlUQWt5Z09FZXVLbzJzbmptajcyNUZLRDBRREJKSlVhYnVyd3RrR1doV3pKXG5LaEd6YlNlb0JIeGJMemNlUDlGang1RFlTdW5oS2E1blFXdGRzS2dwdlgzSGthZEU2V0NYQjg1ZHd4MytHVGRVXG5ybnFUSTRRVWpWRHV3SnFaOEpWUEZjYUF2L0dlbHdUT1VGNGNROFQ4VWVadGtHUzN2L1hlRmROL1BTZGZYM0tZXG5CNVEwdXNtREFnTUJBQUVDZ2dFQU9KK0J5b2dGSGwxN1ozbDZMZG8zaE9vOWpuVVIrb3pleTR3Wi9WRnNaQWl1XG5HYXF1c3FQbkgzVWdWbFFRakVUb0cxOCtoTnBFNjU3enExL3VQVk1Uc3h6WndJOXd5V1BFVko4YURLNlRFTVN0XG5RR2FKeVoxdHpqelNpajNKVUM1RFVtQURvbXM4L3VaZ25LRCtLZjhhTDFVTHJnenRTbTU0M0RiTk9kK1pua1VjXG5zeDYzVXVQNmdVY0tiVDRhTVl3Wk5mL3BzUW9SMkdwaXdSQjhQd3hzS0x1Uk5qcC8rTHZuYXV4dkRvY1hvbHFRXG41UHFFYi9pOFlKMlJ3alI2THBUc3FIdWtIZ056ZytOci9JQnpUWDR5Y0V2OWh6bWw4VzVGOGRDd1IzQkYyV05XXG52VmFYZVRNY1ZFcWcxWS9TMDd0UUMrTlFuWHlFY0pSOGRVcW8zQU1qTVFLQmdRRDFkbE54TXlXYnRVSDZPaWx2XG4rbXF2OWdkSVZ1eVJWeEtydG9PcVlqd2gzWEVYZW9seU9Selhac0hvNlQ5b0NpZnRpenBQOXFmYkNWYVAzdk1BXG43OWl3cE4vUE1QY1NoeWtnR2RyR1ArRUY3ODV0amtLQ2dmSE9PbUxUbEp5Z3psdTFuUU1vcTcwOGdoeXd6MEtmXG5tekc4OVlHQ1RmaTMvSmQ5MWN3WU5IRHhrd0tCZ1FEcVpTN0ZYNEt2cjlpWll0Vko4VDRHNE0zUVJ2dWJRMUFoXG5Yd0ZVN2JDUzJ1M294cktlZnJPTFlCTHJsbXQ0Qk1tL2NLMVNteHBndHZrdEQ3WFVtcVdrUGRnRUhGaUxjcHoxXG5XS0tTKytpRHE4SXplZzUxMFBkcVAwbVNlY1R6cHk1V2hmMHJwTi9vVDY0YVJnVUVmaEZtZHdVYWZRcnlOY1B1XG5uMWlEa0loK1VRS0JnSEJWODhBbHdUdHVpOEJoNTk3b2d2VCtxcnlQazNxOGw3M2dMSWZJcDI1ME1yS2xFTXdtXG5tUzEzU0owNFNoMXFNSFhGTnkyclc0eWh6R3pSZ3ZMVjBaeWVDQk9CZkVHTmUrUEdFVnFUbDM4cERaY1QrUnBUXG5MLy9LdHJuUUZKSi9mbmN5WVdTMm5FZFo0Sm1HY1I0c1gybjBEWTQ5OHVyNC9iZklKYnlhRzJwakFvR0FkRG9DXG5EQ3JGRWJyZmE0ZWZmWS9iRXV3TUFqZ0FjVWZhaHdHbUZtZmFRNmU5aXN4a0s4Vmw0RG1laUNWSld2VDgyU25WXG5OLzNqQVl3WldLZk9vUUtpR2lQMFptMXIxcEhabEtzRHltQ1JOaUZJSmVCakpUYWVTSmZqTW5laEdyU09mS2JxXG5GK2NrZy94bXQyNTY5SFJTeW4xQUVaZHBneHIzOGU0ZnBQVlpTVkVDZ1lBWkw2K0pTdXoxY3BsaXloQ3lJU2NXXG5RWEFTMTNiRXMvbHd6MjhZT3ltN2JnMzVzZjdhOFBPMjBocGNPWnVERERySlpjME9LbG9tNXQzSHYxUDIreWNOXG5NczFQbnBqRjFEYlZ6ZFBDcm8xTkxKdTk4eEVYNWJXSXRDUkF1Q1hKUS90MWVKL3d6TThjbGhLYnRYVGdQTHl4XG5mSnViMERTWFpqUmtYUFNDcU0yb0t3PT1cbi0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS1cbiIsImNsaWVudF9lbWFpbCI6ImNlcy1hbmFseXRpY3NAY3JlYXRlLWV4cG8tc3RhY2stYW5hbHl0aWNzLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwiY2xpZW50X2lkIjoiMTEyMjg4MzM5NDYxNTA5NDM0MTcwIiwiYXV0aF91cmkiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvYXV0aCIsInRva2VuX3VyaSI6Imh0dHBzOi8vb2F1dGgyLmdvb2dsZWFwaXMuY29tL3Rva2VuIiwiYXV0aF9wcm92aWRlcl94NTA5X2NlcnRfdXJsIjoiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vb2F1dGgyL3YxL2NlcnRzIiwiY2xpZW50X3g1MDlfY2VydF91cmwiOiJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9yb2JvdC92MS9tZXRhZGF0YS94NTA5L2Nlcy1hbmFseXRpY3MlNDBjcmVhdGUtZXhwby1zdGFjay1hbmFseXRpY3MuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJ1bml2ZXJzZV9kb21haW4iOiJnb29nbGVhcGlzLmNvbSJ9';
const keys = Buffer.from(key_data, 'base64').toString('utf-8');
function storeConfigAnalytics(_a) {
    return __awaiter(this, arguments, void 0, function* ({ timestamp, cesVersion, authType, internalization, nativeWindUIComponents = [], navigationLibrary, navigationType, packageManager, packageManagerVersion, stylingLibrary, eas, importAlias, noGit, noInstall, overwrite, os, osPlatform, osArch, osRelease, analytics }) {
        var _b;
        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
            console.log('Skipping analytics in development or test environment');
            return;
        }
        try {
            const auth = new google_auth_library_1.GoogleAuth({
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
                credentials: JSON.parse(keys)
            });
            const service = googleapis_1.google.sheets({ version: 'v4', auth });
            yield service.spreadsheets.values.append({
                spreadsheetId: '1Nav_XXi8stJjaBBK8bX0CebRF5QKXU25BZc57I06yGQ',
                range: 'Sheet1!A:A',
                valueInputOption: 'RAW',
                requestBody: {
                    values: [
                        [
                            timestamp !== null && timestamp !== void 0 ? timestamp : '',
                            cesVersion !== null && cesVersion !== void 0 ? cesVersion : '',
                            navigationLibrary !== null && navigationLibrary !== void 0 ? navigationLibrary : '',
                            navigationType !== null && navigationType !== void 0 ? navigationType : '',
                            stylingLibrary !== null && stylingLibrary !== void 0 ? stylingLibrary : '',
                            packageManager,
                            packageManagerVersion !== null && packageManagerVersion !== void 0 ? packageManagerVersion : '',
                            internalization !== null && internalization !== void 0 ? internalization : '',
                            (_b = nativeWindUIComponents === null || nativeWindUIComponents === void 0 ? void 0 : nativeWindUIComponents.join(',')) !== null && _b !== void 0 ? _b : '',
                            authType !== null && authType !== void 0 ? authType : '',
                            eas ? 'true' : 'false',
                            importAlias ? 'true' : 'false',
                            noGit ? 'true' : 'false',
                            noInstall ? 'true' : 'false',
                            overwrite ? 'true' : 'false',
                            os !== null && os !== void 0 ? os : '',
                            osPlatform !== null && osPlatform !== void 0 ? osPlatform : '',
                            osArch !== null && osArch !== void 0 ? osArch : '',
                            osRelease !== null && osRelease !== void 0 ? osRelease : '',
                            analytics !== null && analytics !== void 0 ? analytics : ''
                        ]
                    ]
                },
                insertDataOption: 'INSERT_ROWS'
            });
            // return result;
        }
        catch (err) {
            console.warn('analytics API returned an error: ' + err);
        }
    });
}
exports.storeConfigAnalytics = storeConfigAnalytics;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnQW5hbHl0aWNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxpdGllcy9jb25maWdBbmFseXRpY3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsNkRBQWlEO0FBQ2pELDJDQUFvQztBQWFwQyxNQUFNLFFBQVEsR0FDWixza0dBQXNrRyxDQUFDO0FBRXprRyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7QUFFL0QsU0FBc0Isb0JBQW9CO3lEQUFDLEVBQ3pDLFNBQVMsRUFDVCxVQUFVLEVBQ1YsUUFBUSxFQUNSLGVBQWUsRUFDZixzQkFBc0IsR0FBRyxFQUFFLEVBQzNCLGlCQUFpQixFQUNqQixjQUFjLEVBQ2QsY0FBYyxFQUNkLHFCQUFxQixFQUNyQixjQUFjLEVBQ2QsR0FBRyxFQUNILFdBQVcsRUFDWCxLQUFLLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDVCxFQUFFLEVBQ0YsVUFBVSxFQUNWLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQWlCVTs7UUFDbkIsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxhQUFhLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFLENBQUM7WUFDOUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO1lBQ3JFLE9BQU87UUFDVCxDQUFDO1FBRUQsSUFBSSxDQUFDO1lBQ0gsTUFBTSxJQUFJLEdBQUcsSUFBSSxnQ0FBVSxDQUFDO2dCQUMxQixNQUFNLEVBQUUsQ0FBQyw4Q0FBOEMsQ0FBQztnQkFDeEQsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQzlCLENBQUMsQ0FBQztZQUVILE1BQU0sT0FBTyxHQUFHLG1CQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBRXZELE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUN2QyxhQUFhLEVBQUUsOENBQThDO2dCQUM3RCxLQUFLLEVBQUUsWUFBWTtnQkFDbkIsZ0JBQWdCLEVBQUUsS0FBSztnQkFDdkIsV0FBVyxFQUFFO29CQUNYLE1BQU0sRUFBRTt3QkFDTjs0QkFDRSxTQUFTLGFBQVQsU0FBUyxjQUFULFNBQVMsR0FBSSxFQUFFOzRCQUNmLFVBQVUsYUFBVixVQUFVLGNBQVYsVUFBVSxHQUFJLEVBQUU7NEJBQ2hCLGlCQUFpQixhQUFqQixpQkFBaUIsY0FBakIsaUJBQWlCLEdBQUksRUFBRTs0QkFDdkIsY0FBYyxhQUFkLGNBQWMsY0FBZCxjQUFjLEdBQUksRUFBRTs0QkFDcEIsY0FBYyxhQUFkLGNBQWMsY0FBZCxjQUFjLEdBQUksRUFBRTs0QkFDcEIsY0FBYzs0QkFDZCxxQkFBcUIsYUFBckIscUJBQXFCLGNBQXJCLHFCQUFxQixHQUFJLEVBQUU7NEJBQzNCLGVBQWUsYUFBZixlQUFlLGNBQWYsZUFBZSxHQUFJLEVBQUU7NEJBQ3JCLE1BQUEsc0JBQXNCLGFBQXRCLHNCQUFzQix1QkFBdEIsc0JBQXNCLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQ0FBSSxFQUFFOzRCQUN2QyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFOzRCQUNkLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPOzRCQUN0QixXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTzs0QkFDOUIsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU87NEJBQ3hCLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPOzRCQUM1QixTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTzs0QkFDNUIsRUFBRSxhQUFGLEVBQUUsY0FBRixFQUFFLEdBQUksRUFBRTs0QkFDUixVQUFVLGFBQVYsVUFBVSxjQUFWLFVBQVUsR0FBSSxFQUFFOzRCQUNoQixNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFOzRCQUNaLFNBQVMsYUFBVCxTQUFTLGNBQVQsU0FBUyxHQUFJLEVBQUU7NEJBQ2YsU0FBUyxhQUFULFNBQVMsY0FBVCxTQUFTLEdBQUksRUFBRTt5QkFDaEI7cUJBQ0Y7aUJBQ0Y7Z0JBQ0QsZ0JBQWdCLEVBQUUsYUFBYTthQUNoQyxDQUFDLENBQUM7WUFFSCxpQkFBaUI7UUFDbkIsQ0FBQztRQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDYixPQUFPLENBQUMsSUFBSSxDQUFDLG1DQUFtQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzFELENBQUM7SUFDSCxDQUFDO0NBQUE7QUF4RkQsb0RBd0ZDIn0=