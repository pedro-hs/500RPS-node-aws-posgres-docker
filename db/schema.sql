CREATE TABLE countries (
    id CHAR(2) PRIMARY KEY,  -- ISO 3166-1 alpha-2
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE vehicle_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE traffic_events (
    id BIGSERIAL PRIMARY KEY,
    country_id CHAR(2) NOT NULL,
    vehicle_type_id INTEGER NOT NULL,
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT fk_traffic_events_country
        FOREIGN KEY (country_id)
        REFERENCES countries(id),

    CONSTRAINT fk_traffic_events_vehicle_type
        FOREIGN KEY (vehicle_type_id)
        REFERENCES vehicle_types(id)
);

CREATE INDEX idx_traffic_events_country_time ON traffic_events (country_id, occurred_at);
CREATE INDEX idx_traffic_events_vehicle_time ON traffic_events (vehicle_type_id, occurred_at);

CREATE TABLE country_traffic_total (
    country_id CHAR(2) PRIMARY KEY REFERENCES countries(id),
    total BIGINT NOT NULL DEFAULT 0
);

CREATE TABLE vehicle_type_total (
    vehicle_type_id INTEGER PRIMARY KEY REFERENCES vehicle_types(id),
    total BIGINT NOT NULL DEFAULT 0
);
