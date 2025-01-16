import express from 'express';
import * as clientMethods from '../controllers/clientController.js';

const router = express.Router();

router.route('/cart')
.get((req,res,next) =>{

})
.delete((req,res,next) =>{

});

router.route('/cart/:id')
.get((req,res,next) =>{

})
.post((req,res,next) =>{

})
.patch((req,res,next) =>{

})
.delete((req,res,next) =>{

});

router.route('/sell')
.get((req,res,next) =>{

})
.post((req,res,next) =>{

})
.patch((req,res,next) =>{

})
.delete((req,res,next) =>{

});

router.route('/personalData')
.get((req,res,next) =>{
    clientMethods.getPersonalData(req,res,next);
})
.patch((req,res,next) =>{
    clientMethods.patchPersonalData(req,res,next);
})

router.route('/password')
.patch((req,res,next) =>{
    clientMethods.patchPassword(req,res,next);
});

router.route('/payment_method')
.get((req,res,next) =>{

})
.post((req,res,next) =>{

})
.delete((req,res,next) =>{

});

router.route('/product')
.get((req,res,next) =>{

});

router.route('/product/:id')
.get((req,res,next) =>{

});

export default router;