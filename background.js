const HOURLY_IMAGES = [
  "uploads/hourly_images/image1.png",
  "uploads/hourly_images/image2.png",
  "uploads/hourly_images/meme1.png",
  "uploads/hourly_images/meme2.png",
  "uploads/hourly_images/meme3.png",
];

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
    prankModeEnabled:true,
  };

  await chrome.storage.sync.set(defaultSettings);

});
