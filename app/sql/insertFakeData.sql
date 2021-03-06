START TRANSACTION;

INSERT INTO Listings (owner_name, owner_phone_num, price, latitude, longitude, sell_date) VALUES
('tom', '111-111-1111', 500.00, 87.00, 87.00, NULL),
('bob', '222-222-2222', 1000.00, -87.00, -87.00, NULL);

COMMIT;
