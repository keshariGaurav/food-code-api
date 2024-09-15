# Eazy Eats

Eazy Eats is a digital menu and ordering system for cafe. Customers can scan a QR code placed on their table, view the cafe's menu, and place an order directly from their phone. The application is built using React.js for the front end and Express.js for the API.

## Tech Stack: 

![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black&style=flat)
![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?logo=typescript&logoColor=white&style=flat)
![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white&style=flat)
![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=flat)
![Express.js](https://img.shields.io/badge/-Express.js-000000?logo=express&logoColor=white&style=flat)
![BullMQ](https://img.shields.io/badge/-BullMQ-E02424?logo=redis&logoColor=white&style=flat)
![RazorPay](https://img.shields.io/badge/-RazorPay-1C1E5B?logo=razorpay&logoColor=white&style=flat)
![Redux](https://img.shields.io/badge/-Redux-764ABC?logo=redux&logoColor=white&style=flat)
![Context API](https://img.shields.io/badge/-ContextAPI-61DAFB?logo=react&logoColor=white&style=flat)
![JWT](https://img.shields.io/badge/-JWT-000000?logo=jsonwebtokens&logoColor=white&style=flat)
![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white&style=flat)
![MaterialUI](https://img.shields.io/badge/-MaterialUI-0081CB?logo=material-ui&logoColor=white&style=flat)
![Socket.IO](https://img.shields.io/badge/-Socket.IO-010101?logo=socket.io&logoColor=white&style=flat)
![Passport](https://img.shields.io/badge/-Passport-34E27A?logo=passport&logoColor=white&style=flat)
![Redis](https://img.shields.io/badge/-Redis-D82C20?logo=redis&logoColor=white&style=flat)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white&style=flat)
![Mongoose](https://img.shields.io/badge/-Mongoose-880000?logo=mongoose&logoColor=white&style=flat)
![QRCode](https://img.shields.io/badge/-QRCode-000000?logo=qrcode&logoColor=white&style=flat)


## Frontend Repos
  ### Client APP
  -- (https://github.com/keshariGaurav/food-code-client-app)
  ### Cafe APP
  -- (https://github.com/keshariGaurav/food-code-frontend)
  ### Backend API
  -- (https://github.com/keshariGaurav/food-code-api)

## Features

  - **QR Code Scanning**: Each table has a unique **QR code**, allowing customers to quickly access the **menu** for their specific table.
  - **Order Placement**: Customers can place **orders** directly from their mobile devices, ensuring a **seamless ordering experience**.
  - **Real-Time Order Updates**: Leveraging **Socket.IO**, cafes receive **real-time updates** on their order status, enhancing the overall experience.
  - **Asynchronous Email Service**: Eazy Eats decouples **email notifications** from the main request-response cycle by using **BullMQ** for **queue management**. This ensures that **email services** run independently without affecting the app's performance.
  - **MongoDB Change Streams**: The backend tracks **order generation** in **real time** using **MongoDB Watch**, enabling **live updates** on order status.
  - **Atomic Design & Reusable Components**: The frontend is structured using **atomic design principles**, with a **theme file and variant system** to ensure that **UI components** are highly **reusable** and easy to maintain.
  - **State Management with Redux**: **Redux** is used to maintain **application state** on the frontend, ensuring a consistent and predictable state flow across the app.
  - **Caching with Redux Toolkit Query**: **Redux Toolkit Query** is used to manage **cache** on the frontend, improving **performance** by reducing redundant data fetching.
  - **Infinite Scroll Implementation**: The app uses **react-infinite-scroll-component** and **react-intersection-observer** to implement **infinite scroll**, ensuring that only the **component list** within the view is loaded, optimizing **performance** and **resource usage**.
  - **Scalable Architecture with MVC**: Proper use of **middleware** has been implemented to follow the **MVC pattern**, making the code **scalable**, **modifiable**, and **easily extendable**.
  - **Data Validation**: Validation is enforced within the **model**, ensuring only the **correct type of data** is saved to maintain data integrity.
  - **Caching with Redis**: **Redis** is used for **caching** to reduce the **load on the database** and improve overall system performance.
  - **Template-Based Email Service**: The **email service** is built using a **template-based system**, making email sending **extendable** and **easily configurable** for future use cases.
  - **Payment Gateway Integration**: The app uses **Razorpay** for a seamless **payment gateway** integration, allowing users to make secure transactions.
  - **Authentication & Authorization**:
    - **JWT Authentication**: **User sessions** are securely managed using **JWT tokens** for **stateless authentication**.
    - **OAuth with Google**: Users can log in using their **Google accounts** through **OAuth integration**, providing a seamless and secure **login process**.
  - **Security**:
    - **Rate Limiting**: Protects the application from **brute force attacks** by limiting the number of **requests** a user can make within a certain timeframe.
    - **Helmet**: Provides **basic security protections** by setting **HTTP headers** appropriately.
    - **MongoDB Sanitize**: Prevents **NoSQL injection attacks** by **sanitizing inputs** and ensuring **database security**.





# Screenshots
  ## For Restro APP
  #### Login
  ![image](https://github.com/user-attachments/assets/256f6767-5542-4a9a-a8ad-b55f62522173)
  #### Menu Creation
  ![image](https://github.com/user-attachments/assets/407debe6-6af2-42e2-9112-7c49da5349b9)
  #### QR Code Generator
  ![image](https://github.com/user-attachments/assets/13d52d33-c2ec-4ca0-b56b-b65a98ddcbdd)
  #### All Menus
  ![image](https://github.com/user-attachments/assets/750cee18-0d39-419b-8f4a-e739dc4fa986)

  ## For Client APP

  ### Menu Page
  ![image](https://github.com/user-attachments/assets/06c591ac-0f52-4ac4-8d2a-ccbf7d1fae22)

  ### Customize Menu Item
  ![image](https://github.com/user-attachments/assets/7d72e78f-cdf3-496d-a523-abe6a0931524)

  ### Cart Page
  ![image](https://github.com/user-attachments/assets/22cb56ea-f503-4cd9-a145-658e9377821f)

  ### Payment Page
  ![image](https://github.com/user-attachments/assets/b464a2d8-3c40-4fc9-b0fc-ebc324bd023f)








  
## Usage
- Scan the QR Code: Customers scan the QR code on their table to access the menu.
- Browse the Menu: The menu is dynamically loaded based on the table’s QR code.
- Place an Order: Customers select items from the menu and place their order.
- Order Processing: The order is sent to the cafe’s order management system, linked to the specific table.
- Order Delivery: The staff delivers the order to the correct table based on the order information.

## Getting Started

Setup Instructions
Prerequisites
Ensure you have the following installed:
- Node.js (v14.x or higher)
Clone the repository:
git clone (https://github.com/keshariGaurav/food-code-api.git)

# Navigate to the project directory:
   - cd food-code-api
  Install the dependencies:
   - npm install
# Start the development server:
  npm run dev
# Environment Variables
   -  Create a .env file in the api directory with the following variables:
   ```
    MONGODB_URI=Mongo DB Atlas Cluster URI
    JWT_SECRET=SECRET Code for JWT authentication
    SESSION_SECRET='super-duper-hit'
    JWT_EXPIRES_IN=90d
    EMAIL_USERNAME=MAILTRAP USER NAME FOR TESTING
    EMAIL_PASSWORD=MAILTRAP FOR TESTING 
    EMAIL_HOST=smtp.mailtrap.io
    EMAIL_PORT=2525
    NODE_ENV=development
    GOOGLE_CLIENT_ID=FOR OAUTH
    GOOGLE_CLIENT_SECRET=FOR OAUTH
    REDIS_PASSWORD=FOR CACHING
    REDIS_HOST=FOR CACHING
    REDIS_PORT=14780
    RAZORPAY_KEY_SECRET=INTEGRATING PAYMENT GATEWAY
    RAZORPAY_KEY_ID=INTEGRATING PAYMENT GATEWAY
  ```


## Contributing
  ### Contributor
  ```
    - https://github.com/keshariGaurav
    - https://github.com/ayushi0809
  ```
  We welcome contributions to improve Eazy Eats! Please follow these steps to contribute:
  
  - Fork the repository.
  - Create a new branch (git checkout -b feature/your-feature).
  - Commit your changes (git commit -m 'Add some feature').
  - Push to the branch (git push origin feature/your-feature).
  - Open a pull request.
