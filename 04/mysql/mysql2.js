// (async () => {
//   const mysql = require("mysql");
//   // 连接设置
//   const cfg = {
//     host: "localhost",
//     user: "kaikeba_admin",
//     password: "admin",
//     database: "kaikeba",
//   };

//   const connection = await mysql.createConnection(cfg);

//   let ret = await connection.execute(`
//   CREATE TABLE IF NOT EXISTS test (
//       id INT NOT NULL AUTO_INCREMENT,
//       message VARCHAR(45) NULL,
//       PRIMARY KEY (id))`);

//   console.log("create: ", ret);
// })();

// (async () => {
//   // get the client
//   const mysql = require("mysql");
//   // 连接配置
//   const cfg = {
//     host: "localhost",
//     user: "kaikeba_admin",
//     password: "admin",
//     // 修改为你的密码
//     database: "kaikeba",
//     // 请确保数据库存在
//   };
//   // create the connection
//   const connection = await mysql.createConnection(cfg);
//   // 查询 conn.query()
//   // 创建表
//   const CREATE_SQL = `CREATE TABLE IF NOT EXISTS test (
//     id INT NOT NULL AUTO_INCREMENT,
//     message VARCHAR(45) NULL,
//     PRIMARY KEY (id))`;
//   const INSERT_SQL = `INSERT INTO test(message) VALUES(?)`;
//   const SELECT_SQL = `SELECT * FROM test`;

//   // query database
//   let ret = await connection.execute(CREATE_SQL);
//   console.log("create:", ret);
//   ret = await connection.execute(INSERT_SQL, ["abc"]);
//   console.log("insert:", ret);
//   const [rows, fields] = await connection.execute(SELECT_SQL);
//   console.log("select:", rows);
// })();

// mysql.js
const mysql = require("mysql");
// 连接配置
const cfg = {
  host: "localhost",
  user: "kaikeba_admin",
  password: "admin",
  // 修改为你的密码
  database: "kaikeba",
  // 请确保数据库存在
};
// 创建连接对象
const conn = mysql.createConnection(cfg);
// 连接
conn.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("连接成功！");
  }
});
// 查询 conn.query()
// 创建表
const CREATE_SQL = `CREATE TABLE IF NOT EXISTS test (
  id INT NOT NULL AUTO_INCREMENT,
  message VARCHAR(45) NULL,
  PRIMARY KEY (id))`;

const INSERT_SQL = `INSERT INTO test(message) VALUES(?)`;
const SELECT_SQL = `SELECT * FROM test`;
conn.query(CREATE_SQL, (err) => {
  if (err) {
    throw err;
  }
  // 插⼊入数据
  conn.query(INSERT_SQL, "hello,world", (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    conn.query(SELECT_SQL, (err, results) => {
      console.log(results);
      conn.end();
      // 若query语句句有嵌套，则end需在此执⾏行行
    });
  });
});
