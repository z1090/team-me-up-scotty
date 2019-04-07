# Team-me-up-scotty

Team Me Up (Scotty) is a mobile app that randomly picks 5-a-side football teams from a list of names. It’s a handy tool to have if teams are selected just before play starts, based on who turns up on the day, rather than a more organised setup where teams are selected in advance. You can create up to 9 teams and enter as many participants as you'd like (3+), so it's not strictly 5-a-side, which is useful if only 9 players turn up! Or if 14 turned up, you could choose either 7-a-side or 2 teams of 5 and one 4.

<!-- break -->

## Android App Installation
Download this [APK](https://drive.google.com/drive/folders/1bcA7hpoCwWewikyZK5JWfCBg8uDyf9G4)
file from your Android device and follow the installation instructions.

Android will try to discourage you from installing unknown apps, so you’ll need to specifically allow it to be installed. The Play Store will then also try to stop you installing it – don’t press ‘Okay’, select the ‘install anyway’ option. If you accidentally tapped “Okay”, open the Play Store and edit the options in Play Protect to turn off device scanning, and try the installation again.

## iOS App Installation

Alas, this is currently unavailable. You can, however, install the project folder and get the app running on an iPhone over Wi-Fi using expo.

<!-- break -->

# Installing project folder on a computer

## Install the Expo mobile app

The Expo mobile app allows you to connect to and view your app on your mobile device, whilst it is being developed on your local machine.

To run Expo, you need one of the following devices:

-   An iPhone running iOS 11 or later
-   An Android phone running Android 6.0 (Marshmallow) or later

To install the app, go to the App Store or Google Play Store on your device, and search for 'Expo'. If you are reading this on your mobile device, use these links to install the [iPhone](https://itunes.apple.com/app/apple-store/id982107779?mt=8) and [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) apps respectively.

<!-- break -->

## Install Node

Install Node and the npm package manager [node](https://nodejs.org/en/download/)

Once installed, inside the project folder run:

```bash
npm install
```

## Install watchman

> Note: if you aren't on a Mac, you can skip this step.

Watchman watches files for changes, and triggers an action when they do. It's used internally by the React Native development environment to auto-reload your app when you save a source file.

You may already have watchman installed: type `watchman -v` in the terminal and see if it returns the version number. If not, you'll need to go to [the watchman website](https://facebook.github.io/watchman/) to download and install it.

<!-- break -->

## Install the Expo CLI

The [Expo CLI](https://docs.expo.io/versions/latest/workflow/expo-cli) allows you to run the project server.

Install it with npm:

```bash
npm install -g expo-cli
```

All being well, you should now have installed everything you need.

<!-- break -->

# Running the App

navigate to the project folder inside a terminal window and run

```bash
npm start
```

Firstly, **make sure your device is on the same WiFi network as your computer**. Your browser should open up with a QR code. scan this on your device, either with the Expo app on Android, or with the camera on iOS which will then provide a link to open Expo.

If you are having trouble loading the project, check that the ip address above the QR starts with 192. i.e. `exp://192.168.1.11:19000` if not, you may have a device or app that is interfereing with your Wi-Fi.

<!-- break -->

# App Settings

## Quick Start

Only Available if a list of participants has been entered in the past. This will skip straight to the teams page using the preexisting players and settings.

## Use Player Ratings Setting

If turned off the app will generate completely random teams. Otherwise, ratings are out of 100 and there are two modes.
**“Precise”** player ratings will generate teams based on the exact values the user entered.
**“Loose”** ratings will add a random amount between -10 - +10 to the entered value each time the teams are generated. This creates some variety in the teams, but tries to skill spread the skill level evenly between the teams.

<!-- break -->

# Updates
For updates and planned future work on the app, please visit the projects page on [github](https://github.com/z1090/team-me-up-scotty/projects)

