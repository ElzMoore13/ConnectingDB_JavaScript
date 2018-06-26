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

const input = process.argv;
const fName = input[2];
const lName = input[3];
const bDate = process.argv.slice(4).join(' ');

knex.insert({
  id: 6,
  first_name: fName,
  last_name: lName,
  birthdate: bDate
}).into('famous_people')


knex.select().from('famous_people').then(function(results) {
  printResults(results)

  knex.destroy();
})
/*


takes in the first name, last name and date of a famous person as three command line arguments and uses Knex to perform an insert.

// returns [] in "postgresql" unless the 'returning' parameter is set.

knex('books').insert({title: 'Slaughterhouse Five'})

// returns [2, 3] in "postgresql"
//
knex.insert([{title: 'Great Gatsby'}, {title: 'Fahrenheit 451'}], 'id').into('books')

Outputs:
insert into "books" ("title") values ('Slaughterhouse Five')

*/
