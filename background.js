// Initialize extension
chrome.runtime.onInstalled.addListener(async () => {
  console.log("Thala-Thirinjon extension installed!");

  // Set up default settings
  const defaultSettings = {
    copyRoastEnabled: true,
    abcKeyboardEnabled: true,
    pageRotateEnabled: true,
    inputSlangifyEnabled: true,
    undoRoastEnabled: true,
    selectedSlangifyEnabled: true,
    prankModeEnabled:false,
    blastEnabled:true,
  };

  await chrome.storage.sync.set(defaultSettings);

});
