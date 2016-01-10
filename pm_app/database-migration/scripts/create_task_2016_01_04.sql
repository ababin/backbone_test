CREATE TABLE
    task
    (
        id SERIAL,
        
        name CHARACTER VARYING(50),
                
        description CHARACTER VARYING(4000),
        
        created TIMESTAMP(6) WITHOUT TIME ZONE NOT NULL,
        
        author_id bigint REFERENCES author (id) NOT NULL,
        
        project_id bigint REFERENCES project (id) NOT NULL,
        
        parent_id bigint REFERENCES task (id),
        
        PRIMARY KEY (id)
        
        
    );
    
   
