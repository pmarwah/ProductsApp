(function() {
    "use strict";
    var app = angular
        .module("productResourceMock", ["ngMockE2E"]);

    app.run(function($httpBackend) {
        var products = [{
                "prodId": 1,
                "pCode": "P-1001",
                "pName": "1Mascara",
                "manufacturingDate": "January 29, 2014",
                "expiryDate": "January 29, 2016",
                "price": 50,
                "vatPercent": 4,
                "consumerTaxPercent": 6,
                "manufacturer": "Loreal",
                "category": "Cosmetics",
                "imageUrl": "images/prod1.jpg"
            },
            {
                "prodId": 2,
                "pCode": "P-1002",
                "pName": "2Oats",
                "manufacturingDate": "February 05, 2012",
                "expiryDate": "February 05, 2014",
                "price": 80,
                "vatPercent": 14,
                "consumerTaxPercent": 16,
                "manufacturer": "Quaker",
                "category": "Food",
                "imageUrl": "images/prod2.jpg"
            },
            {
                "prodId": 3,
                "pCode": "P-1003",
                "pName": "3Lotion",
                "manufacturingDate": "March 01, 2015",
                "expiryDate": "March 01, 2017",
                "price": 40,
                "vatPercent": 3,
                "consumerTaxPercent": 2,
                "manufacturer": "RUS",
                "category": "Baby",
                "imageUrl": "images/prod3.jpg"
            }
        ];

        var prodUrl = "/api/products";
        $httpBackend.whenGET(prodUrl).respond(products);

        var editingRegex = new RegExp(prodUrl + "/[0-9][0-9]*", '');

        $httpBackend.whenGET(editingRegex).respond(function(method, url, data) {


            var product = { "prodId": 0 };
            var parameters = url.split('/');
            var length = parameters.length;
            var id = parameters[length - 1];


            if (id > 0) {
                for (var i = 0; i < products.length; i++) {
                    if (products[i].prodId == id) {
                        product = products[i];
                        break;
                    }
                };
            }
            return [200, product, {}];

        });

        $httpBackend.whenPOST(prodUrl).respond(function(method, url, data) {
            var product = angular.fromJson(data);

            if (!product.prodId) {
                // new product Id
                product.prodId = products[products.length - 1].prodId + 1;
                products.push(product);
            } else {
                // Updated product
                for (var i = 0; i < products.length; i++) {
                    if (products[i].prodId == product.prodId) {
                        products[i] = product;
                        break;
                    }
                };
            }
            return [200, product, {}];

        });

        $httpBackend.whenGET(/app/).passThrough();
    });


}());