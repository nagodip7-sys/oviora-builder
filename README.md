# Oviora Builder

🌐 **Official Website:** https://oviora-builder.netlify.app/  
📦 **NPM Package:** https://www.npmjs.com/package/oviora-builder  
💻 **GitHub Repository:** https://github.com/nagodip7-sys/oviora-builder  
📝 **Blog:** https://oviora-builder.hashnode.dev/oviora-builder-a-lightweight-android-studio-alternative-for-low-spec-pcs  
▶️ **YouTube:** http://www.youtube.com/@OvioraBuilder  
🪟 **Windows Installer:** https://github.com/nagodip7-sys/oviora-builder/releases/download/v1.0.0-windows-installer/Oviora.Builder.Installer.Setup.1.0.0.exe

---

## What is Oviora Builder?

**Oviora Builder** is a lightweight **native Android Java/XML CLI builder** designed for beginners, students, and low-spec Windows PC users.

It helps users create a real native Android project, build a debug APK with Gradle, install it on a connected Android phone using ADB, and launch the app using simple terminal commands.

```powershell
oviora create MyApp
cd MyApp
oviora br
```

`br` means:

```text
Build + Run
```

Oviora Builder is focused on one clear goal:

```text
Make native Android app development easier to start on low-spec Windows PCs without opening the heavy Android Studio GUI.
```

---

## Product Positioning

Oviora Builder is **not** trying to replace Android Studio, Flutter, React Native, or Apache Cordova.

It has a different purpose:

```text
Oviora Builder is a beginner-focused native Android CLI workflow and Windows setup tool.
```

It is designed for users who want to:

```text
Create a native Android Java/XML app
Build an APK
Install it on a real Android phone
Launch it quickly
Avoid heavy IDE setup problems
Work on low-spec Windows PCs
Learn Android project structure step by step
```

---

## Current Versions

```text
Oviora Builder CLI:     v0.2.0-safe-sync
NPM Package:            oviora-builder@1.0.2
Windows Installer:      v1.0.0
Recommended Release Tag: v1.0.0-windows-installer
Android Output:         Native Java/XML Android project
Build System:           Gradle / Gradle Wrapper
Device Install System:  ADB
```

Important note:

```text
The NPM package version, CLI internal version, and Windows Installer version may be released separately.
```

---

## Two Ways to Use Oviora Builder

Oviora Builder currently has two distribution modes:

| Edition | Best For | Setup Style |
|---|---|---|
| **NPM CLI** | Developers who already have Android tools installed | Manual Android setup required |
| **Windows Installer EXE** | Beginners and fresh Windows PCs | Portable tools included / auto setup |

---

## 1. NPM CLI Version

The NPM version is for users who already have the Android development environment installed.

Required tools:

```text
Node.js
NPM
Java JDK
Android SDK
Android Platform-Tools / ADB
Android Command-line Tools
Gradle or Gradle Wrapper support
```

Install from NPM:

```powershell
npm install -g oviora-builder
```

Run:

```powershell
oviora
```

Check system tools:

```powershell
oviora doctor
```

---

## 2. Windows Installer Version

The Windows Installer is designed for beginners and fresh Windows systems.

It is intended to set up Oviora with a portable Android development environment, so the user does not need to manually install Android Studio, Java, Android SDK, Gradle, or Node.js separately.

Download:

```text
Oviora Builder Installer Setup 1.0.0.exe
```

Installer goal:

```text
Install Oviora command
Set up portable tools
Configure a beginner-friendly Android build environment
Allow users to build and run Android apps from PowerShell
```

Typical portable installation structure:

```text
C:\Oviora\
│
├── portable-bin\
│   └── oviora.cmd
│
├── tools\
│   ├── node\
│   ├── jdk\
│   ├── android-sdk\
│   │   ├── platform-tools\
│   │   ├── cmdline-tools\
│   │   └── build-tools\
│   └── gradle\
│
└── oviora-builder\
```

Recommended website wording:

```text
Windows Installer includes portable Node.js, JDK, Android SDK, ADB, and Gradle setup for Windows.
No manual Android Studio setup required on supported Windows 64-bit systems.
```

Important note:

```text
Internet may be required for the first build if Gradle dependencies are not already cached or bundled.
```


---

## Windows Installer Detailed Information

The Windows Installer is one of the main product goals of Oviora Builder.

It is designed for beginners and fresh Windows PCs where Android development tools may not already exist.
The installer provides a portable Android development runtime, so the user does not need to manually install or configure:

```text
Java JDK
Android SDK
Gradle
Node.js
ADB
Environment variables
Android Studio
```

### Installer Includes

```text
Portable Node.js
Portable JDK
Portable Android SDK
Portable Gradle
ADB tools
Oviora CLI
PowerShell command setup
Professional installer UI
```

### Default Install Location

```text
C:\Oviora
```

### Portable Runtime Structure

```text
C:\Oviora\
  portable-bin\
    oviora.cmd
    oviora-doctor.cmd

  tools\
    nodejs\
    jdk\
    android-sdk\
    gradle\
    oviora-cli\
```

### PowerShell Command Setup

The installer adds this path to the **User PATH**:

```text
C:\Oviora\portable-bin
```

It should be added with priority so the portable Oviora command can run from any new PowerShell window.

After installation, open a **new PowerShell window** and run:

```powershell
where.exe oviora
oviora doctor
```

Expected first result:

```text
C:\Oviora\portable-bin\oviora.cmd
```

### Expected Portable Tool Detection

A successful installer-based `oviora doctor` should detect tools from the portable runtime, for example:

```text
ADB installed as C:\Oviora\tools\android-sdk\platform-tools\adb.exe
Gradle daemon JVM using C:\Oviora\tools\jdk
```

This proves that Oviora is using the bundled runtime instead of depending on random system-level Android SDK or JDK paths.

---

## Download

### Windows Installer

Current direct installer link:

```text
https://github.com/nagodip7-sys/oviora-builder/releases/download/v1.0.0-windows-installer/Oviora.Builder.Installer.Setup.1.0.0.exe
```

Recommended GitHub release metadata:

```text
Tag: v1.0.0-windows-installer
Title: Oviora Builder Windows Installer v1.0.0
```

Recommended website button text:

```text
Download Windows Installer (.exe)
```

### NPM CLI

```powershell
npm install -g oviora-builder
```

For beginners, the Windows Installer is recommended because it includes the full portable runtime.
The NPM CLI is better for developers who already have Node.js, JDK, Android SDK, ADB, and Gradle installed.

---

## Installer Preview

The installer UI is an important part of the Oviora Builder experience.
It gives a beginner-friendly first impression before the user even opens PowerShell.

Recommended screenshot path for GitHub repository:

```md
![Oviora Builder Installer](docs/images/installer-preview.png)
```

Recommended website hero visual:

```md
![Oviora Builder World](docs/images/oviora-world.png)
```

---

## System Requirements for Windows Installer

Supported:

```text
Windows 10 64-bit
Windows 11 64-bit
```

Recommended:

```text
4 GB RAM minimum
8 GB RAM recommended
SSD recommended
Around 3 GB free disk space
Android phone with USB debugging enabled for oviora run / oviora br
```

Not supported:

```text
Windows 7
Windows 8 / 8.1
32-bit Windows
```

---

## Windows Security Notice

The Windows installer may currently be unsigned.

If Windows shows:

```text
Windows protected your PC
```

Click:

```text
More info → Run anyway
```

This warning can appear because the installer is new and may not yet have Microsoft SmartScreen reputation.

---

## Why Oviora Builder Exists

Android development is powerful, but the first setup can be difficult for beginners.

Common beginner problems:

```text
Android Studio is too heavy for low-spec PCs
SDK setup is confusing
JDK version conflicts happen
Gradle errors are hard to understand
ADB device setup is confusing
React Native / Flutter / Android Studio default projects can be slow on weak PCs
Many beginners fail before their first APK runs
```

Oviora Builder tries to solve this specific problem:

```text
Help a beginner create, build, install, and launch a real native Android APK with simple commands.
```

---

## What Oviora Builder Is

```text
Native Android Java/XML
CLI based
Beginner friendly
Low-spec PC friendly
Gradle powered
ADB powered
Windows installer friendly
Android Studio GUI not required for normal build/run workflow
```

## What Oviora Builder Is Not

```text
Not Cordova
Not Capacitor
Not WebView
Not Flutter
Not React Native
Not an Android Studio full replacement
Not a complete professional IDE
Not a cross-platform iOS/Android framework
```

---

## Powered By Android Toolchain

Oviora Builder does not invent the Android build system.

It uses the same core Android development toolchain that native Android projects use:

```text
Android SDK
Android Build-Tools
Android Platform-Tools / ADB
Android Command-line Tools
Gradle / Gradle Wrapper
Java JDK / OpenJDK
Android Gradle Plugin
```

Correct credit:

| Area | Credit |
|---|---|
| Android platform | Android / Google ecosystem |
| SDK, ADB, Build Tools | Android SDK ecosystem |
| Java runtime/compiler | JDK / OpenJDK ecosystem |
| Build automation | Gradle |
| Professional GUI workflow | Android Studio |
| Simplified beginner CLI workflow | Oviora Builder |

Best description:

```text
Powered by Android SDK, Gradle, ADB, and JDK.
Simplified by Oviora Builder.
```

---

## Core Idea

Oviora Builder gives beginners a clean workspace:

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

Users should mainly edit files inside:

```text
oviora/
```

Advanced users may edit Android files directly when needed.

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

Recommended beginner command:

```powershell
oviora br
```

It performs:

```text
1. Validate project
2. Validate workspace
3. Backup existing generated files
4. Mirror sync oviora/ to app/src/main/
5. Build debug APK with Gradle
6. Install APK with ADB
7. Launch app on connected Android phone
```

---

## Quick Start

### Using NPM CLI

```powershell
npm install -g oviora-builder
oviora doctor
oviora create MyApp --package com.example.myapp
cd MyApp
oviora br
```

### Using Windows Installer

1. Download and run:

```text
Oviora Builder Installer Setup 1.0.0.exe
```

2. Open a new PowerShell window.

3. Run:

```powershell
oviora
oviora doctor
oviora create MyApp --package com.example.myapp
cd MyApp
oviora br
```

---

## Verified Local Test Example

A local Windows test showed the following successful flow:

```powershell
oviora
oviora doctor
oviora create MyApp
cd MyApp
oviora build
oviora run
```

Observed result:

```text
Oviora command worked
Node.js detected
NPM detected
Java detected
ADB detected from C:\Oviora\tools\android-sdk\platform-tools\adb.exe
Gradle detected
Native Android project created
Gradle Wrapper created automatically
Debug APK built successfully
APK installed on connected Android phone
App launched successfully
```

Successful APK output path:

```text
app\build\outputs\apk\debug\app-debug.apk
```

Successful install/launch result:

```text
Performing Streamed Install
Success
Launching app: com.oviora.myapp
Starting: Intent { cmp=com.oviora.myapp/.MainActivity }
```

---

## Fresh Windows PC Final Test Checklist

To confirm that the Windows Installer works on a clean beginner system, test on a Windows PC where Android tools were never installed.

Before installing Oviora, run:

```powershell
where.exe node
where.exe npm
where.exe java
where.exe javac
where.exe adb
where.exe gradle
where.exe oviora
```

Expected before install:

```text
Commands should not be found on a fresh system.
```

After installing Oviora Builder Windows Installer, open a new PowerShell and run:

```powershell
where.exe oviora
oviora
oviora doctor
```

Then run a real project test:

```powershell
cd Desktop
oviora create TestApp --package com.example.testapp
cd TestApp
oviora br
```

Pass condition:

```text
oviora command works
oviora doctor shows required tools
Project creates successfully
APK builds successfully
APK installs on connected Android phone
App launches successfully
```

Optional advanced tests:

```text
Restart PC and test again
Test from a new Windows user account
Test with internet ON
Test with internet OFF after installer download
Test uninstall and reinstall
Test PATH conflicts with existing Java/Android SDK
```

---

## Project Folder Structure

After:

```powershell
oviora create MyApp
```

Expected structure:

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

## Sync Mapping

```text
oviora/layout/   → app/src/main/res/layout/
oviora/java/     → app/src/main/java/<package>/
oviora/images/   → app/src/main/res/drawable/
oviora/values/   → app/src/main/res/values/
oviora/firebase/google-services.json → app/google-services.json
```

---

## Which Folder Should Beginners Edit?

Edit this:

```text
oviora/
```

Normally avoid editing this unless advanced:

```text
app/
```

Recommended beginner files:

```text
oviora/layout/activity_main.xml
oviora/java/MainActivity.java
oviora/images/
oviora/values/
oviora/firebase/google-services.json
```

Advanced files:

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

## Safe Sync System

Oviora v0.2 introduced a safer source-of-truth workflow.

### Source of Truth

```text
oviora/ is the source of truth.
app/src/main/... is generated output.
```

### Mirror Sync

If a file is deleted from:

```text
oviora/layout/
```

it is also removed from:

```text
app/src/main/res/layout/
```

This prevents deleted files from coming back during sync.

### Backup Before Sync

Before sync, Oviora creates backups here:

```text
.oviora/backups/
```

### No Dangerous Auto-Restore During Build

If a workspace file is missing, Oviora does not silently restore old files during build.

Use this command only when you want default files back:

```powershell
oviora restore
```

Force restore:

```powershell
oviora restore --force
```

---

## Command Details

### `oviora`

Shows help and available commands.

```powershell
oviora
```

### `oviora doctor`

Checks required development tools.

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

Creates a project with a custom package name.

```powershell
oviora create MyApp --package com.example.myapp
```

Use this for Firebase apps and real projects.

### `oviora sync`

Mirror syncs workspace files into generated Android output.

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

Builds the debug APK.

```powershell
oviora build
```

Output:

```text
app/build/outputs/apk/debug/app-debug.apk
```

### `oviora run`

Installs and launches the APK on a connected Android phone.

```powershell
oviora run
```

If APK is missing or stale, Oviora may rebuild first.

### `oviora br`

Build + Run.

```powershell
oviora br
```

Recommended daily beginner command.

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

Shows information such as:

```text
App name
Package name
Workspace status
APK status
Missing folders
Stale APK status
```

---

## Required Software for NPM CLI

The NPM CLI version expects these tools to be installed manually.

### Node.js and NPM

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

### Android Phone

Enable on your phone:

```text
Developer Options
USB Debugging
```

Check connection:

```powershell
adb devices
```

Expected:

```text
device
```

---

## Environment Variables for Manual Setup

### JAVA_HOME

Example:

```text
C:\Program Files\Java\jdk-17
```

or:

```text
C:\Program Files\Java\jdk-21
```

### ANDROID_HOME

Example:

```text
C:\Users\<username>\AppData\Local\Android\Sdk
```

### ANDROID_SDK_ROOT

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

## Why It Can Be Faster on Low-Spec PCs

Oviora Builder is focused and minimal.

It avoids:

```text
Heavy Android Studio GUI
IDE indexing
Emulator startup
Flutter engine setup
React Native Metro bundler
Cordova WebView workflow
Large framework bootstrap
```

It focuses on:

```text
Native Java/XML template
Gradle build
ADB install
ADB launch
Simple CLI commands
```

A local low-spec PC test showed that a default native Android app could be created, built, installed, and launched in under 6 minutes.

Safe wording:

```text
Tested on a 2GB RAM low-spec Windows PC: Oviora Builder created, built, installed, and launched a default native Android app in under 6 minutes.
```

Note:

```text
Build time may vary depending on PC speed, internet speed, Gradle cache, storage speed, Android SDK state, and connected device.
```

---

## Comparison with Other Tools

| Topic | Oviora Builder | Android Studio | Flutter | React Native | Cordova |
|---|---|---|---|---|---|
| Main purpose | Native Android CLI builder | Full Android IDE | Cross-platform UI framework | Cross-platform JS framework | Web app to APK |
| Low-spec PC support | Strong goal | Heavy | Heavy/medium | Heavy/medium | Light/medium |
| Beginner setup | Simple with EXE installer | Complex | Complex | Complex | Medium |
| Native Java/XML output | Yes | Yes | No | No | No |
| WebView dependency | No | No | No | No | Yes |
| Android Studio GUI required | No | Yes | Often needed for setup/debug | Often needed for setup/debug | Sometimes needed |
| Cross-platform iOS support | No | No | Yes | Yes | Possible |
| Professional debugger/profiler | No | Yes | Good ecosystem | Good ecosystem | Limited |
| First APK on weak PC | Strong focus | Can be slow | Can be slow | Can be slow | Possible |

Correct positioning:

```text
Oviora Builder does not try to be the biggest Android tool.
It tries to be one of the fastest beginner paths to a real native Android APK on low-spec Windows PCs.
```

---

## Where Oviora Builder Can Beat Other Tools

Oviora can be stronger in these specific areas:

```text
Low-spec Windows PC usage
Beginner first APK success
Simple native Android command workflow
No heavy IDE requirement
No WebView output
No cross-platform abstraction for basic Android learning
Portable Windows installer setup
Fast build/install/launch workflow for small native apps
```

Oviora should not claim to beat other tools in every area.

Android Studio, Flutter, React Native, and Cordova are still stronger for many professional use cases.

---

## Where Other Tools Are Still Stronger

Android Studio is stronger for:

```text
Professional Android development
Debugger
Profiler
Layout editor
Logcat UI
Emulator manager
Kotlin
Jetpack Compose
Signing wizard
Large projects
```

Flutter is stronger for:

```text
Beautiful cross-platform UI
Animations
Hot reload
Android + iOS from one codebase
Modern production apps
```

React Native is stronger for:

```text
JavaScript/React teams
Cross-platform apps
Large JS ecosystem
Hot reload
Existing React developers
```

Cordova is stronger for:

```text
Turning existing HTML/CSS/JS web apps into APKs
Simple web-to-mobile experiments
Web developer friendly workflows
```

---

## Real-World Product Value

Oviora Builder is a real-world solution for a specific niche:

```text
Beginner Android development on low-spec Windows PCs.
```

Target users:

```text
Students
Beginners
Low-spec laptop users
Training centers
School/college coding labs
Developers who dislike heavy IDE setup
Users who want a fast first native APK
People learning Android Java/XML basics
```

Not the main target:

```text
Senior Android engineers
Enterprise mobile teams
Advanced Kotlin/Compose developers
Cross-platform iOS/Android teams
Large Play Store production pipelines
```

---

## Firebase and Native Feature Manual Test Support

Current v0.2 supports manual native feature testing by editing files.

Examples:

```text
Firebase google-services.json sync
Firebase Google Sign-In manual setup
Native notification test
Camera intent test
Microphone recording test
Location test
Runtime permissions
```

Firebase config path:

```text
oviora/firebase/google-services.json
```

After sync:

```text
app/google-services.json
```

Important:

```text
The Android package name in oviora.config.json must match the Firebase package name inside google-services.json.
```

---

## Firebase Google Sign-In Test Flow

Create project:

```powershell
oviora create YuvaJyoti --package com.yuvajyoti
cd YuvaJyoti
```

Add Firebase config:

```text
oviora/firebase/google-services.json
```

Enable Google provider in Firebase Console:

```text
Authentication
→ Sign-in method
→ Google
→ Enable
→ Save
```

If Google Sign-In gives error code 10, add SHA-1:

```powershell
.\gradlew.bat signingReport
```

Then download a fresh `google-services.json` and replace:

```text
oviora/firebase/google-services.json
```


---

## Detailed Firebase Google Sign-In Test Project

This section shows how to create a simple native Android app with:

```text
Google Sign-In
FirebaseAuth login
Gmail account picker
Name and email display
Sign out
```

### 1. Create Project

Replace the package with your own Firebase Android package name.

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

### 2. Add Firebase Config

Place your Firebase Android config file here:

```text
oviora/firebase/google-services.json
```

After sync, Oviora copies it to:

```text
app/google-services.json
```

Use this public placeholder name instead of a real config when publishing examples:

```text
google-services.sample.json
```

### 3. Enable Google Provider in Firebase

Firebase Console:

```text
Authentication
→ Sign-in method
→ Google
→ Enable
→ Save
```

### 4. Add SHA-1 If Needed

If Google Sign-In gives error code 10:

```powershell
.\gradlew.bat signingReport
```

Copy SHA-1 and add it in Firebase Console:

```text
Project settings
→ Your Android app
→ SHA certificate fingerprints
→ Add SHA-1
```

Then download a fresh `google-services.json` and replace:

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

```gradle
versionCode 10001
versionName '10.0.1'
```

---

## Expected Native Test Result

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

## Common Problems and Fixes

### Problem: `oviora` command not found

Possible causes:

```text
NPM package not installed
Windows Installer PATH not applied
PowerShell was not reopened after install
Portable oviora.cmd missing
```

Fix:

```powershell
where.exe oviora
npm install -g oviora-builder
```

For Windows Installer, reopen PowerShell after install.

---

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

---

### Problem: Android SDK path not found

Fix:

```powershell
oviora doctor
```

Check:

```text
ANDROID_HOME
ANDROID_SDK_ROOT
platform-tools
cmdline-tools
```

---

### Problem: No Android device found

Fix:

```powershell
adb devices
```

Then:

```text
Enable Developer Options
Enable USB Debugging
Reconnect USB cable
Accept the phone permission popup
```

---

### Problem: APK install failed

Possible causes:

```text
Phone not connected
USB debugging not allowed
Old app conflict
Version downgrade
Low storage
```

Fix:

```powershell
adb devices
adb uninstall your.package.name
oviora br
```

---

### Problem: Version downgrade

Error:

```text
INSTALL_FAILED_VERSION_DOWNGRADE
```

Fix option 1:

```powershell
adb uninstall your.package.name
oviora br
```

Fix option 2:

Increase version code:

```gradle
versionCode 10001
versionName '10.0.1'
```

---

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

---

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

---

### Problem: `default_web_client_id` not found

Possible causes:

```text
Google services Gradle plugin not applied
google-services.json not copied to app/google-services.json
Firebase package name mismatch
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

---

### Problem: Google Sign-In error code 10

Usually caused by SHA-1 mismatch.

Fix:

```powershell
.\gradlew.bat signingReport
```

Add SHA-1 in Firebase Console and download a fresh `google-services.json`.


---

## Additional Troubleshooting

### Problem: Wrong `oviora` Command Is Running

If `where.exe oviora` shows an old NPM command before the portable command, the portable path must be placed first.

Expected first result for the Windows Installer:

```text
C:\Oviora\portable-bin\oviora.cmd
```

The Windows installer should handle this automatically by adding:

```text
C:\Oviora\portable-bin
```

to the User PATH with priority.

### Problem: Notification Does Not Show

Check:

```text
Android 13+ needs POST_NOTIFICATIONS permission
Notification permission is allowed
Notification channel is created
Phone notification settings are not blocked
```

### Problem: Camera Does Not Open

Check:

```text
Camera permission allowed
Device has a camera app installed
Camera is not blocked
```

### Problem: Microphone Test Fails

Check:

```text
Microphone permission allowed
No other app is using microphone
Device microphone is working
```

### Problem: Location Not Received

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

Do not paste private keys into README files, issues, screenshots, or public examples.

Android `google-services.json` is normally included inside Android apps, but public repositories should avoid exposing real project config unless the developer understands the risk.

---

## Release Build / AAB Status

Current v0.2 focuses on debug APK builds.

Current output:

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

Planned release commands:

```powershell
oviora build release-apk
oviora build aab
oviora release init
```

Future release support should handle:

```text
Keystore
Signing config
Version code
Version name
AAB export
Release APK export
```

Security rule:

```text
Never upload release-key.jks or signing passwords publicly.
```

---

## Plugin System Status

### Current v0.2

These commands are planned but not fully implemented yet:

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

## Future Roadmap

Planned features:

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

### Future `oviora doctor fix`

Potential goal:

```text
Detect broken/missing environment tools
Explain the exact issue
Suggest fix commands
Use bundled tools when available
Reduce setup confusion for beginners
```

### Future `oviora add firebase`

Should automatically add:

```text
Google services plugin
Firebase BoM
Firebase Auth dependency
google-services.json check
Firebase setup helper
```

### Future `oviora add google-login`

Should generate:

```text
Google Sign-In button
FirebaseAuth code
GoogleSignInClient setup
Name/email display code
Sign out button
```

### Future `oviora add notification`

Should generate:

```text
POST_NOTIFICATIONS permission
Notification channel
Local notification demo
NotificationManager code
```

### Future `oviora add camera`

Should generate:

```text
CAMERA permission
Camera intent test
Camera button
Runtime permission code
```

### Future `oviora add microphone`

Should generate:

```text
RECORD_AUDIO permission
MediaRecorder demo
3-second test recording
Runtime permission code
```

### Future `oviora add location`

Should generate:

```text
ACCESS_FINE_LOCATION permission
ACCESS_COARSE_LOCATION permission
LocationManager demo
Latitude/longitude output
```

---

## Recommended Website Messaging

Hero line:

```text
Build your first real native Android APK on low-spec Windows PCs without opening Android Studio.
```

Short description:

```text
Oviora Builder is a lightweight native Android Java/XML CLI builder for beginners and low-spec Windows PCs.
```

Installer card:

```text
Windows Installer v1.0.0
One-click Windows setup with portable Node.js, JDK, Android SDK, ADB, and Gradle.
No manual Android Studio setup required on supported Windows 64-bit systems.
```

NPM card:

```text
Global NPM CLI v0.2.0
For developers who already have Node.js, Java, Android SDK, ADB, and Gradle installed.
```

Important note:

```text
NPM CLI is for already configured developer systems.
Windows Installer is for beginners and fresh Windows PCs.
```


---

## Website Design Direction

The website should match the installer UI and the low-spec beginner-friendly product identity.

Recommended style:

```text
Dark purple fantasy developer theme
Crystal Android world background
Glassmorphism cards
Soft neon pink / violet buttons
Android green success accent
Clean CLI command blocks
Professional installer screenshot
```

Recommended hero text:

```text
Oviora Builder
Native Android Java/XML development made lightweight.
```

Recommended subtitle:

```text
Install once. Open PowerShell. Start building native Android apps without Android Studio.
```

Recommended buttons:

```text
Download for Windows
View on GitHub
Watch on YouTube
```

Recommended website sections:

```text
Hero
Download
Why Oviora
CLI workflow
Native Android explanation
Installer preview
System requirements
Security note
Footer
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

Possible future modular structure:

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

## Release Checklist

Before publishing a new Windows installer:

```text
1. Update install.ps1
2. Rebuild installer
3. Run installer or direct script test
4. Confirm C:\Oviora\portable-bin is first in User PATH
5. Run where.exe oviora
6. Confirm first result is C:\Oviora\portable-bin\oviora.cmd
7. Run oviora doctor
8. Confirm ADB path is C:\Oviora\tools\android-sdk\platform-tools\adb.exe
9. Confirm Gradle JVM is C:\Oviora\tools\jdk
10. Upload only the EXE to GitHub Releases
```

Do not upload:

```text
win-unpacked/
.exe.blockmap
builder-debug.yml
builder-effective-config.yaml
node_modules/
runtime/
private keys
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

Current v0.2 adds:

```text
Safe sync
Mirror sync
Backup before sync
Restore command
Status command
Custom package name support
Debug APK build
ADB install
ADB launch
Firebase config sync
Manual native feature testing support
```

Windows Installer v1.0.0 adds the bigger product goal:

```text
Portable Windows setup for Oviora with Node.js, JDK, Android SDK, ADB, and Gradle.
```

Final positioning:

```text
Oviora Builder is not the biggest Android tool.
It is designed to be one of the simplest ways for beginners and low-spec Windows PC users to build and run a real native Android APK.
```


---

## Final Tagline

```text
Build native Android apps without the heavy setup.
```

```text
Powered by Android SDK, Gradle, ADB, and JDK.
Simplified by Oviora Builder.
```
