# 🍲 Mess Management System

## 📌 Introduction
The **Mess Management System** is a dedicated platform designed for bachelors to streamline the management of shared meal systems. It automates the tracking of daily meals, shared expenses, and communal utility costs.

## 🚀 Workflow: Onboarding & Logic
When a user logs into the system, the following logic applies:
* **Membership Check**: The system verifies if the user is already part of a mess.
* **New Users**: If not a member, the user can either **Create a Mess** or **Join a Mess**.
* **Creating a Mess**: The user provides mess information and is automatically assigned the role of **Manager**.
* **Joining a Mess**: The user enters a `mess_id` to join an existing setup as a **Member**.

## 👥 User Roles & Permissions
The system maintains a clear distinction between the Manager (administrative) and Member roles to ensure financial transparency.

| Feature | Manager 👑 | Member 👤 | Method |
| :--- | :---: | :---: | :---: |
| Insert/Update Meals | ✅ | ❌ | POST/PUT |
| Manage Meal Expenses | ✅ | ❌ | POST/PUT |
| Manage Utility Costs | ✅ | ❌ | POST/PUT |
| Post Announcements | ✅ | ❌ | POST |
| Post Shopping Requests | ✅ | ✅ | POST |
| View All Mess Notices | ✅ | ✅ | GET |

## 📊 Database Architecture
The application architecture is centered around a relational database designed to track complex shared finances.



![Mess Management System ER Diagram](<img width="1399" height="823" alt="Image" src="https://github.com/user-attachments/assets/e8acb69d-3163-4596-9840-8f06676955f9" />)


### Key Components:
* **Users & Members**: Links individual profiles to mess groups and roles.
* **Meals & Expenses**: Tracks individual meal counts and dietary spending.
* **Utility Costs**: Dedicated tracking for rent, internet, electricity, maid, and gas.
* **Notices**: Acts as a communication hub for mess-wide announcements and shopping requests.

## 🛠 API Implementation Details
* **Meals**: Use `POST` to record daily entries and `PUT` for corrections.
* **Finances**: Utilities and individual expenses are managed via `POST` and `PUT` requests.
* **Notices**: Managers and Members use `POST` for notices, while the Manager uses `GET` to audit all records.
