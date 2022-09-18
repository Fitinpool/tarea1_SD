CREATE TABLE IF NOT EXISTS crawler(
	id serial PRIMARY KEY,
	title VARCHAR ( 255 ),
	description VARCHAR ( 255 ),
	keywords VARCHAR ( 255 ),
	url VARCHAR ( 255 )
);

CREATE INDEX ulr_crawler
ON crawler (url)