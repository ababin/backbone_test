CREATE TABLE
    author
    (
        id SERIAL,
        
        first_name CHARACTER VARYING(30) NOT NULL,
        
        last_name CHARACTER VARYING(30) NOT NULL,
        
        middle_name CHARACTER VARYING(30),
        
        email CHARACTER VARYING(50),
                
        PRIMARY KEY (id)
    );
    
   
