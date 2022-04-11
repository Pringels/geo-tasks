# Geo tasks App

A cross-platform app for taking notes on a map.

## Requirements

Recommended node version is `v16.13.0`
Required environment variables:

`MAPBOX_ACCESS_TOKEN`

Add this to your system environment or create a new `.env` file and store it there. See `.env.example` for reference.

## Setup

Recommended node version is `v16.13.0`

Required environment variables:

First install the project's dependencies:  
`yarn install`

Command to run the web app:  
`npx expo-cli start --web`

Command to build and run the Android app on a connected ADB device:  
`npx expo-cli run:android`

Command to run tests:  
`yarn test`
