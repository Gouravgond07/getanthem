module.exports = {
    mongodbConfig: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '27017',
        dbName: process.env.DB_NAME || 'empMeet',
        user: process.env.MONGO_USER || '',
        pass: process.env.MONGO_PASS || '',
        MONGO_ENVIRONMENT: process.env.MONGO_ENVIRONMENT || 'dev'
    },
}