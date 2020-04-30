# 1point5 - The app that helps you with social distancing.
>1.5 assists you with social distancing. The app scans for nearby mobile devices and it warns you when a device enters your 1.5 meter parameter. The phone vibrates and a pop-up appears. The pop up contains a graphic that can be shown to the other person. It is a friendly reminder that aims to defuse the situation.

>This is a social distancing app and it works using Bluetooth. Devices of family members and so forth can be excluded. The parameter can be adjusted from a minimum of 1.5 meters up to 4 meters, depending on your preference or local regulation. 1.5 aims to help stop the spread of COVID-19. It is not full proof.

>Please follow the advice of the World Health Organisation and your local government.


## Getting Started
 
 The app won't work when running on the browser.
 
 First make sure you have JAVA, Android Studio/Xcode installed.
 Check for more info: https://cordova.apache.org/docs/en/latest/guide/cli/
 
Installing dependencies
```
npm i
```
 
Building the APP.
This command will trigger VUE Cli and will build the app inside the `www` folder. 
```
npm run build
 ```

Once the build is finished run:
Remember that the only way to test it is by connecting your iPhone or Android via USB.
```
npm run andoid

//or

npm run ios
 ```
