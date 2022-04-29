const masterRouter  = require("express").Router() ; 
const master = require("../Controller/masterController") ;


masterRouter.post("/post/country",master.createCountry);

masterRouter.post("/post/grade-level",master.createGradeLevel);

masterRouter.post("/post/term",master.createTerm);

masterRouter.post("/post/subject",master.createSubject);

masterRouter.post("/post/chapter",master.createChapter);










module.exports = masterRouter ; 