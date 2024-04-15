"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[358],{4358:(B,w,l)=>{l.r(w),l.d(w,{LogSleepPage:()=>f});var h=l(467),t=l(8285),v=l(4341),e=l(177),o=l(4438),p=l(8889),x=l(755);function u(n,g){if(1&n){const a=o.RV6();o.j41(0,"ion-toggle",12),o.mxI("ngModelChange",function(s){o.eBV(a);const c=o.XpG().$implicit;return o.DH7(c.value,s)||(c.value=s),o.Njj(s)}),o.k0s()}if(2&n){const a=o.XpG().$implicit;o.R50("ngModel",a.value)}}function M(n,g){if(1&n){const a=o.RV6();o.j41(0,"ion-range",13),o.mxI("ngModelChange",function(s){o.eBV(a);const c=o.XpG().$implicit;return o.DH7(c.value,s)||(c.value=s),o.Njj(s)}),o.j41(1,"ion-label",14),o.EFF(2),o.k0s(),o.j41(3,"ion-label",15),o.EFF(4),o.k0s()()}if(2&n){const a=o.XpG().$implicit;o.R50("ngModel",a.value),o.Y8G("ticks",!0)("snaps",!0)("min",0)("max",a.range.size),o.R7$(2),o.JRh(a.range.startLabel),o.R7$(2),o.JRh(a.range.endLabel)}}function z(n,g){if(1&n&&(o.j41(0,"ion-item")(1,"ion-label"),o.EFF(2),o.k0s(),o.qex(3,9),o.DNE(4,u,1,1,"ion-toggle",10)(5,M,5,7,"ion-range",11),o.bVm(),o.k0s()),2&n){const a=g.$implicit;o.R7$(2),o.JRh(a.name),o.R7$(),o.Y8G("ngSwitch",a.type),o.R7$(),o.Y8G("ngSwitchCase","bool"),o.R7$(),o.Y8G("ngSwitchCase","range")}}function k(n,g){if(1&n&&(o.j41(0,"ion-list"),o.DNE(1,z,6,4,"ion-item",8),o.k0s()),2&n){const a=o.XpG();o.R7$(),o.Y8G("ngForOf",a.variables)}}let f=(()=>{class n{constructor(a,i){this.configService=a,this.indexedDbService=i,this.happyOutline="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><circle cx='184' cy='232' r='24'/><path d='M256.05 384c-45.42 0-83.62-29.53-95.71-69.83a8 8 0 017.82-10.17h175.69a8 8 0 017.82 10.17c-11.99 40.3-50.2 69.83-95.62 69.83z'/><circle cx='328' cy='232' r='24'/><circle cx='256' cy='256' r='208' stroke-miterlimit='10' class='ionicon-fill-none ionicon-stroke-width'/></svg>",this.sadOutline="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><circle cx='184' cy='232' r='24'/><path d='M256 288c45.42 0 83.62 29.53 95.71 69.83a8 8 0 01-7.87 10.17H168.15a8 8 0 01-7.82-10.17C172.32 317.53 210.53 288 256 288z'/><circle cx='328' cy='232' r='24'/><circle cx='256' cy='256' r='208' stroke-miterlimit='10' class='ionicon-fill-none ionicon-stroke-width'/></svg>",this.variables=[],this.sleepQuality="great",this.loadVariables()}loadVariables(){var a=this;return(0,h.A)(function*(){try{yield a.configService.loadConfig(),a.configService.ConfigData&&a.configService.ConfigData.variables&&(a.variables=a.configService.ConfigData.variables.map(i=>("bool"===i.type?i.value=!1:"range"===i.type&&(i.value=0),i)))}catch(i){console.error("Error loading variables:",i)}})()}submit(){var a=this;return(0,h.A)(function*(){const i={date:(new Date).toISOString(),sleepQuality:a.sleepQuality,variables:a.variables};try{yield a.indexedDbService.addEntry(i)}catch(s){console.error("Error saving data to IndexedDB:",s)}})()}static#o=this.\u0275fac=function(i){return new(i||n)(o.rXU(p.w),o.rXU(x.T))};static#a=this.\u0275cmp=o.VBU({type:n,selectors:[["app-log-sleep"]],standalone:!0,features:[o.aNF],decls:22,vars:5,consts:[[1,"ion-padding"],["ngDefaultControl","","color","primary",3,"ngModelChange","ngModel"],["value","great"],[3,"icon"],["value","ok"],["value","poor"],[4,"ngIf"],["expand","block",3,"click"],[4,"ngFor","ngForOf"],[3,"ngSwitch"],[3,"ngModel","ngModelChange",4,"ngSwitchCase"],["color","primary",3,"ngModel","ticks","snaps","min","max","ngModelChange",4,"ngSwitchCase"],[3,"ngModelChange","ngModel"],["color","primary",3,"ngModelChange","ngModel","ticks","snaps","min","max"],["slot","start"],["slot","end"]],template:function(i,s){1&i&&(o.j41(0,"ion-header")(1,"ion-toolbar")(2,"ion-title"),o.EFF(3," Log Sleep Quality "),o.k0s()()(),o.j41(4,"ion-content",0)(5,"h2"),o.EFF(6,"What was your sleep like?"),o.k0s(),o.j41(7,"ion-segment",1),o.mxI("ngModelChange",function(r){return o.DH7(s.sleepQuality,r)||(s.sleepQuality=r),r}),o.j41(8,"ion-segment-button",2),o.nrm(9,"ion-icon",3),o.EFF(10," Great "),o.k0s(),o.j41(11,"ion-segment-button",4),o.nrm(12,"ion-icon",3),o.EFF(13," OK "),o.k0s(),o.j41(14,"ion-segment-button",5),o.nrm(15,"ion-icon",3),o.EFF(16," Poor "),o.k0s()(),o.j41(17,"h2"),o.EFF(18,"What might have impacted sleep?"),o.k0s(),o.DNE(19,k,2,1,"ion-list",6),o.j41(20,"ion-button",7),o.bIt("click",function(){return s.submit()}),o.EFF(21,"Submit"),o.k0s()()),2&i&&(o.R7$(7),o.R50("ngModel",s.sleepQuality),o.R7$(2),o.Y8G("icon",s.happyOutline),o.R7$(3),o.Y8G("icon",s.happyOutline),o.R7$(3),o.Y8G("icon",s.sadOutline),o.R7$(4),o.Y8G("ngIf",null==s.variables?null:s.variables.length))},dependencies:[t.Gp,t.eP,t.iq,t.nf,t.BY,t.uz,t.Ob,t.he,t.Jm,t.W9,t.BC,t.ai,t.eU,v.YN,v.me,v.BC,v.vS,e.MD,e.Sq,e.bT,e.ux,e.e1],styles:["ion-segment-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{font-size:24px;margin-bottom:8px}ion-segment-button[value=great][_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{color:var(--ion-color-success)}ion-segment-button[value=ok][_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{color:var(--ion-color-warning)}ion-segment-button[value=poor][_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{color:var(--ion-color-danger)}"]})}return n})()}}]);