#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync, spawnSync } = require("child_process");

const VERSION = "0.2.0-safe-sync";
const cmd = process.argv[2];

console.log("Oviora Builder Started");
console.log("Version: " + VERSION);

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function exists(p) {
  return fs.existsSync(p);
}

function nowStamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function check(name, command) {
  try {
    console.log(`\nChecking ${name}...`);
    execSync(command, { stdio: "inherit" });
    console.log(`${name}: OK`);
  } catch {
    console.log(`${name}: NOT FOUND`);
  }
}

function run(command, options = {}) {
  const exitOnError = options.exitOnError !== false;

  const result = spawnSync(command, {
    shell: true,
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 30
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

    if (exitOnError) process.exit(1);
    return false;
  }

  return true;
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

  fs.writeFileSync(logPath, logContent, "utf8");
  return logPath;
}

function explainError(output) {
  console.log("\nOviora Error Helper");
  console.log("-------------------");

  const text = String(output || "").toLowerCase();

  if (text.includes("sdk location not found") || text.includes("android_home") || text.includes("sdk.dir")) {
    console.log("Problem: Android SDK path was not found.");
    console.log("Suggested fix:");
    console.log("1. Run: oviora doctor");
    console.log("2. Check ANDROID_HOME environment variable.");
    console.log("3. Make sure Android SDK is installed.");
  } else if (text.includes("failed to install") || text.includes("install_failed")) {
    console.log("Problem: APK installation failed.");
    console.log("Suggested fix:");
    console.log("1. Check if the phone is connected.");
    console.log("2. Run: adb devices");
    console.log("3. Uninstall the old app manually if package conflict happens.");
  } else if (text.includes("device") && text.includes("not found")) {
    console.log("Problem: No Android device was found.");
    console.log("Suggested fix:");
    console.log("1. Enable USB Debugging on your phone.");
    console.log("2. Reconnect USB cable.");
    console.log("3. Run: adb devices");
  } else if (text.includes("cannot find symbol")) {
    console.log("Problem: Java compile error.");
    console.log("Suggested fix:");
    console.log("1. Check oviora/java/MainActivity.java.");
    console.log("2. Check wrong class names, variable names, or missing imports.");
    console.log("3. Check if XML IDs match Java findViewById IDs.");
  } else if (text.includes("selectableitembackground") && text.includes("not found")) {
    console.log("Problem: Invalid Android attribute reference.");
    console.log("Suggested fix:");
    console.log("Use ?android:attr/selectableItemBackground.");
  } else if (text.includes("resource") && text.includes("not found")) {
    console.log("Problem: Android resource error.");
    console.log("Suggested fix:");
    console.log("1. Check oviora/layout, oviora/images, oviora/values.");
    console.log("2. Check missing drawable, color, id, or style names.");
  } else if (text.includes("manifest merger failed")) {
    console.log("Problem: AndroidManifest.xml merge failed.");
    console.log("Suggested fix:");
    console.log("1. Check app/src/main/AndroidManifest.xml.");
    console.log("2. Check duplicated permissions, services, or activities.");
  } else if (text.includes("gradle wrapper") || text.includes("'gradle' is not recognized") || text.includes("gradle is not recognized")) {
    console.log("Problem: Gradle was not found.");
    console.log("Suggested fix:");
    console.log("1. Install Gradle or add Gradle to PATH.");
    console.log("2. After wrapper is created once, Oviora uses gradlew internally.");
  } else if (text.includes("java_home") || text.includes("java is not recognized")) {
    console.log("Problem: Java/JDK was not found.");
    console.log("Suggested fix:");
    console.log("1. Install JDK 17 or 21.");
    console.log("2. Set JAVA_HOME.");
    console.log("3. Run: oviora doctor");
  } else if (text.includes("activity class") && text.includes("does not exist")) {
    console.log("Problem: App launch failed because MainActivity was not found.");
    console.log("Suggested fix:");
    console.log("1. Check packageName inside oviora.config.json.");
    console.log("2. Check package line in oviora/java/MainActivity.java.");
    console.log("3. Run: oviora br");
  } else {
    console.log("Problem: Unknown error.");
    console.log("Suggested fix:");
    console.log("1. Read the full error above.");
    console.log("2. Check logs/last-error.txt.");
    console.log("3. Run: oviora doctor.");
  }
}

function removeDir(target) {
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
  }
}

function copyDir(sourceDir, targetDir) {
  if (!fs.existsSync(sourceDir)) return;

  fs.mkdirSync(targetDir, { recursive: true });

  for (const item of fs.readdirSync(sourceDir)) {
    const sourcePath = path.join(sourceDir, item);
    const targetPath = path.join(targetDir, item);
    const stat = fs.statSync(sourcePath);

    if (stat.isDirectory()) {
      copyDir(sourcePath, targetPath);
    } else {
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

function mirrorDir(sourceDir, targetDir, label) {
  if (!fs.existsSync(sourceDir)) {
    console.log(`\nMissing workspace folder: ${sourceDir}`);
    console.log("Oviora will NOT auto-recreate it during build.");
    console.log("Reason: auto-restore can overwrite or bring back old code.");
    console.log("Fix:");
    console.log("  1. Restore the folder manually, or");
    console.log("  2. Run: oviora restore");
    process.exit(1);
  }

  console.log(`Mirror sync: ${label}`);
  removeDir(targetDir);
  fs.mkdirSync(targetDir, { recursive: true });
  copyDir(sourceDir, targetDir);
}

function getArgValue(flagName) {
  const index = process.argv.indexOf(flagName);
  if (index === -1) return null;
  return process.argv[index + 1] || null;
}

function hasFlag(flagName) {
  return process.argv.includes(flagName);
}

function safePackageSegment(appName) {
  let segment = String(appName || "")
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "");

  if (!segment) segment = "app";
  if (/^[0-9]/.test(segment)) segment = "app" + segment;
  return segment;
}

function isValidPackageName(packageName) {
  if (!packageName) return false;

  const parts = packageName.split(".");
  if (parts.length < 2) return false;

  return parts.every(part => /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(part));
}

function readProjectConfig() {
  const configPath = path.join(process.cwd(), "oviora.config.json");

  if (!fs.existsSync(configPath)) {
    console.log("oviora.config.json not found.");
    console.log("Please run this command inside an Oviora project folder.");
    process.exit(1);
  }

  try {
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

    if (!config.appName || !config.packageName) {
      console.log("Invalid oviora.config.json.");
      console.log("Required fields: appName, packageName");
      process.exit(1);
    }

    if (!isValidPackageName(config.packageName)) {
      console.log("Invalid packageName inside oviora.config.json:");
      console.log(config.packageName);
      console.log("Example valid package name: com.example.myapp");
      process.exit(1);
    }

    return config;
  } catch (err) {
    console.log("oviora.config.json is not valid JSON.");
    console.log("Error: " + err.message);
    process.exit(1);
  }
}

function androidPackagePath(packageName) {
  return packageName.replace(/\./g, path.sep);
}

function projectPaths(config) {
  const root = process.cwd();
  const packagePath = androidPackagePath(config.packageName);

  return {
    root,
    workspace: path.join(root, "oviora"),
    workspaceLayout: path.join(root, "oviora", "layout"),
    workspaceJava: path.join(root, "oviora", "java"),
    workspaceImages: path.join(root, "oviora", "images"),
    workspaceValues: path.join(root, "oviora", "values"),
    workspaceFirebase: path.join(root, "oviora", "firebase"),
    workspaceFirebaseFile: path.join(root, "oviora", "firebase", "google-services.json"),

    androidLayout: path.join(root, "app", "src", "main", "res", "layout"),
    androidJava: path.join(root, "app", "src", "main", "java", packagePath),
    androidDrawable: path.join(root, "app", "src", "main", "res", "drawable"),
    androidValues: path.join(root, "app", "src", "main", "res", "values"),
    androidFirebaseFile: path.join(root, "app", "google-services.json"),

    apk: path.join(root, "app", "build", "outputs", "apk", "debug", "app-debug.apk")
  };
}

function validateWorkspace(config) {
  const p = projectPaths(config);

  const required = [
    p.workspace,
    p.workspaceLayout,
    p.workspaceJava,
    p.workspaceImages,
    path.join(p.workspaceLayout, "activity_main.xml"),
    path.join(p.workspaceJava, "MainActivity.java")
  ];

  const missing = required.filter(item => !fs.existsSync(item));

  if (missing.length > 0) {
    console.log("\nOviora workspace is incomplete.");
    console.log("Oviora will NOT auto-create missing files during build.");
    console.log("This prevents old/internal code from coming back accidentally.\n");

    console.log("Missing:");
    for (const item of missing) console.log(" - " + item);

    console.log("\nFix:");
    console.log("  oviora restore");
    console.log("\nOr restore your own files manually inside oviora/.");
    process.exit(1);
  }
}

function createSyncBackup(config) {
  const p = projectPaths(config);
  const backupRoot = path.join(p.root, ".oviora", "backups", "sync-" + nowStamp());

  fs.mkdirSync(backupRoot, { recursive: true });

  const targets = [
    ["layout", p.androidLayout],
    ["java", p.androidJava],
    ["drawable", p.androidDrawable],
    ["values", p.androidValues],
    ["google-services.json", p.androidFirebaseFile]
  ];

  let copied = false;

  for (const [name, source] of targets) {
    if (fs.existsSync(source)) {
      const dest = path.join(backupRoot, name);
      if (fs.statSync(source).isDirectory()) {
        copyDir(source, dest);
      } else {
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.copyFileSync(source, dest);
      }
      copied = true;
    }
  }

  if (copied) {
    console.log("Backup created:");
    console.log(backupRoot);
    pruneBackups(p.root);
  } else {
    removeDir(backupRoot);
  }
}

function pruneBackups(root) {
  const backupsDir = path.join(root, ".oviora", "backups");
  if (!fs.existsSync(backupsDir)) return;

  const backups = fs.readdirSync(backupsDir)
    .filter(name => name.startsWith("sync-"))
    .map(name => ({
      name,
      full: path.join(backupsDir, name),
      time: fs.statSync(path.join(backupsDir, name)).mtimeMs
    }))
    .sort((a, b) => b.time - a.time);

  const keep = 5;
  for (const item of backups.slice(keep)) {
    removeDir(item.full);
  }
}

function syncWorkspace(options = {}) {
  const config = readProjectConfig();
  validateWorkspace(config);

  const p = projectPaths(config);

  console.log("\nSyncing Oviora workspace...");
  console.log("Source of truth: oviora/");
  console.log("Generated output: app/src/main/...");

  if (!options.noBackup) {
    createSyncBackup(config);
  }

  mirrorDir(p.workspaceLayout, p.androidLayout, "oviora/layout -> app/src/main/res/layout");
  mirrorDir(p.workspaceJava, p.androidJava, "oviora/java -> app/src/main/java/" + config.packageName);
  mirrorDir(p.workspaceImages, p.androidDrawable, "oviora/images -> app/src/main/res/drawable");

  if (fs.existsSync(p.workspaceValues)) {
    mirrorDir(p.workspaceValues, p.androidValues, "oviora/values -> app/src/main/res/values");
  }

  if (fs.existsSync(p.workspaceFirebaseFile)) {
    fs.copyFileSync(p.workspaceFirebaseFile, p.androidFirebaseFile);
    console.log("Firebase config synced.");
  } else {
    if (fs.existsSync(p.androidFirebaseFile)) {
      fs.rmSync(p.androidFirebaseFile, { force: true });
      console.log("Firebase config removed from app because it is missing in oviora/firebase.");
    }
  }

  console.log("Workspace sync complete.");
}

function gradlewCommand() {
  return process.platform === "win32" ? ".\\gradlew.bat" : "./gradlew";
}

function ensureGradleWrapper() {
  const wrapperPath = process.platform === "win32"
    ? path.join(process.cwd(), "gradlew.bat")
    : path.join(process.cwd(), "gradlew");

  if (!fs.existsSync(wrapperPath)) {
    console.log("Gradle Wrapper not found. Creating automatically...");
    console.log("This requires global Gradle only once.");
    run("gradle wrapper");
  }
}

function buildDebugApk() {
  syncWorkspace();

  ensureGradleWrapper();

  console.log("\nBuilding Debug APK...");
  run(`${gradlewCommand()} assembleDebug`);

  console.log("\nAPK ready:");
  console.log(path.join("app", "build", "outputs", "apk", "debug", "app-debug.apk"));
}

function getNewestMtime(dir) {
  if (!fs.existsSync(dir)) return 0;

  let newest = fs.statSync(dir).mtimeMs;

  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      newest = Math.max(newest, getNewestMtime(full));
    } else {
      newest = Math.max(newest, stat.mtimeMs);
    }
  }

  return newest;
}

function isApkStale(config) {
  const p = projectPaths(config);
  if (!fs.existsSync(p.apk)) return true;

  const apkTime = fs.statSync(p.apk).mtimeMs;
  const workspaceTime = getNewestMtime(p.workspace);
  const configTime = fs.statSync(path.join(p.root, "oviora.config.json")).mtimeMs;

  return Math.max(workspaceTime, configTime) > apkTime;
}

function installDebugApk() {
  const config = readProjectConfig();
  const p = projectPaths(config);

  if (!fs.existsSync(p.apk)) {
    console.log("APK not found. Building first...");
    buildDebugApk();
  } else if (isApkStale(config)) {
    console.log("APK is older than workspace files. Rebuilding first...");
    buildDebugApk();
  }

  console.log("Installing APK to device...");

  const apkForCmd = process.platform === "win32"
    ? "app\\build\\outputs\\apk\\debug\\app-debug.apk"
    : "app/build/outputs/apk/debug/app-debug.apk";

  run(`adb install -r "${apkForCmd}"`);

  launchApp();
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

function templateFiles(appName, packageName) {
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

  const drawable = {
    "bg_card.xml": `
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="rectangle">
    <solid android:color="@color/colorCard" />
    <corners android:radius="28dp" />
</shape>
`.trim(),

    "bg_icon_circle.xml": `
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="oval">
    <solid android:color="@color/colorPrimarySoft" />
</shape>
`.trim(),

    "bg_search_bar.xml": `
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="rectangle">
    <solid android:color="@color/colorSurfaceLight" />
    <corners android:radius="24dp" />
</shape>
`.trim(),

    "bg_header_button.xml": `
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="oval">
    <solid android:color="@color/colorSurfaceLight" />
</shape>
`.trim(),

    "bg_profile_circle.xml": `
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="oval">
    <solid android:color="@color/colorAccent" />
</shape>
`.trim(),

    "ic_home.xml": `
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
    <path
        android:fillColor="#FFFFFFFF"
        android:pathData="M10,20v-6h4v6h5v-8h3L12,3 2,12h3v8h5z" />
</vector>
`.trim(),

    "ic_profile.xml": `
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
    <path
        android:fillColor="#FFFFFFFF"
        android:pathData="M12,12c2.21,0 4,-1.79 4,-4s-1.79,-4 -4,-4 -4,1.79 -4,4 1.79,4 4,4zM12,14c-2.67,0 -8,1.34 -8,4v2h16v-2c0,-2.66 -5.33,-4 -8,-4z" />
</vector>
`.trim(),

    "ic_settings.xml": `
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
    <path
        android:fillColor="#FFFFFFFF"
        android:pathData="M19.14,12.94c0.04,-0.3 0.06,-0.61 0.06,-0.94c0,-0.32 -0.02,-0.64 -0.07,-0.94l2.03,-1.58c0.18,-0.14 0.23,-0.41 0.12,-0.61l-1.92,-3.32c-0.12,-0.22 -0.37,-0.29 -0.59,-0.22l-2.39,0.96c-0.5,-0.38 -1.03,-0.7 -1.62,-0.94L14.4,2.81c-0.04,-0.24 -0.24,-0.41 -0.48,-0.41h-3.84c-0.24,0 -0.43,0.17 -0.47,0.41L9.25,5.35C8.66,5.59 8.12,5.92 7.63,6.29L5.24,5.33c-0.22,-0.08 -0.47,0 -0.59,0.22L2.74,8.87c-0.12,0.21 -0.08,0.47 0.12,0.61l2.03,1.58c-0.05,0.3 -0.08,0.63 -0.08,0.94s0.02,0.64 0.07,0.94l-2.03,1.58c-0.18,0.14 -0.23,0.41 -0.12,0.61l1.92,3.32c0.12,0.22 0.37,0.29 0.59,0.22l2.39,-0.96c0.5,0.38 1.03,0.7 1.62,0.94l0.36,2.54c0.05,0.24 0.24,0.41 0.48,0.41h3.84c0.24,0 0.44,-0.17 0.47,-0.41l0.36,-2.54c0.59,-0.24 1.13,-0.56 1.62,-0.94l2.39,0.96c0.22,0.08 0.47,0 0.59,-0.22l1.92,-3.32c0.12,-0.22 0.07,-0.47 -0.12,-0.61L19.14,12.94zM12,15.6c-1.98,0 -3.6,-1.62 -3.6,-3.6s1.62,-3.6 3.6,-3.6 3.6,1.62 3.6,3.6 -1.62,3.6 -3.6,3.6z" />
</vector>
`.trim(),

    "ic_search.xml": `
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
    <path
        android:fillColor="#FFFFFFFF"
        android:pathData="M9.5,3C5.91,3 3,5.91 3,9.5S5.91,16 9.5,16c1.61,0 3.09,-0.59 4.23,-1.57l0.27,0.28v0.79l5,4.99L20.49,19l-4.99,-5v-0.79l-0.28,-0.27C15.91,12.09 16,10.84 16,9.5C16,5.91 13.09,3 9.5,3zM9.5,5C11.99,5 14,7.01 14,9.5S11.99,14 9.5,14 5,11.99 5,9.5 7.01,5 9.5,5z" />
</vector>
`.trim(),

    "ic_bell.xml": `
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
    <path
        android:fillColor="#FFFFFFFF"
        android:pathData="M12,22c1.1,0 2,-0.9 2,-2h-4c0,1.1 0.9,2 2,2zM18,16v-5c0,-3.07 -1.63,-5.64 -4.5,-6.32V4c0,-0.83 -0.67,-1.5 -1.5,-1.5S10.5,3.17 10.5,4v0.68C7.63,5.36 6,7.92 6,11v5l-2,2v1h16v-1l-2,-2z" />
</vector>
`.trim()
  };

  return {
    mainActivityJava,
    activityMainXml,
    headerXml,
    bottomNavigationXml,
    colorsXml,
    stylesXml,
    drawable
  };
}

function createWorkspaceFiles(target, appName, packageName, overwrite = false) {
  const t = templateFiles(appName, packageName);

  function writeIfAllowed(filePath, content) {
    if (!overwrite && fs.existsSync(filePath)) return;
    write(filePath, content);
  }

  writeIfAllowed(path.join(target, "oviora", "layout", "activity_main.xml"), t.activityMainXml);
  writeIfAllowed(path.join(target, "oviora", "layout", "header.xml"), t.headerXml);
  writeIfAllowed(path.join(target, "oviora", "layout", "bottom_navigation.xml"), t.bottomNavigationXml);

  writeIfAllowed(path.join(target, "oviora", "java", "MainActivity.java"), t.mainActivityJava);

  for (const [file, content] of Object.entries(t.drawable)) {
    writeIfAllowed(path.join(target, "oviora", "images", file), content);
  }

  writeIfAllowed(path.join(target, "oviora", "values", "colors.xml"), t.colorsXml);
  writeIfAllowed(path.join(target, "oviora", "values", "styles.xml"), t.stylesXml);

  fs.mkdirSync(path.join(target, "oviora", "firebase"), { recursive: true });

  writeIfAllowed(path.join(target, "oviora", "README.txt"), `
Oviora Workspace
================

IMPORTANT RULE:
oviora/ is the source of truth.
app/src/main/... is generated output.

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

values/
- colors.xml
- styles.xml

firebase/
- Put google-services.json here.

After editing, run:
oviora br

If you delete workspace files, Oviora will not auto-restore them during build.
Use:
oviora restore
`.trim());
}

function createProject() {
  const appName = process.argv[3];

  if (!appName) {
    console.log("Use: oviora create MyApp");
    console.log("Optional:");
    console.log("  oviora create MyApp --package com.example.myapp");
    process.exit(1);
  }

  const target = path.join(process.cwd(), appName);

  if (fs.existsSync(target)) {
    console.log("Folder already exists: " + appName);
    process.exit(1);
  }

  const customPackage = getArgValue("--package");
  const safeAppName = safePackageSegment(appName);
  const packageName = customPackage || ("com.oviora." + safeAppName);

  if (!isValidPackageName(packageName)) {
    console.log("Invalid package name:");
    console.log(packageName);
    console.log("Example:");
    console.log("oviora create MyApp --package com.example.myapp");
    process.exit(1);
  }

  const packagePath = androidPackagePath(packageName);

  console.log("Creating native Java/XML project: " + appName);
  console.log("Package: " + packageName);

  write(path.join(target, "oviora.config.json"), JSON.stringify({
    appName,
    packageName,
    language: "java",
    ui: "xml",
    sourceOfTruth: "oviora",
    generatedOutput: "app/src/main",
    ovioraVersion: VERSION
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

  write(path.join(target, "gradle.properties"), `
org.gradle.jvmargs=-Xmx1536m -Dfile.encoding=UTF-8
android.useAndroidX=false
android.nonTransitiveRClass=false
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

  createWorkspaceFiles(target, appName, packageName, true);

  const oldCwd = process.cwd();
  process.chdir(target);
  syncWorkspace({ noBackup: true });
  process.chdir(oldCwd);

  console.log("\nProject created successfully!");
  console.log("Next:");
  console.log("cd " + appName);
  console.log("oviora br");
}

function restoreWorkspace() {
  const config = readProjectConfig();
  const force = hasFlag("--force");

  console.log("Restoring default Oviora workspace...");
  console.log("Mode: " + (force ? "force overwrite" : "missing files only"));

  createWorkspaceFiles(process.cwd(), config.appName, config.packageName, force);

  console.log("Workspace restore complete.");
  console.log("Next:");
  console.log("oviora br");
}

function showStatus() {
  const config = readProjectConfig();
  const p = projectPaths(config);

  console.log("\nOviora Project Status");
  console.log("---------------------");
  console.log("App name: " + config.appName);
  console.log("Package: " + config.packageName);
  console.log("Workspace: " + p.workspace);
  console.log("APK: " + p.apk);

  console.log("\nWorkspace folders:");
  console.log("layout: " + (exists(p.workspaceLayout) ? "OK" : "MISSING"));
  console.log("java: " + (exists(p.workspaceJava) ? "OK" : "MISSING"));
  console.log("images: " + (exists(p.workspaceImages) ? "OK" : "MISSING"));
  console.log("values: " + (exists(p.workspaceValues) ? "OK" : "MISSING"));
  console.log("firebase: " + (exists(p.workspaceFirebase) ? "OK" : "MISSING"));

  console.log("\nAPK status:");
  if (!exists(p.apk)) {
    console.log("APK missing.");
  } else if (isApkStale(config)) {
    console.log("APK exists but is stale. Run: oviora br");
  } else {
    console.log("APK exists and looks up-to-date.");
  }
}

function showHelp() {
  console.log(`
Commands:
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

Important rule:
  oviora/ is the source of truth.
  app/src/main/... is generated output.

Safe sync behavior:
  Deleted files in oviora/ are also deleted from app/src/main/... during sync.
  Missing workspace files are NOT auto-restored during build.
  Use oviora restore when you really want default files back.
`);
}

if (cmd === "doctor") {
  console.log("Checking system...");
  check("Node.js", "node -v");
  check("NPM", "npm -v");
  check("Java", "java -version");
  check("ADB", "adb version");
  check("Gradle", "gradle -v");
} else if (cmd === "create") {
  createProject();
} else if (cmd === "sync") {
  syncWorkspace();
} else if (cmd === "build") {
  buildDebugApk();
} else if (cmd === "run") {
  installDebugApk();
} else if (cmd === "br") {
  console.log("Build + Run started...");
  buildDebugApk();
  installDebugApk();
  console.log("Build + Run success!");
} else if (cmd === "restore") {
  restoreWorkspace();
} else if (cmd === "status") {
  showStatus();
} else {
  showHelp();
}