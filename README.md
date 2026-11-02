# GrillPilot — Android downloads

This public repository hosts only the [GrillPilot download website](https://chall2013.github.io/GrillPilot-Downloads/) and eventually approved, signed Android APK releases. The app's Android **source code stays private** in the separate `Chall2013/GrillPilot` repository.

## Website

The static website is deployed automatically by `.github/workflows/pages.yml`. To activate it on first use:

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Open **Actions → Deploy GrillPilot website** and select **Run workflow** if no deployment has run after enabling Pages.
4. Visit `https://chall2013.github.io/GrillPilot-Downloads/`.

Until a **properly signed and user-approved APK** is available, `latest.json` uses `status: "prelaunch"` and the download button is intentionally disabled.

## Publishing an approved beta

A passing GitHub Actions build is not enough to declare a release production-ready.

- Validate iGrill 2 connectivity, live temperatures, alarms, lock-screen behavior, and small-screen/large-font handling on Android.
- Use a permanent Android release signing key, securely stored in encrypted secrets, for **all** public builds. Do not commit the private key.
- Create a GitHub Release in this public repository and upload **only** the approved signed APK.
- Verify the APK's SHA-256 and signing identity.
- Update `latest.json` with the approved version, HTTPS GitHub Release APK URL, actual 64-digit SHA-256, and release notes. This makes the website download button active and updates the in-app checker.
- Android installation always requires the user's confirmation. Existing installs can update without losing data only when the app package name and signing certificate match.

## Privacy and compatibility

Only Weber iGrill 2 has been tested against the current Bluetooth driver. Predictive ETA is experimental; verify safe doneness independently. Public downloads are unavailable during prelaunch.
