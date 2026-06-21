# Oviora Builder

🌐 **Official Website:** https://oviora-builder.netlify.app/  
📦 **NPM Package:** https://www.npmjs.com/package/oviora-builder  
💻 **GitHub Repository:** https://github.com/nagodip7-sys/oviora-builder  

Install from NPM:

```powershell
npm install -g oviora-builder
```

---

**Oviora Builder** is a lightweight native Android CLI builder for beginners.

It creates a real **native Android Java + XML** project, builds an APK, installs it on a connected Android phone, and launches it using simple commands.

Instead of opening Android Studio and searching deep folders, beginners can work inside a simple `oviora/` workspace folder.

---

## 1. What is Oviora Builder?

Oviora Builder is a command-line tool that helps you create and run Android apps using:

- Java
- XML layouts
- Android SDK
- Gradle
- ADB

It is not a WebView app builder like Cordova.

It creates a native Android project.

Basic flow:

```text
oviora create MyApp
cd MyApp
oviora br
```

This creates the project, builds the APK, installs it on the phone, and launches it.

---

## 2. Current Version

```text
Oviora Builder v0.1
Native Java/XML Android CLI Builder
```

Current v0.1 focuses on:

```text
Create project
Sync workspace
Build debug APK
Install APK
Launch app
Show helpful errors
```

---

## 3. Current Working Commands

These commands are currently implemented and tested:

```text
oviora
oviora doctor
oviora create MyApp
oviora sync
oviora build
oviora run
oviora br
```

### Important

Plugin commands like these are **planned**, but not implemented in v0.1 yet:

```text
oviora add camera
oviora add microphone
oviora add notification
oviora add foreground-service
oviora add background-task
oviora add volume-buttons
oviora build release
oviora build aab
```

If someone runs those commands in v0.1, the CLI will not add those features yet. It will show the command list or behave as an unknown command.

---

## 4. Main Goal

The goal is to make Android development easier for beginners.

Normally Android project files are deep inside folders like:

```text
app/src/main/java/...
app/src/main/res/layout/...
app/src/main/AndroidManifest.xml
```

Oviora Builder gives beginners a simple workspace:

```text
oviora/
  layout/
  java/
  images/
  firebase/
```

The user edits simple files inside `oviora/`, and the builder syncs them into the real Android project automatically.

---

## 5. Required Software Before Using

A beginner must install these tools first.

### 5.1 Node.js and npm

Required because Oviora Builder is currently a Node.js CLI tool.

Check:

```powershell
node -v
npm -v
```

Expected:

```text
Node.js version shown
npm version shown
```

### 5.2 Java JDK

Required because Android builds Java code.

Recommended:

```text
JDK 17 or JDK 21
```

Check:

```powershell
java -version
javac -version
```

### 5.3 Android SDK

Required because Android apps need Android platform tools and build tools.

Required SDK parts:

```text
Android SDK Platform
Android SDK Build-Tools
Android SDK Platform-Tools
Android SDK Command-line Tools
```

Important tools:

```text
adb
sdkmanager
```

Check:

```powershell
adb version
```

### 5.4 Gradle

Current Oviora Builder uses the global `gradle` command only when the project does not have Gradle Wrapper yet.

First build creates:

```text
gradlew.bat
gradlew
gradle/
```

After that, the project uses:

```powershell
.\gradlew.bat assembleDebug
```

Check:

```powershell
gradle -v
```

### 5.5 Android Phone Setup

To install and launch apps directly:

1. Enable Developer Options on phone
2. Enable USB Debugging
3. Connect phone with USB
4. Allow debugging permission popup
5. Check:

```powershell
adb devices
```

Expected:

```text
device
```

### 5.6 NDK

NDK is not required for the current v0.1 Java/XML apps.

NDK will be useful later for:

```text
C/C++ native modules
advanced hardware access
native libraries
game engines
performance-critical code
```

For now:

```text
NDK = optional
SDK = required
```

---

## 6. Environment Variables

These should be configured on the system.

### JAVA_HOME

Example:

```text
C:\Program Files\Java\jdk-21
```

or:

```text
C:\Program Files\Eclipse Adoptium\jdk-17...
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

## 7. Installing Oviora Builder Locally

Go to the builder folder:

```powershell
cd C:\Users\hp\oviora-builder
```

Install/link the command globally:

```powershell
npm link
```

Now this command should work anywhere:

```powershell
oviora
```

---

## 8. Command List

### 8.1 `oviora`

Shows available commands.

```powershell
oviora
```

Output:

```text
Commands:
  oviora doctor
  oviora create MyApp
  oviora sync
  oviora build
  oviora run
  oviora br
```

### 8.2 `oviora doctor`

Checks required system tools.

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

Use this first when setting up a new system.

### 8.3 `oviora create MyApp`

Creates a new native Android Java/XML project.

```powershell
oviora create MyApp
```

Creates:

```text
MyApp/
  oviora.config.json
  settings.gradle
  build.gradle
  app/
  oviora/
```

### 8.4 `oviora sync`

Copies beginner workspace files into the internal Android project.

```powershell
oviora sync
```

Mapping:

```text
oviora/layout/   -> app/src/main/res/layout/
oviora/java/     -> app/src/main/java/<package>/
oviora/images/   -> app/src/main/res/drawable/
oviora/firebase/google-services.json -> app/google-services.json
```

### 8.5 `oviora build`

Builds the debug APK.

```powershell
oviora build
```

It automatically runs sync first.

APK output:

```text
app/build/outputs/apk/debug/app-debug.apk
```

### 8.6 `oviora run`

Installs the existing APK to the connected phone and launches it.

```powershell
oviora run
```

Important:

```text
If APK is missing, it builds first.
If APK already exists, it installs that APK.
```

If you changed layout or Java files, use `oviora br` instead.

### 8.7 `oviora br`

Build + Run shortcut.

```powershell
oviora br
```

This is the best beginner command.

It does:

```text
sync workspace
build APK
install APK
launch app
```

Recommended daily command:

```powershell
oviora br
```

---

## 9. Project Folder Structure

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
│   │   ├── ic_home.xml
│   │   ├── ic_profile.xml
│   │   ├── ic_settings.xml
│   │   ├── ic_search.xml
│   │   ├── ic_bell.xml
│   │   ├── bg_card.xml
│   │   ├── bg_icon_circle.xml
│   │   ├── bg_search_bar.xml
│   │   ├── bg_header_button.xml
│   │   └── bg_profile_circle.xml
│   │
│   ├── firebase/
│   │   └── google-services.json   optional
│   │
│   └── README.txt
│
└── app/
    └── src/main/... internal Android project
```

---

## 10. Which Folder Should Beginner Edit?

Beginner should mainly edit:

```text
oviora/
```

Do not edit `app/` unless you know Android internals.

Recommended editing areas:

```text
oviora/layout/
oviora/java/
oviora/images/
oviora/firebase/
```

---

## 11. File Meaning

### 11.1 `oviora.config.json`

Main project configuration.

Example:

```json
{
  "appName": "MyApp",
  "packageName": "com.oviora.myapp",
  "language": "java",
  "ui": "xml"
}
```

Used by builder to know:

```text
App name
Android package name
Java package path
Project type
```

### 11.2 `oviora/layout/activity_main.xml`

Main screen layout.

It includes:

```text
header
main content card
bottom navigation
```

### 11.3 `oviora/layout/header.xml`

Top app header.

Current default header contains:

```text
App name
Notification icon
Profile icon
Search-style bar
```

### 11.4 `oviora/layout/bottom_navigation.xml`

Bottom navigation layout.

Current default tabs:

```text
Home
Profile
Settings
```

### 11.5 `oviora/java/MainActivity.java`

Main Java controller.

It handles:

```text
Loading XML layout
Finding UI elements
Button clicks
Page title/content changes
Toast messages
```

### 11.6 `oviora/images/`

Stores drawable resources.

Can contain:

```text
Vector XML icons
Shape XML backgrounds
PNG images
JPG images
WebP images
```

Current default contains vector icons and rounded backgrounds.

### 11.7 `oviora/firebase/`

Place Firebase config here:

```text
google-services.json
```

Current v0.1 only copies this file to:

```text
app/google-services.json
```

Firebase Gradle plugin integration can be added in future versions.

### 11.8 `app/`

Internal Android project folder.

Contains real Android files:

```text
app/src/main/java/
app/src/main/res/
app/src/main/AndroidManifest.xml
app/build.gradle
```

Beginner should not edit this directly.

---

## 12. How Build Works Internally

When you run:

```powershell
oviora br
```

Flow:

```text
1. Read oviora.config.json
2. Ensure oviora/ workspace exists
3. Sync oviora/layout to app/src/main/res/layout
4. Sync oviora/java to app/src/main/java/<package>
5. Sync oviora/images to app/src/main/res/drawable
6. Copy firebase/google-services.json if present
7. Create Gradle Wrapper if missing
8. Run .\gradlew.bat assembleDebug
9. Install APK using adb install -r
10. Launch MainActivity using adb shell am start
```

---

## 13. Beginner Workflow

### Create app

```powershell
cd C:\Users\hp\oviora-builder
oviora create MyFirstApp
cd MyFirstApp
oviora br
```

### Edit UI

Edit:

```text
oviora/layout/activity_main.xml
oviora/layout/header.xml
oviora/layout/bottom_navigation.xml
```

Then run:

```powershell
oviora br
```

### Edit Java logic

Edit:

```text
oviora/java/MainActivity.java
```

Then run:

```powershell
oviora br
```

### Add image

Put image in:

```text
oviora/images/
```

Then reference it in XML:

```xml
android:src="@drawable/my_image"
```

Then run:

```powershell
oviora br
```

---

## 14. Plugin System Status

### Current v0.1

Plugin commands are not implemented yet.

These commands are planned:

```text
oviora add camera
oviora add selfie-camera
oviora add microphone
oviora add notifications
oviora add foreground-service
oviora add background-task
oviora add volume-buttons
oviora add firebase
```

### What should happen if a user runs these now?

In v0.1, they will not add native features yet.

Expected behavior:

```text
Unknown command or command list shown
```

This is normal for v0.1.

### Why plugins are important

Without plugins, users must manually edit:

```text
AndroidManifest.xml
MainActivity.java
Java service files
BroadcastReceiver files
Gradle dependencies
Runtime permission code
```

That is difficult for beginners.

The future plugin system should generate these automatically.

---

## 15. Future Plugin Design

Future command format:

```powershell
oviora add <feature-name>
```

Example:

```powershell
oviora add camera
```

Each plugin should do four things:

```text
1. Add required AndroidManifest permissions
2. Generate Java helper/controller files
3. Add basic XML/UI sample if needed
4. Update project config/plugin record
```

Recommended future folder:

```text
oviora/
  plugins/
    camera.json
    microphone.json
    notifications.json
```

Recommended internal generated folder:

```text
app/src/main/java/<package>/plugins/
```

Example generated files:

```text
CameraController.java
MicrophoneController.java
NotificationHelper.java
ForegroundService.java
VolumeButtonController.java
```

---

## 16. Future Native Feature Commands

### 16.1 Camera

Future command:

```powershell
oviora add camera
```

Should generate:

```text
CAMERA permission
CameraController.java
Basic open camera method
Runtime permission request code
Optional XML button/sample
```

Possible manifest:

```xml
<uses-permission android:name="android.permission.CAMERA" />
```

Possible Java files:

```text
oviora/java/CameraController.java
```

Notes:

```text
Camera is a sensitive permission.
The app must ask the user at runtime.
The user can allow or deny permission.
```

### 16.2 Selfie Camera

Future command:

```powershell
oviora add selfie-camera
```

Should generate:

```text
Camera permission
Front camera opening helper
CameraController.java with front-facing camera mode
Optional preview layout
```

Notes:

```text
Not every device behaves the same.
The plugin should handle fallback if front camera is unavailable.
```

### 16.3 Microphone

Future command:

```powershell
oviora add microphone
```

Should generate:

```text
RECORD_AUDIO permission
MicrophoneController.java
Basic audio recording or audio input sample
Runtime permission request code
```

Possible manifest:

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
```

Notes:

```text
Microphone is a sensitive permission.
The user must understand why the app needs it.
```

### 16.4 Notifications

Future command:

```powershell
oviora add notifications
```

Should generate:

```text
NotificationHelper.java
Notification channel code
Simple local notification test
POST_NOTIFICATIONS permission for newer Android versions
```

Possible manifest for newer Android:

```xml
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
```

Notes:

```text
Android notification behavior changes by Android version.
The plugin should handle permission request where required.
```

### 16.5 Foreground Service

Future command:

```powershell
oviora add foreground-service
```

Should generate:

```text
ForegroundService.java
Notification channel
Foreground service notification
Manifest service entry
Required foreground service permissions/types
```

Possible uses:

```text
Music player
Active location tracking
Active recording
Long-running visible task
```

Important:

```text
Foreground service must show a visible notification.
It should not be hidden from users.
```

### 16.6 Background Task

Future command:

```powershell
oviora add background-task
```

Should generate safe background task structure.

Possible future options:

```text
WorkManager-based task
AlarmManager-based scheduled task
Boot receiver if needed
```

Important:

```text
Modern Android restricts background services.
For many cases, WorkManager is safer than raw background service.
```

### 16.7 Volume Button Access

Future command:

```powershell
oviora add volume-buttons
```

Should generate:

```text
VolumeButtonController.java
MainActivity key event override sample
Volume up/down detection
Safe callback method
```

Possible use:

```text
Trigger action when volume up/down is pressed while app is open
```

Important:

```text
Volume button access may be limited when app is not active.
Background volume-button triggers are not always reliable and may be restricted by Android behavior.
```

### 16.8 Firebase

Future command:

```powershell
oviora add firebase
```

Should generate:

```text
firebase/ folder
google-services.json instruction
Gradle Google services plugin setup
Firebase dependency setup
Optional FirebaseMessagingService.java
```

Possible future Firebase features:

```text
FCM push notifications
Realtime Database helper
Authentication helper
Analytics helper
```

---

## 17. Runtime Permissions

Some Android features need runtime permission.

Examples:

```text
Camera
Microphone
Location
Notifications on newer Android versions
```

The plugin system should not only add manifest permissions.

It must also generate Java code to request permission from the user.

Correct future plugin behavior:

```text
1. Declare permission in AndroidManifest.xml
2. Check permission in Java
3. Request permission if missing
4. Handle user allow/deny result
5. Show clear message if permission is denied
```

Bad plugin behavior:

```text
Only adding permission in AndroidManifest.xml
```

That is not enough for modern Android.

---

## 18. Background and Foreground Services

### Background

Background work is complicated on modern Android.

Reason:

```text
Android limits what apps can do in the background to protect battery, privacy, and performance.
```

For beginner apps, safe future approach:

```text
Use WorkManager for deferrable background tasks.
Use AlarmManager for alarms/scheduled actions.
Use foreground service only when user-visible continuous work is required.
```

### Foreground

Foreground service is for active visible tasks.

Example:

```text
Recording
Navigation
Music playback
Active tracking
```

Foreground service should:

```text
Show a visible notification
Declare correct service type
Declare correct permission
Stop when work is done
```

Important:

```text
Do not use foreground service to secretly run hidden background tasks.
```

---

## 19. Release, Signed APK, and AAB Status

### Current v0.1

Currently implemented:

```text
Debug APK only
```

Current command:

```powershell
oviora build
```

Runs:

```powershell
.\gradlew.bat assembleDebug
```

Output:

```text
app/build/outputs/apk/debug/app-debug.apk
```

This APK is good for:

```text
Testing
USB install
Development
Learning
```

It is not the final Play Store release build.

---

## 20. Future Release Commands

### 20.1 Release APK

Future command:

```powershell
oviora build release-apk
```

Should run:

```powershell
.\gradlew.bat assembleRelease
```

Expected output:

```text
app/build/outputs/apk/release/app-release.apk
```

But a release APK must be signed.

### 20.2 Android App Bundle

Future command:

```powershell
oviora build aab
```

Should run:

```powershell
.\gradlew.bat bundleRelease
```

Expected output:

```text
app/build/outputs/bundle/release/app-release.aab
```

AAB is commonly used for Google Play publishing.

### 20.3 Release Init

Future command:

```powershell
oviora release init
```

Should help create:

```text
keystore file
key alias
secure signing config
release configuration
```

Possible files:

```text
keystore/release-key.jks
keystore/README_SECURITY.txt
signing.properties
```

Important security rule:

```text
Never upload keystore passwords to GitHub.
Never share release-key.jks publicly.
Never lose the keystore.
```

### 20.4 Release Build Flow

Future release flow:

```text
1. oviora release init
2. oviora build release-apk
3. oviora build aab
4. Test release build
5. Upload AAB/APK to chosen store
```

---

## 21. Example Future Plugin Flow

Example camera plugin future flow:

```powershell
oviora create CameraApp
cd CameraApp
oviora add camera
oviora br
```

Expected future result:

```text
Camera permission added
CameraController.java generated
MainActivity hook added
Basic camera button/sample added
App builds and runs
```

Example notification plugin future flow:

```powershell
oviora add notifications
oviora br
```

Expected future result:

```text
NotificationHelper.java generated
Notification channel created
Test notification method added
Runtime permission handled if needed
```

---

## 22. Important Rules

### Rule 1

Edit `oviora/` folder first.

### Rule 2

Use `oviora br` after changes.

### Rule 3

Do not edit deep Android folders unless advanced.

### Rule 4

Do not delete `oviora.config.json`.

### Rule 5

Keep package name safe:

```text
lowercase letters and numbers
```

### Rule 6

If build fails, read:

```text
logs/last-error.txt
```

### Rule 7

Plugin commands are future features unless implemented in code.

---

## 23. Troubleshooting

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
```

### Problem: Android resource error

Check:

```text
oviora/layout/
oviora/images/
```

Common causes:

```text
Missing drawable
Wrong @drawable/name
Wrong @color/name
Invalid XML syntax
```

### Problem: `selectableItemBackground` not found

Correct form:

```xml
?android:attr/selectableItemBackground
```

Wrong form:

```xml
?attr/selectableItemBackground
```

---

## 24. Current Limitations

Oviora Builder v0.1 does not yet include:

```text
Automatic SDK installation
Automatic JDK installation
Automatic Gradle installation
NDK setup
Release APK signing
AAB generation
Plugin system
Camera shortcut command
Microphone shortcut command
Notification shortcut command
Foreground service shortcut command
Background task shortcut command
Volume button shortcut command
Firebase Gradle auto-setup
GUI editor
Code autocomplete
XML visual designer
```

Current v0.1 focuses on:

```text
Create
Sync
Build
Install
Launch
```

---

## 25. Future Upgrade Plan

Planned commands:

```text
oviora clean
oviora logs
oviora open
oviora add camera
oviora add selfie-camera
oviora add microphone
oviora add notifications
oviora add foreground-service
oviora add background-task
oviora add volume-buttons
oviora add firebase
oviora build release-apk
oviora build aab
oviora release init
oviora doctor fix
```

### Future `oviora clean`

Will remove build files:

```text
build/
app/build/
```

### Future `oviora logs`

Will show:

```text
logs/last-error.txt
adb logcat shortcut
build logs
```

### Future `oviora open`

May open:

```text
current project folder
oviora workspace folder
APK output folder
```

### Future setup installer

Future installer may automatically setup:

```text
Node.js
JDK
Android SDK
Build tools
Platform tools
NDK
Gradle
Environment variables
```

Current version does not do this yet.

---

## 26. For AI Tools and Developer Assistants

If an AI tool reads this repository, understand it like this:

```text
Oviora Builder is a Node.js CLI that generates and manages a native Android Java/XML project.
```

Core idea:

```text
User edits oviora/ workspace.
Builder syncs workspace into app/src/main.
Gradle builds APK.
ADB installs and launches APK.
```

Important internal functions:

```text
check()
write()
copyFolderFiles()
saveErrorLog()
explainError()
run()
readProjectConfig()
ensureWorkspace()
syncWorkspace()
ensureGradleWrapper()
buildDebugApk()
launchApp()
installDebugApk()
```

Important current commands:

```text
doctor
create
sync
build
run
br
```

Important future commands:

```text
add
clean
logs
open
release
build aab
build release-apk
```

Do not assume this is a Cordova app.

It is:

```text
Native Android Java/XML generated by a lightweight CLI.
```

---

## 27. For Developers

This project is currently a single-file CLI:

```text
bin/oviora.js
```

Future modular structure can be:

```text
src/
  doctor.js
  create.js
  sync.js
  build.js
  run.js
  errors.js
  plugins/
    camera.js
    microphone.js
    notifications.js
    foreground-service.js
  templates/
  release/
```

But v0.1 intentionally keeps one file for beginner understanding.

---

## 28. Recommended First Test

```powershell
cd C:\Users\hp\oviora-builder
oviora doctor
oviora create TestApp
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

## 29. Summary

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

That is the main purpose of the project.

Current v0.1 is the core builder.

Future versions will add:

```text
plugin commands
native feature shortcuts
release APK
AAB export
automatic setup installer
```
