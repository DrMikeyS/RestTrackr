"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[624],{1624:(m,u,c)=>{c.r(u),c.d(u,{HomePage:()=>h});var s=c(8285),e=c(4438),_=c(9858),l=c(755);let h=(()=>{class t{constructor(o,r){this.router=o,this.indexedDbService=r}logSleep(){this.router.navigate(["/log-sleep"])}viewResults(){this.router.navigate(["/view-results"])}deleteAll(){this.indexedDbService.deleteAllEntries()}static#e=this.\u0275fac=function(r){return new(r||t)(e.rXU(_.Ix),e.rXU(l.T))};static#t=this.\u0275cmp=e.VBU({type:t,selectors:[["app-home"]],standalone:!0,features:[e.aNF],decls:14,vars:0,consts:[[1,"ion-padding"],[1,"ion-text-center"],["expand","block",3,"click"]],template:function(r,n){1&r&&(e.j41(0,"ion-header")(1,"ion-toolbar")(2,"ion-title"),e.EFF(3," RestTrackr "),e.k0s()()(),e.j41(4,"ion-content",0)(5,"div",1)(6,"h2"),e.EFF(7,"Welcome to RestTrackr"),e.k0s(),e.j41(8,"ion-button",2),e.bIt("click",function(){return n.logSleep()}),e.EFF(9,"Log Sleep Quality"),e.k0s(),e.j41(10,"ion-button",2),e.bIt("click",function(){return n.viewResults()}),e.EFF(11,"View Results"),e.k0s(),e.j41(12,"ion-button",2),e.bIt("click",function(){return n.deleteAll()}),e.EFF(13,"Delete All"),e.k0s()()())},dependencies:[s.Jm,s.W9,s.BC,s.ai,s.eU],styles:["#container[_ngcontent-%COMP%]{text-align:center;position:absolute;left:0;right:0;top:50%;transform:translateY(-50%)}#container[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-size:20px;line-height:26px}#container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px;line-height:22px;color:#8c8c8c;margin:0}#container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none}"]})}return t})()},755:(m,u,c)=>{c.d(u,{T:()=>_});var s=c(467),e=c(4438);let _=(()=>{class l{constructor(){this.dbName="sleepQualityDB",this.storeName="sleepQualityStore"}initDB(){var t=this;return(0,s.A)(function*(){return new Promise((i,o)=>{const r=indexedDB.open(t.dbName,1);r.onerror=n=>{o("IndexedDB error: "+n.target.errorCode)},r.onsuccess=n=>{i(n.target.result)},r.onupgradeneeded=n=>{const a=n.target.result;a.objectStoreNames.contains(t.storeName)||a.createObjectStore(t.storeName,{keyPath:"id",autoIncrement:!0})}})})()}addEntry(t){var i=this;return(0,s.A)(function*(){yield(yield i.initDB()).transaction(i.storeName,"readwrite").objectStore(i.storeName).add(t)})()}getAllEntries(){var t=this;return(0,s.A)(function*(){const n=(yield t.initDB()).transaction(t.storeName,"readonly").objectStore(t.storeName).getAll();return new Promise((a,d)=>{n.onsuccess=g=>{a(n.result)},n.onerror=g=>{d("Error fetching entries from IndexedDB")}})})()}deleteAllEntries(){var t=this;return(0,s.A)(function*(){const n=(yield t.initDB()).transaction(t.storeName,"readwrite").objectStore(t.storeName).clear();return new Promise((a,d)=>{n.onsuccess=g=>{a()},n.onerror=g=>{d("Error deleting entries from IndexedDB")}})})()}hasLogForToday(){var t=this;return(0,s.A)(function*(){const i=(new Date).toISOString().split("T")[0];try{const o=yield t.getAllEntries();for(const r of o)if(new Date(r.date).toISOString().split("T")[0]===i)return!0;return!1}catch(o){return console.error("Error checking log for today:",o),!1}})()}static#e=this.\u0275fac=function(i){return new(i||l)};static#t=this.\u0275prov=e.jDH({token:l,factory:l.\u0275fac,providedIn:"root"})}return l})()}}]);