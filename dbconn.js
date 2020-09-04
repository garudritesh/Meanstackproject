const Promise = require("bluebird");
const mysql = require("mysql");

Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

const DB_CONFIG = {
  host: "localhost",
  user: "root",
  password: "1111",
  database: "onlinecouponsystem",
};
let addUser = async (input) => {
 
  const connection = mysql.createConnection(DB_CONFIG);
  await connection.connectAsync();
  

  let sql =
    "INSERT INTO userRegister1 (username,email,pwd) values (?, ?, ?)";
  await connection.queryAsync(sql, [
    input.username,
    input.email,
    input.pwd,
  ]);

  await connection.endAsync();
};

let checkUser = async (input) => {
 
const connection = mysql.createConnection(DB_CONFIG);
await connection.connectAsync();


let sql1 =
  "select * from userRegister1 where email = ? and pwd = ? ";
  const result = await connection.queryAsync(sql1, [
  input.email,
  input.pwd,
]);


await connection.endAsync();
if(result.length === 0){
  throw new Error("Invalid credentials")
}else{
  return result;
}
};

let checkmail = async (input) => {
 
  const connection = mysql.createConnection(DB_CONFIG);
  await connection.connectAsync();
  console.log(input)

  let sql1 =
    "select * from userRegister1 where email = ?";
    const result = await connection.queryAsync(sql1, [
    input.email
    
  ]);
  
  
  await connection.endAsync();

  console.log(result.length)
  if(result.length === 1){
    throw new Error("Invalid credentials")
  }
  };

  let addtocart = async (input) => {
 
    const connection = mysql.createConnection(DB_CONFIG);
    await connection.connectAsync();
    
  
    let sql =
      "INSERT INTO cart (productname,couponcode,discount,id) values (?, ?, ?,?)";
    await connection.queryAsync(sql, [
      input.productname,
      input.couponcode,
      input.discount,
      input.id
    ]);
  
    await connection.endAsync();
  };

  let getproduct = async (input) => {
 
    const connection = mysql.createConnection(DB_CONFIG);
    await connection.connectAsync();
    
    
    let sql1 =
      "select * from cart where id=? group by productname";
      const result = await connection.queryAsync(sql1,[input.id]);

    await connection.endAsync();
    return result;
    };

    let addcomment = async (input) => {
 
      const connection = mysql.createConnection(DB_CONFIG);
      await connection.connectAsync();
      
    
      let sql =
        "INSERT INTO cantact (firstname,lastname,email,comments) values (?, ?, ?,?)";
      await connection.queryAsync(sql, [
        input.firstname,
        input.lastname,
        input.email,
        input.comments,
      ]);
    
      await connection.endAsync();
    };

    let deletecart = async (input1) => {
 
      const connection = mysql.createConnection(DB_CONFIG);
      await connection.connectAsync();
      
      
      let sql1 =
        "delete from cart where productname = ? and id=?" ;
        const result = await connection.queryAsync(sql1,[input1.input,input1.id]);
  
      await connection.endAsync();
    
      };

      let checkForgotUser = async (input) => {
 
        const connection = mysql.createConnection(DB_CONFIG);
        await connection.connectAsync();
        
        
        let sql1 =
          "select * from userRegister1 where email = ? ";
          const result = await connection.queryAsync(sql1, [
          input.email
          
        ]);
        
        await connection.endAsync();
        if(result.length === 0){
          throw new Error("Invalid credentials")
        }
        else{
          return result;
        }
        };

module.exports = { addUser , checkUser ,checkmail,addtocart,getproduct,addcomment,deletecart,checkForgotUser};