import sequelize from './database';
import LearningPackage from './models/LearningPackage';

const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Succesful connection.');

        // synchronizing model with the database
        await LearningPackage.sync({ force: true }); // force:true to recreate the table each time
        console.log('models are synchronized !.');
    } catch (error) {
        console.error('cant connect to database:', error);
    } finally {
        await sequelize.close();
    }
};

syncDatabase();
