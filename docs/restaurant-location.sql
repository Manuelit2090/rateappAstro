-- Ejecutar una vez sobre AppBD para almacenar coordenadas como números.
-- Si las columnas ya existen, omitir las sentencias correspondientes.

ALTER TABLE restaurants
  ADD COLUMN latitude DECIMAL(10, 8) NULL,
  ADD COLUMN longitude DECIMAL(11, 8) NULL;

CREATE INDEX idx_restaurants_coordinates
  ON restaurants (latitude, longitude);