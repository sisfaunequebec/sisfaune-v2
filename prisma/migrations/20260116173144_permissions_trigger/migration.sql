CREATE OR REPLACE FUNCTION create_permissions_for_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO admin_x_utilisateur_programme (id_utilisateur, id_programme)
    SELECT NEW.id, id
    FROM lut_evenement_programme;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_ai_user_create_permissions_for_user
AFTER INSERT ON auth_utilisateur
FOR EACH ROW
EXECUTE FUNCTION create_permissions_for_user();