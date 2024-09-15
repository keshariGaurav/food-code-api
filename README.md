# Eazy Eats

Eazy Eats is a digital menu and ordering system for cafe. Customers can scan a QR code placed on their table, view the cafe's menu, and place an order directly from their phone. The application is built using React.js for the front end and Express.js for the API.

## Tech Stack: 
**[Javascript][Typescript][Node.js][ReactJS][ExpressJS][BullMQ][RajorPay][Redux][ContextAPI][JWT][Tailwind][MaterialUI][SocketIO][Passport][Redis][MongoDB][Mongoose][QRCode]**.

## Frontend Repos
  ### Client APP
  -- (https://github.com/keshariGaurav/food-code-client-app)
  ### Restro APP
  -- (https://github.com/keshariGaurav/food-code-frontend)
  ### Backend API
  -- (https://github.com/keshariGaurav/food-code-api)

## Features
QR Code Scanning: Each table has a unique QR code, allowing customers to quickly access the menu for their specific table.
Order Placement: Customers can place orders directly from their mobile devices, ensuring a seamless ordering experience.
Real-Time Order Updates: Leveraging Socket.IO, cafe receive real-time updates on their order status, enhancing the overall experience.
Asynchronous Email Service: Eazy Eats decouples email notifications from the main request-response cycle by using BullMQ for queue management. This ensures that email services run independently without affecting the app's performance.
MongoDB Change Streams: The backend tracks order generation in real time using MongoDB Watch, enabling live updates on order status.
Atomic Design & Reusable Components: The frontend is structured using atomic design principles, with a theme file and variant system to ensure that UI components are highly reusable and easy to maintain.
Scalable Architecture: The system is designed to scale, handling everything from order management to customer notifications in an optimized manner.

## Screenshots
  ### For Restro APP
  #### Login
  ![image](https://github.com/user-attachments/assets/256f6767-5542-4a9a-a8ad-b55f62522173)
  #### Menu Creation
  ![image](https://github.com/user-attachments/assets/407debe6-6af2-42e2-9112-7c49da5349b9)
  #### QR Code Generator
  ![image](https://github.com/user-attachments/assets/13d52d33-c2ec-4ca0-b56b-b65a98ddcbdd)
  #### All Menus
  ![image](https://github.com/user-attachments/assets/750cee18-0d39-419b-8f4a-e739dc4fa986)




  
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
