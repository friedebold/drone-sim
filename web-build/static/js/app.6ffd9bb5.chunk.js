(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{232:function(t,e,r){"use strict";var n,c,o,i,a,l,s,u,h,d,_,f,v,b=r(52),j=r.n(b),g=r(14),k=r.n(g),x=r(200),p=r.n(x),O=r(233),m=r(0),S=r(145),w=r(73),y=r(53),A=r(29),T=r(148),z=r(11),D=r(181),V=r(20),C=(Math.pow(10,-11),Math.pow(10,24),r(9)),H=11,U=40,P=Object(y.a)(V.default.View)(n||(n=j()(["\n\twidth: ","px;\n\theight: ","px;\n\tborder-radius: ","px;\n\tborder-width: 1px;\n\tborder-color: #ff000038;\n\tposition: absolute;\n\tflex-direction: row;\n"])),U,U,U/2),M=y.a.View(c||(c=j()(["\n\tposition: absolute;\n\ttop: ","px;\n\twidth: ","px;\n\theight: 4px;\n\tbackground-color: black;\n"])),U/2-2,U),N=Object(y.a)(V.default.View)(o||(o=j()(["\n\tposition: absolute;\n\twidth: ","px;\n\theight: ","px;\n\tborder-radius: ","px;\n\tborder-width: 1px;\n\tborder-color: black;\n\tbackground-color: white;\n"])),H,H,H/2),E=Object(y.a)(V.default.View)(i||(i=j()(["\n\tposition: absolute;\n\t//\tbackground-color: #ff000021;\n"]))),I=Object(y.a)(V.default.View)(a||(a=j()(["\n\tposition: absolute;\n\twidth: 1px;\n\tbackground-color: black;\n"]))),F=Object(y.a)(V.default.View)(l||(l=j()(["\n\tbackground-color: black;\n\topacity: 0.3;\n\tposition: absolute;\n"]))),R=function(t){var e=t.vertical,r=t.horizontal,n=t.pitch,c=t.back_thrust_components,o=t.front_thrust_components,i=Object(w.a)(),a=i.width,l=i.height,s=Object(V.useAnimatedStyle)(function(){var t=function(){return{top:l/2-U/2-e.value.distance/10*50,left:a/2-U/2+r.value.distance/10*50,transform:[{rotate:n.value.degree+"deg"}]}};return t._closure={height:l,aircraft_width:U,vertical:e,LON_DISTANCE:50,width:a,horizontal:r,LAT_DISTANCE:50,pitch:n},t.asString='function _f(){const{height,aircraft_width,vertical,LON_DISTANCE,width,horizontal,LAT_DISTANCE,pitch}=jsThis._closure;{return{top:height/2-aircraft_width/2-vertical.value.distance/10*LON_DISTANCE,left:width/2-aircraft_width/2+horizontal.value.distance/10*LAT_DISTANCE,transform:[{rotate:pitch.value.degree+"deg"}]};}}',t.__workletHash=4866866639980,t.__location="/Users/friedebold/dev/flight/src/Aircraft.tsx (41:45)",t.__optimalization=3,t}()),u=Object(V.useAnimatedStyle)(function(){var t=function(){return{transform:[{rotate:-n.value.degree+"deg"}],height:2*c.value.vertical*4,width:2*c.value.horizontal*4,left:4*-c.value.horizontal,top:U/2-4*c.value.vertical}};return t._closure={pitch:n,back_thrust_components:c,thrustScaler:4,aircraft_width:U},t.asString='function _f(){const{pitch,back_thrust_components,thrustScaler,aircraft_width}=jsThis._closure;{return{transform:[{rotate:-pitch.value.degree+"deg"}],height:back_thrust_components.value.vertical*2*thrustScaler,width:back_thrust_components.value.horizontal*2*thrustScaler,left:-back_thrust_components.value.horizontal*thrustScaler,top:aircraft_width/2-back_thrust_components.value.vertical*thrustScaler};}}',t.__workletHash=0xa072af7b65f,t.__location="/Users/friedebold/dev/flight/src/Aircraft.tsx (55:44)",t.__optimalization=3,t}()),h=Object(V.useAnimatedStyle)(function(){var t=function(){return{transform:[{rotate:-n.value.degree+"deg"}],height:2*o.value.vertical*4,width:2*o.value.horizontal*4,left:U-4*o.value.horizontal,top:U/2-4*o.value.vertical}};return t._closure={pitch:n,front_thrust_components:o,thrustScaler:4,aircraft_width:U},t.asString='function _f(){const{pitch,front_thrust_components,thrustScaler,aircraft_width}=jsThis._closure;{return{transform:[{rotate:-pitch.value.degree+"deg"}],height:front_thrust_components.value.vertical*2*thrustScaler,width:front_thrust_components.value.horizontal*2*thrustScaler,left:aircraft_width-front_thrust_components.value.horizontal*thrustScaler,top:aircraft_width/2-front_thrust_components.value.vertical*thrustScaler};}}',t.__workletHash=4909876349812,t.__location="/Users/friedebold/dev/flight/src/Aircraft.tsx (67:49)",t.__optimalization=3,t}()),d=function(){var t=function(t,e){var r="front"==t?o:c;return Object(V.useAnimatedStyle)(function(){var t=function(){return{height:"vertical"==e?4*r.value.vertical:1,width:"vertical"==e?1:4*r.value.horizontal,top:4*r.value.vertical,left:"vertical"==e?4*r.value.horizontal:0}};return t._closure={direction:e,thrust_component:r,thrustScaler:4},t.asString='function _f(){const{direction,thrust_component,thrustScaler}=jsThis._closure;{return{height:direction=="vertical"?thrust_component.value.vertical*thrustScaler:1,width:direction=="vertical"?1:thrust_component.value.horizontal*thrustScaler,top:thrust_component.value.vertical*thrustScaler,left:direction=="vertical"?thrust_component.value.horizontal*thrustScaler:0};}}',t.__workletHash=5687456663304,t.__location="/Users/friedebold/dev/flight/src/Aircraft.tsx (85:47)",t.__optimalization=3,t}())};return t._closure={front_thrust_components:o,back_thrust_components:c,useAnimatedStyle:V.useAnimatedStyle,thrustScaler:4},t.asString='function _f(side,direction){const{front_thrust_components,back_thrust_components,useAnimatedStyle,thrustScaler}=jsThis._closure;{let thrust_component=side=="front"?front_thrust_components:back_thrust_components;const animatedVectorStyle=useAnimatedStyle(function(){return{height:direction=="vertical"?thrust_component.value.vertical*thrustScaler:1,width:direction=="vertical"?1:thrust_component.value.horizontal*thrustScaler,top:thrust_component.value.vertical*thrustScaler,left:direction=="vertical"?thrust_component.value.horizontal*thrustScaler:0};});return animatedVectorStyle;}}',t.__workletHash=0xfe4009e0e21,t.__location="/Users/friedebold/dev/flight/src/Aircraft.tsx (81:33)",t}(),_=function(){var t=function(t){return Object(V.useAnimatedStyle)(function(){var e=function(){return{top:U/2-H/2,left:"back"==t?-H/2:U-H/2}};return e._closure={aircraft_width:U,stator_width:H,direction:t},e.asString='function _f(){const{aircraft_width,stator_width,direction}=jsThis._closure;{return{top:aircraft_width/2-stator_width/2,left:direction=="back"?-stator_width/2:aircraft_width-stator_width/2};}}',e.__workletHash=7222279690158,e.__location="/Users/friedebold/dev/flight/src/Aircraft.tsx (109:41)",e.__optimalization=3,e}())};return t._closure={useAnimatedStyle:V.useAnimatedStyle,aircraft_width:U,stator_width:H},t.asString='function _f(direction){const{useAnimatedStyle,aircraft_width,stator_width}=jsThis._closure;{const aircraftStyle=useAnimatedStyle(function(){return{top:aircraft_width/2-stator_width/2,left:direction=="back"?-stator_width/2:aircraft_width-stator_width/2};});return aircraftStyle;}}',t.__workletHash=0xed278cea918,t.__location="/Users/friedebold/dev/flight/src/Aircraft.tsx (107:28)",t}(),f=function(){var t=function(t){return Object(V.useAnimatedStyle)(function(){var e=function(){return{top:U/2,left:"back"==t?0:U,height:"front"==t?4*o.value.total:4*c.value.total}};return e._closure={aircraft_width:U,direction:t,front_thrust_components:o,thrustScaler:4,back_thrust_components:c},e.asString='function _f(){const{aircraft_width,direction,front_thrust_components,thrustScaler,back_thrust_components}=jsThis._closure;{return{top:aircraft_width/2,left:direction=="back"?0:aircraft_width,height:direction=="front"?front_thrust_components.value.total*thrustScaler:back_thrust_components.value.total*thrustScaler};}}',e.__workletHash=3249296563792,e.__location="/Users/friedebold/dev/flight/src/Aircraft.tsx (123:44)",e.__optimalization=3,e}())};return t._closure={useAnimatedStyle:V.useAnimatedStyle,aircraft_width:U,front_thrust_components:o,thrustScaler:4,back_thrust_components:c},t.asString='function _f(direction){const{useAnimatedStyle,aircraft_width,front_thrust_components,thrustScaler,back_thrust_components}=jsThis._closure;{const forceVectorStyle=useAnimatedStyle(function(){return{top:aircraft_width/2,left:direction=="back"?0:aircraft_width,height:direction=="front"?front_thrust_components.value.total*thrustScaler:back_thrust_components.value.total*thrustScaler};});return forceVectorStyle;}}',t.__workletHash=0xc66efb7d066,t.__location="/Users/friedebold/dev/flight/src/Aircraft.tsx (121:32)",t}();return Object(C.jsxs)(P,{style:s,children:[Object(C.jsx)(M,{}),Object(C.jsx)(N,{style:_("back")}),Object(C.jsx)(N,{style:_("front")}),Object(C.jsxs)(E,{style:u,children:[Object(C.jsx)(F,{style:d("back","vertical")}),Object(C.jsx)(F,{style:d("back","horizontal")})]}),Object(C.jsxs)(E,{style:h,children:[Object(C.jsx)(F,{style:d("front","vertical")}),Object(C.jsx)(F,{style:d("front","horizontal")})]}),Object(C.jsx)(I,{style:f("back")}),Object(C.jsx)(I,{style:f("front")})]})},L=r(344),X=function(){var t=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:4;return 4==e?Math.round(1e4*t)/1e4:Math.round(100*t)/100};return t._closure={},t.asString="function _f(num,digits=4){if(digits==4){return Math.round(num*10000)/10000;}else return Math.round(num*100)/100;}",t.__workletHash=6706717018731,t.__location="/Users/friedebold/dev/flight/src/calculations/common.ts (1:21)",t}(),q=function(t){var e=t.clock,r=t.vertical,n=t.horizontal,c=t.pitch,o=Object(V.useDerivedValue)(function(){var t=function(){return X(e.value,2).toString()};return t._closure={round:X,clock:e},t.asString="function _f(){const{round,clock}=jsThis._closure;{return round(clock.value,2).toString();}}",t.__workletHash=0x95e63fc2581,t.__location="/Users/friedebold/dev/flight/src/DataPanel.tsx (30:32)",t}()),i=Object(V.useDerivedValue)(function(){var t=function(){return r.value.acceleration.toString()};return t._closure={vertical:r},t.asString="function _f(){const{vertical}=jsThis._closure;{return vertical.value.acceleration.toString();}}",t.__workletHash=0xa9b62e3c3de,t.__location="/Users/friedebold/dev/flight/src/DataPanel.tsx (31:32)",t}()),a=Object(V.useDerivedValue)(function(){var t=function(){return r.value.velocity.toString()};return t._closure={vertical:r},t.asString="function _f(){const{vertical}=jsThis._closure;{return vertical.value.velocity.toString();}}",t.__workletHash=533128435851,t.__location="/Users/friedebold/dev/flight/src/DataPanel.tsx (34:31)",t}()),l=Object(V.useDerivedValue)(function(){var t=function(){return r.value.distance.toString()};return t._closure={vertical:r},t.asString="function _f(){const{vertical}=jsThis._closure;{return vertical.value.distance.toString();}}",t.__workletHash=558860509151,t.__location="/Users/friedebold/dev/flight/src/DataPanel.tsx (35:31)",t}()),s=Object(V.useDerivedValue)(function(){var t=function(){return n.value.acceleration.toString()};return t._closure={horizontal:n},t.asString="function _f(){const{horizontal}=jsThis._closure;{return horizontal.value.acceleration.toString();}}",t.__workletHash=0xcf11dbe3b5e,t.__location="/Users/friedebold/dev/flight/src/DataPanel.tsx (37:32)",t}()),u=Object(V.useDerivedValue)(function(){var t=function(){return n.value.velocity.toString()};return t._closure={horizontal:n},t.asString="function _f(){const{horizontal}=jsThis._closure;{return horizontal.value.velocity.toString();}}",t.__workletHash=0x969abe5960b,t.__location="/Users/friedebold/dev/flight/src/DataPanel.tsx (40:31)",t}()),h=Object(V.useDerivedValue)(function(){var t=function(){return n.value.distance.toString()};return t._closure={horizontal:n},t.asString="function _f(){const{horizontal}=jsThis._closure;{return horizontal.value.distance.toString();}}",t.__workletHash=0xbb445ba005f,t.__location="/Users/friedebold/dev/flight/src/DataPanel.tsx (41:31)",t}()),d=Object(V.useDerivedValue)(function(){var t=function(){return c.value.acceleration.toString()};return t._closure={pitch:c},t.asString="function _f(){const{pitch}=jsThis._closure;{return pitch.value.acceleration.toString();}}",t.__workletHash=0xfb10323cb3e,t.__location="/Users/friedebold/dev/flight/src/DataPanel.tsx (43:32)",t}()),_=Object(V.useDerivedValue)(function(){var t=function(){return c.value.velocity.toString()};return t._closure={pitch:c},t.asString="function _f(){const{pitch}=jsThis._closure;{return pitch.value.velocity.toString();}}",t.__workletHash=4959299159723,t.__location="/Users/friedebold/dev/flight/src/DataPanel.tsx (44:31)",t}()),f=Object(V.useDerivedValue)(function(){var t=function(){return c.value.degree.toString()};return t._closure={pitch:c},t.asString="function _f(){const{pitch}=jsThis._closure;{return pitch.value.degree.toString();}}",t.__workletHash=5058294479624,t.__location="/Users/friedebold/dev/flight/src/DataPanel.tsx (45:30)",t}());return Object(C.jsxs)(z.a,{style:{flexDirection:"row",alignItems:"stretch",margin:30},children:[Object(C.jsxs)(z.a,{style:{alignItems:"center",justifyContent:"center",flexDirection:"row"},children:[Object(C.jsx)(L.a,{style:{fontSize:24,width:65},text:o}),Object(C.jsx)(A.a,{style:{fontSize:24},children:"s"}),Object(C.jsx)(z.a,{style:{width:60}})]}),Object(C.jsxs)(z.a,{children:[Object(C.jsx)(A.a,{style:{fontSize:24},children:"Vertical"}),Object(C.jsx)(A.a,{children:"Acceleration"}),Object(C.jsx)(A.a,{children:"Velocity"}),Object(C.jsx)(A.a,{children:"Distance"})]}),Object(C.jsx)(z.a,{style:{width:15}}),Object(C.jsxs)(z.a,{style:{},children:[Object(C.jsx)(A.a,{style:{fontSize:24},children:"-"}),Object(C.jsx)(L.a,{text:i}),Object(C.jsx)(L.a,{text:a}),Object(C.jsx)(L.a,{text:l})]}),Object(C.jsxs)(z.a,{style:{},children:[Object(C.jsx)(A.a,{style:{fontSize:24},children:"Horizontal"}),Object(C.jsx)(A.a,{children:"Acceleration"}),Object(C.jsx)(A.a,{children:"Velocity"}),Object(C.jsx)(A.a,{children:"Distance"})]}),Object(C.jsx)(z.a,{style:{width:15}}),Object(C.jsxs)(z.a,{style:{},children:[Object(C.jsx)(A.a,{style:{fontSize:24},children:"-"}),Object(C.jsx)(L.a,{text:s}),Object(C.jsx)(L.a,{text:u}),Object(C.jsx)(L.a,{text:h})]}),Object(C.jsxs)(z.a,{style:{},children:[Object(C.jsx)(A.a,{style:{fontSize:24},children:"Pitch"}),Object(C.jsx)(A.a,{children:"Acceleration"}),Object(C.jsx)(A.a,{children:"Velocity"}),Object(C.jsx)(A.a,{children:"Angle"})]}),Object(C.jsx)(z.a,{style:{width:15}}),Object(C.jsxs)(z.a,{style:{},children:[Object(C.jsx)(A.a,{style:{fontSize:24},children:"-"}),Object(C.jsx)(L.a,{text:d}),Object(C.jsx)(L.a,{text:_}),Object(C.jsx)(L.a,{text:f})]})]})},J=r(25),B=r.n(J),G=function(){var t=Object(w.a)(),e=t.height,r=t.width,n=y.a.View(s||(s=j()(["\n\t\tposition: absolute;\n\t\theight: ","px;\n\t\twidth: ","px;\n\t\toverflow: hidden;\n\t"])),e,r);return Object(C.jsxs)(n,{children:[B()(Array(10).keys()).map((function(t){return Object(C.jsx)(z.a,{style:(n=t,{top:.5*e-50*n,left:r/2,height:1,width:r/2,backgroundColor:"black",opacity:.3,position:"absolute"})},t);var n})),B()(Array(10).keys()).map((function(t){return Object(C.jsx)(A.a,{style:(n=t,{top:.5*e-8-50*n,left:10,height:1,width:r/2,position:"absolute"}),children:10*t},t);var n})),B()(Array(10).keys()).map((function(t){return Object(C.jsx)(z.a,{style:(n=t,{left:.5*r+50*n,height:e/2,width:1,backgroundColor:"black",opacity:.3,position:"absolute"})},t);var n})),B()(Array(10).keys()).map((function(t){return Object(C.jsx)(A.a,{style:(n=t,{top:e/2+8,left:.5*r-8+50*n,height:e/2,position:"absolute"}),children:10*t},t);var n}))]})},Q=y.a.TouchableOpacity(u||(u=j()(["\n\theight: 50px;\n\twidth: 50px;\n\ttop: ","px;\n\tleft: ","px;\n\tjustify-content: center;\n\talign-items: center;\n\tbackground-color: white;\n\tborder-width: 1px;\n\tborder-color: black;\n"])),15,15),K=y.a.View(h||(h=j()(["\n\tflex-direction: row;\n\tjustify-content: space-between;\n\tjustify-self: flex-end;\n"]))),W=Object(y.a)(V.default.View)(d||(d=j()(["\n\tborder-color: black;\n\tborder-width: 1px;\n\tpadding: ","px;\n\tflex: 1;\n"])),15),Y=function(t){var e=t.setNavigation,r=(t.options,t.data),n=Object(w.a)().width,c=Object(V.useSharedValue)(""),o=Object(V.useSharedValue)({total:0,vertical:0,horizontal:0}),i=Object(V.useSharedValue)({total:0,vertical:0,horizontal:0}),a=Object(V.useSharedValue)({acceleration:0,velocity:0,distance:0}),l=Object(V.useSharedValue)({acceleration:0,velocity:0,distance:0}),s=Object(V.useSharedValue)({acceleration:0,velocity:0,distance:0,degree:0,rad:0}),u=Object(V.useSharedValue)(!0),h=Object(V.useSharedValue)(0);!function(t,e){var r=function(){var e=function(){t.value=Object(V.withTiming)(20,{duration:2e4-t.value,easing:V.Easing.linear},function(){var e=function(e){!0===e&&(t.value=0)};return e._closure={clock:t},e.asString="function _f(finished){const{clock}=jsThis._closure;{if(finished===true){clock.value=0;}}}",e.__workletHash=0xcf106ab9657,e.__location="/Users/friedebold/dev/flight/src/hooks/useClock.ts (22:3)",e}())};return e._closure={clock:t,withTiming:V.withTiming,Easing:{linear:V.Easing.linear}},e.asString="function _f(){const{clock,withTiming,Easing}=jsThis._closure;{const NR_OF_SEC=20;clock.value=withTiming(NR_OF_SEC,{duration:NR_OF_SEC*1000-clock.value,easing:Easing.linear},function(finished){if(finished===true){clock.value=0;}});}}",e.__workletHash=0xb9a34660262,e.__location="/Users/friedebold/dev/flight/src/hooks/useClock.ts (13:18)",e}();Object(V.useAnimatedReaction)(function(){var t=function(){return e.value};return t._closure={clock_running:e},t.asString="function _f(){const{clock_running}=jsThis._closure;{return clock_running.value;}}",t.__workletHash=0xc876079f8b3,t.__location="/Users/friedebold/dev/flight/src/hooks/useClock.ts (32:2)",t}(),function(){var t=function(t){t&&r()};return t._closure={runClock:r},t.asString="function _f(clock_running){const{runClock}=jsThis._closure;{if(clock_running){runClock();}}}",t.__workletHash=3286645559445,t.__location="/Users/friedebold/dev/flight/src/hooks/useClock.ts (33:2)",t}());var n=Object(V.useDerivedValue)(function(){var e=function(){return Number((Math.round(100*t.value)/100).toFixed(2))};return e._closure={clock:t},e.asString="function _f(){const{clock}=jsThis._closure;{return Number((Math.round(clock.value*100)/100).toFixed(2));}}",e.__workletHash=0xdb2c2819a98,e.__location="/Users/friedebold/dev/flight/src/hooks/useClock.ts (40:39)",e}()),c=Object(V.useSharedValue)(0);Object(V.useAnimatedReaction)(function(){var t=function(){return n.value>c.value};return t._closure={formatedClock:n,resultClock:c},t.asString="function _f(){const{formatedClock,resultClock}=jsThis._closure;{return formatedClock.value>resultClock.value;}}",t.__workletHash=2266776964644,t.__location="/Users/friedebold/dev/flight/src/hooks/useClock.ts (46:2)",t}(),function(){var t=function(t){t&&(c.value=n.value)};return t._closure={resultClock:c,formatedClock:n},t.asString="function _f(isNew){const{resultClock,formatedClock}=jsThis._closure;{if(isNew)resultClock.value=formatedClock.value;}}",t.__workletHash=0xce9cb2181c3,t.__location="/Users/friedebold/dev/flight/src/hooks/useClock.ts (47:2)",t}())}(h,u);Object(V.useAnimatedReaction)(function(){var t=function(){return h.value};return t._closure={clock:h},t.asString="function _f(){const{clock}=jsThis._closure;{return clock.value;}}",t.__workletHash=4089641237555,t.__location="/Users/friedebold/dev/flight/src/Flight.tsx (67:2)",t}(),function(){var t=function(t){if(t<20){var e=Math.round(100*t);c.value=r[e].mode,o.value=r[e].frontThrustComponents,i.value=r[e].backThrustComponents,a.value=r[e].vertical,l.value=r[e].horizontal,s.value=r[e].pitch,console.log(t)}};return t._closure={mode:c,data:r,front_thrust_components:o,back_thrust_components:i,vertical:a,horizontal:l,pitch:s},t.asString="function _f(clock){const{mode,data,front_thrust_components,back_thrust_components,vertical,horizontal,pitch}=jsThis._closure;{if(clock<20){const rounded_clock=Math.round(clock*100);mode.value=data[rounded_clock].mode;front_thrust_components.value=data[rounded_clock].frontThrustComponents;back_thrust_components.value=data[rounded_clock].backThrustComponents;vertical.value=data[rounded_clock].vertical;horizontal.value=data[rounded_clock].horizontal;pitch.value=data[rounded_clock].pitch;console.log(clock);}}}",t.__workletHash=0xcc64cdf3d54,t.__location="/Users/friedebold/dev/flight/src/Flight.tsx (68:2)",t}());var d=function(t){return Object(V.useAnimatedStyle)(function(){var e=function(){return{backgroundColor:c.value==t?"white":"transparent",opacity:c.value==t?1:.2}};return e._closure={mode:c,mode_val:t},e.asString='function _f(){const{mode,mode_val}=jsThis._closure;{return{backgroundColor:mode.value==mode_val?"white":"transparent",opacity:mode.value==mode_val?1:0.2};}}',e.__workletHash=0x9ac7c7989a2,e.__location="/Users/friedebold/dev/flight/src/Flight.tsx (105:40)",e.__optimalization=3,e}())},_=Object(V.useAnimatedStyle)(function(){var t=function(){return{width:h.value/20*n}};return t._closure={clock:h,width:n},t.asString="function _f(){const{clock,width}=jsThis._closure;{return{width:clock.value/20*width};}}",t.__workletHash=144123667234,t.__location="/Users/friedebold/dev/flight/src/Flight.tsx (115:40)",t.__optimalization=3,t}()),f=Object(V.useSharedValue)(0),v=Object(V.useSharedValue)(!1),b=D.a.Pan().onBegin(function(){var t=function(t){f.value=h.value,u.value&&(u.value=!1,Object(V.cancelAnimation)(h))};return t._closure={start_clock:f,clock:h,clock_running:u,cancelAnimation:V.cancelAnimation},t.asString="function _f(e){const{start_clock,clock,clock_running,cancelAnimation}=jsThis._closure;{start_clock.value=clock.value;if(clock_running.value){clock_running.value=false;cancelAnimation(clock);}}}",t.__workletHash=2850424288121,t.__location="/Users/friedebold/dev/flight/src/Flight.tsx (124:11)",t}()).onChange(function(){var t=function(t){v.value=!0;var e=f.value+t.translationX*(20/n),r=Math.max(0,Math.min(e,2e3));h.value=r};return t._closure={active:v,start_clock:f,width:n,clock:h},t.asString="function _f(e){const{active,start_clock,width,clock}=jsThis._closure;{active.value=true;let drag_clock=start_clock.value+e.translationX*(20/width);let clamped_drag_clock=Math.max(0,Math.min(drag_clock,2000));clock.value=clamped_drag_clock;}}",t.__workletHash=7436894056388,t.__location="/Users/friedebold/dev/flight/src/Flight.tsx (131:12)",t}()).onFinalize(function(){var t=function(){v.value=!1};return t._closure={active:v},t.asString="function _f(){const{active}=jsThis._closure;{active.value=false;}}",t.__workletHash=8628434837881,t.__location="/Users/friedebold/dev/flight/src/Flight.tsx (137:14)",t}()).onEnd(function(){var t=function(t){h.value=Object(V.withDecay)({velocity:t.velocityX/80,clamp:[0,20]})};return t._closure={clock:h,withDecay:V.withDecay},t.asString="function _f(e){const{clock,withDecay}=jsThis._closure;{clock.value=withDecay({velocity:e.velocityX/80,clamp:[0,20]});}}",t.__workletHash=2875544262585,t.__location="/Users/friedebold/dev/flight/src/Flight.tsx (152:9)",t}()),j=Object(V.useAnimatedStyle)(function(){var t=function(){return{backgroundColor:u.value?"white":"#e2e2e5"}};return t._closure={clock_running:u},t.asString='function _f(){const{clock_running}=jsThis._closure;{return{backgroundColor:clock_running.value?"white":"#e2e2e5"};}}',t.__workletHash=7442063572813,t.__location="/Users/friedebold/dev/flight/src/Flight.tsx (159:50)",t.__optimalization=3,t}(),[u]),g=function(){var t=function(){u.value?(u.value=!1,Object(V.cancelAnimation)(h)):u.value=!u.value};return t._closure={clock_running:u,cancelAnimation:V.cancelAnimation,clock:h},t.asString="function _f(){const{clock_running,cancelAnimation,clock}=jsThis._closure;{if(clock_running.value){clock_running.value=false;cancelAnimation(clock);}else clock_running.value=!clock_running.value;}}",t.__workletHash=0xd6fb2a7ad86,t.__location="/Users/friedebold/dev/flight/src/Flight.tsx (165:30)",t}();return Object(C.jsx)(D.b,{gesture:b,children:Object(C.jsx)(T.a,{onPress:function(){Object(V.runOnJS)(g)()},children:Object(C.jsxs)(V.default.View,{style:[j,{justifyContent:"space-between",flex:1}],children:[Object(C.jsx)(G,{}),Object(C.jsx)(R,{vertical:a,horizontal:l,pitch:s,back_thrust_components:i,front_thrust_components:o}),Object(C.jsx)(Q,{onPress:function(){return e("input")},children:Object(C.jsx)(A.a,{children:"x"})}),Object(C.jsxs)(z.a,{children:[Object(C.jsx)(q,{clock:h,pitch:s,vertical:a,horizontal:l}),Object(C.jsx)(V.default.View,{style:[_,{height:2,backgroundColor:"black"}]}),Object(C.jsxs)(K,{children:[Object(C.jsx)(W,{style:d("takeoff"),children:Object(C.jsx)(A.a,{children:"Takeoff"})}),Object(C.jsx)(W,{style:d("tilt_to_cruise"),children:Object(C.jsx)(A.a,{children:"Tilt to Cruise"})}),Object(C.jsx)(W,{style:d("cruise"),children:Object(C.jsx)(A.a,{children:"Cruise"})}),Object(C.jsx)(W,{style:d("tilt_to_land"),children:Object(C.jsx)(A.a,{children:"Tilt to Land"})}),Object(C.jsx)(W,{style:d("landing"),children:Object(C.jsx)(A.a,{children:"Landing"})})]})]})]})})})},Z=function(){var t=function(t,e,r,n,c,o,i,a,l){if(t)for(var s=n,u=c,h=0;h<=2e3;h++)if((u+=(s+=-.0981)/100)>=e.targetAltitude){t=!1;break}if(c>=.5*e.targetAltitude&&0==n&&0==r&&(l="tilt_to_cruise"),n<0&&0==r){var d=X(-n/2*100+4.905);i=d,o=d,console.log("speed correct",d)}else c>=.5*e.targetAltitude&&n<=0?(i=4.905,o=4.905):t?(i=10,o=10):(i=0,o=0);return{engines_running:t,front_thrust:i,back_thrust:o,logger:a,mode:l,vAcceleration:r,vVelocity:n,vDistance:c}};return t._closure={round:X,MAX_THRUST_PER_SIDE:10},t.asString='function _f(engines_running,options,vAcceleration,vVelocity,vDistance,back_thrust,front_thrust,logger,mode){const{round,MAX_THRUST_PER_SIDE}=jsThis._closure;{if(engines_running){const potAcceleration=-9.81;let potVelocity=vVelocity;let potAltitude=vDistance;for(let j=0;j<=2000;j++){potVelocity=potVelocity+potAcceleration/100;potAltitude=potAltitude+potVelocity/100;if(potAltitude>=options.targetAltitude){engines_running=false;break;}}}if(vDistance>=options.targetAltitude*0.5&&vVelocity==0&&vAcceleration==0){mode="tilt_to_cruise";}if(vVelocity<0&&vAcceleration==0){const correction_thrust=round(-vVelocity/2*100+9.81/2);front_thrust=correction_thrust;back_thrust=correction_thrust;console.log("speed correct",correction_thrust);}else if(vDistance>=options.targetAltitude*0.5&&vVelocity<=0){front_thrust=9.81/2;back_thrust=9.81/2;}else if(!engines_running){front_thrust=0;back_thrust=0;}else{front_thrust=MAX_THRUST_PER_SIDE;back_thrust=MAX_THRUST_PER_SIDE;}return{engines_running:engines_running,front_thrust:front_thrust,back_thrust:back_thrust,logger:logger,mode:mode,vAcceleration:vAcceleration,vVelocity:vVelocity,vDistance:vDistance};}}',t.__workletHash=6520258986290,t.__location="/Users/friedebold/dev/flight/src/calculations/takeoff.ts (5:26)",t}(),$=function(t,e){return Math.min(t/Math.cos(e*Math.PI/180),10)},tt=function(t,e,r,n,c,o,i,a,l,s,u){if(u=c.toString(),e&&c>=t.maxPitch/2&&(e=!1),c>.5*t.maxPitch&&0==o&&0==i)if(r<0&&0==n){l=$(10,c),s=$(10,c),console.log("speed correct",10)}else a="cruise";if(o<0&&0==i){var h=X(-o/2*100);l=$(4.905-h/2,c),s=$(4.905+h/2,c),console.log("speed correct",h)}else c>.5*t.maxPitch&&o<=0?t.disableHorizontal?(l=4.905,s=4.905):(l=$(4.905,c),s=$(4.905,c)):e?t.disableHorizontal?(l=4.905-4,s=4.905+4):(l=$(4.905-4,c),s=$(4.905+4,c)):t.disableHorizontal?(l=4.905+4,s=4.905-4):(l=$(4.905+4,c),s=$(4.905-4,c));return{logger:u,tilting:e,mode:a,back_thrust:s,front_thrust:l}},et=r(144),rt=r(85),nt=r(91),ct=Object(y.a)(rt.a)(_||(_=j()(["\n\tborder-color: black;\n\tborder-width: 1px;\n\tpadding: ","px;\n"])),15),ot=y.a.View(f||(f=j()(["\n\tpadding: ","px;\n\tborder-width: 1px;\n\tborder-color: black;\n"])),15),it=function(t){var e=t.setOptions,r=Object(m.useState)(40),n=k()(r,2),c=n[0],o=n[1],i=Object(m.useState)(40),a=k()(i,2),l=a[0],s=a[1],u=Object(m.useState)(45),h=k()(u,2),d=h[0],_=h[1],f=Object(m.useState)("quad"),v=k()(f,2),b=v[0],j=v[1],g=Object(m.useState)(!1),x=k()(g,2),p=x[0],O=x[1];return Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)(z.a,{style:{height:15}}),Object(C.jsx)(A.a,{children:"Altitude (m):"}),Object(C.jsx)(ct,{value:c.toString(),onChangeText:function(t){var e=Number(t);isNaN(e)||o(e)}}),Object(C.jsx)(z.a,{style:{height:15}}),Object(C.jsx)(A.a,{children:"Distance (m):"}),Object(C.jsx)(ct,{value:l.toString(),onChangeText:function(t){var e=Number(t);isNaN(e)||s(e)}}),Object(C.jsx)(z.a,{style:{height:15}}),Object(C.jsx)(A.a,{children:"Tilt Angle:"}),Object(C.jsx)(ct,{value:d.toString(),onChangeText:function(t){var e=Number(t);isNaN(e)||_(e)}}),Object(C.jsx)(z.a,{style:{height:15}}),Object(C.jsxs)(z.a,{style:{flexDirection:"row"},children:[Object(C.jsx)(nt.a,{onPress:function(){return j("quad")},children:Object(C.jsx)(ot,{style:{backgroundColor:"quad"==b?"white":"lightgrey"},children:Object(C.jsx)(A.a,{children:"Quad"})})}),Object(C.jsx)(nt.a,{onPress:function(){return j("tail_sitter")},children:Object(C.jsx)(ot,{style:{backgroundColor:"tail_sitter"==b?"white":"lightgrey"},children:Object(C.jsx)(A.a,{children:"Tail Sitter"})})})]}),Object(C.jsx)(z.a,{style:{height:15}}),Object(C.jsxs)(z.a,{style:{flexDirection:"row"},children:[Object(C.jsx)(nt.a,{onPress:function(){O((function(t){return!t}))},children:Object(C.jsx)(ot,{style:{backgroundColor:p?"white":"lightgrey"},children:Object(C.jsx)(A.a,{children:"Disable Horizontal Modement"})})}),Object(C.jsx)(z.a,{style:{height:15}})]}),Object(C.jsx)(z.a,{style:{height:15}}),Object(C.jsx)(et.a,{title:"Go",onPress:function(){e({targetAltitude:c,targetDistance:l,aircraftType:b,disableHorizontal:p,maxPitch:d})}})]})},at=function(t){var e=t.options,r=t.setOptions,n=t.setData,c=t.setNavigation,o=t.navigation;return Object(m.useEffect)((function(){"input"==o&&""!==e.aircraftType&&r({aircraftType:"",targetAltitude:0,targetDistance:0,disableHorizontal:!0,maxPitch:0})}),[e,o]),Object(m.useEffect)((function(){if(""!==e.aircraftType){var t=function(t){for(var e=[],r=!0,n=!0,c="takeoff",o=0,i=0,a=0,l=0,s=0,u=0,h=0,d=0,_=0,f=0,v=0,b=0,j="",g=0;g<=2e3;g++){if("takeoff"==c){var k=Z(r,t,o,i,a,d,h,j,c);r=k.engines_running,o=k.vAcceleration,i=k.vVelocity,a=k.vDistance,d=k.back_thrust,h=k.front_thrust,j=k.logger,c=k.mode}if("tilt_to_cruise"==c){var x=tt(t,n,o,i,b,f,_,c,h,d,j);j=x.logger,n=x.tilting,c=x.mode,d=x.back_thrust,h=x.front_thrust}_=X(d-h),f=X(f+X(_/100)),v=X(v+X(f/100)),b=X(180*v/Math.PI);var p=X(Math.cos(b*Math.PI/180)*h),O=X(Math.sin(b*Math.PI/180)*h),m=X(Math.cos(b*Math.PI/180)*d),S=X(Math.sin(b*Math.PI/180)*d);o=t.disableHorizontal?X(h+d-9.81):X(p+m-9.81),i=X(i+X(o/100)),a=X(a+X(i/100)),t.disableHorizontal||(l=X(O+S),console.log(l),s=X(s+X(l/100)),u=X(u+X(s/100)));var w={mode:c,frontThrustComponents:{total:h,vertical:p,horizontal:O},backThrustComponents:{total:d,vertical:m,horizontal:S},vertical:{acceleration:o,velocity:i,distance:a},horizontal:{acceleration:l,velocity:s,distance:u},pitch:{acceleration:_,velocity:f,distance:v,degree:b,rad:X(b*Math.PI/180)},logger:j};e.push(w)}return e}(e);n(t),c("flight")}}),[e]),Object(C.jsxs)(z.a,{style:{margin:30},children:[Object(C.jsx)(A.a,{children:"Flight Planner"}),Object(C.jsx)(it,{setOptions:r})]})};e.a=function(t){p()(t);var e=Object(w.a)().width,r=Object(m.useState)([]),n=k()(r,2),c=n[0],o=n[1],i=Object(m.useState)({targetAltitude:0,targetDistance:0,aircraftType:"",disableHorizontal:!1,maxPitch:0}),a=k()(i,2),l=a[0],s=a[1],u=Object(m.useState)("input"),h=k()(u,2),d=h[0],_=h[1],f=y.a.View(v||(v=j()(["\n\t\tflex: 1;\n\t\twidth: ","px;\n\t\toverflow: hidden;\n\t\tbackground-color: #e2e2e5;\n\t"])),e);return Object(C.jsx)(S.a,{style:{flex:1},children:Object(C.jsxs)(f,{children:[Object(C.jsx)(O.a,{style:"dark"}),"input"==d||"planner"==d?Object(C.jsx)(at,{options:l,setOptions:s,setData:o,navigation:d,setNavigation:_}):Object(C.jsx)(Y,{setNavigation:_,options:l,data:c})]})})}},235:function(t,e,r){t.exports=r(338)}},[[235,1,2]]]);
//# sourceMappingURL=app.6ffd9bb5.chunk.js.map