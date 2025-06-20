CREATE OR REPLACE FUNCTION update_muni_from_xy()
RETURNS TRIGGER AS $$
DECLARE
	id_muni integer;
BEGIN
	SELECT m.id INTO id_muni
	FROM lut_muni_geom g
	JOIN lut_muni m 
	ON g.id_muni = m.id
	WHERE _ST_Within(ST_SetSRID(ST_MakePoint(NEW.longitude, NEW.latitude), 4326), geom);

	NEW.id_muni = id_muni;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_location_before_insert_or_update
BEFORE INSERT OR UPDATE ON data_localisation
FOR EACH ROW
EXECUTE FUNCTION update_muni_from_xy();