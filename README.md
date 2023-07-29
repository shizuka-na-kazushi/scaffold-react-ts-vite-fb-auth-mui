# React + TypeScript + Vite + Firebase + MUI

This project is scaffold code which realizes user authentication functionality (sign-in, login, logout, etc.) using firebase/auth, firebase/firestore, which is generally wanted to start developing any web app.

The project has below UI as scaffold:
 - createUser
 - login
 - logout
 - profile (as private page)
 - blog (as public page)

UI component is build using [MUI](https://mui.com) components.

## Firebase Authentication and Firestore

Once you create new account on `/createUser` page, the app is create Firebase email account using Firebase/Auth and document will be stored in `/Users` document on Firestore so that app can store any user specific data. Firestore rule is also configured properly for this perpose.

## How to start with the code

### Install required packages
Install required packages using below command:

```js
   npm install
```

### Create `.env` file
Create `.env` file on the top directory and add below entries for Firebase project.


```bash
   VITE_FB_API_KEY = api-key-generated-by-firebase-cloud
   VITE_FB_AUTH_DOMAIN = your-project-name.firebaseapp.com
   VITE_FB_PROJECT_ID = your-project-name
   VITE_FB_STORAGE_BUCKET = your-project-name.appspot.com
   VITE_FB_MESSAGING_SENDER_ID = sender-id-given-by-firebase-cloud
   VITE_FB_APP_ID = app-id-given-by-firebase-cloud
```

You can get these data may from [Firebase console](https://console.firebase.google.com/) after you create and configure your Firebase project.


### Create `.firebasesrc` file
Create `.firebaserc` on top directory with below entry

```json
{
  "projects": {
    "default": "your-project-name"
  }
}
```

"your-project-name" may need to match value of `VITE_FB_PROJECT_ID` in `.env`.

## Daily routine for development 

### Start firebase emulators

After completing the configuration above, just start emulators

```bash
   firebase emulators:start
```

If you do not have firebase CLI in your system, install it first (i.e. `npm install -g firebase-tools`). See more detail on [firebase official page](https://firebase.google.com/docs/cli).


### Start Vite local server 
To run your web app on browser, start dev server provided by Vite as usual,

```bash
   npm run dev
```

Then, access to http://localhost:5173/ on browser.

### Work with Firebase Hosting emulators

As default, Firebase Hosting emulator is workding on port 5000.

Once, you build your code on local using below command, Hosting emulator can be used to check 'dist' code.

```bash
   npm run build
```

Go to http://localhost:5000/ on browser.

### Write your app!

Let's write code! `npm run dev` may automatically reload your app whenever you change your code. it's very helpful.

