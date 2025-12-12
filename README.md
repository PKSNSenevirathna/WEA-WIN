# WEA-WIN Admin Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-Latest-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-v16+-43853D?style=for-the-badge&logo=node.js&logoColor=white)

A professional End-to-End automation framework for the WEA-WIN Admin Portal. Built with **Playwright**, this project utilizes the **Page Object Model (POM)** design pattern and a specialized **Folder-Based Parallel Architecture** to ensure stable, isolated, and fast test execution.

---

## 🚀 Key Features

* **⚡ Parallel Execution:** Runs 4 independent test groups simultaneously, reducing total execution time by ~75%.
* **🛡️ Session Isolation:** Eliminates "logged out" errors by assigning a dedicated User Account to each test group.
* **🤖 Dynamic Authentication:** The `authenticatedPage` fixture automatically logs in the correct user based on the test folder (via `UserManager`).
* **🧩 Page Object Model:** Clean separation of test logic (`tests/`), page interactions (`pages/`), and locators (`selectors/`).
* **🔧 Robust Reliability:** Enhanced timeouts and stability checks to handle parallel load.

---

## 🏗️ Architecture: Folder-Based Parallel Execution

To solve the issue of "Session Invalidation" (where one test logs out another), tests are organized into **Groups**. Each group runs in its own worker process with a dedicated System Admin account.

| Project Name | Folder Location | Assigned User (Env Var) | Description |
| :--- | :--- | :--- | :--- |
| **Login** | `tests/login/` | `TEST_USER` | Validates Login/Logout/Forgot Password functionality. |
| **Group 1** | `tests/group1/` | `TEST_USER_1` | **User Creation & Management**: Creates, filters, and manages users. |
| **Group 2** | `tests/group2/` | `TEST_USER_2` | **User View & Update**: Views details and edits user profiles. |
| **Group 3** | `tests/group3/` | `TEST_USER_3` | **User Deletion**: Handles user deletion and clean-up workflows. |

---

## 🛠️ Setup & Installation

### 1. Prerequisites
* Node.js (v16 or higher)
* **4 Valid Admin Accounts** in the WEA-WIN test environment (or 1 account reused 4 times, though not recommended for parallel runs).

### 2. Install Dependencies
```bash
npm install
npx playwright install chromium

📂 Project Structure

WEA-WIN/
├── tests/
│   ├── login/                 # Login verification tests
│   ├── group1/                # User Creation & Management tests
│   ├── group2/                # User View & Update tests
│   ├── group3/                # User Deletion tests
│   └── shared/
│       ├── fixtures/baseTest.js   # ⚡ The magic: Auto-login fixture
│       └── helpers/UserManager.js # 🗺️ Maps Projects -> Credentials
├── pages/                     # Interaction Logic (Click, Fill, Navigate)
├── selectors/                 # Element Locators (CSS/XPath)
├── utils/userData.json        # Test Data for forms
├── playwright.config.js       # Configuration (Workers, Timeouts)
└── .env                       # Secrets (Excluded from Git)




