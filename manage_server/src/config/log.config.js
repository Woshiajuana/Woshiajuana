
const config = {
    appenders: {
        app: {
            type: 'file',
            filename: 'logs/app/app.log',
            maxLogSize: 10485760,
            numBackups: 5,
        },
        system: {
            type: 'dateFile',
            filename: 'logs/system/system',
            pattern: '_yyyy_MM_dd.log'
        },
        http: {
            type: 'dateFile',
            category: 'http',
            filename: 'logs/http/http',
            pattern: '_yyyy_MM_dd.log',
            alwaysIncludePattern: true,
        },
        db: {
            type: 'dateFile',
            category: 'db',
            filename: 'logs/db/db',
            pattern: '_yyyy_MM_dd.log',
            alwaysIncludePattern: true,
        }
    },
    categories: {
        default: {
            appenders: [
                'system'
            ],
            level: 'debug'
        },
        app: {
            appenders: [
                'app',
            ],
            level: 'info'
        },
        system: {
            appenders: [
                'app',
                'system'
            ],
            level: 'info'
        },
        http: {
            appenders: [
                'app',
                'http'
            ],
            level: 'info'
        },
        db: {
            appenders: [
                'app',
                'db'
            ],
            level: 'info'
        }
    },
    replaceConsole: true,
};

export default config;
