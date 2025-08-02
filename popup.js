const defaultSettings = {
  copyRoastEnabled: true,
  abcKeyboardEnabled: true,
  pageRotateEnabled: true,
  inputSlangifyEnabled: true,
  undoRoastEnabled: true,
  prankModeEnabled: false,
    blastEnabled: true,

};

// Load settings when popup opens
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const settings = await chrome.storage.sync.get(defaultSettings);

    // Set toggle states based on saved settings
    Object.keys(defaultSettings).forEach((setting) => {
      const toggle = document.getElementById(setting);
      if (toggle) {
        toggle.checked = settings[setting];
      }
    });

    // Add event listeners to all toggles
    Object.keys(defaultSettings).forEach((setting) => {
      const toggle = document.getElementById(setting);
      if (toggle) {
        toggle.addEventListener("change", async (e) => {
          const newSettings = {};
          newSettings[setting] = e.target.checked;
          await chrome.storage.sync.set(newSettings);
        });
      }
    });
  } catch (error) {
    console.error("Error loading settings:", error);
  }
});
