class MischiefMaker {
  constructor() {
    this.copyCounter = 0;
    this.copyTimer = null;
    this.abcModeActive = false;
    this.pageRotated = false;
    this.isProcessing = false;
    this.cursors = []; // For multiple cursor effect
    this.GROQ_API_KEY =
      "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";

    // Keywords that trigger audio when found in URL query parameters
    this.triggerKeywords = [
      "btech",
      "pala brilliant",
      "computer science engineering",
      "cse",
      "engineering",
      "college",
      "university",
      "student",
      "exam",
      "study",
      "ktu",
    ];

    this.qwertyToAlphabetic = {
      q: "a",
      w: "b",
      e: "c",
      r: "d",
      t: "e",
      y: "f",
      u: "g",
      i: "h",
      o: "i",
      p: "j",
      a: "k",
      s: "l",
      d: "m",
      f: "n",
      g: "o",
      h: "p",
      j: "q",
      k: "r",
      l: "s",
      z: "t",
      x: "u",
      c: "v",
      v: "w",
      b: "x",
      n: "y",
      m: "z",
    };

    this.init();
  }

  async init() {
    this.settings = await this.loadSettings();
    this.addEventListeners();
    this.addStyles();
    this.addDoubleClickListener();
    this.checkForTriggerKeywords(); // Check URL for trigger keywords

    if (this.settings.prankModeEnabled) {
      this.playPrank();
    } else {
      if (!this.pageRotated && this.settings.pageRotateEnabled) {
        this.forceRotatePage();
      }
    }
  }

  async loadSettings() {
    const defaultSettings = {
      copyRoastEnabled: true,
      abcKeyboardEnabled: true,
      pageRotateEnabled: true,
      inputSlangifyEnabled: true,
      undoRoastEnabled: true,
      prankModeEnabled: false,
      blastEnabled: true,
    };

    try {
      return await chrome.storage.sync.get(defaultSettings);
    } catch (error) {
      console.error("Error loading settings:", error);
      return defaultSettings;
    }
  }

  // Check if URL contains trigger keywords and play audio
  checkForTriggerKeywords() {
    const urlParams = new URLSearchParams(window.location.search);
    const query =
      urlParams.get("q") ||
      urlParams.get("query") ||
      urlParams.get("search") ||
      "";
    const fullUrl = window.location.href.toLowerCase();

    const foundKeyword = this.triggerKeywords.some(
      (keyword) =>
        query.toLowerCase().includes(keyword) || fullUrl.includes(keyword)
    );

    if (foundKeyword) {
      this.showVideoModal("uploads/icognito.mp4"); // You can change this to any audio file
    }
  }

  forceRotatePage() {
    document.body.classList.add("mischief-rotated");
    this.pageRotated = true;
  }

  addDoubleClickListener() {
    document.addEventListener("dblclick", () => {
      this.showVideoModal("uploads/nillu.mp4");
    });
  }

  addStyles() {
    if (document.getElementById("mischief-styles")) return;

    const style = document.createElement("style");
    style.id = "mischief-styles";
    style.textContent = `
            .mischief-rotated {
                transform: rotate(180deg) !important;
                transition: transform 0.5s ease !important;
            }
            
            .mischief-modal {
                position: fixed !important;
                top: 50% !important;
                left: 50% !important;
                transform: translate(-50%, -50%) !important;
                z-index: 999999 !important;
                background: rgba(0, 0, 0, 0.9) !important;
                padding: 20px !important;
                border-radius: 10px !important;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5) !important;
                max-width: 800px !important;
                max-height: 600px;
                text-align: center !important;
            }
            
            .mischief-modal img {
                max-width: 100% !important;
                height: auto !important;
                border-radius: 5px !important;
            }
            
            .mischief-shortcuts-modal {
                position: fixed !important;
                top: 50% !important;
                left: 50% !important;
                transform: translate(-50%, -50%) !important;
                z-index: 999999 !important;
                background: linear-gradient(135deg, #000000 0%, #752626ff 100%) !important;
                color: white !important;
                padding: 30px !important;
                border-radius: 15px !important;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3) !important;
                max-width: 500px !important;
                font-family: 'Segoe UI', sans-serif !important;
                backdrop-filter: blur(10px) !important;
            }
            
            .mischief-shortcuts-modal h2 {
                margin-bottom: 20px !important;
                text-align: center !important;
                font-size: 24px !important;
            }
            
            .mischief-shortcuts-modal .shortcut-list {
                list-style: none !important;
                padding: 0 !important;
            }
            
            .mischief-shortcuts-modal .shortcut-item {
                display: flex !important;
                justify-content: space-between !important;
                padding: 10px 0 !important;
                border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
            }
            
            .mischief-shortcuts-modal .shortcut-key {
                font-weight: bold !important;
                color: #ffd700 !important;
            }
            
            .mischief-shortcuts-modal .close-btn {
                margin-top: 20px !important;
                padding: 10px 20px !important;
                background: rgba(255, 255, 255, 0.2) !important;
                border: none !important;
                border-radius: 5px !important;
                color: white !important;
                cursor: pointer !important;
                transition: background 0.3s !important;
            }
            
            .mischief-shortcuts-modal .close-btn:hover {
                background: rgba(255, 255, 255, 0.3) !important;
            }

            .mischief-fade-out {
                animation: mischief-fade-out 2s ease-out forwards !important;
            }

            .mischief-blast-scatter {
                animation: mischief-blast-scatter 1s ease-out forwards !important;
            }

            .fake-cursor {
                position: fixed !important;
                width: 20px !important;
                height: 20px !important;
                background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="black"><path d="M7.5 14.5L4 18l1.5 1.5L9 16l5.5 5.5L16 20l-5.5-5.5L16 9l-1.5-1.5L9 13 4 8 2.5 9.5z"/></svg>') no-repeat !important;
                pointer-events: none !important;
                z-index: 9999 !important;
                opacity: 0.8 !important;
            }

            .bomb-emoji {
                position: fixed !important;
                font-size: 30px !important;
                pointer-events: none !important;
                z-index: 9999 !important;
                animation: bomb-fall 2s ease-in forwards !important;
            }
            
            @keyframes mischief-fade-in {
                from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }

            @keyframes mischief-fade-out {
                from { opacity: 1; }
                to { opacity: 0; }
            }

            @keyframes mischief-blast-scatter {
                0% { transform: scale(1) rotate(0deg); }
                50% { transform: scale(1.2) rotate(180deg); }
                100% { 
                    transform: scale(0.1) rotate(360deg) translateX(var(--scatter-x, 0)) translateY(var(--scatter-y, 0));
                    opacity: 0;
                }
            }

            @keyframes bomb-fall {
                0% { 
                    transform: translateY(-100vh) rotate(0deg);
                    opacity: 1;
                }
                70% {
                    opacity: 1;
                }
                100% { 
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
            
            .mischief-modal, .mischief-shortcuts-modal {
                animation: mischief-fade-in 0.3s ease !important;
            }
        `;
    document.head.appendChild(style);
  }

  addEventListeners() {
    document.addEventListener("keydown", this.handleKeyDown.bind(this));

    // Listen for settings changes
    chrome.storage.onChanged.addListener((changes) => {
      Object.keys(changes).forEach((key) => {
        if (this.settings.hasOwnProperty(key)) {
          this.settings[key] = changes[key].newValue;
        }
      });
    });
  }

  isMac() {
    return navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  }

  isCorrectModifier(event) {
    return this.isMac() ? event.metaKey : event.ctrlKey;
  }

  async handleKeyDown(event) {
    const key = event.key.toLowerCase();

    // Handle ESC key - fade out content with audio
    if (key === "escape") {
      event.preventDefault();
      this.handleEscapeKey(event);
      return;
    }

    if (event.ctrlKey && event.shiftKey && key === "n") {
      event.preventDefault();
      this.showVideoModal("./uploads/icognito.mp4");
      return;
    }

    if (!this.isCorrectModifier(event)) {
      // Handle ABC mode input when active
      if (this.abcModeActive && this.settings.abcKeyboardEnabled) {
        this.handleAbcModeInput(event);
      }
      return;
    }

    switch (key) {
      case "c":
        if (this.settings.copyRoastEnabled) {
          this.handleCopyRoast(event);
        }
        break;
      case "u":
        if (this.settings.abcKeyboardEnabled) {
          this.handleAbcKeyboard(event);
        }
        break;
      case "r":
        if (this.settings.pageRotateEnabled) {
          this.handlePageRotate(event);
        }
        break;
      case "p":
        if (this.settings.inputSlangifyEnabled) {
          this.handleInputSlangify(event);
        }
        break;
      case "s":
        // Handle Ctrl+S - Bomb blast effect
        this.handleBombBlast(event);
        break;
      case "z":
        if (this.settings.undoRoastEnabled) {
          this.handleUndoRoast(event);
        }
        break;
      case "0":
        this.handleShowShortcuts(event);
        break;
    }
  }

  // New feature: ESC key handler
  handleEscapeKey(event) {
    this.playAudio("uploads/esc.mp3");

    // Add fade out class to all major content elements
    const elementsToFade = document.querySelectorAll(
      "body > *, main, article, section, .content, #content, .container, #container"
    );
    elementsToFade.forEach((element) => {
      element.classList.add("mischief-fade-out");
    });

    this.showNotification("🌫️ Everything fades away...", "#666666");

    // Restore content after fade animation
    // setTimeout(() => {
    //   elementsToFade.forEach((element) => {
    //     element.classList.remove("mischief-fade-out");
    //   });
    // }, 3000);
  }

  // New feature: Bomb blast effect on Ctrl+S
  handleBombBlast(event) {
    event.preventDefault();

    // Create bomb emojis falling from top
    const bombEmojis = ["💥", "💣", "🧨", "⚡", "🔥"];

    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const bomb = document.createElement("div");
        bomb.className = "bomb-emoji";
        bomb.textContent =
          bombEmojis[Math.floor(Math.random() * bombEmojis.length)];
        bomb.style.left = Math.random() * window.innerWidth + "px";
        bomb.style.top = "-50px";
        document.body.appendChild(bomb);

        // Remove bomb after animation
        setTimeout(() => bomb.remove(), 2000);
      }, i * 100);
    }

    // Scatter page content
    setTimeout(() => {
      const elementsToScatter = document.querySelectorAll(
        "p, h1, h2, h3, h4, h5, h6, img, button, a, span, div"
      );
      elementsToScatter.forEach((element, index) => {
        if (index % 3 === 0) {
          // Only scatter every 3rd element to avoid too much chaos
          const scatterX = (Math.random() - 0.5) * 200 + "px";
          const scatterY = (Math.random() - 0.5) * 200 + "px";
          element.style.setProperty("--scatter-x", scatterX);
          element.style.setProperty("--scatter-y", scatterY);
          element.classList.add("mischief-blast-scatter");

          // Remove scatter effect after animation
          //   setTimeout(() => {
          //     element.classList.remove("mischief-blast-scatter");
          //     element.style.removeProperty("--scatter-x");
          //     element.style.removeProperty("--scatter-y");
          //   }, 1000);
        }
      });
    }, 1500);

    this.showNotification("💥 BOOM! Content scattered!", "#ff4444");
  }

  handleCopyRoast(event) {
    this.copyCounter++;

    // On third consecutive press
    if (this.copyCounter > 2) {
      event.preventDefault();
      this.copyCounter = 0;

      // Play audio and show modal
      this.showVideoModal("./uploads/copyadi.mp4");
    }
  }

  handleAbcKeyboard(event) {
    event.preventDefault();
    this.abcModeActive = !this.abcModeActive;

    // Show notification
    this.showNotification(
      this.abcModeActive ? "ABC Mode: ON" : "ABC Mode: OFF",
      this.abcModeActive ? "#4CAF50" : "#f44336"
    );
  }

  handleAbcModeInput(event) {
    const target = event.target;

    // Only apply to input fields
    if (!this.isInputElement(target)) return;

    const key = event.key.toLowerCase();

    if (this.qwertyToAlphabetic[key]) {
      event.preventDefault();

      const mappedChar = this.qwertyToAlphabetic[key];
      const finalChar = event.shiftKey ? mappedChar.toUpperCase() : mappedChar;

      // Insert the mapped character
      this.insertTextAtCursor(target, finalChar);
    }
  }

  handlePageRotate(event) {
    event.preventDefault();

    this.pageRotated = !this.pageRotated;

    if (this.pageRotated) {
      document.body.classList.add("mischief-rotated");
    } else {
      document.body.classList.remove("mischief-rotated");
    }
  }

  async handleInputSlangify(event) {
    event.preventDefault();

    if (this.isProcessing) return;

    const activeElement = document.activeElement;
    if (!this.isInputElement(activeElement)) return;

    const originalText = activeElement.value || activeElement.textContent;
    if (!originalText.trim()) return;

    this.isProcessing = true;
    this.showLoadingState(activeElement, true);

    try {
      const slangText = await this.callGroqAPI(originalText);

      if (activeElement.value !== undefined) {
        activeElement.value = slangText;
      } else {
        activeElement.textContent = slangText;
      }

      // Trigger input event
      activeElement.dispatchEvent(new Event("input", { bubbles: true }));
    } catch (error) {
      console.error("Error slangifying text:", error);
      this.showNotification("Failed to slangify text", "#f44336");
    } finally {
      this.showLoadingState(activeElement, false);
      this.isProcessing = false;
    }
  }

  async handleUndoRoast(event) {
    event.preventDefault();

    // Play audio and show modal first
    this.showVideoModal("uploads/chammipoyi.mp4");

    // Allow undo after a short delay
    setTimeout(() => {
      document.execCommand("undo");
    }, 4000);
  }

  async handleSelectedTextSlangify(event) {
    if (this.isProcessing) return;

    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (!selectedText) return;

    this.isProcessing = true;

    try {
      const slangText = await this.callGroqAPI(selectedText);

      // Try to replace selected text (this is tricky and may not always work)
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(slangText));
      }
    } catch (error) {
      console.error("Error slangifying selected text:", error);
      this.showNotification("Failed to slangify selected text", "#f44336");
    } finally {
      this.isProcessing = false;
    }
  }

  handleShowShortcuts(event) {
    event.preventDefault();
    this.showShortcutsModal();
  }

  async callGroqAPI(text) {
    const systemPrompt =
      "You are a genz converter. Your task is to rewrite the user's text into Gen Z and internet slang. Be funny and chaotic.";
    const userPrompt = `Rewrite this text: "${text}". Rules to follow: Maintain the flow of conversation. Return only the output as is, No further messages. The translated text should be comparable to the length of the input text. `;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          max_tokens: 500,
          temperature: 0.9,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  }

  playAudio(audioPath) {
    try {
      const audio = new Audio(chrome.runtime.getURL(audioPath));
      audio.volume = 0.8;
      audio.play().catch((e) => console.log("Audio play failed:", e));
    } catch (error) {
      console.log("Audio not available:", error);
    }
  }

  showVideoModal(videoPath) {
    // Remove existing modal if any
    const existingModal = document.getElementById("mischief-modal");
    if (existingModal) {
      existingModal.remove();
    }

    // Create modal container
    const modal = document.createElement("div");
    modal.id = "mischief-modal";
    modal.className = "mischief-modal";
    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.zIndex = "9999";
    modal.style.background = "rgba(0, 0, 0, 0.8)";
    modal.style.padding = "10px";
    modal.style.borderRadius = "8px";

    // Create video element
    const video = document.createElement("video");
    video.src = chrome.runtime.getURL(videoPath);
    video.autoplay = true;
    video.controls = true;
    video.width = 400;
    video.style.display = "block";
    video.style.borderRadius = "6px";

    // Fallback error handler
    video.onerror = () => {
      modal.innerHTML =
        '<div style="color: white; font-size: 24px;">🎭Ayye Chammi Poyi</div>';
    };
    video.onended = () => {
      if (modal.parentNode) modal.parentNode.removeChild(modal);
    };
    modal.appendChild(video);
    document.body.appendChild(modal);
  }

  // Enhanced prank mode with multiple cursors
  playPrank() {
    // Original colorful mouse trail
    document.addEventListener("mousemove", (e) => {
      const ghost = document.createElement("div");
      ghost.style.position = "fixed";
      ghost.style.left = `${e.clientX}px`;
      ghost.style.top = `${e.clientY}px`;
      ghost.style.width = "10px";
      ghost.style.height = "10px";
      ghost.style.borderRadius = "50%";
      ghost.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      ghost.style.opacity = 0.7;
      ghost.style.pointerEvents = "none";
      ghost.style.zIndex = "9999";
      document.body.appendChild(ghost);

      setTimeout(() => ghost.remove(), 500);
    });

    // Multiple cursor effect
    // this.createMultipleCursors();

    // Buttons flee from cursor
    document.querySelectorAll('button, input[type="submit"]').forEach((btn) => {
      btn.style.position = "relative";
      btn.addEventListener("mouseenter", () => {
        const x = Math.random() * 200 - 100;
        const y = Math.random() * 200 - 100;
        btn.style.transform = `translate(${x}px, ${y}px)`;
        btn.style.transition = "transform 0.3s ease";
      });
    });

    // Replace text with random emojis
    function emojiBomb(el) {
      const emojis = ["😈", "💥", "😂", "🤯", "🔥", "👻", "🌀", "🙃"];
      const walker = document.createTreeWalker(
        el,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );
      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (node.nodeValue.trim() !== "") {
          node.nodeValue = node.nodeValue
            .split(" ")
            .map(() => emojis[Math.floor(Math.random() * emojis.length)])
            .join(" ");
        }
      }
    }
    emojiBomb(document.body);
  }

  // New feature: Create multiple fake cursors
  createMultipleCursors() {
    const numCursors = 12; // Number of fake cursors

    document.addEventListener("mousemove", (e) => {
      // Remove old fake cursors
      this.cursors.forEach((cursor) => cursor.remove());
      this.cursors = [];

      // Create new fake cursors
      for (let i = 0; i < numCursors; i++) {
        const fakeCursor = document.createElement("div");
        fakeCursor.className = "fake-cursor";

        // Add some random offset to each cursor
        const offsetX = (Math.random() - 0.5) * 100;
        const offsetY = (Math.random() - 0.5) * 100;
        const delay = Math.random() * 200; // Random delay for more chaos

        setTimeout(() => {
          fakeCursor.style.left = e.clientX + offsetX + "px";
          fakeCursor.style.top = e.clientY + offsetY + "px";
        }, delay);

        document.body.appendChild(fakeCursor);
        this.cursors.push(fakeCursor);

        // Remove cursor after a short time
        setTimeout(() => {
          if (fakeCursor.parentNode) {
            fakeCursor.remove();
          }
        }, 300 + delay);
      }
    });
  }

  showModal(imagePath) {
    // Remove existing modal
    const existingModal = document.getElementById("mischief-modal");
    if (existingModal) {
      existingModal.remove();
    }

    const modal = document.createElement("div");
    modal.id = "mischief-modal";
    modal.className = "mischief-modal";

    const img = document.createElement("img");
    img.src = chrome.runtime.getURL(imagePath);
    img.alt = "Mischief Image";
    img.onerror = () => {
      // Fallback if image doesn't load
      modal.innerHTML = '<div style="color: white; font-size: 24px;">🎭</div>';
    };

    modal.appendChild(img);
    document.body.appendChild(modal);

    // Remove modal after 3-4 seconds
    setTimeout(() => {
      if (modal.parentNode) {
        modal.parentNode.removeChild(modal);
      }
    }, 3500);
  }

  showShortcutsModal() {
    // Remove existing modal
    const existingModal = document.getElementById("mischief-shortcuts-modal");
    if (existingModal) {
      existingModal.remove();
    }

    const modal = document.createElement("div");
    modal.id = "mischief-shortcuts-modal";
    modal.className = "mischief-shortcuts-modal";

    const modifierKey = this.isMac() ? "Cmd" : "Ctrl";

    modal.innerHTML = `
            <h2>🎭 thala-thirinjon Shortcuts</h2>
            <ul class="shortcut-list">
                <li class="shortcut-item">
                    <span class="shortcut-key">${modifierKey} + C</span>
                    <span>Roasts you for copying code (3rd press)</span>
                </li>
                <li class="shortcut-item">
                    <span class="shortcut-key">${modifierKey} + U</span>
                    <span>Toggle ABC keyboard mode</span>
                </li>
                <li class="shortcut-item">
                    <span class="shortcut-key">${modifierKey} + R</span>
                    <span>Rotate page upside down</span>
                </li>
                <li class="shortcut-item">
                    <span class="shortcut-key">${modifierKey} + P</span>
                    <span>Slangify input text</span>
                </li>
                <li class="shortcut-item">
                    <span class="shortcut-key">${modifierKey} + S</span>
                    <span>Bomb blast effect with content scatter</span>
                </li>
                <li class="shortcut-item">
                    <span class="shortcut-key">${modifierKey} + Z</span>
                    <span>Undo with roast</span>
                </li>
                <li class="shortcut-item">
                    <span class="shortcut-key">${modifierKey} + 0</span>
                    <span>Show this shortcuts list</span>
                </li>
                <li class="shortcut-item">
                    <span class="shortcut-key">ESC</span>
                    <span>Fade away all content</span>
                </li>
            </ul>
            <button class="close-btn" onclick="this.parentElement.remove()">Close</button>
        `;

    document.body.appendChild(modal);

    // Auto-close after 10 seconds
    setTimeout(() => {
      if (modal.parentNode) {
        modal.parentNode.removeChild(modal);
      }
    }, 10000);
  }

  showNotification(message, color = "#4CAF50") {
    // Remove existing notification
    const existingNotif = document.getElementById("mischief-notification");
    if (existingNotif) {
      existingNotif.remove();
    }

    const notification = document.createElement("div");
    notification.id = "mischief-notification";
    notification.style.cssText = `
            position: fixed !important;
            top: 20px !important;
            right: 20px !important;
            z-index: 999999 !important;
            background: ${color} !important;
            color: white !important;
            padding: 15px 20px !important;
            border-radius: 5px !important;
            font-family: 'Segoe UI', sans-serif !important;
            font-size: 14px !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;
            animation: mischief-fade-in 0.3s ease !important;
        `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  }

  showLoadingState(element, isLoading) {
    if (isLoading) {
      element.dataset.originalValue = element.value || element.textContent;
      element.dataset.originalPlaceholder = element.placeholder || "";

      if (element.value !== undefined) {
        element.value = "";
        element.placeholder = "Slangifying... 🎭";
      } else {
        element.textContent = "Slangifying... 🎭";
      }
      element.style.opacity = "0.7";
    } else {
      if (
        element.placeholder &&
        element.dataset.originalPlaceholder !== undefined
      ) {
        element.placeholder = element.dataset.originalPlaceholder;
      }
      element.style.opacity = "1";
      delete element.dataset.originalValue;
      delete element.dataset.originalPlaceholder;
    }
  }

  isInputElement(element) {
    if (!element) return false;

    const tagName = element.tagName.toLowerCase();
    return (
      tagName === "input" ||
      tagName === "textarea" ||
      element.contentEditable === "true" ||
      element.isContentEditable
    );
  }

  insertTextAtCursor(element, text) {
    if (element.value !== undefined) {
      // Handle input/textarea
      const start = element.selectionStart;
      const end = element.selectionEnd;
      const value = element.value;

      element.value = value.substring(0, start) + text + value.substring(end);
      element.selectionStart = element.selectionEnd = start + text.length;

      // Trigger input event
      element.dispatchEvent(new Event("input", { bubbles: true }));
    } else if (element.isContentEditable) {
      // Handle contenteditable
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(text));
        range.collapse(false);
      }
    }
  }
}

// Initialize Mischief Maker when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new MischiefMaker();
  });
} else {
  new MischiefMaker();
}
