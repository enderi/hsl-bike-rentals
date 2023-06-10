# HSL Bike Rentals (Open Data Demo)

![image](https://github.com/enderi/hsl-bike-rentals/assets/2479020/f6f7674a-6e1c-47cc-9b67-0dc8a5dfb5c6)

## Tech Stack
- Spring Boot Java Backend
- Angular Typescript frontend
- MySQL database


## Running
You need to install the usual, 
- npm
- java
- docker & compose
- whatnot

### Database
```
docker compose up
```
### Frontend
```
cd frontend
npm install
ng serve
```

### Backend
```
cd backend
./gradlew bootRun
```

When everything is running, open url [localhost:8080](http://localhost:8080)

For more information, see READMEs in subfolders.
