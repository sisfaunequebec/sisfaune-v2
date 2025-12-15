CREATE OR REPLACE FUNCTION create_results_for_specimen()
RETURNS TRIGGER AS $$
BEGIN

    INSERT INTO data_resultat (id_specimen, id_analyse, valeur)
    SELECT
        NEW.id,
        la.id,
        la.valeur_defaut
    FROM 
        x_evenement_groupeanalyse xeag
    JOIN 
        lut_analyse_groupe lag ON lag.id = xeag.id_analyse_groupe
    JOIN
        lut_analyse la ON la.id_analyse_groupe = lag.id
    WHERE 
        xeag.id_evenement = NEW.id_evenement
    ON CONFLICT (id_specimen, id_analyse) DO NOTHING;
    
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER trg_ai_specimen_create_results_for_specimen
AFTER INSERT ON data_specimen
FOR EACH ROW
EXECUTE FUNCTION create_results_for_specimen();

CREATE OR REPLACE FUNCTION update_results_for_group_change()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO data_resultat (id_specimen, id_analyse, valeur)
    SELECT
        s.id AS id_specimen,
        la.id AS id_analyse,
        la.valeur_defaut
    FROM 
        data_specimen s
    JOIN 
        lut_analyse la ON la.id_analyse_groupe = NEW.id_analyse_groupe
    WHERE 
        s.id_evenement = NEW.id_evenement
    ON CONFLICT (id_specimen, id_analyse) DO NOTHING;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_ai_x_evenement_groupeanalyse_update_results_for_group_change
AFTER INSERT ON x_evenement_groupeanalyse
FOR EACH ROW
EXECUTE FUNCTION update_results_for_group_change();

CREATE OR REPLACE FUNCTION delete_results_for_group_removal()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM data_resultat r
    WHERE 
        r.id_specimen IN (
            SELECT s.id
            FROM data_specimen s
            WHERE s.id_evenement = OLD.id_evenement
        )
    AND
        r.id_analyse IN (
            SELECT id
            FROM lut_analyse la
            WHERE id_analyse_groupe = OLD.id_analyse_groupe
        );
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_ad_x_evenement_groupeanalyse_delete_results_for_group_removal
AFTER DELETE ON x_evenement_groupeanalyse
FOR EACH ROW
EXECUTE FUNCTION delete_results_for_group_removal();

CREATE OR REPLACE FUNCTION create_results_for_new_analysis()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO data_resultat (id_specimen, id_analyse, valeur)
    SELECT
       	s.id AS id_specimen,
        NEW.id AS id_analyse,
        NEW.valeur_defaut
    FROM 
        data_specimen s
    JOIN 
       	x_evenement_groupeanalyse xeag ON xeag.id_evenement = s.id_evenement
    WHERE 
        xeag.id_analyse_groupe = NEW.id_analyse_groupe
    ON CONFLICT (id_specimen, id_analyse) DO NOTHING;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_ai_analysis_create_results_for_new_analysis
AFTER INSERT ON lut_analyse
FOR EACH ROW
EXECUTE FUNCTION create_results_for_new_analysis();