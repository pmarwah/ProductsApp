(function() {
    "use strict";
    var app = angular.module("productManagement", ["common.services",
        "ui.router",
        "ui.mask",
        "ui.bootstrap",
        "angularCharts",
        "productResourceMock"
    ]);

    // http: //plnkr.co/edit/hUxQASblscbhFZFvWDyN?p=preview    this plunker is for date picker

    app.config(["$stateProvider",
            "$urlRouterProvider",

            function($stateProvider, $urlRouterProvider) {

                $urlRouterProvider.otherwise("/");


                $stateProvider

                    .state("home", {
                        url: "/",
                        templateUrl: "app/mainView.html"

                    })
                    .state("prodList", {
                        url: "/productdetails",
                        templateUrl: "app/productdetails/prodListView.html",
                        controller: "ProductListController as vm"
                    })
                    .state("prodEdit", {
                        // abstract: true,
                        url: "/productdetails/edit/:prodId",
                        templateUrl: "app/productdetails/prodEditView.html",
                        controller: "ProductEditController as vm",
                        resolve: {
                            productResource: "productResource", //defining dependency, key name can be any name
                            product: function(productResource, $stateParams) {
                                var prodId = $stateParams.prodId;
                                return productResource.get({ prodId: prodId }).$promise;
                            }
                        }

                    })
                    .state("prodEdit.product", {
                        url: "/product",
                        templateUrl: "app/productdetails/prodEditProductView.html"

                    })
                    .state("prodEdit.price", {
                        url: "/price",
                        templateUrl: "app/productdetails/prodEditPriceView.html"

                    })

                .state("prodDetail", {
                    url: "/productdetails/:prodId",
                    templateUrl: "app/productdetails/prodDetailsView.html",
                    controller: "ProductDetailController as vm", //Once resolve returned success, controller created
                    resolve: {
                        productResource: "productResource", //defining dependency, key name can be any name
                        product: function(productResource, $stateParams) {

                            var prodId = $stateParams.prodId;
                            return productResource.get({ prodId: prodId }).$promise;
                        }
                    }
                })

                .state("dataAnalytics", {

                    url: "/dataAnalytics",
                    templateUrl: "app/pricedetails/dataAnalyticsView.html",
                    controller: "DataAnalyticsController",
                    resolve: {
                        productResource: "productResource",
                        products: function(productResource) {
                            return productResource.query().$promise;
                        }
                    }
                })
            }
        ]

    );

}());