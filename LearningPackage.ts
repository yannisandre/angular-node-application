import { DataTypes, Model } from 'sequelize';
import database from '../database';

interface LearningPackageAttributes {
    id: number;
    title: string;
    description: string;
    isActive: boolean;
}

class LearningPackage
    extends Model<LearningPackageAttributes>
    implements LearningPackageAttributes
{
    public id!: number; // Primary Key
    public title!: string;
    public description!: string;
    public isActive!: boolean;

    public readonly createdAt!: Date; // debugging timestamps
    public readonly updatedAt!: Date;
}

LearningPackage.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize: database,
        modelName: 'LearningPackage',
        timestamps: true,
    }
);

export default LearningPackage;
