(async function () {
  const status = document.getElementById("release-status");
  const button = document.getElementById("download");
  const version = document.getElementById("release-version");
  try {
    const response = await fetch("./latest.json", {cache: "no-store"});
    if (!response.ok) throw new Error("Release information unavailable");
    const data = await response.json();
    if (data.status !== "available" || !Number.isSafeInteger(data.version_code) ||
        data.version_code < 1 || !/^https:\/\//.test(data.apk_url || "") ||
        !/^[a-fA-F0-9]{64}$/.test(data.sha256 || "")) {
      status.textContent = "Public download is being prepared. No approved release is available yet.";
      button.textContent = "Coming soon";
      return;
    }
    const url = new URL(data.apk_url);
    if (url.protocol !== "https:" || url.hostname !== "github.com" ||
        !url.pathname.startsWith("/Chall2013/GrillPilot-Downloads/releases/download/"))
      throw new Error("Unapproved download host");
    button.href = url.href;
    button.textContent = "Download for Android";
    button.classList.remove("disabled");
    button.removeAttribute("aria-disabled");
    button.removeAttribute("tabindex");
    status.textContent = "Ready to install — approved " + (data.version_name || "Android") + " release";
    version.textContent = "Version " + (data.version_name || "latest") + " • Android 8.0+ • No account required";
  } catch (error) {
    status.textContent = "Release information couldn't be loaded. Please check back later.";
    button.textContent = "Download unavailable";
  }
})();