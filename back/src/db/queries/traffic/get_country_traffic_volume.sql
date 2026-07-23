SELECT c.name AS country, t.total::int AS total
FROM country_traffic_total t
JOIN countries c ON c.id = t.country_id
ORDER BY t.total DESC;
