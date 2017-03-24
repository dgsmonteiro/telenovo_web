/**
 * Módulo de carga de aplicações - Filtros Personalizados
 * @namespace app.core
 * @author Isaias Nascimento de Carvalho
 * @description Filtros personalizados de aplicação
 */


(function () {
  'use strict';

  /** diretiva para comparação de senha iguais **/
  angular
    .module('app.core')
    .directive('compareTo', compareTo);

  function compareTo() {
    return {
      require: "ngModel",
      scope:   {
        otherModelValue: "=compareTo"
      },
      link:    function (scope, element, attributes, ngModel) {

        ngModel.$validators.compareTo = function (modelValue) {
          return modelValue == scope.otherModelValue;
        }

        scope.$watch("otherModelValue", function () {
          ngModel.$validate();
        })
      }
    }
  }


  angular
    .module('app.core')
    .directive('noSpecialChar', noSpecialChar);
  function noSpecialChar() {
    return {
      require:  'ngModel',
      restrict: 'A',
      link:     function (scope, element, attrs, modelCtrl) {
        modelCtrl.$parsers.push(function (inputValue) {
          if (inputValue == null)
            return ''
          var cleanInputValue = inputValue.replace(/[^\w\s]/gi, '').replace(' ', '');
          if (cleanInputValue != inputValue) {
            modelCtrl.$setViewValue(cleanInputValue);
            modelCtrl.$render();
          }
          return cleanInputValue
        });
      }
    }
  }

  angular
    .module('app.core')
    .directive('onlyDigits', onlyDigits);
  function onlyDigits() {
    return {
      restrict: 'A',
      require:  '?ngModel',
      link:     function (scope, element, attrs, modelCtrl) {
        modelCtrl.$parsers.push(function (inputValue) {
          if (inputValue == undefined) return '';
          var transformedInput = inputValue.replace(/[^0-9]/g, '');
          if (transformedInput !== inputValue) {
            modelCtrl.$setViewValue(transformedInput);
            modelCtrl.$render();
          }
          return transformedInput;
        });
      }
    }
  }

  angular
    .module('app.core')
    .directive('onFilter', onFilter);
  function onFilter() {
    return {
      require: '^stTable',
      scope:   {
        onFilter: '='
      },
      link:    function (scope, element, attr, ctrl) {

        scope.$watch(function () {
          return ctrl.tableState().search;
        }, function (newValue, oldValue) {
          scope.onFilter(ctrl);
        }, true);
      }
    }
  }


  angular
    .module('app.core')
    .directive('yesNo', yesNo);
  function yesNo() {
    return {
      require: '?ngModel',
      link:    function (scope, elem, attrs, ctrl) {
        if (!ctrl) return;
        ctrl.$formatters.unshift(function (a) {
          if (ctrl.$modelValue) {
            return "Sim";
          } else {
            return "Não";
          }
        });
      }
    }
  }

})();




