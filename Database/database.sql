-- Scripts to create initial application database
CREATE TABLE `user` (
    id int NOT NULL AUTO_INCREMENT,
    username varchar (255),
    `password` varchar (64),
    first_name varchar (255), 
    last_name varchar (255),
    `type` varchar (32),
    PRIMARY KEY (id)
);

CREATE TABLE `session` (
    session_id varchar(32),
    user int,
    expiration DATETIME
);

CREATE TABLE class (
    `id` int NOT NULL AUTO_INCREMENT,
    `subject` varchar(64),
    course_name varchar(64),
    instructor int,
    PRIMARY KEY (id)
);

CREATE TABLE registration (
    `id` int NOT NULL AUTO_INCREMENT,
    `user` int,
    `course` int,
    PRIMARY KEY (id)
);

CREATE TABLE announcement (
    `id` int NOT NULL AUTO_INCREMENT,
    class int,
    active boolean,
    `description` varchar (4000),
    PRIMARY KEY (id)
);

CREATE TABLE `resource` (
    `id` int NOT NULL AUTO_INCREMENT,
    class int,
    `name` varchar (255),
    `file_name` varchar (255),
    `description` varchar (4000),
    PRIMARY KEY (id)
);

CREATE TABLE meeting (
    `id` int NOT NULL AUTO_INCREMENT,
    class int,
    `start` DATETIME,
    `end` DATETIME,
    `name` varchar (255),
    video_conference varchar (4000),
    PRIMARY KEY (id)
);

CREATE TABLE discussion (
    `id` int NOT NULL AUTO_INCREMENT,
    class int,
    `name` varchar(255),
    description varchar(4000),
    PRIMARY KEY (id)
);

CREATE TABLE discussion_post (
    `id` int NOT NULL AUTO_INCREMENT,
    discussion int,
    parent int,
    user int,
    `subject` varchar(255),
    body varchar(4000),
    PRIMARY KEY (id)
);