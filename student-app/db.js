const oracledb = require('oracledb');

const dbConfig = {
    user: "system",
    password: "system123",
    connectString: "127.0.0.1:1521/xepdb1"
};

async function getConnection() {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        return connection;
    } catch (err) {
        console.error("DB Connection Error:", err);
        throw err;
    }
}

module.exports = { getConnection };
