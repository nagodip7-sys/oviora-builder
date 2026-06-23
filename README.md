# Oviora Builder

🌐 **Official Website:** https://oviora-builder.netlify.app/  
📦 **NPM Package:** https://www.npmjs.com/package/oviora-builder  
💻 **GitHub Repository:** https://github.com/nagodip7-sys/oviora-builder  
📝 **Blog:** https://oviora-builder.hashnode.dev/oviora-builder-a-lightweight-android-studio-alternative-for-low-spec-pcs  

Install from NPM:

```powershell
npm install -g oviora-builder
```

Run:

```powershell
oviora
```

---

## What is Oviora Builder?

**Oviora Builder** is a lightweight native Android **Java/XML CLI builder** for beginners and low-spec PCs.

It creates a real native Android project, builds an APK with Gradle, installs it on a connected Android phone using ADB, and launches the app using simple terminal commands.

Oviora Builder is designed for developers who want native Android output without opening the heavy Android Studio GUI.

```powershell
oviora create MyApp
cd MyApp
oviora br
```

Oviora Builder is:

```text
Native Android Java/XML
CLI based
Beginner friendly
Useful for low-spec PCs
ADB + Gradle powered
```

Oviora Builder is **not**:

```text
Not Cordova
Not Capacitor
Not WebView
Not Flutter
Not React Native
```

---

## Current Version

```text
Oviora Builder v0.2.0-safe-sync
Native Java/XML Android CLI Builder
```

This version focuses on:

```text
Native Java/XML project creation
Safe workspace sync
Mirror sync
Backup before sync
Custom package name support
Debug APK build
APK install
APK launch
Firebase google-services.json sync
Firebase Google Sign-In manual test support
Native Android feature manual test support
Helpful error messages
```

---

## Core Idea

Oviora Builder gives the beginner a clean workspace:

```text
oviora/
  layout/
  java/
  images/
  values/
  firebase/
```

The real Android project is generated from this workspace:

```text
app/src/main/res/layout/
app/src/main/java/
app/src/main/res/drawable/
app/src/main/res/values/
app/google-services.json
```

Important rule:

```text
oviora/ = source of truth
app/src/main/... = generated output
```

Users should mainly edit files inside `oviora/`.

---

## Current Working Commands

```text
oviora
oviora doctor
oviora create MyApp
oviora create MyApp --package com.example.myapp
oviora sync
oviora build
oviora run
oviora br
oviora restore
oviora restore --force
oviora status
```

Best beginner command:

```powershell
oviora br
```

`br` means:

```text
Build + Run
```

It does:

```text
1. Validate project
2. Validate workspace
3. Backup existing generated files
4. Mirror sync oviora/ to app/src/main/
5. Build APK with Gradle
6. Install APK with ADB
7. Launch app
```

---

## What Changed in v0.2

### 1. Safe source-of-truth rule

v0.2 clearly says:

```text
oviora/ is the source of truth.
app/src/main/ is generated output.
```

### 2. Mirror sync instead of copy-only sync

v0.1 copied files from `oviora/` to `app/src/main/`, but it did not remove deleted files.

v0.2 uses mirror sync.

If a file is deleted from:

```text
oviora/layout/
```

it is also removed from:

```text
app/src/main/res/layout/
```

This prevents old deleted files from coming back.

### 3. No dangerous auto-restore during build

v0.1 could auto-create missing workspace files during build.

That was dangerous because deleted or modified files could come back from old internal copies.

v0.2 does not auto-restore during build.

If a workspace file is missing, build stops and tells the user to run:

```powershell
oviora restore
```

### 4. Backup before sync

Before sync, Oviora creates backup files here:

```text
.oviora/backups/
```

This helps protect user code.

### 5. Custom package name support

Now users can create apps with a real package name:

```powershell
oviora create YuvaJyoti --package com.yuvajyoti
```

This is important for Firebase because `google-services.json` must match the Android package name.

### 6. Status command

```powershell
oviora status
```

Shows:

```text
App name
Package name
Workspace status
APK status
Missing folders
Stale APK status
```

### 7. Restore command

```powershell
oviora restore
```

Restores missing default workspace files.

```powershell
oviora restore --force
```

Force overwrites default workspace files.

---

## Required Software

### Node.js and npm

```powershell
node -v
npm -v
```

### Java JDK

Recommended:

```text
JDK 17 or JDK 21
```

Check:

```powershell
java -version
javac -version
```

### Android SDK

Required Android SDK parts:

```text
Android SDK Platform
Android SDK Build-Tools
Android SDK Platform-Tools
Android SDK Command-line Tools
```

Check ADB:

```powershell
adb version
```

### Gradle

Oviora Builder uses global Gradle only when Gradle Wrapper is missing.

Check:

```powershell
gradle -v
```

After wrapper creation, the project uses:

```powershell
.\gradlew.bat assembleDebug
```

### Android phone

Enable:

```text
Developer Options
USB Debugging
```

Check:

```powershell
adb devices
```

Expected:

```text
device
```

---

## Environment Variables

### JAVA_HOME

Example:

```text
C:\Program Files\Java\jdk-21
```

### ANDROID_HOME

Example:

```text
C:\Users\<username>\AppData\Local\Android\Sdk
```

### PATH should include

```text
%JAVA_HOME%\bin
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\cmdline-tools\latest\bin
```

Optional:

```text
Gradle bin folder
```

---

## Install Oviora Builder

From NPM:

```powershell
npm install -g oviora-builder
```

Check:

```powershell
oviora
```

For local development inside the source folder:

```powershell
cd C:\Users\hp\oviora-builder
npm link
oviora
```

---

## Command Details

### `oviora`

Shows help.

```powershell
oviora
```

### `oviora doctor`

Checks system tools.

```powershell
oviora doctor
```

Checks:

```text
Node.js
NPM
Java
ADB
Gradle
```

### `oviora create MyApp`

Creates a native Android Java/XML project.

```powershell
oviora create MyApp
```

Default package:

```text
com.oviora.myapp
```

### `oviora create MyApp --package com.example.myapp`

Creates a project with custom package name.

```powershell
oviora create MyApp --package com.example.myapp
```

Use this for Firebase apps.

### `oviora sync`

Mirror syncs workspace to generated Android output.

```powershell
oviora sync
```

Mapping:

```text
oviora/layout/   -> app/src/main/res/layout/
oviora/java/     -> app/src/main/java/<package>/
oviora/images/   -> app/src/main/res/drawable/
oviora/values/   -> app/src/main/res/values/
oviora/firebase/google-services.json -> app/google-services.json
```

### `oviora build`

Builds debug APK.

```powershell
oviora build
```

Output:

```text
app/build/outputs/apk/debug/app-debug.apk
```

### `oviora run`

Installs and launches APK.

```powershell
oviora run
```

If APK is missing or stale, v0.2 rebuilds first.

### `oviora br`

Build + Run.

```powershell
oviora br
```

Recommended daily command.

### `oviora restore`

Restores missing default workspace files.

```powershell
oviora restore
```

### `oviora restore --force`

Force restores default workspace files.

```powershell
oviora restore --force
```

### `oviora status`

Shows project status.

```powershell
oviora status
```

---

## Project Folder Structure

After:

```powershell
oviora create MyApp
```

Structure:

```text
MyApp/
│
├── oviora.config.json
├── settings.gradle
├── build.gradle
├── gradle.properties
│
├── oviora/
│   ├── layout/
│   │   ├── activity_main.xml
│   │   ├── header.xml
│   │   └── bottom_navigation.xml
│   │
│   ├── java/
│   │   └── MainActivity.java
│   │
│   ├── images/
│   ├── values/
│   │   ├── colors.xml
│   │   └── styles.xml
│   │
│   ├── firebase/
│   │   └── google-services.json
│   │
│   └── README.txt
│
├── .oviora/
│   └── backups/
│
└── app/
    └── src/main/... generated Android project
```

---

## Which Folder Should Beginners Edit?

Edit this:

```text
oviora/
```

Normally do not edit this unless advanced:

```text
app/
```

Recommended beginner edit files:

```text
oviora/layout/activity_main.xml
oviora/java/MainActivity.java
oviora/images/
oviora/values/
oviora/firebase/google-services.json
```

Advanced edit files:

```text
app/src/main/AndroidManifest.xml
app/build.gradle
build.gradle
gradle.properties
```

Note:

```text
AndroidManifest.xml is still inside app/src/main/ in this version.
Future Oviora versions may add oviora/manifest/ support.
```

---

## Firebase Google Sign-In Test Project

This section shows how to create a simple native Android app with:

```text
Google Sign-In
FirebaseAuth login
Gmail account picker
Name and email display
Sign out
```

### 1. Create project

Replace package with your own Firebase Android package name.

Example:

```powershell
oviora create YuvaJyoti --package com.yuvajyoti
cd YuvaJyoti
```

Important:

```text
The package name inside oviora.config.json must match the package name inside google-services.json.
```

Example `oviora.config.json`:

```json
{
  "appName": "YuvaJyoti",
  "packageName": "com.yuvajyoti",
  "language": "java",
  "ui": "xml",
  "sourceOfTruth": "oviora",
  "generatedOutput": "app/src/main"
}
```

### 2. Add Firebase config

Place your Firebase Android config file here:

```text
oviora/firebase/google-services.json
```

After sync, Oviora copies it to:

```text
app/google-services.json
```

Use this public placeholder name instead of real config when publishing examples:

```text
google-services.sample.json
```

### 3. Enable Google provider in Firebase

Firebase Console:

```text
Authentication
→ Sign-in method
→ Google
→ Enable
→ Save
```

### 4. Add SHA-1 if needed

If Google Sign-In gives error code 10:

```powershell
.\gradlew.bat signingReport
```

Copy SHA1 and add it in Firebase Console:

```text
Project settings
→ Your Android app
→ SHA certificate fingerprints
→ Add SHA-1
```

Then download fresh `google-services.json` and replace:

```text
oviora/firebase/google-services.json
```

---

## Firebase Gradle Setup

### Root `build.gradle`

File:

```text
build.gradle
```

```gradle
plugins {
    id 'com.android.application' version '8.7.3' apply false
    id 'com.google.gms.google-services' version '4.5.0' apply false
}
```

### App `build.gradle`

File:

```text
app/build.gradle
```

```gradle
plugins {
    id 'com.android.application'
    id 'com.google.gms.google-services'
}

android {
    namespace 'com.yuvajyoti'
    compileSdk 35

    defaultConfig {
        applicationId 'com.yuvajyoti'
        minSdk 23
        targetSdk 35
        versionCode 10001
        versionName '10.0.1'
    }
}

dependencies {
    implementation platform('com.google.firebase:firebase-bom:34.15.0')
    implementation 'com.google.firebase:firebase-auth'
    implementation 'com.google.android.gms:play-services-auth:21.4.0'
}
```

Important:

```text
Change namespace and applicationId to match your package name.
```

### `gradle.properties`

File:

```text
gradle.properties
```

```properties
org.gradle.jvmargs=-Xmx1536m -Dfile.encoding=UTF-8
android.useAndroidX=true
android.nonTransitiveRClass=false
```

---

## Native Test Project

This manual test project proves Oviora Builder can run native Android code.

It includes:

```text
Google Sign-In
FirebaseAuth
Local notification
Camera intent
Microphone recording test
Location test
Runtime permissions
```

Native tests:

| Button | What it tests |
|---|---|
| Sign in with Google | GoogleSignInClient + FirebaseAuth |
| Test Camera | Android camera intent |
| Test Notification | NotificationManager + NotificationChannel |
| Test Microphone 3 sec | MediaRecorder |
| Test Location | LocationManager |

---

## AndroidManifest.xml for Native Test

File:

```text
app/src/main/AndroidManifest.xml
```

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

    <uses-feature
        android:name="android.hardware.camera"
        android:required="false" />

    <uses-feature
        android:name="android.hardware.microphone"
        android:required="false" />

    <application
        android:theme="@style/AppTheme"
        android:label="YuvaJyoti">

        <activity
            android:name=".MainActivity"
            android:exported="true">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>

        </activity>
    </application>
</manifest>
```

---

## activity_main.xml for Native Test

File:

```text
oviora/layout/activity_main.xml
```

Use this layout for the Google Sign-In + native feature test project:

```xml
<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#101018"
    android:fillViewport="true">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:gravity="center"
        android:padding="24dp">

        <TextView
            android:id="@+id/titleText"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="YuvaJyoti Native Test"
            android:textColor="#FFFFFF"
            android:textSize="25sp"
            android:textStyle="bold"
            android:layout_marginBottom="10dp" />

        <TextView
            android:id="@+id/statusText"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Not signed in"
            android:textColor="#B8B8C8"
            android:textSize="15sp"
            android:gravity="center"
            android:layout_marginBottom="18dp" />

        <Button
            android:id="@+id/googleSignInButton"
            android:layout_width="match_parent"
            android:layout_height="52dp"
            android:text="Sign in with Google"
            android:textAllCaps="false" />

        <Button
            android:id="@+id/signOutButton"
            android:layout_width="match_parent"
            android:layout_height="52dp"
            android:layout_marginTop="10dp"
            android:text="Sign out"
            android:textAllCaps="false" />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Native Feature Tests"
            android:textColor="#FFFFFF"
            android:textSize="19sp"
            android:textStyle="bold"
            android:gravity="center"
            android:layout_marginTop="28dp"
            android:layout_marginBottom="12dp" />

        <Button
            android:id="@+id/cameraButton"
            android:layout_width="match_parent"
            android:layout_height="52dp"
            android:text="Test Camera"
            android:textAllCaps="false" />

        <Button
            android:id="@+id/notificationButton"
            android:layout_width="match_parent"
            android:layout_height="52dp"
            android:layout_marginTop="10dp"
            android:text="Test Notification"
            android:textAllCaps="false" />

        <Button
            android:id="@+id/micButton"
            android:layout_width="match_parent"
            android:layout_height="52dp"
            android:layout_marginTop="10dp"
            android:text="Test Microphone 3 sec"
            android:textAllCaps="false" />

        <Button
            android:id="@+id/locationButton"
            android:layout_width="match_parent"
            android:layout_height="52dp"
            android:layout_marginTop="10dp"
            android:text="Test Location"
            android:textAllCaps="false" />

        <TextView
            android:id="@+id/nativeStatusText"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Native status will show here"
            android:textColor="#9CA3AF"
            android:textSize="14sp"
            android:gravity="center"
            android:layout_marginTop="20dp" />

    </LinearLayout>
</ScrollView>
```

---

## MainActivity.java for Native Test

File:

```text
oviora/java/MainActivity.java
```

This file handles:

```text
Google Sign-In
FirebaseAuth login
Sign out
Camera permission
Camera open test
Notification permission
Local notification test
Microphone permission
3-second microphone recording test
Location permission
Last known / live location test
UI status updates
```

Because this Java file is long, keep the full tested version in an example file:

```text
examples/firebase-google-native-test/MainActivity.java
```

Recommended example folder:

```text
examples/
  firebase-google-native-test/
    README.md
    MainActivity.java
    activity_main.xml
    AndroidManifest.xml
    build.gradle.root
    build.gradle.app
    gradle.properties
    google-services.sample.json
```

---

## Build and Run Test Project

After editing files:

```powershell
oviora br
```

If old package conflict happens:

```powershell
adb uninstall com.yuvajyoti
oviora br
```

If version downgrade happens:

```text
INSTALL_FAILED_VERSION_DOWNGRADE
```

Fix option 1:

```powershell
adb uninstall com.yuvajyoti
oviora br
```

Fix option 2:

Increase versionCode:

```gradle
versionCode 10001
versionName '10.0.1'
```

---

## Expected Test Result

Expected result:

```text
App builds successfully
APK installs on phone
App launches
Google account picker opens
User can sign in with Gmail
Name/email displays in app
Notification test sends local notification
Camera test opens camera app
Microphone test records 3 seconds in app cache
Location test shows latitude/longitude if location is available
```

---

## Tested Proof

Latest local test showed:

```text
Version: 0.2.0-safe-sync
Source of truth: oviora/
Backup created before sync
Mirror sync completed
Firebase config synced
processDebugGoogleServices executed
BUILD SUCCESSFUL
APK generated at app/build/outputs/apk/debug/app-debug.apk
```

The install issue appeared only because the phone already had the same package installed with higher `versionCode`.

Fix:

```powershell
adb uninstall com.yuvajyoti
oviora br
```

---

## Common Problems and Fixes

### Problem: `oviora.config.json not found`

Cause:

```text
You are not inside an Oviora project folder.
```

Fix:

```powershell
cd YourAppFolder
oviora br
```

### Problem: Android SDK path not found

Fix:

```powershell
oviora doctor
```

Check:

```text
ANDROID_HOME
platform-tools
cmdline-tools
```

### Problem: No device found

Fix:

```powershell
adb devices
```

Then:

```text
Enable USB debugging
Reconnect USB
Accept phone permission popup
```

### Problem: APK install failed

Possible causes:

```text
Phone not connected
USB debugging not allowed
Old app conflict
Version downgrade
Storage issue
```

Fix:

```powershell
adb devices
adb uninstall your.package.name
oviora br
```

### Problem: Java compile error

Check:

```text
oviora/java/MainActivity.java
```

Common causes:

```text
Wrong variable name
Missing import
Wrong XML id
findViewById points to missing id
Wrong package line
```

### Problem: Android resource error

Check:

```text
oviora/layout/
oviora/images/
oviora/values/
```

Common causes:

```text
Missing drawable
Wrong @drawable/name
Wrong @color/name
Invalid XML syntax
```

### Problem: `default_web_client_id` not found

Cause:

```text
Google services Gradle plugin is not applied
or google-services.json was not copied to app/google-services.json
```

Fix:

```powershell
oviora sync
oviora br
```

Also check:

```text
build.gradle
app/build.gradle
app/google-services.json
```

### Problem: Google Sign-In error code 10

Usually caused by SHA-1 mismatch.

Fix:

```powershell
.\gradlew.bat signingReport
```

Add SHA1 in Firebase Console and download fresh `google-services.json`.

### Problem: Notification does not show

Check:

```text
Android 13+ needs POST_NOTIFICATIONS permission
Notification permission is allowed
Notification channel is created
Phone notification settings are not blocked
```

### Problem: Camera does not open

Check:

```text
Camera permission allowed
Device has a camera app installed
Camera is not blocked
```

### Problem: Microphone test fails

Check:

```text
Microphone permission allowed
No other app is using microphone
Device microphone is working
```

### Problem: Location not received

Check:

```text
Location permission allowed
GPS/location is ON
Internet/network location is ON
Wait up to 10 seconds
```

---

## Security Notes

Never upload these private files to GitHub:

```text
serviceAccountKey.json
firebase-adminsdk.json
private_key
.env
*.jks
*.keystore
signing.properties
```

For public demo repositories, prefer:

```text
google-services.sample.json
```

Do not paste your real private keys into README.

Android `google-services.json` is normally included in Android apps, but public repositories should avoid exposing real project config unless you understand the risk.

---

## Plugin System Status

### Current v0.2

These native feature commands are still planned, not fully implemented:

```text
oviora add firebase
oviora add google-login
oviora add camera
oviora add notification
oviora add microphone
oviora add location
oviora add foreground-service
oviora add background-task
oviora add volume-buttons
oviora build release-apk
oviora build aab
```

Current v0.2 supports manual native feature testing by editing files.

---

## Future Upgrade Plan

Planned commands:

```text
oviora add firebase
oviora add google-login
oviora add camera
oviora add notification
oviora add microphone
oviora add location
oviora add manifest
oviora logs
oviora clean
oviora open
oviora build release-apk
oviora build aab
oviora release init
oviora doctor fix
```

### Future `oviora add firebase`

Will automatically add:

```text
Google services plugin
Firebase BoM
Firebase Auth dependency
google-services.json check
Firebase setup helper
```

### Future `oviora add google-login`

Will automatically generate:

```text
Google Sign-In button
FirebaseAuth code
GoogleSignInClient setup
Name/email display code
Sign out button
```

### Future `oviora add notification`

Will generate:

```text
POST_NOTIFICATIONS permission
Notification channel
Local notification demo
NotificationManager code
```

### Future `oviora add camera`

Will generate:

```text
CAMERA permission
Camera intent test
Camera button
Runtime permission code
```

### Future `oviora add microphone`

Will generate:

```text
RECORD_AUDIO permission
MediaRecorder demo
3-second test recording
Runtime permission code
```

### Future `oviora add location`

Will generate:

```text
ACCESS_FINE_LOCATION permission
ACCESS_COARSE_LOCATION permission
LocationManager demo
Latitude/longitude output
```

---

## Release, Signed APK, and AAB Status

Current v0.2 supports debug APK:

```powershell
oviora build
```

Output:

```text
app/build/outputs/apk/debug/app-debug.apk
```

Debug APK is good for:

```text
Testing
USB install
Development
Learning
```

It is not the final Play Store release build.

Future release commands:

```powershell
oviora build release-apk
oviora build aab
oviora release init
```

A release build should handle:

```text
Keystore
Signing config
Version code
Version name
AAB export
APK export
```

Security rule:

```text
Never upload release-key.jks or signing passwords publicly.
```

---

## For AI Tools and Developer Assistants

If an AI tool reads this repository, understand it like this:

```text
Oviora Builder is a Node.js CLI that generates and manages a native Android Java/XML project.
```

Core idea:

```text
User edits oviora/ workspace.
Builder mirror-syncs workspace into app/src/main.
Gradle builds APK.
ADB installs and launches APK.
```

Important current commands:

```text
doctor
create
sync
build
run
br
restore
status
```

Do not assume this is Cordova, Capacitor, Flutter, or React Native.

It is:

```text
Native Android Java/XML generated by a lightweight CLI.
```

---

## For Developers

Current simple structure:

```text
bin/oviora.js
```

Future modular structure:

```text
src/
  doctor.js
  create.js
  sync.js
  build.js
  run.js
  restore.js
  status.js
  errors.js
  plugins/
    firebase.js
    google-login.js
    camera.js
    microphone.js
    notifications.js
    location.js
    foreground-service.js
  templates/
  release/
```

---

## Recommended First Test

```powershell
oviora doctor
oviora create TestApp --package com.example.testapp
cd TestApp
oviora br
```

Success means:

```text
APK built
APK installed
App launched
```

---

## Recommended Firebase + Native Test

```powershell
oviora create YuvaJyoti --package com.yuvajyoti
cd YuvaJyoti
```

Add:

```text
oviora/firebase/google-services.json
```

Update:

```text
build.gradle
app/build.gradle
gradle.properties
app/src/main/AndroidManifest.xml
oviora/layout/activity_main.xml
oviora/java/MainActivity.java
```

Run:

```powershell
oviora br
```

Expected:

```text
Google Sign-In works
Name/email shows
Native feature buttons work
```

---

## Summary

Oviora Builder turns this complex Android workflow:

```text
Create Android project
Write Java
Write XML
Configure Gradle
Build APK
Install APK
Launch app
```

into this beginner workflow:

```powershell
oviora create MyApp
cd MyApp
oviora br
```

Current v0.2 adds safe sync, backup, restore, status, custom package support, Firebase config sync, and native Android manual test support.

Future versions will add automatic plugin commands for Firebase, Google login, camera, notification, microphone, location, release APK, and AAB.
