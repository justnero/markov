(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["reverse-mode"],{"3a64":function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.isTransitionsAvailable?n("div",[n("div",{staticClass:"d-flex justify-content-start flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3"},[n("h4",{staticClass:"mb-0"},[t._v("Цепочки")]),n("div",{staticClass:"btn-toolbar ml-3"},[n("div",{staticClass:"btn-group"},[n("button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"btn btn-sm btn-sm btn-outline-primary",attrs:{title:t.isTransitionsShown?"Скрыть":"Показать"},on:{click:function(e){t.isTransitionsShown=!t.isTransitionsShown}}},[n("fa-icon",{attrs:{icon:t.isTransitionsShown?"caret-up":"caret-down"}})],1),n("button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"btn btn-sm btn-outline-primary",attrs:{title:"Скопировать"},on:{click:t.copyTransitions}},[n("fa-icon",{attrs:{icon:"copy"}})],1)])])]),t.isTransitionsShown?t._l(t.transitionsHumanized,(function(e,s){return n("p",{key:s},[t._v("\n            "+t._s(e)+"\n        ")])})):t._e()],2):t._e()},r=[],i=(n("96cf"),n("3b8d")),a={name:"Chains",props:{copy:{type:Boolean,default:!0},transitions:{type:Array,default:function(){return[[0]]}}},data:function(){return{isTransitionsShown:!1}},computed:{transitionsPlain:function(){return this.transitions.map((function(t){return t.join(" ")})).join("\n")},transitionsHumanized:function(){return this.transitions.map((function(t){return t.join(" ↠ ")}))},isTransitionsAvailable:function(){return this.transitions.length>1||this.transitions[0].length>1}},methods:{copyTransitions:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",navigator.clipboard.writeText(this.transitionsPlain));case 1:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()}},o=a,c=n("2877"),u=Object(c["a"])(o,s,r,!1,null,null,null);e["a"]=u.exports},"4a2f":function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",{staticClass:"col-md-9 ml-sm-auto col-lg-10 px-4",attrs:{role:"main"}},[n("v-title",{attrs:{name:"Обратная Марковская модель","action-save":""},on:{save:function(e){return t.save(e)}}}),n("v-actions",{attrs:{"can-step":!t.isTested,"can-normalize":!t.isTested,"can-test":"","can-clear":""},on:{test:t.test,step:t.step,normaliz:t.normalize,clear:t.clear}}),n("v-settings-row",{attrs:{fields:t.fieldsConfig},model:{value:t.settings,callback:function(e){t.settings=e},expression:"settings"}}),n("div",{staticClass:"row"},[n("div",{staticClass:"col"},[n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"transitions-plain"}},[t._v("Цепочки")]),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.transitionsPlain,expression:"transitionsPlain"}],staticClass:"form-control w-100",attrs:{id:"transitions-plain",rows:"3"},domProps:{value:t.transitionsPlain},on:{input:function(e){e.target.composing||(t.transitionsPlain=e.target.value)}}})])])]),n("div",{staticClass:"row"},[n("div",{staticClass:"col"},[n("matrix-table",{attrs:{size:t.settings.size,namespace:"reverse/model","read-only":""}})],1),n("div",{staticClass:"col text-right"},[n("model",{ref:"model",attrs:{namespace:"reverse/model",size:t.settings.size}})],1)]),n("chains",{attrs:{transitions:t.transitions}})],1)},r=[],i=(n("96cf"),n("3b8d")),a=(n("456d"),n("ac6a"),n("32ee")),o=n("1751"),c=n("3a64"),u=n("d88f"),l=n("e048"),m=n("578d"),p=n("21a6"),v=n("a014"),f={name:"ReverseMode",components:{MatrixTable:a["a"],Model:o["a"],Chains:c["a"],vTitle:u["a"],vActions:l["a"],vSettingsRow:m["a"]},computed:{settings:{get:function(){return{size:this.$store.state.reverse.model.size,steps:this.$store.state.reverse.steps,chains:this.$store.state.reverse.chains}},set:function(t){var e=this,n={size:"reverse/model/resize",steps:"reverse/setSteps",chains:"reverse/setChains"};Object.keys(n).forEach((function(s){e.settings[s]!==t[s]&&e.$store.commit(n[s],t[s])}))}},fieldsConfig:function(){return[{name:"size",label:"Размерность модели",min:2},{name:"steps",label:"Максимальнное количество шагов",min:2,max:null},{name:"chains",label:"Количество цепочек",max:null}]},transitionsPlain:{get:function(){return this.$store.state.reverse.transitionsPlain},set:function(t){this.$store.commit("reverse/setTransitionsPlain",t),this.$store.commit("reverse/model/setTransitionsPlain",t)}},transitions:function(){return this.$store.state.reverse.model.chains},isTested:function(){return-1===this.$store.state.reverse.model.current}},methods:{save:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var n,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=!1,s=!1,t.t0=e,t.next="xlsx"===t.t0?5:"svg"===t.t0?7:"png"===t.t0?9:11;break;case 5:return this.$store.dispatch("reverse/save"),t.abrupt("break",11);case 7:return Object(p["saveAs"])(new Blob([Object(v["a"])(this.$refs.model.$refs.svg)],{type:"image/svg+xml;charset=utf-8"}),"model.svg"),t.abrupt("break",11);case 9:return Object(v["b"])(this.$refs.model.$refs.svg,(function(t){Object(p["saveAs"])(t,"model.png")})),t.abrupt("break",11);case 11:n&&s&&Object(p["saveAs"])(n,s);case 12:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),test:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",this.$store.dispatch("reverse/test"));case 1:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),step:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",this.$store.dispatch("reverse/model/step"));case 1:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),normalize:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",this.$store.dispatch("reverse/model/normalize"));case 1:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),clear:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",this.$store.dispatch("reverse/model/clear"));case 1:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()}},h=f,d=n("2877"),b=Object(d["a"])(h,s,r,!1,null,null,null);e["default"]=b.exports}}]);
//# sourceMappingURL=reverse-mode.74320b76.js.map