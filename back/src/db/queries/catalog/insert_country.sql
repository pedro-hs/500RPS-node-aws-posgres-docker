INSERT INTO countries (id, name)
VALUES (:id, :name)
RETURNING id, name;
