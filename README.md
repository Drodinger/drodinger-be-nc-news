# Northcoders News API

##Running nc_news locally
You will need to define your own enviroment variables for databases
You will require two databases: nc_news (for development) and nc_news_test (for testing)
For each database you would like to connect you must:

* Create a .env. file for each database:
	development database: .env.database
	test database: .env.test
* Inside the file add a line setting the environment variable: 
	development database:

	``` 
    PGDATABASE=nc_news
	```

	test database:

	```
    PGDATABASE=nc_news_test
	```
