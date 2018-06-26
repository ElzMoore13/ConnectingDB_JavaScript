const pg = require('pg');
const settings = require('./settings')

const client = new pg.Client ({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

const searchKey = process.argv.slice(2);
console.log("Searching...");

const printResults = function(results){
  let i = 1;
  for(result of results.rows){
    let stringBirth = String(result.birthdate);
    let year = stringBirth.slice(11,15);
    let month = stringBirth.slice(4, 7);
    let day = stringBirth.slice(8, 10);
    console.log(`-${i}: ${result.name}, born '${year}-${month}-${day}'`);
    i ++;
    }
}

client.connect((err) => {
  if (err) {
    return console.error("Connect Error: ", err);
  }
  client.query(`SELECT first_name || ' ' || last_name AS name, birthdate  FROM famous_people WHERE first_name = '` + searchKey + `'`, (err, results) => {
    if (err) {
      return console.error("error running query: ", err);
    } else {

      let numResults = results.rows.length;

      if(numResults === 0){
        console.log(`Found no results for person(s) by the name: '${searchKey}'`);
      } else {
        console.log(`Found ${numResults} person(s) by the name '${searchKey}':`);
        printResults(results);
      }

    //console.log(result);
    client.end();
    }
  });
})



/* OUTPUT should be:

node lookup_people.js Paul
Searching ...
Found 2 person(s) by the name 'Paul':
- 1: Paul Rudd, born '1969-04-06'
- 2: Paul Giamatti, born '1967-06-06'

*/
