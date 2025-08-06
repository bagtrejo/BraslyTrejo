Test Devsu Angular
A simple Angular project with Docker support.
Prerequisites

Node.js
Angular CLI (npm install -g @angular/cli)
Docker

Setup
Copy the environment file:
cp .environment.example.ts .environment.ts

Run Tests
ng test

Build Docker Image
docker build -t test-devsu-angular .

Run Docker Container
docker run -p 8080:80 test-devsu-angular

Access the app at http://localhost:8080.
License
MIT