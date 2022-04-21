const masterRouter  = require("express").Router() ; 
const master = require("../Controller/masterController") ;


masterRouter.post("/api/post/country",master.createCountry);

masterRouter.post("/api/post/grade-level",master.createGradeLevel);

masterRouter.post("/api/post/term",master.createTerm);

masterRouter.post("/api/post/subject",master.createSubject);

masterRouter.post("/api/post/chapter",master.createChapter);




masterRouter.post("/api/get/country",master.listCountry);





module.exports = masterRouter ; 