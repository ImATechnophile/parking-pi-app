/* core_kpiAdmin 9.3.0 2018-03-26T16:25:26+00:00 796b68a031b1+ (release/9.3.0) tip */
!function(){"use strict";function n(n,e,a){var t={path:"datapointlibrary",name:a("Data Point Library")};n.when(t.path,{templateUrl:"core_kpiAdmin/views/list.html"}),n.when(t.path+"/new",{title:a("New data point settings"),templateUrl:"core_kpiAdmin/views/detail.html"}),n.when(t.path+"/:kpiId",{title:a("Edit data point settings"),templateUrl:"core_kpiAdmin/views/detail.html"}),e.addNavigation({parent:a("Business rules"),name:t.name,path:t.path,icon:"c8y-data-points",showIfPermissions:{allRoles:["ROLE_INVENTORY_READ"]}})}n.$inject=["c8yViewsProvider","c8yNavigatorProvider","gettext"],angular.module("c8y.parts.kpiAdmin",[]).config(n)}(),function(){"use strict";function n(n,e,a,t,i,l,s,r,o,c,d){function p(e){n.refreshLoading=!1,n.kpis=_.unionBy(n.kpis,e,"id"),n.paging=e.paging}function m(){n.paging.loading=!0,n.paging.next().then(p).finally(function(){n.paging.loading=!1})}function u(n){return n._measurement=i.humanizeFragment(n.c8y_Kpi.fragment||""),!0}function g(){n.refreshLoading=!0,t.list().then(i.createListFilter(u)).then(p)}function v(e){return s({title:c("Confirm delete?"),body:d.getString('Do you really want to delete data point "{{kpiLabel}}"?',{kpiLabel:e.c8y_Kpi.label}),labels:{ok:c("Delete")},status:"danger"}).then(_.partial(t.remove,e)).then(_.partial(_.remove,n.kpis,e)).then(function(){r.success(c("Data point successfully deleted"))})}function y(){l.changeTitle({title:c("Data Point Library")})}function f(){g(),y(),E()}function b(n,e){var a=e.c8y_Kpi;return!_.isUndefined(a[n+"RangeMin"])||!_.isUndefined(a[n+"RangeMax"])}function h(n,e){var a=e.c8y_Kpi,t=parseInt(a.min,0),i=parseInt(a.max,0),l=parseInt(a[n+"RangeMin"],0),s=parseInt(a[n+"RangeMax"],0),r=function(n){return 100*n},o=(s-t)/(i-t);return{left:r((l-t)/(i-t))+"%",right:r(1-o)+"%"}}function k(n){e.path("/datapointlibrary/"+n.id)}function E(){o.hasAllRoles(["ROLE_INVENTORY_ADMIN"]).then(function(e){n.canCreate=e})}n.info=a,n.remove=v,n.showYellowBar=_.partial(b,"yellow"),n.showRedBar=_.partial(b,"red"),n.yellowBarStyle=_.partial(h,"yellow"),n.redBarStyle=_.partial(h,"red"),n.detail=k,n.refresh=g,n.loadNext=m,f()}n.$inject=["$scope","$location","info","c8yKpi","c8yBase","c8yTitle","c8yModal","c8yAlert","c8yPermissions","gettext","gettextCatalog"],angular.module("c8y.parts.kpiAdmin").controller("KpiListCtrl",n)}(),function(){"use strict";function n(n,e,a,t,i,l,s,r,o){function c(n){n?l.detail(n).then(function(n){return n.data}).then(p):d()}function d(){var n=o.getString("New data point"),e=a.fragment&&a.series?i.humanizeFragment(a.fragment+" => "+a.series):n;p({c8y_Kpi:{label:e,fragment:a.fragment,series:a.series,color:"#"+Math.floor(16777215*Math.random()).toString(16)}})}function p(e){n.kpi=E=e,m()}function m(){var n=E.c8y_Kpi,e=o.getString("Add new data point");s.changeTitle({title:E.id?n.label:e,subtitle:function(){return n.fragment&&n.series?n.fragment+" / "+n.series:""}()})}function u(){l.save(E).then(g)}function g(){var n=e.history;n.length>1?n.back():t.path("/kpi")}function v(e){var a=n.editKpi,t=a[e];return _.filter(_.map(t&&t.$error,function(n,e){return n&&A[e]}),_.identity).join(" ")}function y(e){var a=n.editKpi[e];return a&&a.$invalid}function f(){var e=n.editKpi;return _.forEach([[e.min,e.max],[e.yellowRangeMin,e.yellowRangeMax],[e.redRangeMin,e.redRangeMax]],function(n,a){b.apply(this,n),h.apply(this,n),a&&_.partial(k,e.min,e.max).apply(this,n)}),e.$valid}function b(n,e){var a=n.$modelValue,t=e.$modelValue,i=!_.isUndefined(a)&&null!==a,l=!_.isUndefined(t)&&null!==t;n.$setValidity(R.SHOULD_BE_DEFINED,!(l&&!i)),e.$setValidity(R.SHOULD_BE_DEFINED,!(i&&!l))}function h(n,e){var a=n.$modelValue,t=e.$modelValue,i=!_.isUndefined(a)&&null!==a,l=!_.isUndefined(t)&&null!==t,s=i&&l;n.$setValidity(R.GREATER_THAN_RANGE_MAX,!s||a<t),e.$setValidity(R.LESS_THAN_RANGE_MIN,!s||t>a)}function k(n,e,a,t){var i=n.$modelValue,l=e.$modelValue,s=!_.isUndefined(i)&&null!==i&&!_.isUndefined(l)&&null!==l,r=[a,t];s&&_.forEach(r,function(n){var e=n.$modelValue,a=!_.isUndefined(e)&&null!==e;a&&(n.$setValidity(R.GREATER_THAN_SCALE_MAX,e<=l),n.$setValidity(R.LESS_THAN_SCALE_MIN,e>=i))})}var E,R={IS_REQUIRED:"required",PATTERN:"pattern",SHOULD_CONTAIN_NUMBER:"number",SHOULD_BE_DEFINED:"should-be-defined",GREATER_THAN_SCALE_MAX:"greater-than-scale-max",LESS_THAN_SCALE_MIN:"less-than-scale-min",GREATER_THAN_RANGE_MAX:"greater-than-range-max",LESS_THAN_RANGE_MIN:"less-than-range-min"},A={};A[R.IS_REQUIRED]=r("This field is required!"),A[R.PATTERN]=r("Dots not allowed."),A[R.SHOULD_CONTAIN_NUMBER]=r("This field should contain a number!"),A[R.SHOULD_BE_DEFINED]=r("Value should be defined!"),A[R.GREATER_THAN_SCALE_MAX]=r("Value should be less than scale maximum!"),A[R.LESS_THAN_SCALE_MIN]=r("Value should be greater than scale minimum!"),A[R.GREATER_THAN_RANGE_MAX]=r("Value should be less than respective maximum!"),A[R.LESS_THAN_RANGE_MIN]=r("Value should be greater than respective minimum!"),n.save=u,n.cancel=g,n.invalidTxt=v,n.invalid=y,n.formValid=f,n.PATTERN_VALIDATE_FRAGMENT_SERIES="^[^.]*$",c(a.kpiId)}n.$inject=["$scope","$window","$routeParams","$location","c8yBase","c8yKpi","c8yTitle","gettext","gettextCatalog"],angular.module("c8y.parts.kpiAdmin").controller("KpiDetailCtrl",n)}(),function(){"use strict";function n(n){var e;e='<div ng-controller="KpiDetailCtrl">\n\n  <div class="row">\n    <div class="col-sm-8 col-md-6">\n      <form name="editKpi" class="card" role="form" ng-submit="save()" novalidate>\n\n        <div class="card-block">\n\n          <div class="flex-row">\n            <div class="form-group" ng-class="{\'has-error\': invalid(\'color\')}">\n              <label>{{\'Color\' | translate}} *</label>\n              <div class="data-point-color">\n                <input c8y-color-picker="{theme: \'hidden-input\'}" type="hidden" class="colorpicker" name="color" ng-model="kpi.c8y_Kpi.color" required uib-tooltip="{{invalidTxt(\'color\') | translate}}">\n                <!-- <input type="color" class="colorpicker" name="color" ng-model="kpi.c8y_Kpi.color" required uib-tooltip="{{invalidTxt(\'color\') | translate}}"> -->\n                <!-- <i c8y-icon="circle" ng-style="{color: kpi.c8y_Kpi.color}" style="text-align:left;"></i> -->\n              </div>\n            </div>\n            <div class="form-group" ng-class="{\'has-error\': invalid(\'label\')}" style="flex: 1 1 auto; align-self: flex-start; padding-left:10px">\n              <label>{{\'Label\' | translate}} *</label>\n              <input class="form-control" name="label" ng-model="kpi.c8y_Kpi.label" required uib-tooltip="{{invalidTxt(\'label\') | translate}}">\n            </div>\n\n        </div>\n\n          <div class="form-group" ng-class="{\'has-error\': invalid(\'fragment\')}">\n            <label>{{\'Fragment\' | translate}} *</label>\n            <input class="form-control" name="fragment" ng-pattern="PATTERN_VALIDATE_FRAGMENT_SERIES" ng-model="kpi.c8y_Kpi.fragment" required uib-tooltip="{{invalidTxt(\'fragment\') | translate}}">\n          </div>\n\n          <div class="form-group" ng-class="{\'has-error\': invalid(\'series\')}">\n            <label>{{\'Series\' | translate}} *</label>\n            <input class="form-control" name="series" ng-pattern="PATTERN_VALIDATE_FRAGMENT_SERIES" ng-model="kpi.c8y_Kpi.series" required uib-tooltip="{{invalidTxt(\'series\') | translate}}">\n          </div>\n\n        <div class="row">\n          <div class="form-group col-md-3" ng-class="{\'has-error\': invalid(\'unit\')}">\n            <label translate>Unit</label>\n            <input class="form-control" name="unit" ng-model="kpi.c8y_Kpi.unit" uib-tooltip="{{invalidTxt(\'unit\') | translate}}">\n          </div>\n          <div class="form-group col-md-3" ng-class="{\'has-error\': invalid(\'target\')}">\n            <label translate>Target</label>\n            <input type="number" step="any" class="form-control" name="target" ng-model="kpi.c8y_Kpi.target" uib-tooltip="{{invalidTxt(\'target\') | translate}}">\n          </div>\n          <div class="form-group col-md-3" ng-class="{\'has-error\': invalid(\'min\')}">\n            <label translate>Minimum</label>\n            <input type="number" step="any" class="form-control" name="min" ng-model="kpi.c8y_Kpi.min" uib-tooltip="{{invalidTxt(\'min\') | translate}}">\n          </div>\n          <div class="form-group col-md-3" ng-class="{\'has-error\': invalid(\'max\')}">\n            <label translate>Maximum</label>\n            <input type="number" step="any" class="form-control" name="max" ng-model="kpi.c8y_Kpi.max" uib-tooltip="{{invalidTxt(\'max\') | translate}}">\n          </div>\n        </div>\n\n        <div class="row">\n          <div class="form-group col-md-3" ng-class="{\'has-error\': invalid(\'yellowRangeMin\')}">\n            <label translate>Yellow range</label>\n            <input type="number" step="any" class="form-control" name="yellowRangeMin" ng-model="kpi.c8y_Kpi.yellowRangeMin" placeholder="{{\'Min\' | translate}}" uib-tooltip="{{invalidTxt(\'yellowRangeMin\') | translate}}">\n          </div>\n          <div class="form-group col-md-3" ng-class="{\'has-error\': invalid(\'yellowRangeMax\')}">\n            <label>&nbsp;</label>\n            <input type="number" step="any" class="form-control" name="yellowRangeMax" ng-model="kpi.c8y_Kpi.yellowRangeMax" placeholder="{{\'Max\' | translate}}" uib-tooltip="{{invalidTxt(\'yellowRangeMax\') | translate}}">\n          </div>\n          <div class="form-group col-md-3" ng-class="{\'has-error\': invalid(\'redRangeMin\')}">\n            <label translate>Red range</label>\n            <input type="number" step="any" class="form-control" name="redRangeMin" ng-model="kpi.c8y_Kpi.redRangeMin" placeholder="{{\'Min\' | translate}}" uib-tooltip="{{invalidTxt(\'redRangeMin\') | translate}}">\n          </div>\n          <div class="form-group col-md-3" ng-class="{\'has-error\': invalid(\'redRangeMax\')}">\n            <label>&nbsp;</label>\n            <input type="number" step="any" class="form-control" name="redRangeMax" ng-model="kpi.c8y_Kpi.redRangeMax" placeholder="{{\'Max\' | translate}}" uib-tooltip="{{invalidTxt(\'redRangeMax\') | translate}}">\n          </div>\n        </div>\n        </div>\n        <div class="card-footer text-center separator">\n          <c8y-ui-button-footer changed="editKpi.$dirty">\n            <button type="button" class="btn btn-default" ng-click="cancel()" translate>Cancel</button>\n            <button type="submit" class="btn btn-primary" ng-disabled="!formValid() || !editKpi.$dirty" translate>Save</button>\n          </c8y-ui-button-footer>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n',n.put("core_kpiAdmin/views/detail.html",e),n.put("/apps/core/kpiAdmin/views/detail.html",e),e='<div ng-controller="KpiListCtrl as vm">\n  <c8y-ui-action-bar-set>\n    <li class="navbar-form hidden-xs" action-bar-position="left">\n      <c8y-list-display-control list-length="kpis.length" on-list-class-change="vm.listClass = listClass">\n      </c8y-list-display-control>\n    </li>\n\n    <li>\n      <c8y-if-allowed any-role="[\'ROLE_INVENTORY_ADMIN\']">\n        <a href="#/datapointlibrary/new" class="btn btn-link">\n          <i c8y-icon="plus-circle"></i>\n          <span>{{\'Add data point\' | translate}}</span>\n        </a>\n      </c8y-if-allowed>\n    </li>\n\n    <c8y-refresh-btn></c8y-refresh-btn>\n  </c8y-ui-action-bar-set>\n\n  <!-- empty state -->\n  <div class="c8y-empty-state text-center" ng-show="kpis.length == 0">\n    <h1 class="c8y-icon c8y-icon-data-points c8y-icon-duocolor"></h1>\n    <h3 translate>No data points to display.</h3>\n    <p translate>Add a data point using the button below.</p>\n    <a href="#/datapointlibrary/new" class="btn btn-primary">\n      <i c8y-icon="plus-circle"></i>\n      <span>{{\'Add data point\' | translate}}</span>\n    </a>\n  </div>\n  <!-- /.empty state -->\n\n  <div class="card-group" ng-class="vm.listClass">\n\n    <div ng-repeat="k in kpis | orderBy: [\'_measurement\', \'c8y_Kpi.series\']" class="col-sm-6 col-md-4 col-lg-3 col-xs-12">\n      <div class="card" ng-click="detail(k)">\n\n        <div class="card-actions" ng-click="$event.stopPropagation()">\n          <div class="settings pull-right dropdown" uib-dropdown="" is-open="menuOpen">\n            <button type="button" title="Options" class="dropdown-toggle c8y-dropdown" uib-dropdown-toggle>\n              <i c8y-icon="ellipsis-v" class="fa fw fa-ellipsis-v"></i>\n            </button>\n            <ul class="dropdown-menu" uib-dropdown-menu>\n              <li>\n                <a href="" title="{{\'Edit\' | translate}}" ng-click="detail(k)">\n                  <i c8y-icon="pencil"></i> <translate>Edit</translate>\n                </a>\n              </li>\n              <li>\n                <a href="" title="{{\'Remove\' | translate}}" ng-click="remove(k)">\n                  <i c8y-icon="trash"></i> <translate>Remove</translate>\n                </a>\n              </li>\n            </ul>\n          </div>\n        </div>\n\n        <div class="card-header separator">\n          <!-- TODO: Bulk actions component\n          <div class="card-bulk-check">\n            <label title="Select" class="c8y-checkbox item-checkbox">\n              <input type="checkbox"> <span></span>\n            </label>\n          </div> -->\n          <div class="card-icon">\n            <i c8y-icon="circle" ng-style="{color: k.c8y_Kpi.color}"></i>\n          </div>\n          <div class="card-title text-truncate" title="{{k._measurement}}">{{k._measurement}}</div>\n        </div>\n        <div class="card-block">\n          <div class="col-sm-2 col-md-2 text-truncate">\n            <label class="small" translate>Series</label> <span title="{{k.c8y_Kpi.series}}">{{k.c8y_Kpi.series}}</span>\n          </div>\n          <div class="col-sm-3 col-md-4 text-truncate">\n            <span ng-if="k.c8y_Kpi.label.length">\n              <label class="small" translate>Name</label> <span title="{{k.c8y_Kpi.label | translate}}">{{k.c8y_Kpi.label | translate}}</span>\n            </span>\n          </div>\n          <div class="col-sm-1 col-md-2 text-truncate">\n            <span ng-if="k.c8y_Kpi.unit.length">\n              <label class="small" translate>Unit</label> <span title="{{k.c8y_Kpi.unit}}">{{k.c8y_Kpi.unit}}</span>\n            </span>\n          </div>\n          <div class="col-sm-2 text-truncate">\n            <span ng-if="k.c8y_Kpi.target.length">\n              <label class="small" translate>Target</label> <span title="{{k.c8y_Kpi.target}}">{{k.c8y_Kpi.target}}</span>\n            </span>\n          </div>\n          <div class="col-sm-3 col-md-2">\n            <!-- <label translate>Range</label> -->\n            <div class="kpiRange" ng-if="k.c8y_Kpi.min || k.c8y_Kpi.max" title="{{\'Range\' | translate}}">\n              <small class="number min">{{k.c8y_Kpi.min}}</small>\n              <small class="number max">{{k.c8y_Kpi.max}}</small>\n              <div class="range-holder">\n                <div class="yellow bar" ng-style="yellowBarStyle(k)" ng-show="showYellowBar(k)"></div>\n                <div class="red bar" ng-style="redBarStyle(k)" ng-show="showRedBar(k)"></div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <c8y-load-more></c8y-load-more>\n</div>',n.put("core_kpiAdmin/views/list.html",e),n.put("/apps/core/kpiAdmin/views/list.html",e)}angular.module("c8y.parts.kpiAdmin").run(["$templateCache",n])}();