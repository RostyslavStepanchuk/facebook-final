#### DAN-IT FS8 GROUP FINAL PROJECT
# FACEBOOK ANALOGUE SOCIAL MEDIA
[![Build Status](https://travis-ci.com/RostyslavStepanchuk/facebook-final.svg?branch=master)](https://travis-ci.com/RostyslavStepanchuk/facebook-final) [![Coverage Status](https://coveralls.io/repos/github/RostyslavStepanchuk/facebook-final/badge.svg)](https://coveralls.io/github/RostyslavStepanchuk/facebook-final) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=RostyslavStepanchuk_facebook-final&metric=alert_status)](https://sonarcloud.io/dashboard?id=RostyslavStepanchuk_facebook-final)


## Description
The purpose of this app is to use on practice Spring, React, SQL and other technologies studied during full-stack course

#### Implemented features:

##### Login/security
- Authentication with JWT and Refresh Tokens
- Google authentication
- Mailbox verification
- Password restore

##### Sharing posts and images
- Creating posts in own/other users profiles
- Adding images/gif's to posts
- Tagging friends on created posts
- Adding likes to posts
- Commenting/removing comments to posts
- Segregated authority (delete/edit/remove tag) for each post based on post authorship/ownership
- Infinity scroll on homepage and profiles

##### Communication and friends
- Adding to friends, sending/accepting friend requests
- Possible friends suggestions, based on number of common friends implemented with usage of graph data structure
- Application users search (database query)
- Websocket chats
- Messages/chats search
- Friends online /last active time implemented by request interceptors

##### Data & images storage
- Images are stored on AWS S3 bucket
- Images that are not used in application automatically deleted from AWS (through Entity Listener)
- External mySQL database on AWS RDS 


#### Actual version of master build is deployed on AWS:
http://ec2-13-58-66-1.us-east-2.compute.amazonaws.com:8080

#### To enter application you can register or use account:
Login: userbot2
Password: userbot2

#### Technologies used in the development:
- Back-end: Spring(Boot, Data, Security), Hibernate, MySQL, Swagger
- Front-end: React, Redux, Material-UI
- Testing: JUnit, Mockito
- AWS: EC2, MySQL RDS, S3
- Build tools: Maven, Travis CI


#### Swagger Documentation:
http://ec2-13-58-66-1.us-east-2.compute.amazonaws.com:8080/swagger-ui.html

#### Development team
Maksim Simonov
Rostyslav Stepanchuk
Taras Bashuk

Mentor: Stanislav Kosinsky