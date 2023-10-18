
CREATE TABLE cv (
    cv_id SERIAL PRIMARY KEY,
    cv_text TEXT NOT NULL,
    skill_words TEXT[] 
);

CREATE TABLE job_description (
    job_id SERIAL PRIMARY KEY,
    job_text TEXT NOT NULL,
    cv_id INT REFERENCES cv(cv_id) 
);
