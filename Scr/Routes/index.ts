import { Router } from 'express';
import * as gravatar from 'gravatar';

const index: Router = Router();

index.get('/', function(req, res, next) {
    res.render('index', { 
        title: 'Introducing MetalBot', 
        gravatar: gravatar.url('paparaziel666@outlook.com', { s: '200' }) 
    });
});

export default index;
