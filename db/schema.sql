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
    country_id INTEGER NOT NULL,
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

CREATE TABLE country_traffic_daily (
    country_id INTEGER NOT NULL,
    date DATE NOT NULL,
    total BIGINT NOT NULL DEFAULT 0,
    PRIMARY KEY (country_id, date),

    CONSTRAINT fk_country_traffic_daily_country
        FOREIGN KEY (country_id)
        REFERENCES countries(id)
);

CREATE TABLE vehicle_type_daily (
    vehicle_type_id INTEGER NOT NULL,
    date DATE NOT NULL,
    total BIGINT NOT NULL DEFAULT 0,
    PRIMARY KEY (vehicle_type_id, date),

    CONSTRAINT fk_vehicle_type_daily_vehicle_type
        FOREIGN KEY (vehicle_type_id)
        REFERENCES vehicle_types(id)
);
