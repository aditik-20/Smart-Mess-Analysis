# 🏨 Smart Hostel & Mess Analytics System

A **data-driven analytics project** designed to help hostels and college mess facilities **reduce food wastage, optimize costs, and understand student meal consumption patterns** using **SQL-centric analytics** with a lightweight frontend dashboard.

This project focuses on **real campus problems** and demonstrates strong skills in **database design, SQL analytics, backend integration, and data visualization**.

---

## 🎯 Problem Statement

Most hostels and mess facilities face the following challenges:

- ❌ Food wastage due to poor demand prediction
- ❌ Manual attendance and meal tracking
- ❌ No insights into peak usage times
- ❌ No monthly cost or wastage reports
- ❌ Inefficient planning of groceries and staff

**This system solves these problems by converting raw attendance and meal data into actionable analytics.**

---

## 💡 Project Objectives

- Track **student attendance per meal**
- Analyze **meal consumption trends**
- Identify **peak usage periods**
- Measure **food wastage vs consumption**
- Generate **daily, weekly, and monthly cost reports**
- Provide a **dashboard for decision-making**

---

## 🧩 System Overview

Student Entry / Meal Logs
↓
Database (SQL)
↓
Analytical Queries (Views, SPs)
↓
Backend APIs (Node.js + Express)
↓
Frontend Dashboard (Charts & Tables)



erDiagram

    HOSTELS ||--o{ STUDENTS : houses
    HOSTELS ||--o{ COSTS : incurs
    HOSTELS ||--o{ WASTAGE : tracks

    STUDENTS ||--o{ ATTENDANCE : records
    STUDENTS ||--o{ MEALS_LOG : consumes

    COSTS }o--o{ WASTAGE : contributes

    HOSTELS {
        int hostel_id PK
        string hostel_name
    }

    STUDENTS {
        int student_id PK
        string student_name
        int hostel_id FK
    }

    %% WEAK ENTITY
    ATTENDANCE {
        int student_id FK
        date date PK
        boolean status
    }

    %% WEAK ENTITY
    MEALS_LOG {
        int student_id FK
        date date PK
        string meal_type PK
        int hour
    }

    COSTS {
        int cost_id PK
        int hostel_id FK
        date date
        decimal total_cost
    }

    WASTAGE {
        int waste_id PK
        int hostel_id FK
        string meal_type
        date date
        decimal waste_kg
    }
