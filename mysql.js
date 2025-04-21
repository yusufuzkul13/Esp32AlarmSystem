const mysql = require("mysql2/promise");

function GetMySQLCONNECTION() {
    return {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PWD,
        database: process.env.MYSQL_DBNAME,
        connectionLimit: Number(process.env.MYSQL_POOL_MAX) || 10,
        waitForConnections: true,
        queueLimit: 0
    };
}

function secureSQLparams(sqltext, params) {
    for (let i = 0; i < params.length; i++) {
        const el = params[i];
        var val = el.value;
        if (typeof val === "string") {
            val = val.replace(/'/g, "''");
            val = "'" + val + "'";
        }
        sqltext = sqltext.toString().replace(new RegExp("@" + el.name, "g"), val);
    }
    return sqltext.toString();
}

async function runSQLWithPool(sqltext, params = null, callbackfunction) {
    if (!sqltext) {
        console.log("SQL text giriniz");
        return;
    }

    if (params && Array.isArray(params)) {
        sqltext = secureSQLparams(sqltext, params);
    }

    const pool = mysql.createPool(GetMySQLCONNECTION());
    
    try {
        const [rows] = await pool.query(sqltext);
        if (typeof callbackfunction === "function") {
            callbackfunction(null, rows);
        }
        return rows;
    } catch (error) {
        console.error(error);
        if (typeof callbackfunction === "function") {
            callbackfunction(error, null);
        }
        throw error;
    } finally {
        await pool.end();
    }
}

async function runSQLWithPoolMulti(sqltext = [], params = [], names = []) {
    const _Result = {};
    if (sqltext.length === 0) {
        console.log("SQL text giriniz");
        return _Result;
    }

    const pool = mysql.createPool(GetMySQLCONNECTION());
    
    try {
        if (sqltext.length === 1) {
            const [rows] = await pool.query(sqltext[0]);
            return rows;
        } else {
            for (let i = 0; i < sqltext.length; i++) {
                let currentSql = sqltext[i];
                if (params[i]) {
                    currentSql = secureSQLparams(currentSql, params[i]);
                }
                const [rows] = await pool.query(currentSql);
                _Result[names[i] || `result${i}`] = rows;
            }
            return _Result;
        }
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        await pool.end();
    }
}

async function runSQLWithPoolMultiTable(sqltext = [], params = [], names = []) {
    // MySQL'de MSSQL'deki gibi çoklu sonuç setleri yoktur,
    // bu nedenle bu fonksiyon runSQLWithPoolMulti ile aynı şekilde çalışacak
    return runSQLWithPoolMulti(sqltext, params, names);
}

module.exports = {
    runSQLWithPool,
    runSQLWithPoolMulti,
    runSQLWithPoolMultiTable
};