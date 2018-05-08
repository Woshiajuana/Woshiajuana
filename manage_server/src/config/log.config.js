
const config = {
    appenders: {
        console: {
            type: 'console',
        },
        app: {
            type: 'file',
            filename: 'logs/app/app.log',
            maxLogSize: 10485760,
            numBackups: 5,
        },
        system: {
            type: 'dateFile',
            filename: 'logs/system/system',
            pattern: '_yyyy_MM_dd.log',
            alwaysIncludePattern: true,
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
                'console',
                'system',
            ],
            level: 'debug'
        },
        app: {
            appenders: [
                'console',
                'app',
            ],
            level: 'info'
        },
        system: {
            appenders: [
                'console',
                'app',
                'system'
            ],
            level: 'info'
        },
        http: {
            appenders: [
                'console',
                'app',
                'http'
            ],
            level: 'info'
        },
        db: {
            appenders: [
                'console',
                'app',
                'db'
            ],
            level: 'info'
        }
    },
    replaceConsole: true,
};

export default config;
