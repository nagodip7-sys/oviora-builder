# Oviora Builder

**Build native Android apps without the heavy setup.**

Oviora Builder is a lightweight **native Android Java/XML CLI builder** for beginners, students, low-spec PCs, and developers who want a fast build-run workflow without opening the Android Studio GUI.

```powershell
oviora doctor
oviora create MyApp
cd MyApp
oviora br
```

`oviora br` means **Build + Run**: it syncs your workspace, builds the APK, installs it on a connected Android phone, and launches the app automatically.

---

## Official Links

- 🌐 **Website:** https://oviora-builder.netlify.app/
- 📦 **NPM Package:** https://www.npmjs.com/package/oviora-builder
- 💻 **GitHub Repository:** https://github.com/nagodip7-sys/oviora-builder
- 📝 **Blog:** https://oviora-builder.hashnode.dev/oviora-builder-a-lightweight-android-studio-alternative-for-low-spec-pcs
- ⬇️ **Windows Installer:** https://github.com/nagodip7-sys/oviora-builder/releases/download/v1.0.0-windows-installer/Oviora.Builder.Installer.Setup.1.0.0.exe

---

## Current Public Version

```text
NPM Package:        oviora-builder@1.0.2
CLI Engine:         0.2.0-safe-sync
Windows Installer:  v1.0.0
Release Tag:        v1.0.0-windows-installer
```

---

## What is Oviora Builder?

Oviora Builder creates a real native Android Java/XML project and manages the build workflow from the terminal.

It uses:

```text
Java
XML
Android SDK
Gradle
ADB
Node.js CLI
```

It is **not**:

```text
Not Flutter
Not React Native
Not Cordova
Not Capacitor
Not WebView
```

Oviora Builder is designed for this simple workflow:

```text
Install Oviora
Open PowerShell
Create app
Build APK
Install on phone
Launch app
```

---

## Recommended: Windows Installer

For beginners, the **Windows Installer** is the recommended option.

Download:

```text
Oviora.Builder.Installer.Setup.1.0.0.exe
```

Direct link:

```text
https://github.com/nagodip7-sys/oviora-builder/releases/download/v1.0.0-windows-installer/Oviora.Builder.Installer.Setup.1.0.0.exe
```

### What the installer does

The installer automatically sets up a portable Android development runtime.

It installs Oviora into:

```text
C:\Oviora
```

It includes:

```text
C:\Oviora\tools\nodejs
C:\Oviora\tools\jdk
C:\Oviora\tools\android-sdk
C:\Oviora\tools\gradle
C:\Oviora\tools\oviora-cli
C:\Oviora\portable-bin
```

It adds this folder to the **User PATH**:

```text
C:\Oviora\portable-bin
```

This allows users to open a new PowerShell window and run:

```powershell
oviora doctor
oviora create MyApp
cd MyApp
oviora br
```

No manual setup is required for:

```text
Java JDK
Android SDK
Gradle
Node.js
ADB
JAVA_HOME
ANDROID_HOME
ANDROID_SDK_ROOT
```

The `oviora.cmd` launcher sets the portable environment automatically when the `oviora` command runs.

---

## Important After Installation

After installing the Windows EXE, open a **new PowerShell window**.

Then run:

```powershell
oviora doctor
```

Expected result:

```text
Node.js: OK
NPM: OK
Java: OK
ADB: OK
Gradle: OK
```

To confirm the portable installer environment is being used:

```powershell
where.exe oviora
```

Expected first result:

```text
C:\Oviora\portable-bin\oviora.cmd
```

---

## Security Notice

The Windows installer is currently unsigned.

If Windows shows:

```text
Windows protected your PC
```

Click:

```text
More info → Run anyway
```

This warning appears because the installer is new and does not yet have Microsoft SmartScreen reputation.

---

## System Requirements

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
Android phone with USB debugging enabled for run/br
```

Not supported:

```text
Windows 7
Windows 8 / 8.1
32-bit Windows
```

---

## Install from NPM

If you already have Node.js, Java, Android SDK, ADB, and Gradle configured, you can install from NPM:

```powershell
npm install -g oviora-builder
```

Run:

```powershell
oviora
```

For beginners, the Windows Installer is better because it includes the complete portable runtime.

---

## Beginner Quick Start

```powershell
oviora doctor
oviora create MyApp
cd MyApp
oviora br
```

That is the main beginner workflow.

### What `oviora br` does

```text
1. Validates the project
2. Validates the Oviora workspace
3. Creates backup of generated files
4. Mirror-syncs oviora/ into app/src/main/
5. Builds APK with Gradle
6. Installs APK using ADB
7. Launches the app on the connected phone
```

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

---

## Command Details

### `oviora`

Shows help.

```powershell
oviora
```

### `oviora doctor`

Checks required tools.

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

Creates a project with a custom Android package name.

```powershell
oviora create MyApp --package com.example.myapp
```

Use this for Firebase or real package-based Android apps.

### `oviora sync`

Mirror-syncs the Oviora workspace to the generated Android project.

```powershell
oviora sync
```

### `oviora build`

Builds the debug APK.

```powershell
oviora build
```

APK output:

```text
app/build/outputs/apk/debug/app-debug.apk
```

### `oviora run`

Installs and launches the APK on a connected Android phone.

```powershell
oviora run
```

If the APK is missing or stale, Oviora rebuilds first.

### `oviora br`

Build + Run.

```powershell
oviora br
```

This is the recommended daily command.

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

Shows:

```text
App name
Package name
Workspace status
APK status
Missing folders
Stale APK status
```

---

## Project Structure

After:

```powershell
oviora create MyApp
```

Project structure:

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

## Source of Truth Rule

Oviora Builder uses a safe workspace system.

```text
oviora/ = source of truth
app/src/main/... = generated output
```

Users should mainly edit:

```text
oviora/layout/
oviora/java/
oviora/images/
oviora/values/
oviora/firebase/
```

Oviora syncs them into:

```text
oviora/layout/                    → app/src/main/res/layout/
oviora/java/                      → app/src/main/java/<package>/
oviora/images/                    → app/src/main/res/drawable/
oviora/values/                    → app/src/main/res/values/
oviora/firebase/google-services.json → app/google-services.json
```

Normally beginners should not edit `app/src/main/` directly unless they know what they are doing.

---

## Safe Sync System

Oviora Builder `0.2.0-safe-sync` includes a safer sync model.

### 1. Mirror sync

If a file is deleted from:

```text
oviora/layout/
```

it is also removed from:

```text
app/src/main/res/layout/
```

This prevents old deleted files from coming back.

### 2. Backup before sync

Before syncing, Oviora creates backups in:

```text
.oviora/backups/
```

### 3. No dangerous auto-restore during build

Oviora does not silently recreate missing workspace files during build.

If a workspace file is missing, the build stops and tells the user to run:

```powershell
oviora restore
```

### 4. Stale APK detection

If the APK is old or missing, `oviora run` can rebuild before installing.

### 5. Custom package support

Create apps with a real package name:

```powershell
oviora create MyApp --package com.example.myapp
```

---

## Windows Installer vs NPM

| Feature | Windows Installer | NPM Install |
|---|---|---|
| Beginner friendly | Yes | Medium |
| Includes Node.js | Yes | No |
| Includes JDK | Yes | No |
| Includes Android SDK | Yes | No |
| Includes Gradle | Yes | No |
| Includes ADB | Yes | No |
| Auto command setup | Yes | NPM global command |
| Manual environment setup | No | Usually yes |
| Best for | Beginners / low-spec PCs | Developers with existing setup |

---

## Native Android, Not WebView

Oviora Builder creates a native Android Java/XML project.

It does not use:

```text
Flutter engine
React Native bridge
Cordova WebView
Capacitor WebView
```

It uses:

```text
Java
XML
Android SDK
Gradle
ADB
```

This means the generated app is a real Android project, not a website wrapped inside an app.

---

## Firebase Support Status

Current version supports Firebase configuration sync.

Place Firebase config here:

```text
oviora/firebase/google-services.json
```

Oviora syncs it to:

```text
app/google-services.json
```

For public repositories, do not upload private Firebase/admin files.

Use sample files such as:

```text
google-services.sample.json
```

Current Firebase features are still manual setup. Automatic commands are planned for future versions.

---

## Manual Native Feature Test Support

Oviora Builder can be used to manually test native Android features by editing Java/XML/Gradle files.

Tested/manual feature areas:

```text
Google Sign-In
FirebaseAuth
Local notification
Camera intent
Microphone recording test
Location test
Runtime permissions
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

```powershell
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

If an older app package conflicts:

```powershell
adb uninstall com.example.testapp
oviora br
```

---

## Common Problems and Fixes

### `oviora` command not found

Close the old PowerShell and open a new PowerShell window.

Check:

```powershell
where.exe oviora
```

Expected first line:

```text
C:\Oviora\portable-bin\oviora.cmd
```

If missing, reinstall with the Windows Installer or check that `C:\Oviora\portable-bin` exists in User PATH.

### `oviora.config.json not found`

You are not inside an Oviora project folder.

Fix:

```powershell
cd YourAppFolder
oviora br
```

### ADB: NOT FOUND

If using the Windows Installer, run:

```powershell
where.exe oviora
```

The first result should be:

```text
C:\Oviora\portable-bin\oviora.cmd
```

If NPM global `oviora` appears first, the wrong command is running. Reinstall the Windows Installer or move `C:\Oviora\portable-bin` to the top of User PATH.

### No device found

Run:

```powershell
adb devices
```

Then check:

```text
USB debugging enabled
USB cable supports data transfer
Phone authorization popup accepted
Android device drivers installed if required
```

### APK install failed

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

### Java compile error

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

### Android resource error

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

### Google Sign-In error code 10

Usually caused by SHA-1 mismatch.

Fix:

```powershell
.\gradlew.bat signingReport
```

Add SHA-1 in Firebase Console and download a fresh `google-services.json`.

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
release-key.jks
```

Android `google-services.json` is normally included in Android apps, but public repositories should avoid exposing real project config unless you understand the risk.

---

## Current Plugin System Status

Current version supports manual native feature testing by editing files.

These commands are planned, not fully implemented yet:

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
oviora release init
oviora doctor fix
```

---

## Release APK and AAB Status

Current version supports debug APK:

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

Release APK and AAB support are planned for future versions.

Future commands:

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

Do not assume this is Cordova, Capacitor, Flutter, React Native, or WebView.

It is:

```text
Native Android Java/XML generated by a lightweight CLI.
```

---

## For Developers

Current simple CLI entry:

```text
bin/oviora.js
```

Recommended future modular structure:

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

## Roadmap

Planned improvements:

```text
More app templates
Better project generator
Built-in guide command
Installer Open Oviora Terminal button
Automatic Firebase setup command
Automatic native feature commands
Release APK support
AAB export support
More beginner examples
Improved documentation website
```

---

## Summary

Oviora Builder turns this complex Android workflow:

```text
Install Java
Install Android SDK
Configure ADB
Configure Gradle
Create Android project
Write Java
Write XML
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

With the Windows Installer, users can start without manually installing Android Studio, Java, Android SDK, Gradle, Node.js, or ADB.

---

## Final Tagline

**Oviora Builder — Native Android Java/XML development made lightweight.**
