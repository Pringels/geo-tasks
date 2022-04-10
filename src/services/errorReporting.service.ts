/**
 * Logs errors to console. Should eventually be connected to Sentry (or similar)
 */

export const errorReportingService = {
    logError: (error: Error) => {
        console.error(error)
    },
    logWarning: (warning: any) => {
        console.log(warning)
    },
}
