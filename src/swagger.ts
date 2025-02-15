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
      summary: 'summary of our api',
      description: 'description of the application',
      contact: {
        name: 'Edmealem',
        email: 'edmealemkassahun@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        // description: 'run you app locally and test it',
      },
      {
        url: 'http://backend_url.api.com',
        // description: 'deployed version of our application',
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
