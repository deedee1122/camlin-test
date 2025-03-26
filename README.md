# Instructions

## Steps to local setup

* download/fork the project
* `npm i`
* `npm run dev`
* open [localhost](http://localhost:5188/)

## Docker Deployment

* docker build -t transformer-dashboard .
* docker run -p 5188:80 transformer-dashboard
