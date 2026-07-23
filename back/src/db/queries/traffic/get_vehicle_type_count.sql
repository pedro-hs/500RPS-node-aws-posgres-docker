SELECT v.name AS "vehicleType", t.total::int AS total
FROM vehicle_type_total t
JOIN vehicle_types v ON v.id = t.vehicle_type_id
ORDER BY t.total DESC;
