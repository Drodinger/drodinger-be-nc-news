# Northcoders News API

## About this project

This is a REST-api that stores articles, article topics, users and comments. Associations between these allow for specific information to be gained dependent on endpoint, method and query. 

## See it in action

A hosted version of the API can be found here: https://channel-5-news.onrender.com
Go to /api for a comprehensive list of endpoints.

## Requirements

Node v20.11.1
PostgreSQL v14.10

## Running nc_news locally

1. Clone the repo:
	Https:	
```bash
git clone https://github.com/Drodinger/drodinger-be-nc-news.git
```
SSH:
```bash
git clone git@github.com:Drodinger/drodinger-be-nc-news.git
```

2. Install dependancies: manoeuvre to the top level of your local version of the repo and run:
```bash
npm install
```

3. Setting up environment variables

You will need to define your own enviroment variables for databases
You will require two databases: nc_news (for development) and nc_news_test (for testing)
For each database you must:

* Create a .env. file:
	development database: .env.database
	test database: .env.test
* Inside the file add a line setting the environment variable: 
	development database:

	```bash
    PGDATABASE=nc_news
	```

	test database:

	```bash
    PGDATABASE=nc_news_test
	```
	

4. You are now set up and can move on to seeding your databases

## Seeding database

Your test database will be seeded and torn down before and after each test respectively. 
You will need to have postgres setup for this to work. 
To set up your development database run the following commands:
```bash
npm run setup-dbs
```
```bash
npm run seed
```

## Running tests
The API is created entirely using TDD with Jest.
To run tests use:
```bash
npm test __tests__/endpoints.test.js
```
For the main functionality or to test utilities:
```bash
npm test __tests__/utils.test.js 
```


## Running nc_news in production

1. Fork and clone the repo

2. Setup a postgres server of your choosing

3. Add a .env.production file to the top level of your git repo and place the following into it:
```bash
DATABASE_URL=<URL>
```
   Replace \<URL> with the url of your postgres server and add the file to your .gitignore
	
4. Seed your database by running:
```bash
npm run seed-prod
```

5. Host the app and add the following environment variables: 
	
..*DATABASE_URL  (Equal to the url of your postgres server)
		
..*NODE_ENV	(Equal to the 'production' without the quotes)
		
6. Done! Your version of the app should now be working 🎉 

 
