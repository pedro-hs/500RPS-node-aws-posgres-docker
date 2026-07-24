WITH event AS (
    INSERT INTO traffic_events (country_id, vehicle_type_id)
    VALUES (:countryId, :vehicleTypeId)
    RETURNING id, country_id AS "countryId", vehicle_type_id AS "vehicleTypeId", occurred_at AS "occurredAt"
),
country_summary AS (
    INSERT INTO country_traffic_total (country_id, total)
    VALUES (:countryId, 1)
    ON CONFLICT (country_id) DO UPDATE SET total = country_traffic_total.total + 1
),
vehicle_summary AS (
    INSERT INTO vehicle_type_total (vehicle_type_id, total)
    VALUES (:vehicleTypeId, 1)
    ON CONFLICT (vehicle_type_id) DO UPDATE SET total = vehicle_type_total.total + 1
)
SELECT id, "countryId", "vehicleTypeId", "occurredAt" FROM event;
