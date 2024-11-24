import { Sequelize } from 'sequelize';

const database = new Sequelize('LearningFactDb', 'learningdbuser', 'mdp123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: console.log,
});

export default database;
