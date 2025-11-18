# 📦 Product Category Manager - Backend API

A robust Node.js REST API for managing products and categories with Express, Sequelize ORM, and MySQL database. Deployed on Render with Aiven MySQL database.

## 🌐 Live API

- **Base URL**: https://round-2-task.onrender.com
- **API Endpoint**: https://round-2-task.onrender.com/api
- **Health Check**: https://round-2-task.onrender.com/

## ✨ Features

### Core Functionality
- ✅ RESTful API architecture
- ✅ Full CRUD operations for Products and Categories
- ✅ Category-Product relationships
- ✅ Input validation and error handling
- ✅ API key authentication for write operations
- ✅ CORS enabled for cross-origin requests

### Database
- ✅ MySQL database with Sequelize ORM
- ✅ Automated migrations
- ✅ Foreign key constraints
- ✅ Data validation at database level
- ✅ Hosted on Aiven Cloud

### Security
- ✅ API key authentication
- ✅ Environment variable configuration
- ✅ SSL/TLS encryption for database
- ✅ Input sanitization
- ✅ Error message security

## 📋 Prerequisites

- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher
- **MySQL**: 8.0 or higher (or Aiven MySQL)

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/sanjai-kumar/round_2_task.git
cd round_2_task
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

**For Local Development:**
```env
# Server Configuration
PORT=10000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=product_manager

# API Key
API_KEY=tasknapi
```

**For Production (Render + Aiven):**
```env
# Server Configuration
PORT=10000
NODE_ENV=production

# Aiven MySQL Database
DB_HOST=mysql-2b54da65-msanjai3107-713a.h.aivencloud.com
DB_PORT=12345
DB_USER=avnadmin
DB_PASSWORD=AVNS_xxxxxxxxxxxxx
DB_NAME=defaultdb

# API Key
API_KEY=tasknapi
```

### 4. Database Setup

**Local MySQL:**
```bash
# Create database
mysql -u root -p
CREATE DATABASE product_manager;
exit;

# Run migrations (optional - tables auto-create)
npm run migrate
```

**Aiven MySQL:**
- Database is pre-configured
- Tables auto-create on first run

### 5. Start the server

**Development:**
```bash
npm start
# or
npm run dev  # if you have nodemon configured
```

**Production:**
```bash
npm start
```

Server will start at: **http://localhost:10000**

## 📁 Project Structure

```
round_2_task/
├── config/
│   ├── config.js              # Database configuration
│   └── db.js                  # Sequelize instance (if separate)
│
├── Controllers/
│   ├── categoryController.js  # Category CRUD operations
│   └── productController.js   # Product CRUD operations
│
├── models/
│   ├── index.js              # Model associations
│   ├── Category.js           # Category model
│   └── Product.js            # Product model
│
├── middleware/
│   └── apiKey.js             # API key authentication
│
├── routes/
│   └── apiRoutes.js          # API route definitions
│
├── migrations/               # Sequelize migrations (optional)
│   ├── 20251117115819-create-category.js
│   └── 20251117115833-create-product.js
│
├── .env                      # Environment variables (local)
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── .sequelizerc             # Sequelize configuration
├── package.json             # Dependencies & scripts
├── app.js                   # Express app entry point
└── README.md                # This file
```

## 🔌 API Endpoints

### Base URL
```
https://round-2-task.onrender.com/api
```

### Categories API

| Method | Endpoint | Description | Auth Required | Request Body |
|--------|----------|-------------|---------------|--------------|
| GET | `/categories` | Get all categories | No | - |
| GET | `/categories/:id` | Get single category | No | - |
| POST | `/categories` | Create new category | Yes | `{ name, description? }` |
| PUT | `/categories/:id` | Update category | Yes | `{ name?, description? }` |
| DELETE | `/categories/:id` | Delete category | Yes | - |

### Products API

| Method | Endpoint | Description | Auth Required | Request Body |
|--------|----------|-------------|---------------|--------------|
| GET | `/products` | Get all products | No | - |
| GET | `/products/:id` | Get single product | No | - |
| POST | `/products` | Create new product | Yes | `{ name, price, categoryId, inStock? }` |
| PUT | `/products/:id` | Update product | Yes | `{ name?, price?, categoryId?, inStock? }` |
| DELETE | `/products/:id` | Delete product | Yes | - |

## 📝 API Request/Response Examples

### Create Category

**Request:**
```http
POST /api/categories
Content-Type: application/json
x-api-key: tasknapi

{
  "name": "Electronics",
  "description": "Electronic devices and gadgets"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "id": 1,
    "name": "Electronics",
    "description": "Electronic devices and gadgets",
    "createdAt": "2024-11-18T10:00:00.000Z",
    "updatedAt": "2024-11-18T10:00:00.000Z"
  }
}
```

### Get All Categories

**Request:**
```http
GET /api/categories
```

**Response:**
```json
{
  "success": true,
  "message": "Categories fetched successfully",
  "data": [
    {
      "id": 1,
      "name": "Electronics",
      "description": "Electronic devices and gadgets",
      "createdAt": "2024-11-18T10:00:00.000Z",
      "updatedAt": "2024-11-18T10:00:00.000Z"
    }
  ]
}
```

### Create Product

**Request:**
```http
POST /api/products
Content-Type: application/json
x-api-key: tasknapi

{
  "name": "Laptop",
  "price": 999.99,
  "categoryId": 1,
  "inStock": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": 1,
    "name": "Laptop",
    "price": 999.99,
    "categoryId": 1,
    "inStock": true,
    "createdAt": "2024-11-18T10:00:00.000Z",
    "updatedAt": "2024-11-18T10:00:00.000Z"
  }
}
```

### Get All Products

**Request:**
```http
GET /api/products
```

**Response:**
```json
{
  "success": true,
  "message": "Products fetched successfully",
  "data": [
    {
      "id": 1,
      "name": "Laptop",
      "price": 999.99,
      "categoryId": 1,
      "inStock": true,
      "category": {
        "id": 1,
        "name": "Electronics"
      },
      "createdAt": "2024-11-18T10:00:00.000Z",
      "updatedAt": "2024-11-18T10:00:00.000Z"
    }
  ]
}
```

### Error Response

**Request:**
```http
POST /api/categories
Content-Type: application/json
x-api-key: wrong-key

{
  "name": "Electronics"
}
```

**Response:**
```json
{
  "error": "Invalid API Key"
}
```

## 🔐 Authentication

### API Key Authentication

Write operations (POST, PUT, DELETE) require an API key in the request header:

```http
x-api-key: tasknapi
```

### Implementation

The API key is validated by middleware in `middleware/apiKey.js`:

```javascript
module.exports = function(req, res, next) {
  if (req.method === 'GET') {
    return next();
  }
  
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(403).json({ error: 'Invalid API Key' });
  }
  
  next();
};
```

## 🚀 Deployment to Render

### Step 1: Prepare for Deployment

1. **Ensure code is on GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create `.env.example`** for reference
   ```env
   PORT=10000
   NODE_ENV=production
   DB_HOST=your-db-host
   DB_PORT=your-db-port
   DB_USER=your-db-user
   DB_PASSWORD=your-db-password
   DB_NAME=your-db-name
   API_KEY=your-api-key
   ```

### Step 2: Setup Aiven MySQL Database

1. **Go to Aiven Console**: https://console.aiven.io
2. **Create MySQL Service**
   - Service: MySQL
   - Plan: Free tier
   - Cloud: Choose your region
3. **Get Connection Details**
   - Host: `mysql-xxxxx.aivencloud.com`
   - Port: `12345`
   - User: `avnadmin`
   - Password: `AVNS_xxxxx`
   - Database: `defaultdb`
   - SSL: Required

### Step 3: Deploy on Render

1. **Go to Render Dashboard**: https://render.com/dashboard
2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect GitHub repository: `round_2_task`

3. **Configure Service**
   - **Name**: round-2-task
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

4. **Add Environment Variables**
   ```
   PORT = 10000
   NODE_ENV = production
   DB_HOST = mysql-2b54da65-msanjai3107-713a.h.aivencloud.com
   DB_PORT = 12345
   DB_USER = avnadmin
   DB_PASSWORD = AVNS_xxxxxxxxxxxxx
   DB_NAME = defaultdb
   API_KEY = tasknapi
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait 3-5 minutes for deployment
   - Your API will be live at: `https://round-2-task.onrender.com`

### Step 4: Verify Deployment

Test your API:
```bash
curl https://round-2-task.onrender.com/api/categories
```

Expected response:
```json
{
  "success": true,
  "message": "No categories found" or "Categories fetched successfully",
  "data": []
}
```

## 🔧 Database Models

### Category Model

```javascript
{
  id: INTEGER (Primary Key, Auto Increment),
  name: STRING (Unique, Not Null),
  description: TEXT (Nullable),
  createdAt: TIMESTAMP,
  updatedAt: TIMESTAMP
}
```

### Product Model

```javascript
{
  id: INTEGER (Primary Key, Auto Increment),
  name: STRING (Not Null),
  price: DECIMAL(10, 2) (Not Null),
  categoryId: INTEGER (Foreign Key, Not Null),
  inStock: BOOLEAN (Default: true),
  createdAt: TIMESTAMP,
  updatedAt: TIMESTAMP
}
```

### Relationships

- One Category has Many Products
- One Product belongs to One Category
- Foreign Key: `Product.categoryId` references `Category.id`
- On Delete: RESTRICT (cannot delete category with products)

## 🔍 Troubleshooting

### Database Connection Failed

**Problem**: `connect ETIMEDOUT` or connection refused

**Solutions**:
- ✅ Verify database credentials in `.env`
- ✅ Check database host and port are correct
- ✅ Ensure SSL is enabled for Aiven
- ✅ Test database connection separately
- ✅ Check firewall/network settings

### API Key Error

**Problem**: 403 Forbidden on POST/PUT/DELETE

**Solutions**:
- ✅ Include `x-api-key` header in request
- ✅ Verify API key matches `process.env.API_KEY`
- ✅ Check API key is set in Render environment variables

### Migrations Not Running

**Problem**: Tables not created automatically

**Solutions**:
- ✅ Use `sequelize.sync()` in app.js for auto-creation
- ✅ Or run migrations manually: `npx sequelize-cli db:migrate`
- ✅ Check Sequelize configuration in `config/config.js`

### CORS Errors from Frontend

**Problem**: Frontend can't access API

**Solutions**:
- ✅ Add CORS middleware in app.js:
  ```javascript
  const cors = require('cors');
  app.use(cors({
    origin: ['http://localhost:3000', 'https://your-frontend.vercel.app']
  }));
  ```

## 📚 Tech Stack

### Backend Framework
- **Express.js**: 4.18.x

### Database
- **MySQL**: 8.0+
- **Sequelize ORM**: 6.37.x
- **Aiven MySQL**: Cloud-hosted database

### Authentication
- **Custom API Key Middleware**

### Utilities
- **dotenv**: Environment configuration
- **cors**: Cross-origin resource sharing

### Deployment
- **Render**: Web service hosting
- **Aiven**: MySQL database hosting

## 📈 Performance & Optimization

- ✅ Connection pooling for database
- ✅ Efficient Sequelize queries with `include`
- ✅ Environment-based configuration
- ✅ Error handling middleware
- ✅ SSL/TLS for database connections

## 🔒 Security Best Practices

1. **Environment Variables**
   - Never commit `.env` to Git
   - Use `.env.example` for templates
   - Rotate credentials regularly

2. **API Key**
   - Use strong, random API keys
   - Rotate keys periodically
   - Never expose in client-side code

3. **Database**
   - Use SSL for connections
   - Implement proper validation
   - Sanitize user inputs
   - Use parameterized queries (Sequelize handles this)

4. **CORS**
   - Whitelist specific origins
   - Don't use wildcard `*` in production

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is for demonstration/assignment purposes.

## 👨‍💻 Developer

**Sanjai Kumar**
- GitHub: [@sanjai-kumar](https://github.com/sanjai-kumar)
- Backend Repository: [round_2_task](https://github.com/sanjai-kumar/round_2_task)
- Frontend Repository: [round_2_frontend](https://github.com/sanjai-kumar/round_2_frontend)

## 🎉 Quick Start Summary

```bash
# Clone and setup
git clone https://github.com/sanjai-kumar/round_2_task.git
cd round_2_task
npm install

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Start server
npm start

# Test API
curl http://localhost:10000/api/categories
```

## 🚀 Deployment Checklist

**Before Deploying:**

- [ ] Code pushed to GitHub
- [ ] `.env.example` created
- [ ] `.gitignore` includes `.env`
- [ ] Database credentials ready (Aiven)
- [ ] API key generated
- [ ] All endpoints tested locally
- [ ] CORS configured

**Render Configuration:**

- [ ] Web Service created
- [ ] GitHub repo connected
- [ ] Environment variables added
- [ ] Build/Start commands configured
- [ ] Free tier selected

**After Deployment:**

- [ ] API accessible at Render URL
- [ ] Database connection working
- [ ] All endpoints responding
- [ ] CORS working with frontend
- [ ] No errors in logs
- [ ] Health check passing

## 📊 Project Status

- ✅ Development: Complete
- ✅ Testing: Complete
- ✅ Database: Configured and Connected
- ✅ Deployment: Live on Render
- ✅ Documentation: Complete

---

**Built with ❤️ using Node.js and Express**

**Live API**: [https://round-2-task.onrender.com/api](https://round-2-task.onrender.com/api)

**Last Updated**: November 18, 2025  
**Version**: 1.0.0  
**Status**: Production Ready ✅
