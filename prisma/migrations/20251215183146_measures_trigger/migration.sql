CREATE OR REPLACE FUNCTION populate_specimen_mesures()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO data_specimen_mesure (
        id_specimen,
        id_type_mesure,
        id_unite
    )
    SELECT
        NEW.id,
	    lamt.id,
        lamt.id_unite_defaut
    FROM lut_animal_mesure_type lamt
    JOIN lut_animal_groupe_v2 lag 
    ON lamt.id_animal_groupe = coalesce(lag.id_parent, lag.id)
    JOIN lut_animal_espece lae 
    ON lae.id_groupe = lag.id
    WHERE lae.id = NEW.id_animal_espece;
        
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Recreate the trigger using the new single-query function
CREATE OR REPLACE TRIGGER trg_ai_specimen_populate_specimen_mesure
AFTER INSERT ON data_specimen
FOR EACH ROW
EXECUTE FUNCTION populate_specimen_mesures();


