(function() {
    "use strict";

    angular
        .module("productManagement")
        .controller("ProductEditController", ["product", "$state", ProductEditController]);

    function ProductEditController(product, $state) {
        var vm = this;
        console.log(this);

        vm.product = product;

        if (vm.product && vm.product.prodId) {
            vm.title = "Edit:" + vm.product.pName;

        } else {
            vm.title = "New Product";
        }

        vm.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.opened = !vm.opened;
        }

        vm.submit = function() {
            vm.product.$save(function(date) {
                toastr.success("Record Saved Successfully");
            });
        }

        vm.cancel = function() {
            $state.go('prodList');
        };

    }
}());