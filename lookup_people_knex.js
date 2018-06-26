const settings = require('./settings')
const pg = require('pg');

var knex = require('knex')({
  client: 'pg',
  connection: {
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.hostname,
    port: settings.port,
    ssl: settings.ssl
  }
});

const searchKey = process.argv.slice(2);
console.log("Searching...");

const printResults = function(results){
  let i = 1;
  for(result of results){
    let stringBirth = String(result.birthdate);
    let year = stringBirth.slice(11,15);
    let month = stringBirth.slice(4, 7);
    let day = stringBirth.slice(8, 10);
    console.log(`-${i}: ${result.first_name} ${result.last_name}, born '${year}-${month}-${day}'`);
    i ++;
    }
}

knex.where({
  first_name: String(searchKey)})
  .select('first_name',
          'last_name',
          'birthdate')
  .from('famous_people')
  .then(function(results) {

    let numResults = results.length
    if(numResults === 0){
      console.log(`Found no results for person(s) by the name: '${searchKey}'`);
    } else {
      printResults(results)
    }

    knex.destroy();
});


// client.connect((err) => {
//   if (err) {
//     return console.error("Connect Error: ", err);
//   }
//
//   client.query(query, (err, results) => {
//     if (err) {
//       return console.error("error running query: ", err);
//     } else {
//
//
//       let numResults = results.rows.length;
//
//       if(numResults === 0){
//         console.log(`Found no results for person(s) by the name: '${searchKey}'`);
//       } else {
//         console.log(`Found ${numResults} person(s) by the name '${searchKey}':`);
//         printResults(results);
//       }
//
//     //console.log(result);
//     client.end();
//     }
//   });
// })




/* EXAMPLE:

knex({ a: 'table', b: 'table' })
.select({
  aTitle: 'a.title',
  bTitle: 'b.title'
})
.whereRaw('?? = ??', ['a.column_1', 'b.column_2'])
Outputs: select `a`.`title` as `aTitle`, `b`.`title` as `bTitle` from `table` as `a`, `table` as `b` where `a`.`column_1` = `b`.`column_2

*/


/* OUTPUT should be:

node lookup_people.js Paul
Searching ...
Found 2 person(s) by the name 'Paul':
- 1: Paul Rudd, born '1969-04-06'
- 2: Paul Giamatti, born '1967-06-06'

*/
