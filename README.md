# Eazy Eats

Eazy Eats is a digital menu and ordering system for cafes. Customers can scan a QR code placed on their table, view the cafe's menu, and place an order directly from their phone. The application is built using React.js for the front end and Express.js for the API.

👩🏻‍💻  Tech Stack: [Javascript][Typescript][Node.js][ReactJS][ExpressJS][BullMQ][RajorPay][Redux][ContextAPI][JWT][Tailwind][MaterialUI][SocketIO][Passport][Redis][MongoDB][Mongoose][Redis][QRCode].

## Frontend Repos

## Features
- QR Code Scanning: Each table has a unique QR code that customers can scan to access the menu.
- Browse Menu: View the cafe’s menu in a digital format, complete with images and descriptions of items.
- Place Orders: Customers can place orders directly from their mobile devices, without needing to call a server.
- Real-time Order Updates: Customers can see the status of their order in real time.
- Table-specific Orders: Orders are linked to specific tables, making it easy for staff to deliver the correct order.
- Modular and Scalable: Easily add or modify menu items, tables, or order management as needed.

  
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
-- Node.js (v14.x or higher)
Clone the repository:
git clone [https://github.com/yourusername/eazy-eats.git](https://github.com/keshariGaurav/food-code-api.git)

# Navigate to the project directory:
   - cd food-code-api
  Install the dependencies:
   - npm install
# Start the development server:
  npm start
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
  We welcome contributions to improve Eazy Eats! Please follow these steps to contribute:
  
  - Fork the repository.
  - Create a new branch (git checkout -b feature/your-feature).
  - Commit your changes (git commit -m 'Add some feature').
  - Push to the branch (git push origin feature/your-feature).
  - Open a pull request.
