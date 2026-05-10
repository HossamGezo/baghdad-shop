# 🛍️ Baghdad Shop - Full-Stack E-Commerce Ecosystem

<div align="center">

![React](https://img.shields.io/badge/React_19-%2320232a?style=flat&logo=react)
![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat&logo=redux)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_4-38B2AC?style=flat&logo=tailwind-css)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white)
<br />
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat&logo=zod&logoColor=white)
![ReactRouter](https://img.shields.io/badge/React_Router_7-CA4245?style=flat&logo=react-router)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-339933?style=flat)
![Bcrypt](https://img.shields.io/badge/Bcrypt-gray?style=flat&logo=lock)
![JWT](https://img.shields.io/badge/JWT-black?style=flat&logo=json-web-tokens)

<br />

[**🌐 Live Demo**](https://baghdad-shop.netlify.app/)

</div>

---

## 🌟 Overview: A Powerful Dual-Sided Platform

**Baghdad Shop** is a high-performance e-commerce ecosystem built to provide a premium experience for both **Customers** and **Store Administrators**. Engineered using the latest stable releases of React 19 and Tailwind CSS 4.0, bridging high-speed frontend performance with a robust **Node.js/TypeScript** backend, featuring automated asset migration, cloud-based data management, and an industrial-grade security layer.

---

## 📸 Visual Journey & System Modules

### 🖥️ The Command Center (Admin Desktop)

_Mastery of data management and real-time business analytics._

|         Global Statistics & Recent Activity          |              Advanced Inventory Management               |
| :--------------------------------------------------: | :------------------------------------------------------: |
| <img src="assets/admin-dashboard.png" width="450" /> | <img src="assets/admin-products-list.png" width="450" /> |
|         _Real-time revenue & user tracking_          |        _Full CRUD with Cloudinary Image Pipeline_        |

|                       User Governance                       |            Product Orchestration (Add/Edit)            |
| :---------------------------------------------------------: | :----------------------------------------------------: |
| <img src="assets/admin-users-management.png" width="450" /> | <img src="assets/admin-add-product.png" width="450" /> |
|                   _RBAC Role management_                    |       _Multipart/Form-Data multi-image uploads_        |

---

### 👤 The Personalized Hub (Customer Desktop)

_Clean, intuitive, and conversion-focused shopping experience._

|               Storefront & Discovery               |                   Intelligence in Filtering                   |
| :------------------------------------------------: | :-----------------------------------------------------------: |
| <img src="assets/customer-home.png" width="450" /> | <img src="assets/customer-category-filter.png" width="450" /> |
|          _Modern Hero & Product Sliders_           |           _Post-discount price sorting via MongoDB_           |

|                 Smart Cart & Checkout                  |                  Transparent Order History                  |
| :----------------------------------------------------: | :---------------------------------------------------------: |
| <img src="assets/customer-checkout.png" width="450" /> | <img src="assets/customer-order-history.png" width="450" /> |
|            _Server-side price verification_            |           _Visual "Stacked Image" order previews_           |

---

### 📱 Mobile-First Excellence

_Engineered for performance and accessibility on small screens._

|                  Home Interface                  |                    User Navigation                     |                     Admin Analytics                     |                       Admin Navigation                       |
| :----------------------------------------------: | :----------------------------------------------------: | :-----------------------------------------------------: | :----------------------------------------------------------: |
| <img src="assets/mobile-home.png" width="200" /> | <img src="assets/mobile-navigation.png" width="200" /> | <img src="assets/mobile-admin-stats.png" width="200" /> | <img src="assets/mobile-admin-navigation.png" width="200" /> |
|                  _Fluid Layout_                  |                  _Contextual Sidebar_                  |                    _Dashboard Cards_                    |                       _Admin Controls_                       |

---

### 🔐 Security & Identity Module

- **Secure Entrance:** Authentication via **JWT** with automated token persistence.
- **Email Verification:** Real-time account activation using **Nodemailer**.
- **Access Recovery:** Secure Password Reset flow with temporary tokens.
- **Data Protection:** Guarded against **XSS**, **HPP**, and API rate limiting.
---

## 🛡️ Security & Performance Highlights

This project was built with a focus on making the store safe, fast, and reliable:

- **Data Protection:** We clean all data sent by users to prevent "XSS" attacks (stopping malicious code from running in the browser).
- **Safe Passwords:** All user passwords are encrypted (Hashed) using **Bcrypt** before they are saved in the database, ensuring maximum privacy.
- **Anti-Spam:** Added a limit to how many requests a user can make in a short time to protect the server from being overwhelmed.
- **Fast Calculations:** Instead of calculating numbers in the browser, the server uses **MongoDB Aggregation** to get totals (like revenue) directly from the database, which is much faster.
- **Cloud Images:** All product images are hosted on **Cloudinary**, a global service that ensures images load quickly for users anywhere.
- **Automated Quality:** Uses tools like **Husky** and **Prettier** to make sure the code is always clean and formatted correctly before saving it to GitHub.
---

## 🏗️ System Architecture & Directory Structure

The project follows a Monorepo Architecture, ensuring a clean separation between the user interface and the business logic.

```text
baghdad-shop/
├── client/                 # Frontend: React 19 Single Page Application (SPA)
│   ├── src/
│   │   ├── app/            # Global Redux store configuration & typed hooks
│   │   ├── features/       # Feature-slice architecture (State, Thunks, Reducers)
│   │   ├── components/     # Atomic & Shared UI components
│   │   ├── pages/          # View components categorized by route
│   │   ├── layouts/        # Structural wrappers (Admin, User, Root)
│   │   └── utils/          # API interceptors & common utility functions
│   └── package.json        # Client-side dependencies & scripts
│
├── server/                 # Backend: Node.js / Express RESTful API
│   ├── src/
│   │   ├── modules/        # Modular Domain Logic (Auth, Product, Order, Stats)
│   │   │   └── [module]/   # Encapsulated Controller, Route, and Validation
│   │   ├── models/         # Mongoose schemas & Data Persistence logic
│   │   ├── shared/         # Cross-cutting concerns (Middlewares, Helpers, Data)
│   │   └── index.ts        # Server entry point & middleware pipeline
│   └── package.json        # Backend dependencies & production scripts
│
├── assets/                 # Documentation assets & system screenshots
└── package.json            # Root orchestrator for unified Monorepo commands
```

---

## ⚙️ DevOps & Automation

- **Automated Migration:** Custom Node.js script to migrate 100+ assets to **Cloudinary**.
- **Seeding System:** Automated database population with relational integrity.
- **Workflow:** Guarded by **Husky** and **Lint-staged** to enforce code quality.
- **Hosting:** API on **Render**, Frontend on **Netlify**.

---

## 🛠️ Installation & Local Setup

To run this project locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/HossamGezo/baghdad-shop.git
cd baghdad-shop
```

### 2. Install dependencies

From the root directory, run:

```bash
npm install && npm run install-all
```

### 3. Environment Configuration

Create a `.env` file in the **server** directory and add:

- `MONGO_URI`, `JWT_SECRET_KEY`, `CLOUDINARY_CLOUD_NAME`, etc.

Create a `.env` file in the **client** directory and add:

- `VITE_API_URL=http://localhost:5001/api`

### 4. Run the application

You can launch both the frontend and backend with a single command from the root:

```bash
npm run dev
```

---

## 👨‍💻 Connect with Me

If you have any questions about this project or want to collaborate, feel free to reach out!

- **LinkedIn:** [Your Profile Link]
- **GitHub:** [@HossamGezo](https://github.com/HossamGezo)
- **Email:** ha2ghossam10@gmail.com

---

Developed with ❤️ by **Hossam Gouda**