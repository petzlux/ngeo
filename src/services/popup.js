/**
 * @fileoverview Provides a factory to create a popup in the page.
 * The factory returns a ngeo.Popup object.
 *
 * Example:
 *
 * var popup = ngeoCreatePopup();
 * popup.setTitle("A title");
 * popup.setContent("Some content");
 * popup.show();
 *
 */

goog.provide('ngeo.CreatePopup');
goog.provide('ngeo.Popup');

goog.require('ngeo');
goog.require('ngeo.popupDirective');


/**
 * @typedef {function():!ngeo.Popup}
 */
ngeo.CreatePopup;



/**
 * @constructor
 * @param {angular.$compile} $compile The compile provider.
 * @param {angular.Scope} $rootScope The rootScope provider.
 */
ngeo.Popup = function($compile, $rootScope) {

  /**
   * The scope the element is compiled with.
   * @type {angular.Scope}
   * @private
   */
  this.scope_ = $rootScope.$new();

  /**
   * The element.
   * @type {angular.JQLite}
   * @private
   */
  this.element_;

  // Create the popup element with its content and add it to the HTML page
  this.element_ = angular.element('<div ngeo-popup></div>');

  angular.element(document.body).append(this.element_);
  $compile(this.element_)(this.scope_);
};


/**
 * Display the popup
 */
ngeo.Popup.prototype.show = function() {
  this.scope_['open'] = true;
};


/**
 * Destroy the popup
 */
ngeo.Popup.prototype.destroy = function() {
  this.scope_.$destroy();
  this.element_.remove();
};


/**
 * Set the popup's title
 * @param {string} title The title
 */
ngeo.Popup.prototype.setTitle = function(title) {
  this.scope_['title'] = title;
};


/**
 * Set the popup's content
 * @param {string} content The content
 */
ngeo.Popup.prototype.setContent = function(content) {
  this.scope_['content'] = content;
};


/**
 * @param {angular.$compile} $compile Angular compile service.
 * @param {angular.Scope} $rootScope Angular rootScope service.
 * @return {ngeo.CreatePopup} The function to create a
 *     popup.
 * @ngInject
 */
ngeo.createPopupServiceFactory = function($compile, $rootScope) {
  return (
      /**
       * @return {!ngeo.Popup} The popup instance.
       */
      function() {
        return new ngeo.Popup($compile, $rootScope);
      });
};
ngeoModule.factory('ngeoCreatePopup', ngeo.createPopupServiceFactory);