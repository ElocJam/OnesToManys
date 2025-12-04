INSERT INTO orders (table_number, server_name, order_timestamp, guest_count, subtotal, tax, total, notes)
VALUES
    ('F7', 'Cole J.', CURRENT_TIMESTAMP, 4, 86.00, 6.88, 92.88, 'Birthday party - bring dessert at end'),
    ('B3', 'Antoinette R.', CURRENT_TIMESTAMP, 2, 45.50, 3.64, 49.14, 'Prefers sides out as app'),
    ('C12', 'Gabe L.', CURRENT_TIMESTAMP, 6, 125.00, 10.00, 135.00, 'Corporate lunch - bring check by 1pm'),
    ('P2', 'Dylan A.', CURRENT_TIMESTAMP, 3, 62.00, 4.96, 66.96, 'NUT ALLERGY'),
    ('F11', 'Cole J.', CURRENT_TIMESTAMP, 1, 28.00, 2.24, 30.24, NULL);

INSERT INTO items (order_id, item_name, item_quantity, item_price, item_status, sides, side_price, item_total, modifiers)
VALUES
    (1, 'Chicken Cutty', 1, 17.00, 'PREP', 'Fries', 3.00, 20.00, 'No Arugula'),
    (1, 'Chicken Cutty', 1, 17.00, 'PREP', 'Chips', 0.00, 17.00, 'Extra Sauce'),
    (1, 'Summer Salad', 1, 15.00, 'READY', 'Grilled Salmon', 8.00, 23.00, 'NUT ALLERGY'),
    (1, 'Coke', 3, 2.99, 'DELIVERED', NULL, NULL, 8.97, NULL);

INSERT INTO items (order_id, item_name, item_quantity, item_price, item_status, sides, side_price, item_total, modifiers)
VALUES
    (2, 'Caesar Salad', 1, 12.99, 'PENDING', NULL, NULL, 12.99, 'Extra Parm Chz'),
    (2, 'Pancake Stack', 1, 14.00, 'PENDING', 'Poached Fruit Syrup', 1.00, 15.00, NULL),
    (2, 'Sun Tea', 2, 4.00, 'DELIVERED', NULL, NULL, 8.00, NULL);

INSERT INTO items (order_id, item_name, item_quantity, item_price, item_status, sides, side_price, item_total, modifiers)
VALUES
    (3, 'Papa Tony''s French Toast', 1, 14.99, 'PREP', NULL, NULL, 14.99, 'Syrup on the side'),
    (3, 'Omelette of the Day', 1, 16.99, 'READY', 'Hashbrowns', 2.00, 18.99, 'Cooked well'),
    (3, 'Espresso Martini', 3, 14.00, 'DELIVERED', NULL, NULL, 42.00, NULL);

INSERT INTO items (order_id, item_name, item_quantity, item_price, item_status, sides, side_price, item_total, modifiers)
VALUES
    (4, 'Biscuits and Gravy', 3, 18.00, 'PREP', 'Add Egg', 2.00, 60.00, 'All three eggs Sunny'),
    (4, 'Grapefruit Hibiscus Margarita', 2, 13.00, 'READY', NULL, NULL, 26.00, 'Salt rim'),
    (4, 'Grapefruit Hibiscus Margarita', 1, 13.00, 'READY', NULL, NULL, 13.00, 'No salt rim');

INSERT INTO items (order_id, item_name, item_quantity, item_price, item_status, sides, side_price, item_total, modifiers)
VALUES
    (5, 'Classic French Toast', 1, 13.99, 'DELIVERED', NULL, NULL, 13.99, NULL),
    (5, 'All Day IPA', 1, 8.00, 'DELIVERED', NULL, NULL, 8.00, NULL);