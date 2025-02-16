import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../package.json';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bahir Dar Hotels Room Reservation System Backend API',
      version,
      summary:
        'API for managing hotel room reservations, bookings, and payments.',
      description: `
The **Bahir Dar Hotels Room Reservation System API** provides a comprehensive solution for managing hotel bookings in Bahir Dar City, Ethiopia. This API allows users to browse available hotel rooms, make reservations, process payments, and manage their bookings efficiently.\n
The system is designed for hotel administrators, travelers, and tour companies, offering role-based access control for secure interactions. Built using Node.js, Express.js and MongoDB, mongoose as ODM, it ensures high performance, scalability and security.

### Key Features:
🏨 **Hotel & Room Management** – Add, update, and delete hotel listings and room details.\n
📅 **Booking System** – Reserve rooms, manage check-in/check-out dates, and track booking status.\n
💳 **Secure Payments** – Integrated with Chapa for processing transactions.\n
🔑 **Authentication & Authorization** – Uses JWT-based authentication for secure access.\n
📍 **Location-based Services** – Maps integration to help users find hotels easily.\n
📊 **Reporting & Analytics** – Generate reports on bookings, revenue, and occupancy rates.\n
👤 **User Management** – Register, login, and manage user profiles.\n
👤 **Complete User Verification Process**: complete onboarding process for user verification, completing user profile -> requesting an account verification and admin reviews and acceptance/decline of user account verification.\n

### GitHub Repository:
    
  * You can access the source code on GitHub. Feel free to fork the repository, explore the code, and contribute to its development [View on GitHub  🚀](https://github.com/NextGenCoders-5th/bahirdar_hotels_room_reservation_backend_api.git)\n
  * This API is complemented by a frontend web application built with React, Redux, Tailwind CSS, and ShadCN UI. You can explore it [View on GitHub 🚀](https://bahirdar-hotels-room-reservation.netlify.app/).
`,
      contact: {
        name: 'Edmealem',
        email: 'edmealemkassahun@gmail.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'run you app locally and test it',
      },
      {
        url: 'https://hotel-booking-app-backend-ac8s.onrender.com',
        description: 'deployed version of our application',
      },
    ],
  },
  apis: [
    './src/**/*.route.ts',
    './src/**/*.interface.ts',
    './src/**/*.docs.yml',
  ],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
  // Swagger page
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get('/api-docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

export default swaggerDocs;
