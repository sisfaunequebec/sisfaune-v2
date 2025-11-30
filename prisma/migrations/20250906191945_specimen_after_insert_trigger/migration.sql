CREATE OR REPLACE FUNCTION update_specimen_sequential_id()
   RETURNS TRIGGER
   LANGUAGE PLPGSQL
AS
$$
DECLARE
   seq integer;
BEGIN
	SELECT COALESCE(max(id_sequentiel), 0) + 1 AS max_id_sequentiel
	INTO seq
	FROM data_specimen
	WHERE id_evenement = NEW.id_evenement
	GROUP BY id_evenement;
	
	UPDATE data_specimen
	SET id_sequentiel = seq
	WHERE id = NEW.id;
	
   	RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER trg_ai_specimen_update_specimen_sequential_id
AFTER INSERT ON data_specimen
FOR EACH ROW
EXECUTE PROCEDURE update_specimen_sequential_id();
