INSERT INTO countries (id, name) VALUES
    ('BR', 'Brazil'),
    ('US', 'United States'),
    ('DE', 'Germany'),
    ('JP', 'Japan'),
    ('IN', 'India');

INSERT INTO vehicle_types (name) VALUES
    ('Car'),
    ('Bus'),
    ('Truck'),
    ('Motorcycle'),
    ('Bicycle');

INSERT INTO traffic_events (country_id, vehicle_type_id, occurred_at) VALUES
    ('BR', 1, now() - interval '2 days'),
    ('BR', 1, now() - interval '2 days'),
    ('BR', 2, now() - interval '2 days'),
    ('US', 1, now() - interval '2 days'),
    ('US', 3, now() - interval '2 days'),
    ('DE', 1, now() - interval '1 day'),
    ('DE', 4, now() - interval '1 day'),
    ('JP', 1, now() - interval '1 day'),
    ('JP', 5, now() - interval '1 day'),
    ('IN', 2, now() - interval '1 day'),
    ('BR', 1, now()),
    ('BR', 3, now()),
    ('US', 1, now()),
    ('US', 4, now()),
    ('DE', 2, now());

INSERT INTO country_traffic_total (country_id, total)
SELECT country_id, COUNT(*) AS total
FROM traffic_events
GROUP BY country_id;

INSERT INTO vehicle_type_total (vehicle_type_id, total)
SELECT vehicle_type_id, COUNT(*) AS total
FROM traffic_events
GROUP BY vehicle_type_id;
