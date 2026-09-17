<div align="center">

# InfiniteCourses.Org Direct Link Injector

[![Version](https://img.shields.io/badge/Version-1.0-007EC6?style=for-the-badge&logo=codeigniter&logoColor=white)](https://greasyfork.org/en/scripts/596225-infinitecourses-org-direct-link-injector)
[![Greasy Fork](https://img.shields.io/badge/Greasy%20Fork-Install%20Script-FF0000?style=for-the-badge&logo=greasyfork&logoColor=white)](https://greasyfork.org/en/scripts/59622)
[![Tampermonkey](https://img.shields.io/badge/Tampermonkey-Supported-138B44?style=for-the-badge&logo=tampermonkey&logoColor=white)](https://www.tampermonkey.net/)
[![Violentmonkey](https://img.shields.io/badge/Violentmonkey-Supported-FF8C00?style=for-the-badge&logo=javascript&logoColor=white)](https://violentmonkey.github.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-007EC6?style=for-the-badge&logo=open-source-initiative&logoColor=white)](LICENSE)

A lightweight userscript designed to intercept and display direct download links on InfiniteCourses download pages. It seamlessly extracts backend data to bypass hidden links and injects a clean, categorized user interface natively into the page. 

</div>

---

> [!IMPORTANT]
> **Dynamic Extraction:**  
> This script fetches the page's HTML and parses the `__NEXT_DATA__` JSON payload to uncover hidden download URLs. If links fail to appear in the custom section, simply reloading the page will trigger a fresh fetch.

> [!TIP]
> **Native UI Integration:**  
> The script injects a visually appealing, frosted-glass themed container right below the standard `.download-section`. Interactive buttons with SVG icons and hover animations are generated for each extracted link part.

---

## ✨ Features

- **Direct Link Extraction:** Intercepts backend data by parsing Next.js page properties to find hidden direct URLs.
- **Smart Categorization:** Automatically identifies and groups download URLs into specific providers like **Pixeldrain** and **Send.now**, categorizing the rest as "Other".
- **Seamless UI Injection:** Creates a custom download section with a modern UI, utilizing styling like `backdrop-filter: blur(8px)` and hover transformations without disrupting the host site's layout.
- **Dynamic Polling:** Uses a 500ms interval check to ensure the custom direct links section is injected as soon as the target `.download-section` appears in the DOM.
- **Error Handling:** Gracefully handles missing link data or network errors by displaying helpful error messages directly in the injected UI.

---

## 🌐 Supported Domains

| Platform | Domains | Direct Extraction | Categorization | Notes |
| :--- | :--- | :---: | :---: | :--- |
| **InfiniteCourses** | `www.infinitecourses.org/*` | ✅ Active | ✅ Active | Specifically targets the `/course/` paths to render the injector. |

---

## 🚀 Installation

### Step 1: Install a Userscript Manager
Make sure you have an active userscript extension installed in your browser:
* **[Tampermonkey](https://www.tampermonkey.net/)** *(Recommended)*
* **[Violentmonkey](https://violentmonkey.github.io/)**

### Step 2: Install the Script
Install or update to version 1.0 via your manager:  
👉 **[Install from Greasy Fork](https://greasyfork.org/en/scripts/596225-infinitecourses-org-direct-link-injector)** 

### Step 3: Usage
Navigate to any course download page on InfiniteCourses. Scroll down to the download section, and the script will automatically append a "**DIRECT DOWNLOADS**" panel with your extracted links. 

---

## 📄 License

This script, **InfiniteCourses.Org Direct Link Injector**, is open source and distributed under the **[MIT License](LICENSE)**.

---

## 🛠️ Author & Support
* Developed and maintained by **[rehan dilawar](https://github.com/rehandilawar)**.
* If you encounter fetching errors or broken selectors, feel free to open an issue or contribute on GitHub.

---

<p align="center">
  <em>If you found this script helpful, please consider starring the repository!</em>
</p>
