# PROJECT DOCUMENT

# Table of contents

1. [Overview](#overview)
   1. [Folder Structure](#folder-structure)
   2. [Tools](#tool)
      1. [frontend](#tool-frontend)
      2. [backend](#tool-frontend)
   3. [Functionalities](#functionality)
      1. [frontend](#functionality-frontend)
      2. [backend](#functionality-frontend)
   4. [USAGE](#usage)

## I. OVERVIEW <a name="overview"></a>

### 1. FOLDER STRUCTURE <a name="folder-structure"></a>

```
D:.
├───back-end
│   ├───db
│   └───src
│       ├───requests-handler
│       ├───types
│       └───utils
└───front-end
    ├───public
    └───src
        ├───components
        │   ├───atoms
        │   │   ├───dynamic-text
        │   │   └───input
        │   ├───molecures
        │   │   ├───notification
        │   │   └───tooltip
        │   └───oganism
        │       ├───register
        │       └───search-bar
        ├───constants
        ├───types
```

---

### 2. Tools <a name="tool"></a>

1. Frontend <a name="tool-frontend"></a>

   - ReactJS
   - Typescripts
   - Styled-components
   - React-icons

2. Backend <a name="tool-backend"></a>

   - NodeJS
   - ExpressJS
   - SQLite/SQLite3

---

### 3. Functionalities <a name="functionalities"></a>

1. Frontend <a name="functionalities-backend"></a>

   - One page
   - Search engine to search for
   - Sign up new user
   - Viewing user balance
   - Deposit/Withdraw balance
   - Validate modify amount

2. Backend <a name="functionalities-backend"></a>

   - REST API
   - Create new user with auto generated UUID (POST)
   - Get user info with id (GET)
   - Update user balance (PATCH deposit/withdraw)
   - Query user by id/display name (GET)

---

### 4. USAGE <a name="usage"></a>

- STEP 1: Require YARN/NODE to pre-install
- STEP 2: Run init.sh
- STEP 3: Run startAPI.sh
- STEP 4: Run startWebClient.sh
