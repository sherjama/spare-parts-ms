# 📦 **Nexar -- Parts Management System**

👉 **Live Project:** https://nexar.olive.vercel.app\
🛠 **Backend:** Hosted on Vercel (Serverless Functions)

A modern **MERN-based parts & inventory management system** built for
workshops, showrooms, garages, and industries.\
Nexar helps manage **parts, shelves, purchases, sales, invoices,
analytics**, and more --- in one unified dashboard.

---

# 🚀 **Features**

## 📁 **Parts & Inventory Management**

- Add, update, and organize parts with full details\
- Track stock, shelf location, pricing & MRP\
- MongoDB linking via ObjectId

## 🗃 **Advanced Shelves System**

- Create shelf groups\
- Connect shelves to parts automatically

## 🧾 **Purchase Bill System**

- Add purchased parts\
- Auto-update stock\
- Clean print-ready purchase bill layout

## 🧮 **Sales Invoice System**

- Full invoice generation\
- Discount + Other Amount support\
- Auto deduct stock

## 📊 **Reporting & Analytics**

- Total purchases\
- Total sales\
- Monthly trends\
- Pie & Bar charts\
- Most Sold Parts\
- Total Parts Count

## 🔑 **Auth & Security**

- JWT login\
- Refresh-token implementation\
- Protected routes using asyncHandler middleware\
- User auto-injected into frontend context

## 🎨 **Frontend UI/UX**

- Modern clean design\
- TailwindCSS components\
- Fully responsive\
- Dynamic charts\
- Forms via React Hook Form

---

# 🛠 **Tech Stack**

## **Frontend**

- React\
- Redux Toolkit\
- React Hook Form\
- Axios\
- Tailwind CSS\
- Chart.js

## **Backend**

- Node.js (Serverless on Vercel)\
- Express.js (via Vercel API routes)\
- MongoDB & Mongoose\
- JWT Authentication\
- Async error handler

---

# 📦 **Project Structure**

    Nexar/
    │── frontend/
    │   ├── src/
    │   │   ├── components/
    │   │   ├── pages/
    │   │   ├── redux/
    │   │   ├── hooks/
    │   │   └── App.jsx
    │
    │── api/      ← Backend (Vercel Serverless Functions)
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── middleware/
    │   └── index.js
    │
    └── README.md

---

# 🛠 **Local Setup**

## **1️⃣ Clone the repository**

    git clone https://github.com/yourusername/nexar.git
    cd nexar

---

## **2️⃣ Install Frontend**

    cd frontend
    npm install
    npm run dev

---

## **3️⃣ Backend (Vercel Serverless)**

Backend code is inside `/api`.

### Run locally:

    vercel dev

---

# 🌐 **Deploy on Vercel**

### **Step 1:** Push project to GitHub

### **Step 2:** Go to Vercel → Import Project

### **Step 3:** Add Environment Variables

### **Step 4:** Deploy

Vercel will automatically: - Build the React frontend\

- Deploy backend under `/api/*` as serverless functions

---

# 📊 **Dashboard Insights**

Dashboard shows: - Total Parts\

- Total Shelves\
- Total Purchases\
- Total Sales\
- Monthly purchase/sale graph\
- Pie chart (Parts by Shelves)\
- Most Sold Parts list\
- Low Stock indicator (optional)

---

# 🤝 **Contribution**

Pull requests are welcome.\
For major changes, please open an issue first.

---

# 🛡 **License**

MIT License

---

# 👨‍💻 **Developer**

**Sherjama (Sher Khan)**\
MERN Stack Developer\
Creator of Nexar\
India 🇮🇳
