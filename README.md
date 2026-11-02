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

The public repository now includes a **release verification gate**:
`.github/workflows/activate-release.yml` runs when a GitHub **pre-release** is published. It downloads `GrillPilot-release.apk`, checks the Android signature against the approved SHA-256 signing certificate variable `GRILLPILOT_CERT_SHA256`, confirms the package ID, extracts version information, rejects downgrade/duplicate version codes, and only then updates `latest.json`. That change automatically deploys the website and activates the download button.

Before publishing, add **Settings → Secrets and variables → Actions → Variables → New repository variable**: `GRILLPILOT_CERT_SHA256` with the SHA-256 fingerprint of the permanent GrillPilot *certificate*, **not** the APK file's SHA-256. It is okay for a certificate fingerprint to be public. The workflow refuses activation without it.

**Do not publish an unsigned or untested APK.** Mark the release **Set as a pre-release**, attach the APK named *exactly* `GrillPilot-release.apk`, and use a versioned tag such as `v0.6.0-beta.1`. Upload via the GitHub Releases web interface after confirming it on your Pixel. Only manually publishing that pre-release triggers activation.


A passing GitHub Actions build is not enough to declare a release production-ready.

- Validate iGrill 2 connectivity, live temperatures, alarms, lock-screen behavior, and small-screen/large-font handling on Android.
- Use a permanent Android release signing key, securely stored in encrypted secrets, for **all** public builds. Do not commit the private key.
- Create a GitHub Release in this public repository and upload **only** the approved signed APK.
- Verify the APK's SHA-256 and signing identity.
- After release publication, the verification workflow generates `latest.json` from the **actual APK** and commits it. Do not paste unverified hashes or URLs into the live manifest.
- Android installation always requires the user's confirmation. Existing installs can update without losing data only when the app package name and signing certificate match.

## Privacy and compatibility

Only Weber iGrill 2 has been tested against the current Bluetooth driver. Predictive ETA is experimental; verify safe doneness independently. Public downloads are unavailable during prelaunch.
