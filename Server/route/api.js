const express = require("express");
const router = express.Router();

// Load Database Connection
const db = require("./../lib/db");

// Load Authentication System
const Login = require("./../lib/login");

// Authentication Middleware
router.use(async function (req, res, next) {
    // Process authentication token and log user in
    var login = new Login(); 
    await login.authenticate(req.cookies.user_session);
    res.locals.user = await login.getUser();
    next();
});

// Routes
router.get('/courses/registered', async function (req, res) {
    if(res.locals.user == null) {
        res.status(401).send({error:"you are not authenticated"});
        return;
    }
    
    var courses = [];
    // Get courses you are registered for (student)
    if(res.locals.user.type == "student") {
        try {
            var results = await db.query("SELECT r.id as 'id', r.course as 'course_id', c.subject as 'subject', c.course_name as 'course', i.first_name as 'instructor_first_name', i.last_name as 'instructor_last_name' FROM `registration` r INNER JOIN `class` c ON r.course = c.id INNER JOIN `user` i ON c.instructor = i.id WHERE r.user = ?", [res.locals.user.id]);
            results.forEach(n => {
                courses.push({
                    id: n.id,
                    course_id: n.course_id,
                    subject: n.subject,
                    name: n.course,
                    instructor: (n.instructor_first_name + " " + n.instructor_last_name)
                });
            });
        } catch (e) {

        }
    }

    // Get courses you are instructing (instructor)
    if(res.locals.user.type == "instructor") {
        try {
            var results = await db.query("SELECT c.id as 'course_id', c.course_name as 'course', c.subject as 'subject', u.first_name as 'instructor_first_name', u.last_name as 'instructor_last_name' FROM class c INNER JOIN user u ON c.instructor = u.id WHERE c.instructor = ?", [res.locals.user.id]);
            results.forEach(n => {
                courses.push({
                    course_id: n.course_id,
                    subject: n.subject,
                    name: n.course,
                    instructor: (n.instructor_first_name + " " + n.instructor_last_name)
                });
            });
        } catch(e) {

        }
    }

    res.send(courses);
});

router.post("/courses/register/:id", async function (req, res) {
    if(res.locals.user == null) {
        res.status(401).send({error:"you are not authenticated"});
        return;
    }

    try {
        await db.query("INSERT INTO registration (`user`, `course`) VALUES (?, ?)", [res.locals.user.id, req.params.id]);
        res.send({status:"success"});
        return;
    } catch (e) {
        res.status(400).send({status:"error", message:e});
        return;
    }
});

router.get('/courses/:subject', async function (req, res) {
    if(res.locals.user == null) {
        res.status(401).send({error:"you are not authenticated"});
        return;
    }

    var courses = [];
    try {
        var results = await db.query("SELECT c.id as 'course_id', c.course_name as 'course', c.subject as 'subject', u.first_name as 'instructor_first_name', u.last_name as 'instructor_last_name' FROM class c INNER JOIN user u ON c.instructor = u.id WHERE c.subject = ?", [req.params.subject]);
        results.forEach(n => {
            courses.push({
                course_id: n.course_id,
                subject: n.subject,
                name: n.course,
                instructor: (n.instructor_first_name + " " + n.instructor_last_name)
            });
        });
    } catch (e) {

    }

    res.send(courses);

});

router.get('/course/:id', async function (req, res) {
    if(res.locals.user == null) {
        res.status(401).send({error:"you are not authenticated"});
        return;
    }

    var course = {};
    try {
        var results = await db.query("SELECT c.id as 'course_id', c.course_name as 'course', c.subject as 'subject', u.first_name as 'instructor_first_name', u.last_name as 'instructor_last_name' FROM class c INNER JOIN user u ON c.instructor = u.id WHERE c.id = ?", [req.params.id]);
        if(results.length > 0) {
            course.course_id = results[0].course_id,
            course.subject = results[0].subject,
            course.name = results[0].course,
            course.instructor = results[0].instructor_first_name + " " + results[0].instructor_last_name;
        }
    } catch (e) { 

    }

    res.send(course);
});

router.get('/course/:id/announcements', async function (req, res) {
    if(res.locals.user == null) {
        res.status(401).send({error:"you are not authenticated"});
        return;
    }

    var announcements = [];
    try {
        var results = await db.query("SELECT `id`, `description` FROM announcement WHERE `active` = true && `class` = ?", [req.params.id]);
        results.forEach(n => {
            announcements.push({
                id: n.id,
                description: n.description
            });
        });
    } catch (e) {

    }

    res.send(announcements);
});

router.get('/course/:id/content', async function (req, res) {
    if(res.locals.user == null) {
        res.status(401).send({error:"you are not authenticated"});
        return;
    }

    var content = []
    try {
        var results = await db.query("SELECT `id`, `name`, `file_name`, `description` FROM resource WHERE `class` = ?", [req.params.id]);
        results.forEach(n => {
            content.push({
                id: n.id,
                name: n.name,
                file_name: n.file_name,
                description: n.description
            });
        });
    } catch (e) {

    }

    res.send(content);
});

router.get('/course/:id/meetings', async function (req, res) {
    if(res.locals.user == null) {
        res.status(401).send({error:"you are not authenticated"});
        return;
    }

    var meetings = [];
    try {
        var results = await db.query("SELECT `id`, `start`, `end`, `name`, `video_conference` FROM meeting WHERE `class` = ? ORDER BY `start`", [req.params.id]);
        results.forEach(n => {
            meetings.push({
                id: n.id,
                start: n.start,
                end: n.end,
                name: n.name,
                video_conference: n.video_conference
            });
        });
    } catch (e) {

    }

    res.send(meetings);
});

router.get('/subjects', async function (req, res) {
    if(res.locals.user == null) {
        res.status(401).send({error:"you are not authenticated"});
        return;
    }

    var subjects = [];
    try {
        var results = await db.query("SELECT DISTINCT subject from class ORDER BY subject");
        results.forEach(n => {
            subjects.push({
                subject: n.subject
            });
        });
    } catch (e) {

    }

    res.send(subjects);
});

module.exports = router;