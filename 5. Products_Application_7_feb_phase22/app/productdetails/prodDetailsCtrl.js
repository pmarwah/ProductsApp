(function() {
    "use strict";

    angular
        .module("productManagement")
        .controller("ProductDetailController", ["product", "productPricing", ProductDetailController]);

    function ProductDetailController(product, productPricing) {

        var vm = this;
        vm.product = product;
        vm.title = "Product Details" + vm.product.pName;
        /*if(vm.employee.tags){
            vm.employee.tagList = vm.employee.tags.toString();
        }*/
        vm.vatTaxAmount = productPricing.vatTax(vm.product.price, vm.product.vatPercent);
        vm.consumerTaxAmount = productPricing.consumerTax(vm.product.price, vm.product.consumerTaxPercent);
        vm.finalPrice = vm.product.price + vm.vatTaxAmount + vm.consumerTaxAmount;
    }
}());