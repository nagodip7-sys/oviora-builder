#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync, spawnSync } = require("child_process");

console.log("Oviora Builder Started");

const cmd = process.argv[2];

function check(name, command) {
  try {
    console.log(`\nChecking ${name}...`);
    execSync(command, { stdio: "inherit" });
    console.log(`${name}: OK`);
  } catch {
    console.log(`${name}: NOT FOUND`);
  }
}

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function copyFolderFiles(sourceDir, targetDir) {
  if (!fs.existsSync(sourceDir)) {
    return;
  }

  fs.mkdirSync(targetDir, { recursive: true });

  for (const item of fs.readdirSync(sourceDir)) {
    const sourcePath = path.join(sourceDir, item);
    const targetPath = path.join(targetDir, item);

    if (fs.statSync(sourcePath).isDirectory()) {
      copyFolderFiles(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

function saveErrorLog(command, output) {
  const logsDir = path.join(process.cwd(), "logs");
  fs.mkdirSync(logsDir, { recursive: true });

  const logPath = path.join(logsDir, "last-error.txt");

  const logContent = `
OVIORA BUILD ERROR LOG
======================

Time:
${new Date().toString()}

Command:
${command}

Output:
${output}
`.trim();

  fs.writeFileSync(logPath, logContent);
  return logPath;
}

function explainError(output) {
  console.log("\nOviora Error Helper");
  console.log("-------------------");

  const text = output.toLowerCase();

  if (text.includes("sdk location not found") || text.includes("android_home") || text.includes("sdk.dir")) {
    console.log("Problem: Android SDK path was not found.");
    console.log("Suggested fix:");
    console.log("1. Run: oviora doctor");
    console.log("2. Check ANDROID_HOME environment variable.");
    console.log("3. Make sure Android SDK is installed.");
  }

  else if (text.includes("failed to install") || text.includes("install_failed")) {
    console.log("Problem: APK installation failed.");
    console.log("Suggested fix:");
    console.log("1. Check if the phone is connected.");
    console.log("2. Run: adb devices");
    console.log("3. Uninstall the old app manually if package conflict happens.");
  }

  else if (text.includes("device") && text.includes("not found")) {
    console.log("Problem: No Android device was found.");
    console.log("Suggested fix:");
    console.log("1. Enable USB Debugging on your phone.");
    console.log("2. Reconnect USB cable.");
    console.log("3. Run: adb devices");
  }

  else if (text.includes("cannot find symbol")) {
    console.log("Problem: Java compile error.");
    console.log("Suggested fix:");
    console.log("1. Check MainActivity.java.");
    console.log("2. Check wrong class names, variable names, or missing imports.");
    console.log("3. Check if XML IDs match Java findViewById IDs.");
  }

  else if (text.includes("selectableitembackground") && text.includes("not found")) {
    console.log("Problem: Invalid Android attribute reference.");
    console.log("Suggested fix:");
    console.log("1. Use ?android:attr/selectableItemBackground.");
    console.log("2. Do not use ?attr/selectableItemBackground in pure native template.");
    console.log("3. Check oviora/layout/bottom_navigation.xml.");
  }

  else if (text.includes("resource") && text.includes("not found")) {
    console.log("Problem: Android resource error.");
    console.log("Suggested fix:");
    console.log("1. Check XML files inside app/src/main/res/.");
    console.log("2. Check layout names, id names, style names.");
    console.log("3. Make sure referenced files actually exist.");
  }

  else if (text.includes("manifest merger failed")) {
    console.log("Problem: AndroidManifest.xml merge failed.");
    console.log("Suggested fix:");
    console.log("1. Check AndroidManifest.xml.");
    console.log("2. Check duplicated permissions, services, or activities.");
    console.log("3. Check plugin-added manifest rules.");
  }

  else if (text.includes("gradle wrapper") || text.includes("'gradle' is not recognized") || text.includes("gradle is not recognized")) {
    console.log("Problem: Gradle was not found.");
    console.log("Suggested fix:");
    console.log("1. Install Gradle or add Gradle to PATH.");
    console.log("2. After wrapper is created once, use .\\gradlew.bat internally.");
  }

  else if (text.includes("java_home") || text.includes("java is not recognized")) {
    console.log("Problem: Java/JDK was not found.");
    console.log("Suggested fix:");
    console.log("1. Install JDK.");
    console.log("2. Set JAVA_HOME.");
    console.log("3. Run: oviora doctor");
  }

  else if (text.includes("activity class") && text.includes("does not exist")) {
    console.log("Problem: App launch failed because MainActivity was not found.");
    console.log("Suggested fix:");
    console.log("1. Check packageName inside oviora.config.json.");
    console.log("2. Check MainActivity.java package line.");
    console.log("3. Rebuild the app using: oviora build");
  }

  else {
    console.log("Problem: Unknown error.");
    console.log("Suggested fix:");
    console.log("1. Read the full error above.");
    console.log("2. Check logs/last-error.txt.");
    console.log("3. Run: oviora doctor.");
  }
}

function run(command, options = {}) {
  const exitOnError = options.exitOnError !== false;

  const result = spawnSync(command, {
    shell: true,
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 20
  });

  const stdout = result.stdout || "";
  const stderr = result.stderr || "";
  const output = stdout + stderr;

  if (stdout) process.stdout.write(stdout);
  if (stderr) process.stderr.write(stderr);

  if (result.status !== 0) {
    const errorOutput = output || result.error?.message || "Command failed without output.";
    const logPath = saveErrorLog(command, errorOutput);

    console.log("\nCommand failed:");
    console.log(command);

    explainError(errorOutput);

    console.log("\nFull log saved at:");
    console.log(logPath);

    if (exitOnError) {
      process.exit(1);
    }

    return false;
  }

  return true;
}

function readProjectConfig() {
  const configPath = path.join(process.cwd(), "oviora.config.json");

  if (!fs.existsSync(configPath)) {
    console.log("oviora.config.json not found.");
    console.log("Please run this command inside an Oviora project folder.");
    process.exit(1);
  }

  return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

function ensureWorkspace() {
  const config = readProjectConfig();
  const packageName = config.packageName;
  const packagePath = packageName.replace(/\./g, path.sep);

  const workspaceDir = path.join(process.cwd(), "oviora");
  const workspaceLayoutDir = path.join(workspaceDir, "layout");
  const workspaceJavaDir = path.join(workspaceDir, "java");
  const workspaceImagesDir = path.join(workspaceDir, "images");
  const workspaceFirebaseDir = path.join(workspaceDir, "firebase");

  fs.mkdirSync(workspaceLayoutDir, { recursive: true });
  fs.mkdirSync(workspaceJavaDir, { recursive: true });
  fs.mkdirSync(workspaceImagesDir, { recursive: true });
  fs.mkdirSync(workspaceFirebaseDir, { recursive: true });

  const internalLayoutDir = path.join(process.cwd(), "app", "src", "main", "res", "layout");
  const internalJavaDir = path.join(process.cwd(), "app", "src", "main", "java", packagePath);

  const layoutFiles = [
    "activity_main.xml",
    "header.xml",
    "bottom_navigation.xml"
  ];

  for (const fileName of layoutFiles) {
    const workspaceFile = path.join(workspaceLayoutDir, fileName);
    const internalFile = path.join(internalLayoutDir, fileName);

    if (!fs.existsSync(workspaceFile) && fs.existsSync(internalFile)) {
      fs.copyFileSync(internalFile, workspaceFile);
    }
  }

  const workspaceMainActivity = path.join(workspaceJavaDir, "MainActivity.java");
  const internalMainActivity = path.join(internalJavaDir, "MainActivity.java");

  if (!fs.existsSync(workspaceMainActivity) && fs.existsSync(internalMainActivity)) {
    fs.copyFileSync(internalMainActivity, workspaceMainActivity);
  }
}

function syncWorkspace() {
  ensureWorkspace();

  const config = readProjectConfig();
  const packageName = config.packageName;
  const packagePath = packageName.replace(/\./g, path.sep);

  const workspaceDir = path.join(process.cwd(), "oviora");

  const workspaceLayoutDir = path.join(workspaceDir, "layout");
  const workspaceJavaDir = path.join(workspaceDir, "java");
  const workspaceImagesDir = path.join(workspaceDir, "images");
  const workspaceFirebaseFile = path.join(workspaceDir, "firebase", "google-services.json");

  const androidLayoutDir = path.join(process.cwd(), "app", "src", "main", "res", "layout");
  const androidJavaDir = path.join(process.cwd(), "app", "src", "main", "java", packagePath);
  const androidDrawableDir = path.join(process.cwd(), "app", "src", "main", "res", "drawable");
  const androidFirebaseFile = path.join(process.cwd(), "app", "google-services.json");

  console.log("Syncing Oviora workspace...");

  copyFolderFiles(workspaceLayoutDir, androidLayoutDir);
  copyFolderFiles(workspaceJavaDir, androidJavaDir);
  copyFolderFiles(workspaceImagesDir, androidDrawableDir);

  if (fs.existsSync(workspaceFirebaseFile)) {
    fs.copyFileSync(workspaceFirebaseFile, androidFirebaseFile);
    console.log("Firebase config synced.");
  }

  console.log("Workspace sync complete.");
}

function ensureGradleWrapper() {
  const gradlewPath = path.join(process.cwd(), "gradlew.bat");

  if (!fs.existsSync(gradlewPath)) {
    console.log("Gradle Wrapper not found. Creating automatically...");
    run("gradle wrapper");
  }
}

function buildDebugApk() {
  syncWorkspace();

  ensureGradleWrapper();

  console.log("Building Debug APK...");
  run(".\\gradlew.bat assembleDebug");

  console.log("\nAPK ready:");
  console.log("app\\build\\outputs\\apk\\debug\\app-debug.apk");
}

function launchApp() {
  const config = readProjectConfig();
  const packageName = config.packageName;

  console.log("Launching app: " + packageName);

  const directLaunch = run(`adb shell am start -n ${packageName}/.MainActivity`, {
    exitOnError: false
  });

  if (!directLaunch) {
    console.log("Direct launch failed. Trying fallback launcher method...");
    run(`adb shell monkey -p ${packageName} -c android.intent.category.LAUNCHER 1`);
  }
}

function installDebugApk() {
  const apkPath = path.join(
    process.cwd(),
    "app",
    "build",
    "outputs",
    "apk",
    "debug",
    "app-debug.apk"
  );

  if (!fs.existsSync(apkPath)) {
    console.log("APK not found. Building first...");
    buildDebugApk();
  }

  console.log("Installing APK to device...");
  run("adb install -r app\\build\\outputs\\apk\\debug\\app-debug.apk");

  launchApp();
}

if (cmd === "doctor") {
  console.log("Checking system...");
  check("Node.js", "node -v");
  check("NPM", "npm -v");
  check("Java", "java -version");
  check("ADB", "adb version");
  check("Gradle", "gradle -v");
}

else if (cmd === "create") {
  const appName = process.argv[3];

  if (!appName) {
    console.log("Use: oviora create MyApp");
    process.exit(1);
  }

  const target = path.join(process.cwd(), appName);

  if (fs.existsSync(target)) {
    console.log("Folder already exists: " + appName);
    process.exit(1);
  }

  const safeAppName = appName.toLowerCase().replace(/[^a-z0-9]/g, "");

  if (!safeAppName) {
    console.log("Invalid app name. Use letters/numbers like MyApp or TestApp.");
    process.exit(1);
  }

  const packageName = "com.oviora." + safeAppName;
  const packagePath = packageName.replace(/\./g, path.sep);

  console.log("Creating native Java/XML project: " + appName);

  write(path.join(target, "oviora.config.json"), JSON.stringify({
    appName,
    packageName,
    language: "java",
    ui: "xml"
  }, null, 2));

  write(path.join(target, "settings.gradle"), `
pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "${appName}"
include ':app'
`.trim());

  write(path.join(target, "build.gradle"), `
plugins {
    id 'com.android.application' version '8.7.3' apply false
}
`.trim());

  write(path.join(target, "app", "build.gradle"), `
plugins {
    id 'com.android.application'
}

android {
    namespace '${packageName}'
    compileSdk 35

    defaultConfig {
        applicationId '${packageName}'
        minSdk 23
        targetSdk 35
        versionCode 1
        versionName '1.0'
    }
}
`.trim());

  write(path.join(target, "app", "src", "main", "AndroidManifest.xml"), `
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application
        android:theme="@style/AppTheme"
        android:label="${appName}">
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
`.trim());

  const mainActivityJava = `
package ${packageName};

import android.app.Activity;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends Activity {

    TextView pageTitle;
    TextView pageContent;
    ImageView pageIcon;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        pageTitle = findViewById(R.id.pageTitle);
        pageContent = findViewById(R.id.pageContent);
        pageIcon = findViewById(R.id.pageIcon);

        findViewById(R.id.navHome).setOnClickListener(v -> showPage("Home", "Welcome to ${appName}", R.drawable.ic_home));
        findViewById(R.id.navProfile).setOnClickListener(v -> showPage("Profile", "This is your Profile page", R.drawable.ic_profile));
        findViewById(R.id.navSettings).setOnClickListener(v -> showPage("Settings", "This is Settings page", R.drawable.ic_settings));

        findViewById(R.id.notificationButton).setOnClickListener(v ->
            Toast.makeText(this, "No new notifications", Toast.LENGTH_SHORT).show()
        );

        findViewById(R.id.profileButton).setOnClickListener(v ->
            Toast.makeText(this, "Profile", Toast.LENGTH_SHORT).show()
        );
    }

    private void showPage(String title, String content, int iconRes) {
        pageTitle.setText(title);
        pageContent.setText(content);
        pageIcon.setImageResource(iconRes);
    }
}
`.trim();

  const activityMainXml = `
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/colorBackground">

    <include layout="@layout/header" />

    <FrameLayout
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"
        android:padding="20dp">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_gravity="center"
            android:orientation="vertical"
            android:gravity="center"
            android:background="@drawable/bg_card"
            android:padding="28dp">

            <ImageView
                android:id="@+id/pageIcon"
                android:layout_width="76dp"
                android:layout_height="76dp"
                android:background="@drawable/bg_icon_circle"
                android:padding="20dp"
                android:src="@drawable/ic_home"
                android:tint="@color/colorPrimary" />

            <TextView
                android:id="@+id/pageTitle"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="20dp"
                android:text="Home"
                android:textColor="@color/colorTextPrimary"
                android:textSize="24sp"
                android:textStyle="bold" />

            <TextView
                android:id="@+id/pageContent"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="8dp"
                android:gravity="center"
                android:text="Welcome"
                android:textColor="@color/colorTextMuted"
                android:textSize="15sp" />

        </LinearLayout>

    </FrameLayout>

    <include layout="@layout/bottom_navigation" />

</LinearLayout>
`.trim();

  const headerXml = `
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="@color/colorSurface"
    android:elevation="6dp"
    android:paddingTop="14dp"
    android:paddingBottom="14dp">

    <LinearLayout
        android:orientation="horizontal"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center_vertical"
        android:paddingStart="18dp"
        android:paddingEnd="18dp">

        <TextView
            android:id="@+id/headerTitle"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="${appName}"
            android:textColor="@color/colorTextPrimary"
            android:textSize="21sp"
            android:textStyle="bold" />

        <ImageView
            android:id="@+id/notificationButton"
            android:layout_width="40dp"
            android:layout_height="40dp"
            android:layout_marginEnd="10dp"
            android:background="@drawable/bg_header_button"
            android:padding="10dp"
            android:src="@drawable/ic_bell"
            android:tint="@color/colorTextPrimary" />

        <ImageView
            android:id="@+id/profileButton"
            android:layout_width="40dp"
            android:layout_height="40dp"
            android:background="@drawable/bg_profile_circle"
            android:padding="10dp"
            android:src="@drawable/ic_profile"
            android:tint="@color/colorTextPrimary" />

    </LinearLayout>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="46dp"
        android:layout_marginTop="14dp"
        android:layout_marginStart="18dp"
        android:layout_marginEnd="18dp"
        android:background="@drawable/bg_search_bar"
        android:gravity="center_vertical"
        android:orientation="horizontal"
        android:paddingStart="15dp"
        android:paddingEnd="15dp">

        <ImageView
            android:layout_width="18dp"
            android:layout_height="18dp"
            android:src="@drawable/ic_search"
            android:tint="@color/colorTextMuted" />

        <TextView
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1"
            android:layout_marginStart="10dp"
            android:gravity="center_vertical"
            android:text="Search something..."
            android:textColor="@color/colorTextMuted"
            android:textSize="14sp" />

    </LinearLayout>

</LinearLayout>
`.trim();

  const bottomNavigationXml = `
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="horizontal"
    android:layout_width="match_parent"
    android:layout_height="72dp"
    android:background="@color/colorSurface"
    android:elevation="8dp"
    android:gravity="center"
    android:paddingStart="8dp"
    android:paddingEnd="8dp">

    <LinearLayout
        android:id="@+id/navHome"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="1"
        android:gravity="center"
        android:orientation="vertical"
        android:background="?android:attr/selectableItemBackground">

        <ImageView
            android:layout_width="24dp"
            android:layout_height="24dp"
            android:src="@drawable/ic_home"
            android:tint="@color/colorPrimary" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Home"
            android:textColor="@color/colorPrimary"
            android:textSize="12sp" />

    </LinearLayout>

    <LinearLayout
        android:id="@+id/navProfile"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="1"
        android:gravity="center"
        android:orientation="vertical"
        android:background="?android:attr/selectableItemBackground">

        <ImageView
            android:layout_width="24dp"
            android:layout_height="24dp"
            android:src="@drawable/ic_profile"
            android:tint="@color/colorTextMuted" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Profile"
            android:textColor="@color/colorTextMuted"
            android:textSize="12sp" />

    </LinearLayout>

    <LinearLayout
        android:id="@+id/navSettings"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="1"
        android:gravity="center"
        android:orientation="vertical"
        android:background="?android:attr/selectableItemBackground">

        <ImageView
            android:layout_width="24dp"
            android:layout_height="24dp"
            android:src="@drawable/ic_settings"
            android:tint="@color/colorTextMuted" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Settings"
            android:textColor="@color/colorTextMuted"
            android:textSize="12sp" />

    </LinearLayout>

</LinearLayout>
`.trim();

  const colorsXml = `
<resources>
    <color name="colorBackground">#101018</color>
    <color name="colorSurface">#191925</color>
    <color name="colorSurfaceLight">#242436</color>
    <color name="colorCard">#1E1E2D</color>
    <color name="colorPrimary">#8B5CF6</color>
    <color name="colorPrimarySoft">#2B2342</color>
    <color name="colorAccent">#FF4F9D</color>
    <color name="colorTextPrimary">#FFFFFF</color>
    <color name="colorTextMuted">#9CA3AF</color>
</resources>
`.trim();

  const stylesXml = `
<resources>
    <style name="AppTheme" parent="android:style/Theme.Material.Light.NoActionBar">
        <item name="android:fontFamily">sans</item>
        <item name="android:windowBackground">@color/colorBackground</item>
        <item name="android:statusBarColor">@color/colorBackground</item>
        <item name="android:navigationBarColor">@color/colorBackground</item>
        <item name="android:windowLightStatusBar">false</item>
        <item name="android:windowLightNavigationBar">false</item>
    </style>
</resources>
`.trim();

  const bgCardXml = `
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="rectangle">
    <solid android:color="@color/colorCard" />
    <corners android:radius="28dp" />
</shape>
`.trim();

  const bgIconCircleXml = `
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="oval">
    <solid android:color="@color/colorPrimarySoft" />
</shape>
`.trim();

  const bgSearchBarXml = `
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="rectangle">
    <solid android:color="@color/colorSurfaceLight" />
    <corners android:radius="24dp" />
</shape>
`.trim();

  const bgHeaderButtonXml = `
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="oval">
    <solid android:color="@color/colorSurfaceLight" />
</shape>
`.trim();

  const bgProfileCircleXml = `
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="oval">
    <solid android:color="@color/colorAccent" />
</shape>
`.trim();

  const icHomeXml = `
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
    <path
        android:fillColor="#FFFFFFFF"
        android:pathData="M10,20v-6h4v6h5v-8h3L12,3 2,12h3v8h5z" />
</vector>
`.trim();

  const icProfileXml = `
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
    <path
        android:fillColor="#FFFFFFFF"
        android:pathData="M12,12c2.21,0 4,-1.79 4,-4s-1.79,-4 -4,-4 -4,1.79 -4,4 1.79,4 4,4zM12,14c-2.67,0 -8,1.34 -8,4v2h16v-2c0,-2.66 -5.33,-4 -8,-4z" />
</vector>
`.trim();

  const icSettingsXml = `
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
    <path
        android:fillColor="#FFFFFFFF"
        android:pathData="M19.14,12.94c0.04,-0.3 0.06,-0.61 0.06,-0.94c0,-0.32 -0.02,-0.64 -0.07,-0.94l2.03,-1.58c0.18,-0.14 0.23,-0.41 0.12,-0.61l-1.92,-3.32c-0.12,-0.22 -0.37,-0.29 -0.59,-0.22l-2.39,0.96c-0.5,-0.38 -1.03,-0.7 -1.62,-0.94L14.4,2.81c-0.04,-0.24 -0.24,-0.41 -0.48,-0.41h-3.84c-0.24,0 -0.43,0.17 -0.47,0.41L9.25,5.35C8.66,5.59 8.12,5.92 7.63,6.29L5.24,5.33c-0.22,-0.08 -0.47,0 -0.59,0.22L2.74,8.87c-0.12,0.21 -0.08,0.47 0.12,0.61l2.03,1.58c-0.05,0.3 -0.08,0.63 -0.08,0.94s0.02,0.64 0.07,0.94l-2.03,1.58c-0.18,0.14 -0.23,0.41 -0.12,0.61l1.92,3.32c0.12,0.22 0.37,0.29 0.59,0.22l2.39,-0.96c0.5,0.38 1.03,0.7 1.62,0.94l0.36,2.54c0.05,0.24 0.24,0.41 0.48,0.41h3.84c0.24,0 0.44,-0.17 0.47,-0.41l0.36,-2.54c0.59,-0.24 1.13,-0.56 1.62,-0.94l2.39,0.96c0.22,0.08 0.47,0 0.59,-0.22l1.92,-3.32c0.12,-0.22 0.07,-0.47 -0.12,-0.61L19.14,12.94zM12,15.6c-1.98,0 -3.6,-1.62 -3.6,-3.6s1.62,-3.6 3.6,-3.6 3.6,1.62 3.6,3.6 -1.62,3.6 -3.6,3.6z" />
</vector>
`.trim();

  const icSearchXml = `
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
    <path
        android:fillColor="#FFFFFFFF"
        android:pathData="M9.5,3C5.91,3 3,5.91 3,9.5S5.91,16 9.5,16c1.61,0 3.09,-0.59 4.23,-1.57l0.27,0.28v0.79l5,4.99L20.49,19l-4.99,-5v-0.79l-0.28,-0.27C15.91,12.09 16,10.84 16,9.5C16,5.91 13.09,3 9.5,3zM9.5,5C11.99,5 14,7.01 14,9.5S11.99,14 9.5,14 5,11.99 5,9.5 7.01,5 9.5,5z" />
</vector>
`.trim();

  const icBellXml = `
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
    <path
        android:fillColor="#FFFFFFFF"
        android:pathData="M12,22c1.1,0 2,-0.9 2,-2h-4c0,1.1 0.9,2 2,2zM18,16v-5c0,-3.07 -1.63,-5.64 -4.5,-6.32V4c0,-0.83 -0.67,-1.5 -1.5,-1.5S10.5,3.17 10.5,4v0.68C7.63,5.36 6,7.92 6,11v5l-2,2v1h16v-1l-2,-2z" />
</vector>
`.trim();

  write(path.join(target, "app", "src", "main", "java", packagePath, "MainActivity.java"), mainActivityJava);
  write(path.join(target, "app", "src", "main", "res", "layout", "activity_main.xml"), activityMainXml);
  write(path.join(target, "app", "src", "main", "res", "layout", "header.xml"), headerXml);
  write(path.join(target, "app", "src", "main", "res", "layout", "bottom_navigation.xml"), bottomNavigationXml);

  write(path.join(target, "app", "src", "main", "res", "values", "colors.xml"), colorsXml);
  write(path.join(target, "app", "src", "main", "res", "values", "styles.xml"), stylesXml);

  write(path.join(target, "app", "src", "main", "res", "drawable", "bg_card.xml"), bgCardXml);
  write(path.join(target, "app", "src", "main", "res", "drawable", "bg_icon_circle.xml"), bgIconCircleXml);
  write(path.join(target, "app", "src", "main", "res", "drawable", "bg_search_bar.xml"), bgSearchBarXml);
  write(path.join(target, "app", "src", "main", "res", "drawable", "bg_header_button.xml"), bgHeaderButtonXml);
  write(path.join(target, "app", "src", "main", "res", "drawable", "bg_profile_circle.xml"), bgProfileCircleXml);

  write(path.join(target, "app", "src", "main", "res", "drawable", "ic_home.xml"), icHomeXml);
  write(path.join(target, "app", "src", "main", "res", "drawable", "ic_profile.xml"), icProfileXml);
  write(path.join(target, "app", "src", "main", "res", "drawable", "ic_settings.xml"), icSettingsXml);
  write(path.join(target, "app", "src", "main", "res", "drawable", "ic_search.xml"), icSearchXml);
  write(path.join(target, "app", "src", "main", "res", "drawable", "ic_bell.xml"), icBellXml);

  write(path.join(target, "oviora", "layout", "activity_main.xml"), activityMainXml);
  write(path.join(target, "oviora", "layout", "header.xml"), headerXml);
  write(path.join(target, "oviora", "layout", "bottom_navigation.xml"), bottomNavigationXml);
  write(path.join(target, "oviora", "java", "MainActivity.java"), mainActivityJava);

  write(path.join(target, "oviora", "images", "bg_card.xml"), bgCardXml);
  write(path.join(target, "oviora", "images", "bg_icon_circle.xml"), bgIconCircleXml);
  write(path.join(target, "oviora", "images", "bg_search_bar.xml"), bgSearchBarXml);
  write(path.join(target, "oviora", "images", "bg_header_button.xml"), bgHeaderButtonXml);
  write(path.join(target, "oviora", "images", "bg_profile_circle.xml"), bgProfileCircleXml);
  write(path.join(target, "oviora", "images", "ic_home.xml"), icHomeXml);
  write(path.join(target, "oviora", "images", "ic_profile.xml"), icProfileXml);
  write(path.join(target, "oviora", "images", "ic_settings.xml"), icSettingsXml);
  write(path.join(target, "oviora", "images", "ic_search.xml"), icSearchXml);
  write(path.join(target, "oviora", "images", "ic_bell.xml"), icBellXml);

  fs.mkdirSync(path.join(target, "oviora", "firebase"), { recursive: true });

  write(path.join(target, "oviora", "README.txt"), `
Oviora Workspace
================

Edit beginner-friendly files here:

layout/
- activity_main.xml
- header.xml
- bottom_navigation.xml

java/
- MainActivity.java

images/
- Put drawable images here.
- Default vector icons and shape backgrounds are also stored here.

firebase/
- Put google-services.json here.

The app/ folder is the internal Android project area.
Oviora Builder will sync this workspace before build.
`.trim());

  console.log("Project created successfully!");
  console.log("Next:");
  console.log("cd " + appName);
  console.log("oviora build");
  console.log("oviora run");
}

else if (cmd === "sync") {
  syncWorkspace();
}

else if (cmd === "build") {
  buildDebugApk();
}

else if (cmd === "run") {
  installDebugApk();
}

else if (cmd === "br") {
  console.log("Build + Run started...");
  buildDebugApk();
  installDebugApk();
  console.log("Build + Run success!");
}

else {
  console.log(`
Commands:
  oviora doctor
  oviora create MyApp
  oviora sync
  oviora build
  oviora run
  oviora br
`);
}