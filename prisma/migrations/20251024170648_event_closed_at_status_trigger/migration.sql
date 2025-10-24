CREATE OR REPLACE FUNCTION event_update_closed_at_date_from_status()
RETURNS TRIGGER 
LANGUAGE plpgsql
AS
$$
    BEGIN
    
    	-- If status has changed (from any value) to "Terminé" and closedAt is not already defined
    	-- set closedAt date to now
  		IF NEW.id_statut = 3 AND (NEW.id_statut <> OLD.id_statut) AND OLD.date_fermeture_dossier IS NULL THEN
				NEW.date_fermeture_dossier = NOW();
				return NEW;
   		END IF;
   		
			-- If status has changed (from any value) to "En cours" and closedAt is not already defined
    	-- set closedAt date to now
  		IF NEW.id_statut = 2 AND (NEW.id_statut <> OLD.id_statut) THEN
				NEW.date_fermeture_dossier = NULL;
				return NEW;
   		END IF;
    
			RETURN NEW;
    END;
$$;

DROP TRIGGER IF EXISTS trg_biu_event_update_closed_at_date_from_status ON data_evenement;

CREATE TRIGGER trg_biu_event_update_closed_at_date_from_status
BEFORE INSERT OR UPDATE ON data_evenement
FOR EACH ROW
EXECUTE FUNCTION event_update_closed_at_date_from_status();