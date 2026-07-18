# MessMasterApp — Backend

The backend API for **MessMasterApp**, an Android application designed to help bachelors manage shared meal systems. Built with NestJS and PostgreSQL, it handles meal tracking, shared expenses, utility costs, and mess-wide communication.

## Tech Stack

- **Framework**: NestJS (Node.js)
- **Language**: TypeScript
- **Database**: PostgreSQL with TypeORM
- **Auth**: JWT (Access + Refresh tokens) with Passport
- **Other**: bcrypt, nodemailer, cookie-parser

## Workflow: Onboarding & Logic

When a user logs in, the following logic applies:

- **Membership Check**: The system verifies if the user is already part of a mess.
- **New Users**: If not a member, the user can either **Create a Mess** or **Join a Mess**.
- **Creating a Mess**: The user provides mess details and is automatically assigned the role of **Manager**.
- **Joining a Mess**: The user enters a `mess_id` to join an existing mess as a **Member**.

## User Roles & Permissions

| Feature | Manager 👑 | Member 👤 |
| :--- | :---: | :---: |
| Insert/Update Meals | ✅ | ❌ |
| Manage Meal Expenses | ✅ | ❌ |
| Manage Utility Costs | ✅ | ❌ |
| Post Announcements | ✅ | ❌ |
| Post Shopping Requests | ✅ | ✅ |
| View Mess Notices | ✅ | ✅ |
| Change Mess Password | ✅ | ❌ |
| View Member Dashboard | ✅ | ✅ |

## Database Architecture

### ER Diagram

<img width="1273" height="1044" alt="ER Diagram" src="https://github.com/user-attachments/assets/87fbf06d-3ef7-49d7-93ab-cdc1074647ab" />

### Key Entities

- **Users & Members**: Links individual profiles to mess groups with role assignments.
- **Meals & Expenses**: Tracks daily meal counts and individual dietary spending.
- **Utility Costs**: Covers rent, internet, electricity, maid, and gas.
- **Notices**: Communication hub for announcements and shopping requests.

## Project Structure

```
src/
├── auth/           # JWT authentication & refresh token logic
├── mess/           # Mess creation, joining, and management
├── meals/          # Daily meal tracking
├── meal-expenses/  # Individual meal expense management
├── utility/        # Shared utility cost tracking
├── notices/        # Announcements and shopping requests
├── entities/       # TypeORM database entities
├── dtos/           # Data transfer objects & validation
└── shared/         # Shared utilities and guards
```

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL

### Installation

```bash
npm install
```

### Environment Setup

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

### Running the App

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

### Running Tests

```bash
npm run test
```

## Related

- **Android App**: [MessMasterApp](https://github.com/AlAminNahid/MessMasterApp)
