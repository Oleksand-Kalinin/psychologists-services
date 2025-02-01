# Psychologists Appointment App

## 📌 Project Description

**"Psychologists Appointment App"** is a web application for a company that provides psychological services.  
Users can browse a list of psychologists, sort them by different criteria, add them to favorites, and book an appointment.

## 🌟 Main Features

✔ **User authentication** (registration, login, logout) via Firebase Authentication.  
✔ **Psychologists list** with sorting by name, rating, and price.  
✔ **Favorites** – authorized users can save psychologists to their favorites.  
✔ **"Favorites" page** – private page with saved psychologists.  
✔ **Appointment booking form** with validation.  
✔ **Data storage** in Firebase Realtime Database.  
✔ **Responsive design** for mobile and tablet devices.  
✔ **Modal window** with psychologist details and reviews.  
✔ **Persistent favorite psychologists** after page refresh.

## 📄 Technical Requirements

### **1. Application Pages**

- **Home** – includes a website title, company slogan, and a button linking to the psychologists list.
- **Psychologists** – displays a list of psychologists with sorting by name, rating, and price.
- **Favorites** – a private page with psychologists saved by the user.

### **2. Authentication & Firebase Integration**

- Registration, login, and user session handling via Firebase Authentication.
- **React Hook Form & Yup** for form validation.
- User data persistence in Firebase Realtime Database.

### **3. Psychologists List**

- Psychologists data stored in Firebase (`name, avatar_url, experience, rating, price_per_hour, reviews`, etc.).
- Psychologist cards with a **Read more** button for detailed info.
- **Add to favorites** (for authorized users, stored in Firebase).
- **Remove from favorites** functionality.

### **4. Sorting & Pagination**

- Sorting options:  
  ✔ **By name** (A-Z, Z-A)  
  ✔ **By price** (ascending, descending)  
  ✔ **By rating** (highest, lowest)
- Pagination:  
  ✔ **Initially loads 3 psychologists**  
  ✔ **"Load more" button fetches additional psychologists**

### **5. Appointment Booking**

- **Make an appointment** form with fields: **name, phone, email, comment, meeting time**.
- Validation using **React Hook Form & Yup**.
- Appointment requests stored in Firebase.

## 🎨 Design & Prototype

The project is designed based on the following Figma prototype:  
🔗 **[View Figma Design](https://www.figma.com/design/8u1VMC3Md0Xx7JTpWZs4Q2/Psychologists.Services?node-id=28-146&t=WxYdu6sx34bb8hyH-0)**

## 🔧 **Technologies Used**

- **React** (React Router, React Hooks)
- **Redux Toolkit**
- **Firebase** (Authentication, Realtime Database)
- **React Hook Form + Yup** (form validation)
- **CSS Modules**
- **Vite** (or Webpack)
- **Toastify** (notifications)
