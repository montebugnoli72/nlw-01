import express from 'express'; 
import multer from 'multer';
import multerconfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from  './controllers/ItemsController';

import { celebrate, Joi } from 'celebrate';

//Padrão Index, Show (1 item), create, update, delete

const routes = express.Router();
const upload = multer(multerconfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items',itemsController.index);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show); //request param

routes.post(
    '/points', 
    upload.single('image'),  
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitide: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required()
        })
    },{ abortEarly: false 
    }),
    pointsController.create);

export default routes;