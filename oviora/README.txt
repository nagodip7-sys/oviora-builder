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