import express from 'express';
import * as clientMethods from '../controllers/clientController.js';
import * as productMethods from '../controllers/productController.js';

const router = express.Router();

router.route('/cart')
.get((req,res,next) =>{
    productMethods.getCart(req,res,next);
})
.delete((req,res,next) =>{

});

router.route('/cart/:id')
.post((req,res,next) =>{
    productMethods.addProductToCart(req,res,next);
})
.patch((req,res,next) =>{
    productMethods.patchProductToCart(req,res,next);
})
.delete((req,res,next) =>{
    productMethods.deleteProductOfCart(req,res,next);
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
    clientMethods.getPaymentMethods(req,res,next);
})
.post((req,res,next) =>{
    clientMethods.postPaymentMethod(req,res,next);
})
.delete((req,res,next) =>{
    clientMethods.deletePaymentMethod(req,res,next);
});

router.route('/product')
.get((req,res,next) =>{

})
.post((req,res,next) =>{
    productMethods.postProduct(req,res,next);
});

router.route('/product/:id')
.get((req,res,next) =>{
    productMethods.getProduct(req,res,next);
})
.delete((req,res,next) =>{
    productMethods.deleteProduct(req,res,next);
});

router.route('/product/:id/review')
.get((req,res,next) =>{
    productMethods.getReview(req,res,next);
})
.post((req,res,next) =>{
    productMethods.postReview(req,res,next);
});

export default router;