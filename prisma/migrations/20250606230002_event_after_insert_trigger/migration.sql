CREATE OR REPLACE FUNCTION insert_location_from_event()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO data_localisation(id_evenement) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_ai_event_insert_location_from_event
AFTER INSERT ON data_evenement
FOR EACH ROW
EXECUTE FUNCTION insert_location_from_event();
