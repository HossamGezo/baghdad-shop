# 🛍️ Baghdad Shop - Enterprise Full-Stack E-Commerce Ecosystem

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
![Bcrypt](https://img.shields.io/badge/Bcrypt-gray?style=flat)
![JWT](https://img.shields.io/badge/JWT-black?style=flat&logo=json-web-tokens)

<br />

[**🌐 Live Demo**](https://baghdad-shop.netlify.app/)

</div>

---

## 🌟 Overview: A Powerful Dual-Sided Platform

**Baghdad Shop** is a high-performance e-commerce ecosystem built to provide a premium experience for both **Customers** and **Store Administrators**. It bridges a cutting-edge **React 19** frontend with a robust **Node.js/TypeScript** backend, featuring automated asset migration, cloud-based data management, and an industrial-grade security layer.

---

## 📸 Visual Journey & System Modules

### 🖥️ The Command Center (Admin Desktop)
_Mastery of data management and real-time business analytics._

| Global Statistics & Recent Activity | Advanced Inventory Management |
| :---: | :---: |
| <img src="assets/admin-dashboard.png" width="450" /> | <img src="assets/admin-products-list.png" width="450" /> |
| _Real-time revenue & user tracking_ | _Full CRUD with Cloudinary Image Pipeline_ |

| User Governance | Product Orchestration (Add/Edit) |
| :---: | :---: |
| <img src="assets/admin-users-management.png" width="450" /> | <img src="assets/admin-add-product.png" width="450" /> |
| _RBAC Role management_ | _Multipart/Form-Data multi-image uploads_ |

---

### 👤 The Personalized Hub (Customer Desktop)
_Clean, intuitive, and conversion-focused shopping experience._

| Storefront & Discovery | Intelligence in Filtering |
| :---: | :---: |
| <img src="assets/customer-home.png" width="450" /> | <img src="assets/customer-category-filter.png" width="450" /> |
| _Modern Hero & Product Sliders_ | _Post-discount price sorting via MongoDB_ |

| Smart Cart & Checkout | Transparent Order History |
| :---: | :---: |
| <img src="assets/customer-checkout.png" width="450" /> | <img src="assets/customer-order-history.png" width="450" /> |
| _Server-side price verification_ | _Visual "Stacked Image" order previews_ |

---

### 📱 Mobile-First Excellence
_Engineered for performance and accessibility on small screens._

| Home Interface | User Navigation | Admin Analytics | Admin Navigation |
| :---: | :---: | :---: | :---: |
| <img src="assets/mobile-home.png" width="200" /> | <img src="assets/mobile-navigation.png" width="200" /> | <img src="assets/mobile-admin-stats.png" width="200" /> | <img src="assets/mobile-admin-navigation.png" width="200" /> |
| _Fluid Layout_ | _Contextual Sidebar_ | _Dashboard Cards_ | _Admin Controls_ |

---

### 🔐 Security & Identity Module
*   **Secure Entrance:** Authentication via **JWT** with automated token persistence.
*   **Email Verification:** Real-time account activation using **Nodemailer**.
*   **Access Recovery:** Secure Password Reset flow with temporary tokens.
*   **Data Protection:** Guarded against **XSS**, **HPP**, and API rate limiting.

---

## 🏗️ Architecture & Project Structure
The project follows a **Monorepo Architecture**, ensuring a clean separation between the user interface and the business logic.

```text
baghdad-shop/
├── client/              # React 19 Frontend (Vite)
│   ├── src/features/    # Feature-based Redux slices
│   └── src/components/  # Atomic UI components
├── server/              # Node.js REST API (TypeScript)
│   ├── src/modules/     # Modular Domain Logic (Auth, User, Product, Order)
│   ├── src/models/      # Mongoose Data Models
│   └── src/shared/      # Reusable Middlewares & Helpers
├── assets/              # Documentation assets (Mobile & Desktop)
└── package.json         # Root manager for unified scripts
```

---

## ⚙️ DevOps & Automation
*   **Automated Migration:** Custom Node.js script to migrate 100+ assets to **Cloudinary**.
*   **Seeding System:** Automated database population with relational integrity.
*   **Workflow:** Guarded by **Husky** and **Lint-staged** to enforce code quality.
*   **Hosting:** API on **Render**, Frontend on **Netlify**.

---

Developed with precision and passion by **Hossam Gouda**  
_Full-Stack Engineer focused on building scalable and secure digital products._