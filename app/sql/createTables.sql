START TRANSACTION;

DROP TABLE IF EXISTS Listings;

CREATE TABLE Listings (
    listing_id SERIAL UNIQUE NOT NULL PRIMARY KEY,
    owner_name VARCHAR(30),
    owner_phone_num VARCHAR(30),
    price NUMERIC(16, 2) NOT NULL,
    latitude NUMERIC(16) NOT NULL,
    longitude NUMERIC(16) NOT NULL,
    sell_date DATE
);

COMMIT;
