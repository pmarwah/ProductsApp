(function() {
    "use strict";
    //registering with common.services
    angular
        .module("common.services")
        .factory("productPricing", productPricing);

    function productPricing() {

        function vatTax(price, vatPercent) {

            var vat = (price * vatPercent) / 100;
            vat = Math.round(vat);

            return vat;
        }

        function consumerTax(price, consumerPercent) {
            var consumerOtherTax = (price * consumerPercent) / 100;
            consumerOtherTax = Math.round(consumerOtherTax);
            return consumerOtherTax;
        }
        return {
            vatTax: vatTax,
            consumerTax: consumerTax

        };
    }
}());