import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import LearningPackage from './models/LearningPackage'; // sequelize model

const app = express();
app.use(express.json());

// Swagger config
const jsDocOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API with Swagger',
            version: '1.0.0',
            description: 'Documentation for Express API with Sequelize',
        },
        components: {
            schemas: {
                LearningPackage: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        isActive: { type: 'boolean' },
                    },
                },
                LearningPackageNoId: {
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        description: { type: 'string' },
                        isActive: { type: 'boolean' },
                    },
                },
            },
        },
    },
    apis: ['app-todo.js'],
};

const apiDoc = swaggerJsdoc(jsDocOptions);
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(apiDoc));

app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(apiDoc);
});

// Health check
app.get('/api/liveness', (req, res) => {
    res.send('OK !!!');
});

/**
 * @openapi
 * /api/todos:
 *   get:
 *     description: Get all todos
 *     responses:
 *       200:
 *         description: An array of LearningPackage
 *         schema:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/LearningPackage'
 */
app.get('/api/todos', async (req, res) => {
    try {
        const learningPackages = await LearningPackage.findAll();
        res.send(learningPackages);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
    }
});

/**
 * @openapi
 * /api/todos:
 *   post:
 *     description: Save a new LearningPackage
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LearningPackageNoId'
 *     responses:
 *       200:
 *         description: The created LearningPackage
 *         schema:
 *           $ref: '#/components/schemas/LearningPackage'
 */
app.post('/api/todos', async (req, res) => {
    try {
        const { title, description, isActive } = req.body;
        const newPackage = await LearningPackage.create({ title, description, isActive });
        res.status(201).send(newPackage);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating data');
    }
});

/**
 * @openapi
 * /api/todos:
 *   put:
 *     description: Update an existing LearningPackage
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LearningPackage'
 *     responses:
 *       200:
 *         description: The updated LearningPackage
 *         schema:
 *           $ref: '#/components/schemas/LearningPackage'
 */
app.put('/api/todos', async (req, res) => {
    try {
        const { id, title, description, isActive } = req.body;
        const packageToUpdate = await LearningPackage.findByPk(id);

        if (!packageToUpdate) {
            return res.status(404).send('LearningPackage not found');
        }

        packageToUpdate.title = title || packageToUpdate.title;
        packageToUpdate.description = description || packageToUpdate.description;
        packageToUpdate.isActive = isActive !== undefined ? isActive : packageToUpdate.isActive;

        await packageToUpdate.save();
        res.send(packageToUpdate);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating data');
    }
});

/**
 * @openapi
 * /api/todos/{id}:
 *   get:
 *     description: Get a LearningPackage by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the LearningPackage to get
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: The LearningPackage
 *         schema:
 *           $ref: '#/components/schemas/LearningPackage'
 *       404:
 *         description: LearningPackage not found
 */
app.get('/api/todos/:id', async (req, res) => {
    try {
        const id = +req.params['id'];
        const foundPackage = await LearningPackage.findByPk(id);

        if (!foundPackage) {
            return res.status(404).send('LearningPackage not found');
        }

        res.send(foundPackage);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
    }
});

/**
 * @openapi
 * /api/todos/{id}:
 *   delete:
 *     description: Delete a LearningPackage by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the LearningPackage to delete
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: The deleted LearningPackage
 *         schema:
 *           $ref: '#/components/schemas/LearningPackage'
 *       404:
 *         description: LearningPackage not found
 */
app.delete('/api/todos/:id', async (req, res) => {
    try {
        const id = +req.params['id'];
        const deletedPackage = await LearningPackage.destroy({ where: { id } });

        if (!deletedPackage) {
            return res.status(404).send('LearningPackage not found');
        }

        res.send(`LearningPackage with ID ${id} deleted`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting data');
    }
});

app.listen(3000, () => {
    console.log('Ok, started port 3000, please open http://localhost:3000/swagger-ui');
});
