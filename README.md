# Shoplet

## The only eShopping solution you need!!

**Shoplet** is a comprehensive eCommerce platform designed to simplify online shopping for both businesses and customers. Whether you're a seller looking to showcase your products or a shopper hunting for the best deals, Shoplet provides all the features you need to streamline your eCommerce experience.

---

## Table of Contents

1. [Features](#features)
2. [Getting Started](#getting-started)
3. [Installation](#installation)
4. [Usage](#usage)
5. [License](#license)

---

## Features

- **Multi-Vendor Marketplace:** Allow different sellers to list and sell their products on a single platform.
- **Product Catalog Management:** Easy-to-use tools for managing product categories, descriptions, prices, and stock.
- **Secure Payment Integration:** Support for multiple payment gateways including PayPal, Stripe, and credit card processing.
- **Advanced Search & Filtering:** Search products by category, price range, ratings, and more.
- **Customer Reviews & Ratings:** Users can review products, helping others make informed purchasing decisions.
- **Order Management:** Track customer orders, from purchase through delivery.
- **Shipping & Delivery Integration:** Automatic calculation of shipping costs and tracking integration.
- **Promotions & Discounts:** Manage promotional codes and sales events to boost sales.
- **Analytics & Reporting:** Detailed reporting tools to track sales, traffic, and customer behaviors.
- **Mobile Responsive:** Fully optimized for use on smartphones and tablets.

---

## Getting Started

To get started with Shoplet, follow these steps:

### Prerequisites

Before using Shoplet, ensure you have:

- Node 18 or higher (for backend support)
- Docker version 27 or higher
- Docker Compose 2.29 or higher

---

## Installation

### 1. Clone the Repository

Start by cloning the Shoplet repository:

```bash
git clone https://github.com/peekaboo5149/shoplet.git
```

### 2. Install Dependencies

Navigate to the project directory and install the required PHP dependencies:

```bash
cd shoplet
```

Install the npm for each directory

### 3. Set Up Environment

Copy the `.env.example` file to `.env` and update the database and mail configuration.

> Coming Soon!!

### 4. Database Setup

Create the database using the following command:

> Coming Soon!!

### 5. Run the Application

Start the development server:

```bash
docker-compose -f docker-compose.development.yaml up -d
```

---

## Usage

### For Sellers

1. **Create an Account:** Sign up as a seller to list your products on the platform.
2. **Add Products:** Easily add and manage product listings through the seller dashboard.
3. **Manage Orders:** Track and manage customer orders from your dashboard.
4. **Analytics:** View detailed analytics and reports to understand your sales performance.

### For Customers

1. **Browse Products:** Search and filter through the product catalog to find what you're looking for.
2. **Add to Cart:** Add products to your cart and proceed to checkout.
3. **Checkout & Payment:** Choose your preferred payment method and complete the checkout process.
4. **Track Orders:** Track the status of your orders and get delivery updates.

---

## API Documentation

Shoplet provides a RESTful API for integrating with third-party applications. The API supports features like:

- **Product Management** (GET, POST, PUT, DELETE requests for products)
- **Order Management** (view orders, create orders, update status)
- **Inventory Integration** (view inventory)

---

## License

Shoplet is licensed under the MIT License. See [LICENSE](LICENSE) for more details.
