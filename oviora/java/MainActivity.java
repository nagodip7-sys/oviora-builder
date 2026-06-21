package com.yuvajyoti;

import android.Manifest;
import android.app.Activity;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.media.MediaRecorder;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.provider.MediaStore;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.Task;

import com.google.firebase.auth.AuthCredential;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.GoogleAuthProvider;

import java.io.File;

public class MainActivity extends Activity {

    private static final int RC_SIGN_IN = 1001;
    private static final int RC_CAMERA_CAPTURE = 1002;

    private static final int REQ_CAMERA = 2001;
    private static final int REQ_MIC = 2002;
    private static final int REQ_LOCATION = 2003;
    private static final int REQ_NOTIFICATION = 2004;

    private static final String CHANNEL_ID = "oviora_native_test_channel";

    private TextView statusText;
    private TextView nativeStatusText;

    private Button googleSignInButton;
    private Button signOutButton;
    private Button cameraButton;
    private Button notificationButton;
    private Button micButton;
    private Button locationButton;

    private FirebaseAuth firebaseAuth;
    private GoogleSignInClient googleSignInClient;

    private MediaRecorder mediaRecorder;
    private File audioFile;

    private LocationManager locationManager;
    private LocationListener locationListener;

    private final Handler handler = new Handler();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        statusText = findViewById(R.id.statusText);
        nativeStatusText = findViewById(R.id.nativeStatusText);

        googleSignInButton = findViewById(R.id.googleSignInButton);
        signOutButton = findViewById(R.id.signOutButton);
        cameraButton = findViewById(R.id.cameraButton);
        notificationButton = findViewById(R.id.notificationButton);
        micButton = findViewById(R.id.micButton);
        locationButton = findViewById(R.id.locationButton);

        createNotificationChannel();

        firebaseAuth = FirebaseAuth.getInstance();

        GoogleSignInOptions googleSignInOptions =
                new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                        .requestIdToken(getString(R.string.default_web_client_id))
                        .requestEmail()
                        .build();

        googleSignInClient = GoogleSignIn.getClient(this, googleSignInOptions);

        googleSignInButton.setOnClickListener(v -> signInWithGoogle());
        signOutButton.setOnClickListener(v -> signOut());

        cameraButton.setOnClickListener(v -> testCamera());
        notificationButton.setOnClickListener(v -> testNotification());
        micButton.setOnClickListener(v -> testMicrophone());
        locationButton.setOnClickListener(v -> testLocation());

        updateUI(firebaseAuth.getCurrentUser());
    }

    private boolean hasPermission(String permission) {
        if (Build.VERSION.SDK_INT < 23) return true;
        return checkSelfPermission(permission) == PackageManager.PERMISSION_GRANTED;
    }

    private void requestOnePermission(String permission, int requestCode) {
        if (Build.VERSION.SDK_INT >= 23) {
            requestPermissions(new String[]{permission}, requestCode);
        }
    }

    private void signInWithGoogle() {
        Intent signInIntent = googleSignInClient.getSignInIntent();
        startActivityForResult(signInIntent, RC_SIGN_IN);
    }

    private void firebaseAuthWithGoogle(String idToken) {
        statusText.setText("Signing in...");

        AuthCredential credential = GoogleAuthProvider.getCredential(idToken, null);

        firebaseAuth.signInWithCredential(credential)
                .addOnCompleteListener(this, task -> {
                    if (task.isSuccessful()) {
                        updateUI(firebaseAuth.getCurrentUser());
                    } else {
                        String error = task.getException() != null
                                ? task.getException().getMessage()
                                : "Unknown Firebase error";

                        statusText.setText("Firebase login failed:\n" + error);
                    }
                });
    }

    private void updateUI(FirebaseUser user) {
        if (user == null) {
            statusText.setText("Not signed in");
            googleSignInButton.setEnabled(true);
            signOutButton.setEnabled(false);
            return;
        }

        String name = user.getDisplayName();
        String email = user.getEmail();

        if (name == null || name.trim().isEmpty()) {
            name = "Google User";
        }

        statusText.setText("Signed in successfully\n\nName: " + name + "\nEmail: " + email);
        googleSignInButton.setEnabled(false);
        signOutButton.setEnabled(true);
    }

    private void signOut() {
        firebaseAuth.signOut();

        googleSignInClient.signOut().addOnCompleteListener(this, task -> {
            updateUI(null);
            Toast.makeText(this, "Signed out", Toast.LENGTH_SHORT).show();
        });
    }

    private void testCamera() {
        if (!hasPermission(Manifest.permission.CAMERA)) {
            requestOnePermission(Manifest.permission.CAMERA, REQ_CAMERA);
            return;
        }

        openCamera();
    }

    private void openCamera() {
        nativeStatusText.setText("Opening camera...");

        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);

        if (intent.resolveActivity(getPackageManager()) != null) {
            startActivityForResult(intent, RC_CAMERA_CAPTURE);
        } else {
            nativeStatusText.setText("No camera app found on this device.");
        }
    }

    private void testNotification() {
        if (Build.VERSION.SDK_INT >= 33 &&
                !hasPermission(Manifest.permission.POST_NOTIFICATIONS)) {
            requestOnePermission(Manifest.permission.POST_NOTIFICATIONS, REQ_NOTIFICATION);
            return;
        }

        showLocalNotification();
    }

    private void showLocalNotification() {
        Intent intent = new Intent(this, MainActivity.class);

        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= 23) {
            flags = flags | PendingIntent.FLAG_IMMUTABLE;
        }

        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent, flags);

        Notification.Builder builder;

        if (Build.VERSION.SDK_INT >= 26) {
            builder = new Notification.Builder(this, CHANNEL_ID);
        } else {
            builder = new Notification.Builder(this);
        }

        builder.setSmallIcon(R.drawable.ic_bell)
                .setContentTitle("Oviora Native Test")
                .setContentText("Local notification is working.")
                .setContentIntent(pendingIntent)
                .setAutoCancel(true)
                .setWhen(System.currentTimeMillis());

        if (Build.VERSION.SDK_INT < 26) {
            builder.setPriority(Notification.PRIORITY_DEFAULT);
        }

        NotificationManager manager =
                (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

        if (manager != null) {
            manager.notify(101, builder.build());
            nativeStatusText.setText("Notification sent successfully.");
        } else {
            nativeStatusText.setText("NotificationManager not available.");
        }
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= 26) {
            NotificationChannel channel = new NotificationChannel(
                    CHANNEL_ID,
                    "Oviora Native Test",
                    NotificationManager.IMPORTANCE_DEFAULT
            );

            channel.setDescription("Native notification test channel");

            NotificationManager manager =
                    (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

            if (manager != null) {
                manager.createNotificationChannel(channel);
            }
        }
    }

    private void testMicrophone() {
        if (!hasPermission(Manifest.permission.RECORD_AUDIO)) {
            requestOnePermission(Manifest.permission.RECORD_AUDIO, REQ_MIC);
            return;
        }

        startMicrophoneTest();
    }

    private void startMicrophoneTest() {
        try {
            stopMicrophoneTest(false);

            audioFile = new File(getCacheDir(), "oviora_mic_test.m4a");

            mediaRecorder = new MediaRecorder();
            mediaRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
            mediaRecorder.setOutputFormat(MediaRecorder.OutputFormat.MPEG_4);
            mediaRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AAC);
            mediaRecorder.setOutputFile(audioFile.getAbsolutePath());
            mediaRecorder.prepare();
            mediaRecorder.start();

            nativeStatusText.setText("Microphone recording started for 3 seconds...");

            handler.postDelayed(() -> stopMicrophoneTest(true), 3000);

        } catch (Exception e) {
            nativeStatusText.setText("Microphone test failed:\n" + e.getMessage());
            stopMicrophoneTest(false);
        }
    }

    private void stopMicrophoneTest(boolean showResult) {
        if (mediaRecorder == null) return;

        try {
            mediaRecorder.stop();
        } catch (Exception ignored) {
        }

        try {
            mediaRecorder.release();
        } catch (Exception ignored) {
        }

        mediaRecorder = null;

        if (showResult) {
            nativeStatusText.setText("Microphone test successful.\nTemporary file saved in app cache.");
        }
    }

    private void testLocation() {
        boolean fine = hasPermission(Manifest.permission.ACCESS_FINE_LOCATION);
        boolean coarse = hasPermission(Manifest.permission.ACCESS_COARSE_LOCATION);

        if (!fine && !coarse) {
            if (Build.VERSION.SDK_INT >= 23) {
                requestPermissions(
                        new String[]{
                                Manifest.permission.ACCESS_FINE_LOCATION,
                                Manifest.permission.ACCESS_COARSE_LOCATION
                        },
                        REQ_LOCATION
                );
            }
            return;
        }

        readLocation();
    }

    private void readLocation() {
        try {
            locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);

            if (locationManager == null) {
                nativeStatusText.setText("LocationManager not available.");
                return;
            }

            Location location = null;

            boolean fine = hasPermission(Manifest.permission.ACCESS_FINE_LOCATION);
            boolean coarse = hasPermission(Manifest.permission.ACCESS_COARSE_LOCATION);

            if (fine) {
                try {
                    location = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
                } catch (Exception ignored) {
                }
            }

            if (location == null && (fine || coarse)) {
                try {
                    location = locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
                } catch (Exception ignored) {
                }
            }

            if (location != null) {
                showLocation(location, "Last known location");
                return;
            }

            String provider = null;

            if (fine && locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER)) {
                provider = LocationManager.GPS_PROVIDER;
            } else if (locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER)) {
                provider = LocationManager.NETWORK_PROVIDER;
            }

            if (provider == null) {
                nativeStatusText.setText("Location is not available. Turn on GPS or internet location and try again.");
                return;
            }

            nativeStatusText.setText("Waiting for location...");

            locationListener = new LocationListener() {
                @Override
                public void onLocationChanged(Location location) {
                    showLocation(location, "Live location");

                    try {
                        locationManager.removeUpdates(this);
                    } catch (Exception ignored) {
                    }

                    locationListener = null;
                }

                @Override
                public void onProviderEnabled(String provider) {
                }

                @Override
                public void onProviderDisabled(String provider) {
                }

                @Override
                public void onStatusChanged(String provider, int status, Bundle extras) {
                }
            };

            locationManager.requestLocationUpdates(provider, 0, 0, locationListener);

            handler.postDelayed(() -> {
                if (locationListener != null && locationManager != null) {
                    try {
                        locationManager.removeUpdates(locationListener);
                    } catch (Exception ignored) {
                    }

                    locationListener = null;
                    nativeStatusText.setText("Location not received yet. Turn on GPS/internet and try again.");
                }
            }, 10000);

        } catch (SecurityException e) {
            nativeStatusText.setText("Location permission denied.");
        } catch (Exception e) {
            nativeStatusText.setText("Location test failed:\n" + e.getMessage());
        }
    }

    private void showLocation(Location location, String label) {
        nativeStatusText.setText(
                label + ":\nLatitude: " + location.getLatitude() +
                        "\nLongitude: " + location.getLongitude()
        );
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        boolean granted = grantResults.length > 0 &&
                grantResults[0] == PackageManager.PERMISSION_GRANTED;

        if (requestCode == REQ_CAMERA) {
            if (granted) openCamera();
            else nativeStatusText.setText("Camera permission denied.");
        }

        else if (requestCode == REQ_MIC) {
            if (granted) startMicrophoneTest();
            else nativeStatusText.setText("Microphone permission denied.");
        }

        else if (requestCode == REQ_NOTIFICATION) {
            if (granted) showLocalNotification();
            else nativeStatusText.setText("Notification permission denied.");
        }

        else if (requestCode == REQ_LOCATION) {
            boolean locationGranted = false;

            for (int result : grantResults) {
                if (result == PackageManager.PERMISSION_GRANTED) {
                    locationGranted = true;
                    break;
                }
            }

            if (locationGranted) readLocation();
            else nativeStatusText.setText("Location permission denied.");
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == RC_SIGN_IN) {
            Task<GoogleSignInAccount> task =
                    GoogleSignIn.getSignedInAccountFromIntent(data);

            try {
                GoogleSignInAccount account = task.getResult(ApiException.class);

                if (account != null && account.getIdToken() != null) {
                    firebaseAuthWithGoogle(account.getIdToken());
                } else {
                    statusText.setText("Google sign-in failed: no ID token");
                }

            } catch (ApiException e) {
                statusText.setText("Google sign-in failed. Code: " + e.getStatusCode());
                Toast.makeText(this, "Google sign-in failed: " + e.getStatusCode(), Toast.LENGTH_LONG).show();
            }
        }

        else if (requestCode == RC_CAMERA_CAPTURE) {
            if (resultCode == RESULT_OK) {
                nativeStatusText.setText("Camera test successful. Photo captured by camera app.");
            } else {
                nativeStatusText.setText("Camera test cancelled.");
            }
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        stopMicrophoneTest(false);

        if (locationListener != null && locationManager != null) {
            try {
                locationManager.removeUpdates(locationListener);
            } catch (Exception ignored) {
            }
        }
    }
}