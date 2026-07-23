INSERT INTO vehicle_types (name)
VALUES (:name)
RETURNING id, name;
