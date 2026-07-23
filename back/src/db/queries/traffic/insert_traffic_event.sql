INSERT INTO traffic_events (country_id, vehicle_type_id)
VALUES (:countryId, :vehicleTypeId)
RETURNING id, country_id AS "countryId", vehicle_type_id AS "vehicleTypeId", occured_at AS "occuredAt";
