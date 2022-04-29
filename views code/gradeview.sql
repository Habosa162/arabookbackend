CREATE view gradeview AS
SELECT grade.id,grade.level as grade,country.name as country FROM grade  
INNER JOIN country on grade.country_id = country.id
