Flight Tracking App

This project is a Flight Tracking Application that provides real-time flight information.

---------------------------------
Prerequisites

Visual Studio Code 
Android Studio 
Xcode
Npm
Node
Ignite CLI 

-----------------------------------------------
Installation process

1) Unzip project

2) Install node modules 	
yarn install

-----------------------------------------------
Build and Run Application

To run project use NPM scripts or run below command

npx expo start --android
npx expo start --ios

-----------------------------------------------
Project Structure

app
├── components
├── config
├── i18n
├── models - Models to store api data
├── navigators 
├── screens - Business logic
├── services - Api services
├── theme - App theme files
├── utils 
└── app.tsx - Application entry point

---------------------------------------------------
API Routes

To get Flight Information by flight_icao number used this api - `http://api.aviationstack.com/v1/flights?access_key=1ef5aa8c887a3beed47f6fbf0ace4b11&flight_status=active&flight_icao=${fightIcaoNo}`,
  