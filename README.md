# Mess Management System

## Introduction
[cite_start]This Mess Management System is specifically designed for bachelors who want to track their daily meal systems efficiently[cite: 8]. [cite_start]The system manages members, daily meals, shared utility costs, and mess communication through two distinct user roles: **Manager** and **Member**[cite: 3].

## User Onboarding & Mess Creation
[cite_start]When a user logs in, the system checks if they are currently a member of any mess[cite: 4].
* [cite_start]**If the user is not a member:** They are presented with options to either "Create a Mess" or "Join a Mess"[cite: 5].
* [cite_start]**Create a Mess:** The user provides mess information and is automatically registered as the **Manager** in the system[cite: 6].
* [cite_start]**Join a Mess:** The user provides a `mess_id` to join an existing group and is registered as a **Member**[cite: 7].

## User Roles & Capabilities

### Manager Capabilities
The Manager has administrative control over the financial and logistics tracking of the mess:
* [cite_start]**Meal Tracking:** Can record and update member meal counts (POST/PUT)[cite: 12, 13].
* [cite_start]**Expense Management:** Can insert and update meal-related expenses for users (POST/PUT)[cite: 14, 15].
* [cite_start]**Utility Costs:** Can manage monthly shared costs such as rent, internet, gas, and electricity (POST/PUT)[cite: 16, 17].
* [cite_start]**Announcements:** Can send mess-wide notices and view all past notices for their mess[cite: 18, 20].

### Member Capabilities
Members participate in the mess and can contribute to logistics:
* [cite_start]**Shopping Requests:** Members can send notices to the mess, such as shopping requests for specific food items (POST)[cite: 22, 23].

## Database Architecture
The system relies on a relational database to maintain data integrity across meals, costs, and memberships.

### ER Diagram
The following diagram illustrates the relationships between users, mess entities, meals, and notice boards.



### Core Tables:
* [cite_start]**Users:** Stores authentication and profile data[cite: 9].
* [cite_start]**Messes:** Stores name, address, and status of the mess groups[cite: 9].
* [cite_start]**Members:** Tracks the relationship between users and messes, including roles[cite: 9].
* [cite_start]**Meals & Expenses:** Logs daily counts and monetary contributions[cite: 9].
* [cite_start]**Utility Costs:** Records shared house expenses managed by the manager[cite: 9].
* [cite_start]**Notices:** Stores communication logs between managers and members[cite: 9].

---