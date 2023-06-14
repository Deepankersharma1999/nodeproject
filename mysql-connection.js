
// get data table from mysql

const mysql = require('mysql');
var con = mysql.createConnection
  ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb'
    // database:'testing'

  });

con.connect(function (error) {
  if (error) throw error;
  console.log("connecected")

  // creating database
  // con.query("CREATE DATABASE mydb", function (err, result) {
  //   if (err) throw err;
  //   console.log("Database created");
  // });






  // creating table

  // var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Table created");
  // });



  //insert into singal data
  //   var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("1 record inserted");
  // });



  //insert into many data

  // var sql = "INSERT INTO customers (name, address) VALUES ?";
  // var values =
  //   [
  //     ['John', 'Highway 71'],
  //     ['Peter', 'Lowstreet 4'],
  //     ['Amy', 'Apple st 652'],
  //     ['Hannah', 'Mountain 21'],
  //     ['Michael', 'Valley 345'],
  //     ['Sandy', 'Ocean blvd 2'],
  //     ['Betty', 'Green Grass 1'],
  //     ['Richard', 'Sky st 331'],
  //     ['Susan', 'One way 98'],
  //     ['Vicky', 'Yellow Garden 2'],
  //     ['Ben', 'Park Lane 38'],
  //     ['William', 'Central st 954'],
  //     ['Chuck', 'Main Road 989'],
  //     ['Viola', 'Sideway 1633']
  //   ];
  // con.query(sql, [values], function (err, result) {
  //   if (err) throw err;
  //   console.log("Number of records inserted: " + result.affectedRows);
  // });





///////////////////////////////////////My sql Insert into////////////////////////////////////////


  //Ans-Insert a record in the "customers" table, and return the ID: singal data add krne k liye hai
  //(jo data insert kra hai index num show kregA bas.....

  // var sql = "INSERT INTO customers (name, address) VALUES ('pandat sachin', ' Villager')";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("2 record inserted, ID: " + result.insertId);
  // });



/////////////////////////////////////////My sql Select From///////////////////////////////////////

//Selecting From a table to
//Ans- select data from a table in my sql,use the "SELECT"statement...

// con.query("SELECT * FROM customers", function (err, result, fields) 
// {
//   if (err) throw err;
//   console.log(result);
// });



//Selecting coloums in my sql with "Select">> Statement
// con.query("SELECT name, address FROM customers", function (err, result, fields) 
//{
//   if (err) throw err;
//   console.log(result[12].address);//isme hume id number dena hota hai search k liye in array form
// });





// The Fields Object (isme hume humare table k heading name miljaty hai or unke data types)

// con.query("SELECT name, address FROM customers", function (err, result, fields) 
// {
//   if (err) throw err;
//   console.log(fields[0].name);
// });



//////////////////////////////////////////My sql Where///////////////////////////////////////////


//Select With a Filter
//When selecting records from a table, you can filter the selection by using the "WHERE" statement:
//ANS- isey hum SELECT Wala use krke FR data Filter kr sakte hai...

// con.query("SELECT * FROM customers WHERE address = 'Park Lane 39'", function (err, result) {
//   if (err) throw err;
//   console.log(result);
// });




//Wildcard Characters
//You can also select the records that starts, includes, or ends with a given letter or phrase.
//Use the '%' wildcard to represent zero, one or multiple characters:

//Ans- Wild Card mai LIKE oprator ka tb use kia jata hai jab hme koi b specifide ek Chracter ko search karna hai..
//jaise table mai sam hai mtlb 3 word ka name h to or s se name h sabke to s__ double underscore ka use karke search
//kar sakte hai or * method ka use jab hota hai jab hume full table select krna ho /or "s%"isme agr pure table mai s name 
//se start jitne name hoge unko utha lega pr in methods ko ek sath b use kar sakte hai diffrent type of data filter 
// or agr hume chaty hai ki a se t tk ka data chiye '[a-t]%' ye hoga ye agr koi particular word chiye to "%sale%"
 //method hote hai like mai..

// con.query("SELECT * FROM customers WHERE address LIKE 'H%'  ", function (err, result) {
//   if (err) throw err;
//   console.log(result);
// });





//Escaping Query Values
//When query values are variables provided by the user, you should escape the values.
//This is to prevent SQL injections, which is a common web hacking technique to destroy or misuse your database.
//The MySQL module has methods to escape query values:

//Ans-Escape ka use tab kia jata hai jab hume sirf voi word chiye exact jaise table mai agr hume search karna hai
// ki 50% he likha dikhe or jo sirf 50 likhe hai vo na aaye  '50=%%'='; ye kya karega jisme table data mia 50% k sign
// ka use hua hoga voi dega or hum isey or b oprators k sath use kar sakte hai like '50?%%'ESCAPE'?'; iske use krege.
//or humne isme isko var= declare karke dhunda hai

// var adrress = 'Green Grass 1';
// var sql = 'SELECT * FROM customers WHERE address = ' + mysql.escape(adrress);
// con.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log(result);
// });




///////////////////////////////////////my sql order by//////////////////////////////////////////

//sort by name in accending order with ORDER BY method

// con.query("SELECT * FROM customers ORDER BY name", function (err, result) {
//   if (err) throw err;
//   console.log(result);
// });





//Sort by Name in decending order with ORDER BY

// con.query("SELECT * FROM customers ORDER BY name DESC", function (err, result) {
//   if (err) throw err;
//   console.log(result);
// });




///////////////You can delete records from an existing table by using the "DELETE FROM" statement://///////////

//Delete any record with the address "Mountain 21":
// var sql = "DELETE FROM customers WHERE address = 'Mountain 21'";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Number of records deleted: " + result.affectedRows);
//   });



///////////////////////////////////DROP TABLE ///////////////////////////////

//You can delete an existing table by using the "DROP TABLE" statement:

// var sql = "UNDO TABLE customers";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table deleted");
//   });
//ANS- sabse bekar hai MEra Table Delet hogya\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\




//Delete the table "customers" if it exists:
//Delete statementa ka use karke hum table k andr ka existing data ko delet kar sakte hai
// var sql = "DROP TABLE IF EXISTS customers";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log(result);
//   });



/////////////////Update Table You can update existing records in a table by using the "UPDATE" statement:///////////

// var sql = "UPDATE customers SET address = 'Valley 345' WHERE address = 'Canyon 123'";
// con.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log(result.affectedRows + " record(s) updated");
// });

//Ans- isme hum kisi b ek singal value ko change kar sakte hai isme value set karni hoti hai pehle
//uske bad jisey replace karni hai usey




///////////////////////////////////MY sql LIMIT method/////////////////////////////

//Select the 5 first records in the "customers" table:
//You can limit the number of records returned from the query, by using the "LIMIT" statement:

// var sql = "SELECT * FROM customers LIMIT 5";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log(result);
//   });

//Ans- isme hum limit method k through starting se 5 tk data show kraya hai ..



//Start from Another Position agar 3  data se shuru hoga fr uske 5 tk print kra loge "OFFSET" k through
// var sql = "SELECT * FROM customers LIMIT 5 OFFSET 2";
// con.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log(result);
// });





/////////////////////////////////////////////////////////////////































  // ye upr sabse phele  ki hai jo dirct humne mysql mai bnaya tha...sabse phele table lo get kia tha..
  // con.query('select*from registration',(function(err,result) {

  //     if(err)throw err;
  //     console.warn('all result here',result);

  // }))


  
























})
module.exports = con;







