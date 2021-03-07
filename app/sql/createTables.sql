START TRANSACTION;

DROP TABLE IF EXISTS Listings;

CREATE TABLE Listings (
    listing_id SERIAL UNIQUE NOT NULL PRIMARY KEY,

    owner_name VARCHAR(30),
    owner_phone_num VARCHAR(30),
    price NUMERIC(16, 2),
    latitude NUMERIC(16) NOT NULL,
    longitude NUMERIC(16) NOT NULL,
    info VARCHAR(255),
    sell_date DATE
);

DROP TABLE IF EXISTS Student;

CREATE TABLE Student(
    student_id SERIAL UNIQUE NOT NULL PRIMARY KEY,
    student_needPlace VARCHAR(30),
    student_moveDate DATE,
    student_moveLocation VARCHAR(30),
    student_name VARCHAR(30),
    student_email VARCHAR(30),
    student_phone_num VARCHAR(30),
    student_password VARCHAR(30),
    student_description VARCHAR(120),
    student_houseType VARCHAR(30),
    student_beds NUMERIC(16) NOT NULL,
    student_bath NUMERIC (16) NOT NULL,
    student_price NUMERIC(16, 2) NOT NULL,
    student_birthday DATE
)

COMMIT;
