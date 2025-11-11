# 📢 **News Aggregator App**

A modern, responsive news aggregator web application built with **React.js**, styled using custom CSS. Users can browse news articles, filter by category, save bookmarks, and share articles across platforms.

---

## 📦 **Features**

✅ Browse latest news articles
✅ Filter by category and source
✅ Save and view bookmarked articles
✅ Share articles on social media platforms
✅ Dark mode support
✅ Responsive design for mobile and desktop

---

## 🚀 **Getting Started**

Follow these steps to set up the project locally.

### Prerequisites

Make sure you have the following installed:

* **Node.js** (v14 or later) – [Download here](https://nodejs.org/)
* **npm** or **yarn** (comes with Node.js)

---

### 📥 **Installation**

1. Clone the repository:

```bash
git clone https://github.com/bhavika1112/news-aggregator.git
```

2. Navigate into the project directory:

```bash
cd news-aggregator
```

3. Install dependencies:

```bash
npm install
```

*or if you prefer yarn:*

```bash
yarn install
```

---

### ⚙ **Available Scripts**

#### Start the development server:

```bash
npm start
```

This will start the app on [http://localhost:3000](http://localhost:3000).

#### Build for production:

```bash
npm run build
```

This will create a production-ready build in the `build/` directory.

#### Lint your code (optional):

```bash
npm run lint
```

---

## 📁 **Folder Structure**

```
news-aggregator/
├── public/                # Static files
├── src/                   # Source files
│   ├── components/        # React components
│   ├── App.js             # Main app file
│   ├── index.js           # Entry point
│   └── styles.css         # Styling
├── .gitignore             # Files to ignore
├── package.json           # Project metadata and dependencies
└── README.md              # This file
```

---

## ✅ **Dependencies**

This project uses the following major libraries:

* **React.js** – Frontend framework
* **react-router-dom** – For routing between pages (if applicable)
* **font-awesome** – For icons (share, bookmark, etc.)
* **Other libraries** – See `package.json` for the full list

---

## 🚫 **Ignoring `node_modules`**

The `node_modules/` directory is excluded from version control using `.gitignore` because it contains installed dependencies and can be recreated using `npm install`.

---

## 📖 **Usage Notes**

* The app fetches news data from public APIs (make sure to configure API keys if needed).
* Use the search bar and filter buttons to refine your news feed.
* Bookmarks are stored in local storage; they won't persist across devices.

---

## 🤝 **Contributing**

Feel free to fork this repository and submit pull requests. Contributions to enhance features, fix bugs, or improve UI are always welcome!

---

## 📄 **License**

MIT License – see the [LICENSE](LICENSE) file for details.
