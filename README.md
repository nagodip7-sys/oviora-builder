# Oviora Builder

**Oviora Builder** is a lightweight native Android CLI builder for beginners — and for developers whose machines can't handle Android Studio.

It creates a real **native Android Java + XML** project, builds an APK, installs it on a connected Android phone, and launches it using simple commands.

Instead of opening Android Studio and searching deep folders, beginners can work inside a simple `oviora/` workspace folder.

---

## 1. Why Oviora Builder?

### The hardware problem

Android Studio recommends 8GB+ RAM, a fast multi-core CPU, and an SSD. On a low-end machine — for example, **4GB RAM, a 2-core processor, and an HDD** — Android Studio becomes nearly unusable. Indexing, Gradle daemon, and the emulator alone can make the IDE crawl before you've written a single line of code.

A huge number of beginner developers, especially in places where high-end laptops aren't affordable, hit this wall immediately. They have a computer. It's just not a computer Android Studio is happy with.

**Oviora Builder removes the IDE entirely.** No background indexing, no emulator requirement, no heavy GUI — just a terminal, a lightweight Node.js CLI, and your phone connected over USB for install/launch. The only resources used are the ones the actual build needs.

### The "pure native" problem

Most beginner-friendly app tools aren't actually native:

| Tool | Language | What it really produces |
|---|---|---|
| React Native | JavaScript | Native UI via a JS bridge |
| Flutter | Dart | Native-like rendering (Skia), not platform code |
| Cordova / Capacitor | HTML/CSS/JS | A WebView wrapper |
| Android Studio | Kotlin/Java + XML | **True native Android code** |
| **Oviora Builder** | **Java + XML** | **True native Android code** |

Android Studio has effectively been the *only* practical way to write pure native Java/XML Android apps. Every "easier" alternative trades away nativeness for convenience.

**Oviora Builder doesn't make that trade.** It gives you the same real, native Java + XML project Android Studio would — same Gradle build, same SDK, same APK — just without the IDE's weight and setup complexity.

### In one line

> Android Studio's native Java/XML output, without Android Studio's hardware demands.

---

## 2. What is Oviora Builder?

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

## 3. Main Goal

The goal is to make Android development easier for beginners — and possible for developers on low-spec hardware.

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

## 4. Current Status

Current version:

```text
Oviora Builder v0.1
Native Java/XML Android CLI Builder
```

Working commands:

```text
oviora
oviora doctor
oviora create MyApp
oviora sync
oviora build
oviora run
oviora br
```

Tested result:

- Project creation works
- Workspace folder creation works
- Sync works
- APK build works
- APK install works
- App auto-launch works
- Error helper works

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

To install and launch apps directly (no emulator needed — important for low-RAM machines):

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

## 7. Installing Oviora Builder

### Option A — From npm

```powershell
npm install -g oviora-builder
```

### Option B — Locally (development)

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

## 14. Important Rules

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

---

## 15. Troubleshooting

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

## 16. Current Limitations

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

## 17. Future Upgrade Plan

Planned commands:

```text
oviora clean
oviora logs
oviora open
oviora add camera
oviora add microphone
oviora add firebase
oviora add location
oviora build release
oviora build aab
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

### Future `oviora add camera`

Will generate:

```text
Camera permission
CameraController.java
Basic camera open code
Manifest changes
```

### Future `oviora add microphone`

Will generate:

```text
RECORD_AUDIO permission
MicrophoneController.java
Basic audio recording code
Manifest changes
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

## 18. For AI Tools and Developer Assistants

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

Why it exists:

```text
Android Studio requires high-end hardware (8GB+ RAM, SSD recommended).
Oviora Builder removes the IDE so native Java/XML development
is possible on low-spec machines (e.g. 4GB RAM, 2-core CPU, HDD),
without sacrificing nativeness like React Native, Flutter, or
Cordova/Capacitor do.
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

Important project commands:

```text
doctor
create
sync
build
run
br
```

Do not assume this is a Cordova app.

It is:

```text
Native Android Java/XML generated by a lightweight CLI.
```

---

## 19. For Developers

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
  templates/
```

But v0.1 intentionally keeps one file for beginner understanding.

---

## 20. Recommended First Test

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

## 21. Summary

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

And it does it without requiring the hardware Android Studio demands — keeping the output 100% native Java/XML, not a bridge, not a WebView.

That is the main purpose of the project.
