(function() {
    "use strict";
    angular
        .module("productManagement")
        .controller("DataAnalyticsController", ["$scope", "products", DataAnalyticsController]);

    function DataAnalyticsController($scope, products) {

        $scope.title = "Data Analytics";

        var chartData = [];

        for (var i = 0; i < products.length; i++) {
            chartData.push({
                x: products[i].pName,
                y: [products[i].price, products[i].vatPercent, products[i].consumerTaxPercent]
            });
        }

        $scope.dataValues = {
            series: ["Price", "VatTax", "ConsumerTax"],
            data: chartData
        };


        $scope.configValues = {
            title: "Data Analytics Title",
            tooltips: true,
            labels: false,
            mouseover: function() {},
            mouseout: function() {},
            click: function() {},
            legend: {
                display: true,
                position: 'right'
            }
        };


    }
}());