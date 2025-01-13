/*!
* docsify-kroki
* v1.3.0
* https://github.com/zuisong/docsify-kroki
* (c) 2020-2025 zuisong
* MIT license
*/
var Xt={},Cn=function(n,t,e,i,r){var a=new Worker(Xt[t]||(Xt[t]=URL.createObjectURL(new Blob([n+';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'],{type:"text/javascript"}))));return a.onmessage=function(o){var s=o.data,c=s.$e$;if(c){var f=new Error(c[0]);f.code=c[1],f.stack=c[2],r(f,null)}else r(null,s)},a.postMessage(e,i),a},g=Uint8Array,j=Uint16Array,wt=Int32Array,ht=new g([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),lt=new g([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),mt=new g([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Jt=function(n,t){for(var e=new j(31),i=0;i<31;++i)e[i]=t+=1<<n[i-1];for(var r=new wt(e[30]),i=1;i<30;++i)for(var a=e[i];a<e[i+1];++a)r[a]=a-e[i]<<5|i;return{b:e,r}},tn=Jt(ht,2),Rt=tn.b,Ut=tn.r;Rt[28]=258,Ut[258]=28;var nn=Jt(lt,0),en=nn.b,It=nn.r,bt=new j(32768);for(w=0;w<32768;++w)B=(w&43690)>>1|(w&21845)<<1,B=(B&52428)>>2|(B&13107)<<2,B=(B&61680)>>4|(B&3855)<<4,bt[w]=((B&65280)>>8|(B&255)<<8)>>1;var B,w,V=function(n,t,e){for(var i=n.length,r=0,a=new j(t);r<i;++r)n[r]&&++a[n[r]-1];var o=new j(t);for(r=1;r<t;++r)o[r]=o[r-1]+a[r-1]<<1;var s;if(e){s=new j(1<<t);var c=15-t;for(r=0;r<i;++r)if(n[r])for(var f=r<<4|n[r],u=t-n[r],h=o[n[r]-1]++<<u,l=h|(1<<u)-1;h<=l;++h)s[bt[h]>>c]=f}else for(s=new j(i),r=0;r<i;++r)n[r]&&(s[r]=bt[o[n[r]-1]++]>>15-n[r]);return s},J=new g(288);for(w=0;w<144;++w)J[w]=8;var w;for(w=144;w<256;++w)J[w]=9;var w;for(w=256;w<280;++w)J[w]=7;var w;for(w=280;w<288;++w)J[w]=8;var w,ct=new g(32);for(w=0;w<32;++w)ct[w]=5;var w,rn=V(J,9,0),an=V(J,9,1),on=V(ct,5,0),sn=V(ct,5,1),xt=function(n){for(var t=n[0],e=1;e<n.length;++e)n[e]>t&&(t=n[e]);return t},Q=function(n,t,e){var i=t/8|0;return(n[i]|n[i+1]<<8)>>(t&7)&e},Mt=function(n,t){var e=t/8|0;return(n[e]|n[e+1]<<8|n[e+2]<<16)>>(t&7)},pt=function(n){return(n+7)/8|0},Z=function(n,t,e){(t==null||t<0)&&(t=0),(e==null||e>n.length)&&(e=n.length);var i=new g(e-t);return i.set(n.subarray(t,e)),i};var un=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],v=function(n,t,e){var i=new Error(t||un[n]);if(i.code=n,Error.captureStackTrace&&Error.captureStackTrace(i,v),!e)throw i;return i},_t=function(n,t,e,i){var r=n.length,a=i?i.length:0;if(!r||t.f&&!t.l)return e||new g(0);var o=!e||t.i!=2,s=t.i;e||(e=new g(r*3));var c=function(dt){var gt=e.length;if(dt>gt){var yt=new g(Math.max(gt*2,dt));yt.set(e),e=yt}},f=t.f||0,u=t.p||0,h=t.b||0,l=t.l,m=t.d,d=t.m,b=t.n,k=r*8;do{if(!l){f=Q(n,u,1);var E=Q(n,u+1,3);if(u+=3,E)if(E==1)l=an,m=sn,d=9,b=5;else if(E==2){var A=Q(n,u,31)+257,D=Q(n,u+10,15)+4,I=A+Q(n,u+5,31)+1;u+=14;for(var L=new g(I),$=new g(19),z=0;z<D;++z)$[mt[z]]=Q(n,u+z*3,7);u+=D*3;for(var y=xt($),p=(1<<y)-1,C=V($,y,1),z=0;z<I;){var R=C[Q(n,u,p)];u+=R&15;var x=R>>4;if(x<16)L[z++]=x;else{var F=0,U=0;for(x==16?(U=3+Q(n,u,3),u+=2,F=L[z-1]):x==17?(U=3+Q(n,u,7),u+=3):x==18&&(U=11+Q(n,u,127),u+=7);U--;)L[z++]=F}}var q=L.subarray(0,A),T=L.subarray(A);d=xt(q),b=xt(T),l=V(q,d,1),m=V(T,b,1)}else v(1);else{var x=pt(u)+4,S=n[x-4]|n[x-3]<<8,G=x+S;if(G>r){s&&v(0);break}o&&c(h+S),e.set(n.subarray(x,G),h),t.b=h+=S,t.p=u=G*8,t.f=f;continue}if(u>k){s&&v(0);break}}o&&c(h+131072);for(var K=(1<<d)-1,et=(1<<b)-1,H=u;;H=u){var F=l[Mt(n,u)&K],O=F>>4;if(u+=F&15,u>k){s&&v(0);break}if(F||v(2),O<256)e[h++]=O;else if(O==256){H=u,l=null;break}else{var N=O-254;if(O>264){var z=O-257,W=ht[z];N=Q(n,u,(1<<W)-1)+Rt[z],u+=W}var P=m[Mt(n,u)&et],X=P>>4;P||v(3),u+=P&15;var T=en[X];if(X>3){var W=lt[X];T+=Mt(n,u)&(1<<W)-1,u+=W}if(u>k){s&&v(0);break}o&&c(h+131072);var rt=h+N;if(h<T){var at=a-T,Ft=Math.min(T,rt);for(at+h<0&&v(3);h<Ft;++h)e[h]=i[at+h]}for(;h<rt;h+=4)e[h]=e[h-T],e[h+1]=e[h+1-T],e[h+2]=e[h+2-T],e[h+3]=e[h+3-T];h=rt}}t.l=l,t.p=H,t.b=h,t.f=f,l&&(f=1,t.m=d,t.d=m,t.n=b)}while(!f);return h==e.length?e:Z(e,0,h)},Y=function(n,t,e){e<<=t&7;var i=t/8|0;n[i]|=e,n[i+1]|=e>>8},ot=function(n,t,e){e<<=t&7;var i=t/8|0;n[i]|=e,n[i+1]|=e>>8,n[i+2]|=e>>16},Tt=function(n,t){for(var e=[],i=0;i<n.length;++i)n[i]&&e.push({s:i,f:n[i]});var r=e.length,a=e.slice();if(!r)return{t:tt,l:0};if(r==1){var o=new g(e[0].s+1);return o[e[0].s]=1,{t:o,l:1}}e.sort(function(L,$){return L.f-$.f}),e.push({s:-1,f:25001});var s=e[0],c=e[1],f=0,u=1,h=2;for(e[0]={s:-1,f:s.f+c.f,l:s,r:c};u!=r-1;)s=e[e[f].f<e[h].f?f++:h++],c=e[f!=u&&e[f].f<e[h].f?f++:h++],e[u++]={s:-1,f:s.f+c.f,l:s,r:c};for(var l=a[0].s,i=1;i<r;++i)a[i].s>l&&(l=a[i].s);var m=new j(l+1),d=St(e[u-1],m,0);if(d>t){var i=0,b=0,k=d-t,E=1<<k;for(a.sort(function($,z){return m[z.s]-m[$.s]||$.f-z.f});i<r;++i){var A=a[i].s;if(m[A]>t)b+=E-(1<<d-m[A]),m[A]=t;else break}for(b>>=k;b>0;){var D=a[i].s;m[D]<t?b-=1<<t-m[D]++-1:++i}for(;i>=0&&b;--i){var I=a[i].s;m[I]==t&&(--m[I],++b)}d=t}return{t:new g(m),l:d}},St=function(n,t,e){return n.s==-1?Math.max(St(n.l,t,e+1),St(n.r,t,e+1)):t[n.s]=e},$t=function(n){for(var t=n.length;t&&!n[--t];);for(var e=new j(++t),i=0,r=n[0],a=1,o=function(c){e[i++]=c},s=1;s<=t;++s)if(n[s]==r&&s!=t)++a;else{if(!r&&a>2){for(;a>138;a-=138)o(32754);a>2&&(o(a>10?a-11<<5|28690:a-3<<5|12305),a=0)}else if(a>3){for(o(r),--a;a>6;a-=6)o(8304);a>2&&(o(a-3<<5|8208),a=0)}for(;a--;)o(r);a=1,r=n[s]}return{c:e.subarray(0,i),n:t}},st=function(n,t){for(var e=0,i=0;i<t.length;++i)e+=n[i]*t[i];return e},Kt=function(n,t,e){var i=e.length,r=pt(t+2);n[r]=i&255,n[r+1]=i>>8,n[r+2]=n[r]^255,n[r+3]=n[r+1]^255;for(var a=0;a<i;++a)n[r+a+4]=e[a];return(r+4+i)*8},qt=function(n,t,e,i,r,a,o,s,c,f,u){Y(t,u++,e),++r[256];for(var h=Tt(r,15),l=h.t,m=h.l,d=Tt(a,15),b=d.t,k=d.l,E=$t(l),A=E.c,D=E.n,I=$t(b),L=I.c,$=I.n,z=new j(19),y=0;y<A.length;++y)++z[A[y]&31];for(var y=0;y<L.length;++y)++z[L[y]&31];for(var p=Tt(z,7),C=p.t,R=p.l,x=19;x>4&&!C[mt[x-1]];--x);var F=f+5<<3,U=st(r,J)+st(a,ct)+o,q=st(r,l)+st(a,b)+o+14+3*x+st(z,C)+2*z[16]+3*z[17]+7*z[18];if(c>=0&&F<=U&&F<=q)return Kt(t,u,n.subarray(c,c+f));var T,S,G,K;if(Y(t,u,1+(q<U)),u+=2,q<U){T=V(l,m,0),S=l,G=V(b,k,0),K=b;var et=V(C,R,0);Y(t,u,D-257),Y(t,u+5,$-1),Y(t,u+10,x-4),u+=14;for(var y=0;y<x;++y)Y(t,u+3*y,C[mt[y]]);u+=3*x;for(var H=[A,L],O=0;O<2;++O)for(var N=H[O],y=0;y<N.length;++y){var W=N[y]&31;Y(t,u,et[W]),u+=C[W],W>15&&(Y(t,u,N[y]>>5&127),u+=N[y]>>12)}}else T=rn,S=J,G=on,K=ct;for(var y=0;y<s;++y){var P=i[y];if(P>255){var W=P>>18&31;ot(t,u,T[W+257]),u+=S[W+257],W>7&&(Y(t,u,P>>23&31),u+=ht[W]);var X=P&31;ot(t,u,G[X]),u+=K[X],X>3&&(ot(t,u,P>>5&8191),u+=lt[X])}else ot(t,u,T[P]),u+=S[P]}return ot(t,u,T[256]),u+S[256]},fn=new wt([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),tt=new g(0),cn=function(n,t,e,i,r,a){var o=a.z||n.length,s=new g(i+o+5*(1+Math.ceil(o/7e3))+r),c=s.subarray(i,s.length-r),f=a.l,u=(a.r||0)&7;if(t){u&&(c[0]=a.r>>3);for(var h=fn[t-1],l=h>>13,m=h&8191,d=(1<<e)-1,b=a.p||new j(32768),k=a.h||new j(d+1),E=Math.ceil(e/3),A=2*E,D=function(Pt){return(n[Pt]^n[Pt+1]<<E^n[Pt+2]<<A)&d},I=new wt(25e3),L=new j(288),$=new j(32),z=0,y=0,p=a.i||0,C=0,R=a.w||0,x=0;p+2<o;++p){var F=D(p),U=p&32767,q=k[F];if(b[U]=q,k[F]=U,R<=p){var T=o-p;if((z>7e3||C>24576)&&(T>423||!f)){u=qt(n,c,0,I,L,$,y,C,x,p-x,u),C=z=y=0,x=p;for(var S=0;S<286;++S)L[S]=0;for(var S=0;S<30;++S)$[S]=0}var G=2,K=0,et=m,H=U-q&32767;if(T>2&&F==D(p-H))for(var O=Math.min(l,T)-1,N=Math.min(32767,p),W=Math.min(258,T);H<=N&&--et&&U!=q;){if(n[p+G]==n[p+G-H]){for(var P=0;P<W&&n[p+P]==n[p+P-H];++P);if(P>G){if(G=P,K=H,P>O)break;for(var X=Math.min(H,P-2),rt=0,S=0;S<X;++S){var at=p-H+S&32767,Ft=b[at],dt=at-Ft&32767;dt>rt&&(rt=dt,q=at)}}}U=q,q=b[U],H+=U-q&32767}if(K){I[C++]=268435456|Ut[G]<<18|It[K];var gt=Ut[G]&31,yt=It[K]&31;y+=ht[gt]+lt[yt],++L[257+gt],++$[yt],R=p+G,++z}else I[C++]=n[p],++L[n[p]]}}for(p=Math.max(p,R);p<o;++p)I[C++]=n[p],++L[n[p]];u=qt(n,c,f,I,L,$,y,C,x,p-x,u),f||(a.r=u&7|c[u/8|0]<<3,u-=7,a.h=k,a.p=b,a.i=p,a.w=R)}else{for(var p=a.w||0;p<o+f;p+=65535){var Lt=p+65535;Lt>=o&&(c[u/8|0]=f,Lt=o),u=Kt(c,u+1,n.subarray(p,Lt))}a.i=o}return Z(s,0,i+pt(u)+r)},Un=function(){for(var n=new Int32Array(256),t=0;t<256;++t){for(var e=t,i=9;--i;)e=(e&1&&-306674912)^e>>>1;n[t]=e}return n}(),hn=function(){var n=-1;return{p:function(t){for(var e=n,i=0;i<t.length;++i)e=Un[e&255^t[i]]^e>>>8;n=e},d:function(){return~n}}},Ot=function(){var n=1,t=0;return{p:function(e){for(var i=n,r=t,a=e.length|0,o=0;o!=a;){for(var s=Math.min(o+2655,a);o<s;++o)r+=i+=e[o];i=(i&65535)+15*(i>>16),r=(r&65535)+15*(r>>16)}n=i,t=r},d:function(){return n%=65521,t%=65521,(n&255)<<24|(n&65280)<<8|(t&255)<<8|t>>8}}},vt=function(n,t,e,i,r){if(!r&&(r={l:1},t.dictionary)){var a=t.dictionary.subarray(-32768),o=new g(a.length+n.length);o.set(a),o.set(n,a.length),n=o,r.w=a.length}return cn(n,t.level==null?6:t.level,t.mem==null?Math.ceil(Math.max(8,Math.min(13,Math.log(n.length)))*1.5):12+t.mem,e,i,r)},ln=function(n,t){var e={};for(var i in n)e[i]=n[i];for(var i in t)e[i]=t[i];return e},Yt=function(n,t,e){for(var i=n(),r=n.toString(),a=r.slice(r.indexOf("[")+1,r.lastIndexOf("]")).replace(/\s+/g,"").split(","),o=0;o<i.length;++o){var s=i[o],c=a[o];if(typeof s=="function"){t+=";"+c+"=";var f=s.toString();if(s.prototype)if(f.indexOf("[native code]")!=-1){var u=f.indexOf(" ",8)+1;t+=f.slice(u,f.indexOf("(",u))}else{t+=f;for(var h in s.prototype)t+=";"+c+".prototype."+h+"="+s.prototype[h].toString()}else t+=f}else e[c]=s}return t},kt=[],Sn=function(n){var t=[];for(var e in n)n[e].buffer&&t.push((n[e]=new n[e].constructor(n[e])).buffer);return t},En=function(n,t,e,i){if(!kt[e]){for(var r="",a={},o=n.length-1,s=0;s<o;++s)r=Yt(n[s],r,a);kt[e]={c:Yt(n[o],r,a),e:a}}var c=ln({},kt[e].e);return Cn(kt[e].c+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+t.toString()+"}",e,c,Sn(c),i)},Qt=function(){return[g,j,wt,ht,lt,mt,Rt,en,an,sn,bt,un,V,xt,Q,Mt,pt,Z,v,_t,Hn,pn,Pn]},An=function(){return[g,j,wt,ht,lt,mt,Ut,It,rn,J,on,ct,bt,fn,tt,V,Y,ot,Tt,St,$t,st,Kt,qt,pt,Z,cn,vt,Gn,pn]};var Fn=function(){return[vn,In]};var Ln=function(){return[gn]},pn=function(n){return postMessage(n,[n.buffer])},Pn=function(n){return n&&{out:n.size&&new g(n.size),dictionary:n.dictionary}};var nt=function(n){return n.ondata=function(t,e){return postMessage([t,e],[t.buffer])},function(t){return n.push(t.data[0],t.data[1])}},At=function(n,t,e,i,r,a){var o,s=En(n,i,r,function(c,f){c?(s.terminate(),t.ondata.call(t,c)):Array.isArray(f)?(f[1]&&s.terminate(),t.ondata.call(t,c,f[0],f[1])):a(f)});s.postMessage(e),t.push=function(c,f){t.ondata||v(5),o&&t.ondata(v(4,0,1),null,!!f),s.postMessage([c,o=f],[c.buffer])},t.terminate=function(){s.terminate()}},ut=function(n,t){return n[t]|n[t+1]<<8},ft=function(n,t){return(n[t]|n[t+1]<<8|n[t+2]<<16|n[t+3]<<24)>>>0},Dt=function(n,t){return ft(n,t)+ft(n,t+4)*4294967296},M=function(n,t,e){for(;e;++t)n[t]=e,e>>>=8},Dn=function(n,t){var e=t.filename;if(n[0]=31,n[1]=139,n[2]=8,n[8]=t.level<2?4:t.level==9?2:0,n[9]=3,t.mtime!=0&&M(n,4,Math.floor(new Date(t.mtime||Date.now())/1e3)),e){n[3]=8;for(var i=0;i<=e.length;++i)n[i+10]=e.charCodeAt(i)}},vn=function(n){(n[0]!=31||n[1]!=139||n[2]!=8)&&v(6,"invalid gzip data");var t=n[3],e=10;t&4&&(e+=(n[10]|n[11]<<8)+2);for(var i=(t>>3&1)+(t>>4&1);i>0;i-=!n[e++]);return e+(t&2)},In=function(n){var t=n.length;return(n[t-4]|n[t-3]<<8|n[t-2]<<16|n[t-1]<<24)>>>0},$n=function(n){return 10+(n.filename?n.filename.length+1:0)},dn=function(n,t){var e=t.level,i=e==0?0:e<6?1:e==9?3:2;if(n[0]=120,n[1]=i<<6|(t.dictionary&&32),n[1]|=31-(n[0]<<8|n[1])%31,t.dictionary){var r=Ot();r.p(t.dictionary),M(n,2,r.d())}},gn=function(n,t){return((n[0]&15)!=8||n[0]>>4>7||(n[0]<<8|n[1])%31)&&v(6,"invalid zlib data"),(n[1]>>5&1)==+!t&&v(6,"invalid zlib data: "+(n[1]&32?"need":"unexpected")+" dictionary"),(n[1]>>3&4)+2};function zt(n,t){return typeof n=="function"&&(t=n,n={}),this.ondata=t,n}var it=function(){function n(t,e){if(typeof t=="function"&&(e=t,t={}),this.ondata=e,this.o=t||{},this.s={l:0,i:32768,w:32768,z:32768},this.b=new g(98304),this.o.dictionary){var i=this.o.dictionary.subarray(-32768);this.b.set(i,32768-i.length),this.s.i=32768-i.length}}return n.prototype.p=function(t,e){this.ondata(vt(t,this.o,0,0,this.s),e)},n.prototype.push=function(t,e){this.ondata||v(5),this.s.l&&v(4);var i=t.length+this.s.z;if(i>this.b.length){if(i>2*this.b.length-32768){var r=new g(i&-32768);r.set(this.b.subarray(0,this.s.z)),this.b=r}var a=this.b.length-this.s.z;a&&(this.b.set(t.subarray(0,a),this.s.z),this.s.z=this.b.length,this.p(this.b,!1)),this.b.set(this.b.subarray(-32768)),this.b.set(t.subarray(a),32768),this.s.z=t.length-a+32768,this.s.i=32766,this.s.w=32768}else this.b.set(t,this.s.z),this.s.z+=t.length;this.s.l=e&1,(this.s.z>this.s.w+8191||e)&&(this.p(this.b,e||!1),this.s.w=this.s.i,this.s.i-=2)},n}(),qn=function(){function n(t,e){At([An,function(){return[nt,it]}],this,zt.call(this,t,e),function(i){var r=new it(i.data);onmessage=nt(r)},6)}return n}();function Gn(n,t){return vt(n,t||{},0,0)}var _=function(){function n(t,e){typeof t=="function"&&(e=t,t={}),this.ondata=e;var i=t&&t.dictionary&&t.dictionary.subarray(-32768);this.s={i:0,b:i?i.length:0},this.o=new g(32768),this.p=new g(0),i&&this.o.set(i)}return n.prototype.e=function(t){if(this.ondata||v(5),this.d&&v(4),!this.p.length)this.p=t;else if(t.length){var e=new g(this.p.length+t.length);e.set(this.p),e.set(t,this.p.length),this.p=e}},n.prototype.c=function(t){this.s.i=+(this.d=t||!1);var e=this.s.b,i=_t(this.p,this.s,this.o);this.ondata(Z(i,e,this.s.b),this.d),this.o=Z(i,this.s.b-32768),this.s.b=this.o.length,this.p=Z(this.p,this.s.p/8|0),this.s.p&=7},n.prototype.push=function(t,e){this.e(t),this.c(e)},n}(),yn=function(){function n(t,e){At([Qt,function(){return[nt,_]}],this,zt.call(this,t,e),function(i){var r=new _(i.data);onmessage=nt(r)},7)}return n}();function Hn(n,t){return _t(n,{i:2},t&&t.out,t&&t.dictionary)}var Bn=function(){function n(t,e){this.c=hn(),this.l=0,this.v=1,it.call(this,t,e)}return n.prototype.push=function(t,e){this.c.p(t),this.l+=t.length,it.prototype.push.call(this,t,e)},n.prototype.p=function(t,e){var i=vt(t,this.o,this.v&&$n(this.o),e&&8,this.s);this.v&&(Dn(i,this.o),this.v=0),e&&(M(i,i.length-8,this.c.d()),M(i,i.length-4,this.l)),this.ondata(i,e)},n}();var Gt=function(){function n(t,e){this.v=1,this.r=0,_.call(this,t,e)}return n.prototype.push=function(t,e){if(_.prototype.e.call(this,t),this.r+=t.length,this.v){var i=this.p.subarray(this.v-1),r=i.length>3?vn(i):4;if(r>i.length){if(!e)return}else this.v>1&&this.onmember&&this.onmember(this.r-i.length);this.p=i.subarray(r),this.v=0}_.prototype.c.call(this,e),this.s.f&&!this.s.l&&(this.v=pt(this.s.p)+9,this.s={i:0},this.o=new g(0),this.p.length&&this.push(new g(0),e))},n}(),Wn=function(){function n(t,e){var i=this;At([Qt,Fn,function(){return[nt,_,Gt]}],this,zt.call(this,t,e),function(r){var a=new Gt(r.data);a.onmember=function(o){return postMessage(o)},onmessage=nt(a)},9,function(r){return i.onmember&&i.onmember(r)})}return n}();var Jn=function(){function n(t,e){this.c=Ot(),this.v=1,it.call(this,t,e)}return n.prototype.push=function(t,e){this.c.p(t),it.prototype.push.call(this,t,e)},n.prototype.p=function(t,e){var i=vt(t,this.o,this.v&&(this.o.dictionary?6:2),e&&4,this.s);this.v&&(dn(i,this.o),this.v=0),e&&M(i,i.length-4,this.c.d()),this.ondata(i,e)},n}();function mn(n,t){t||(t={});var e=Ot();e.p(n);var i=vt(n,t,t.dictionary?6:2,4);return dn(i,t),M(i,i.length-4,e.d()),i}var Ht=function(){function n(t,e){_.call(this,t,e),this.v=t&&t.dictionary?2:1}return n.prototype.push=function(t,e){if(_.prototype.e.call(this,t),this.v){if(this.p.length<6&&!e)return;this.p=this.p.subarray(gn(this.p,this.v-1)),this.v=0}e&&(this.p.length<4&&v(6,"invalid zlib data"),this.p=this.p.subarray(0,-4)),_.prototype.c.call(this,e)},n}(),jn=function(){function n(t,e){At([Qt,Ln,function(){return[nt,_,Ht]}],this,zt.call(this,t,e),function(i){var r=new Ht(i.data);onmessage=nt(r)},11)}return n}();var Zt=function(){function n(t,e){this.G=Gt,this.I=_,this.Z=Ht,this.o=zt.call(this,t,e)||{}}return n.prototype.push=function(t,e){if(this.ondata||v(5),this.s)this.s.push(t,e);else{if(this.p&&this.p.length){var i=new g(this.p.length+t.length);i.set(this.p),i.set(t,this.p.length)}else this.p=t;if(this.p.length>2){var r=this,a=function(){r.ondata.apply(r,arguments)};this.s=this.p[0]==31&&this.p[1]==139&&this.p[2]==8?new this.G(this.o,a):(this.p[0]&15)!=8||this.p[0]>>4>7||(this.p[0]<<8|this.p[1])%31?new this.I(this.o,a):new this.Z(this.o,a),this.s.push(this.p,e),this.p=null}}},n}(),te=function(){function n(t,e){this.G=Wn,this.I=yn,this.Z=jn,Zt.call(this,t,e)}return n.prototype.push=function(t,e){Zt.prototype.push.call(this,t,e)},n}();var Nt=typeof TextEncoder<"u"&&new TextEncoder,Wt=typeof TextDecoder<"u"&&new TextDecoder,bn=0;try{Wt.decode(tt,{stream:!0}),bn=1}catch{}var wn=function(n){for(var t="",e=0;;){var i=n[e++],r=(i>127)+(i>223)+(i>239);if(e+r>n.length)return{s:t,r:Z(n,e-1)};r?r==3?(i=((i&15)<<18|(n[e++]&63)<<12|(n[e++]&63)<<6|n[e++]&63)-65536,t+=String.fromCharCode(55296|i>>10,56320|i&1023)):r&1?t+=String.fromCharCode((i&31)<<6|n[e++]&63):t+=String.fromCharCode((i&15)<<12|(n[e++]&63)<<6|n[e++]&63):t+=String.fromCharCode(i)}},ne=function(){function n(t){this.ondata=t,bn?this.t=new TextDecoder:this.p=tt}return n.prototype.push=function(t,e){if(this.ondata||v(5),e=!!e,this.t){this.ondata(this.t.decode(t,{stream:!0}),e),e&&(this.t.decode().length&&v(8),this.t=null);return}this.p||v(4);var i=new g(this.p.length+t.length);i.set(this.p),i.set(t,this.p.length);var r=wn(i),a=r.s,o=r.r;e?(o.length&&v(8),this.p=null):this.p=o,this.ondata(a,e)},n}(),ee=function(){function n(t){this.ondata=t}return n.prototype.push=function(t,e){this.ondata||v(5),this.d&&v(4),this.ondata(jt(t),this.d=e||!1)},n}();function jt(n,t){if(t){for(var e=new g(n.length),i=0;i<n.length;++i)e[i]=n.charCodeAt(i);return e}if(Nt)return Nt.encode(n);for(var r=n.length,a=new g(n.length+(n.length>>1)),o=0,s=function(h){a[o++]=h},i=0;i<r;++i){if(o+5>a.length){var c=new g(o+8+(r-i<<1));c.set(a),a=c}var f=n.charCodeAt(i);f<128||t?s(f):f<2048?(s(192|f>>6),s(128|f&63)):f>55295&&f<57344?(f=65536+(f&1047552)|n.charCodeAt(++i)&1023,s(240|f>>18),s(128|f>>12&63),s(128|f>>6&63),s(128|f&63)):(s(224|f>>12),s(128|f>>6&63),s(128|f&63))}return Z(a,0,o)}function Rn(n,t){if(t){for(var e="",i=0;i<n.length;i+=16384)e+=String.fromCharCode.apply(null,n.subarray(i,i+16384));return e}else{if(Wt)return Wt.decode(n);var r=wn(n),a=r.s,e=r.r;return e.length&&v(8),a}}var zn=function(n){return n==1?3:n<6?2:n==9?1:0};var _n=function(n,t){for(;ut(n,t)!=1;t+=4+ut(n,t+2));return[Dt(n,t+12),Dt(n,t+4),Dt(n,t+20)]},Ct=function(n){var t=0;if(n)for(var e in n){var i=n[e].length;i>65535&&v(9),t+=i+4}return t},Bt=function(n,t,e,i,r,a,o,s){var c=i.length,f=e.extra,u=s&&s.length,h=Ct(f);M(n,t,o!=null?33639248:67324752),t+=4,o!=null&&(n[t++]=20,n[t++]=e.os),n[t]=20,t+=2,n[t++]=e.flag<<1|(a<0&&8),n[t++]=r&&8,n[t++]=e.compression&255,n[t++]=e.compression>>8;var l=new Date(e.mtime==null?Date.now():e.mtime),m=l.getFullYear()-1980;if((m<0||m>119)&&v(10),M(n,t,m<<25|l.getMonth()+1<<21|l.getDate()<<16|l.getHours()<<11|l.getMinutes()<<5|l.getSeconds()>>1),t+=4,a!=-1&&(M(n,t,e.crc),M(n,t+4,a<0?-a-2:a),M(n,t+8,e.size)),M(n,t+12,c),M(n,t+14,h),t+=16,o!=null&&(M(n,t,u),M(n,t+6,e.attrs),M(n,t+10,o),t+=14),n.set(i,t),t+=c,h)for(var d in f){var b=f[d],k=b.length;M(n,t,+d),M(n,t+2,k),n.set(b,t+4),t+=4+k}return u&&(n.set(s,t),t+=u),t},Kn=function(n,t,e,i,r){M(n,t,101010256),M(n,t+8,e),M(n,t+10,e),M(n,t+12,i),M(n,t+16,r)},Et=function(){function n(t){this.filename=t,this.c=hn(),this.size=0,this.compression=0}return n.prototype.process=function(t,e){this.ondata(null,t,e)},n.prototype.push=function(t,e){this.ondata||v(5),this.c.p(t),this.size+=t.length,e&&(this.crc=this.c.d()),this.process(t,e||!1)},n}(),ie=function(){function n(t,e){var i=this;e||(e={}),Et.call(this,t),this.d=new it(e,function(r,a){i.ondata(null,r,a)}),this.compression=8,this.flag=zn(e.level)}return n.prototype.process=function(t,e){try{this.d.push(t,e)}catch(i){this.ondata(i,null,e)}},n.prototype.push=function(t,e){Et.prototype.push.call(this,t,e)},n}(),re=function(){function n(t,e){var i=this;e||(e={}),Et.call(this,t),this.d=new qn(e,function(r,a,o){i.ondata(r,a,o)}),this.compression=8,this.flag=zn(e.level),this.terminate=this.d.terminate}return n.prototype.process=function(t,e){this.d.push(t,e)},n.prototype.push=function(t,e){Et.prototype.push.call(this,t,e)},n}(),ae=function(){function n(t){this.ondata=t,this.u=[],this.d=1}return n.prototype.add=function(t){var e=this;if(this.ondata||v(5),this.d&2)this.ondata(v(4+(this.d&1)*8,0,1),null,!1);else{var i=jt(t.filename),r=i.length,a=t.comment,o=a&&jt(a),s=r!=t.filename.length||o&&a.length!=o.length,c=r+Ct(t.extra)+30;r>65535&&this.ondata(v(11,0,1),null,!1);var f=new g(c);Bt(f,0,t,i,s,-1);var u=[f],h=function(){for(var k=0,E=u;k<E.length;k++){var A=E[k];e.ondata(null,A,!1)}u=[]},l=this.d;this.d=0;var m=this.u.length,d=ln(t,{f:i,u:s,o,t:function(){t.terminate&&t.terminate()},r:function(){if(h(),l){var k=e.u[m+1];k?k.r():e.d=1}l=1}}),b=0;t.ondata=function(k,E,A){if(k)e.ondata(k,E,A),e.terminate();else if(b+=E.length,u.push(E),A){var D=new g(16);M(D,0,134695760),M(D,4,t.crc),M(D,8,b),M(D,12,t.size),u.push(D),d.c=b,d.b=c+b+16,d.crc=t.crc,d.size=t.size,l&&d.r(),l=1}else l&&h()},this.u.push(d)}},n.prototype.end=function(){var t=this;if(this.d&2){this.ondata(v(4+(this.d&1)*8,0,1),null,!0);return}this.d?this.e():this.u.push({r:function(){t.d&1&&(t.u.splice(-1,1),t.e())},t:function(){}}),this.d=3},n.prototype.e=function(){for(var t=0,e=0,i=0,r=0,a=this.u;r<a.length;r++){var o=a[r];i+=46+o.f.length+Ct(o.extra)+(o.o?o.o.length:0)}for(var s=new g(i+22),c=0,f=this.u;c<f.length;c++){var o=f[c];Bt(s,t,o,o.f,o.u,-o.c-2,e,o.o),t+=46+o.f.length+Ct(o.extra)+(o.o?o.o.length:0),e+=o.b}Kn(s,t,this.u.length,i,e),this.ondata(null,s,!0),this.d=2},n.prototype.terminate=function(){for(var t=0,e=this.u;t<e.length;t++){var i=e[t];i.t()}this.d=2},n}();var On=function(){function n(){}return n.prototype.push=function(t,e){this.ondata(null,t,e)},n.compression=0,n}(),oe=function(){function n(){var t=this;this.i=new _(function(e,i){t.ondata(null,e,i)})}return n.prototype.push=function(t,e){try{this.i.push(t,e)}catch(i){this.ondata(i,null,e)}},n.compression=8,n}(),se=function(){function n(t,e){var i=this;e<32e4?this.i=new _(function(r,a){i.ondata(null,r,a)}):(this.i=new yn(function(r,a,o){i.ondata(r,a,o)}),this.terminate=this.i.terminate)}return n.prototype.push=function(t,e){this.i.terminate&&(t=Z(t,0)),this.i.push(t,e)},n.compression=8,n}(),ue=function(){function n(t){this.onfile=t,this.k=[],this.o={0:On},this.p=tt}return n.prototype.push=function(t,e){var i=this;if(this.onfile||v(5),this.p||v(4),this.c>0){var r=Math.min(this.c,t.length),a=t.subarray(0,r);if(this.c-=r,this.d?this.d.push(a,!this.c):this.k[0].push(a),t=t.subarray(r),t.length)return this.push(t,e)}else{var o=0,s=0,c=void 0,f=void 0;this.p.length?t.length?(f=new g(this.p.length+t.length),f.set(this.p),f.set(t,this.p.length)):f=this.p:f=t;for(var u=f.length,h=this.c,l=h&&this.d,m=function(){var E,A=ft(f,s);if(A==67324752){o=1,c=s,d.d=null,d.c=0;var D=ut(f,s+6),I=ut(f,s+8),L=D&2048,$=D&8,z=ut(f,s+26),y=ut(f,s+28);if(u>s+30+z+y){var p=[];d.k.unshift(p),o=2;var C=ft(f,s+18),R=ft(f,s+22),x=Rn(f.subarray(s+30,s+=30+z),!L);C==4294967295?(E=$?[-2]:_n(f,s),C=E[0],R=E[1]):$&&(C=-1),s+=y,d.c=C;var F,U={name:x,compression:I,start:function(){if(U.ondata||v(5),!C)U.ondata(null,tt,!0);else{var q=i.o[I];q||U.ondata(v(14,"unknown compression type "+I,1),null,!1),F=C<0?new q(x):new q(x,C,R),F.ondata=function(K,et,H){U.ondata(K,et,H)};for(var T=0,S=p;T<S.length;T++){var G=S[T];F.push(G,!1)}i.k[0]==p&&i.c?i.d=F:F.push(tt,!0)}},terminate:function(){F&&F.terminate&&F.terminate()}};C>=0&&(U.size=C,U.originalSize=R),d.onfile(U)}return"break"}else if(h){if(A==134695760)return c=s+=12+(h==-2&&8),o=3,d.c=0,"break";if(A==33639248)return c=s-=4,o=3,d.c=0,"break"}},d=this;s<u-4;++s){var b=m();if(b==="break")break}if(this.p=tt,h<0){var k=o?f.subarray(0,c-12-(h==-2&&8)-(ft(f,c-16)==134695760&&4)):f.subarray(0,s);l?l.push(k,!!o):this.k[+(o==2)].push(k)}if(o&2)return this.push(f.subarray(s),e);this.p=f.subarray(s)}e&&(this.c&&v(13),this.p=null)},n.prototype.register=function(t){this.o[t.compression]=t},n}();function Qn(n){return new TextEncoder().encode(n)}function Vn(n){let e=[];for(let i=0;i<n.length;i+=16384)e.push(String.fromCharCode(...n.subarray(i,i+16384)));return e.join("")}async function Xn(n){return await Promise.resolve(mn(n,{level:9}))}async function kn(n){let t=Qn(n),e=Xn(t);return Vn(await e)}var Mn="image/svg+xml";async function Yn(n,t,e){let i=`${e+t}/svg/`,a=await(await fetch(i,{method:"POST",body:n})).text();return`data:${Mn};base64,${btoa(encodeURI(a))}`}async function xn(n,t,e){let i=`${e+t}/svg/`,r=await kn(n),a=btoa(r).replace(/\+/g,"-").replace(/\//g,"_"),o=i+a,s=o.length<4e3?o:await Yn(n,t,e);return`<object type="${Mn}" style="max-width: 100%;" data="${s}" />`}async function Zn(n,t){let e=Vt("div",n),i=[];for(let r of t.langs){let a=Array.from(e.querySelectorAll(`pre[data-lang="${r}"]`));for(let s of a){let{textContent:c}=s;if(c!==null){let f=xn(c,r,t.serverPath).then(u=>{let h=Vt("p",u);h.dataset.lang=r,h.style.maxWidth="inherit",s.parentNode?.replaceChild(h,s)});i.push(f)}}let o=Array.from(e.querySelectorAll(`img[alt="kroki-${r}"]`));for(let s of o){let c=s,f=s.parentNode,u=c.getAttribute("src");if(!u)continue;let h=fetch(u).then(l=>l.text()).then(l=>xn(l,r,t.serverPath)).then(l=>{let m=Vt("p",l);m.dataset.lang=r,m.style.maxWidth="inherit",f?.replaceChild(m,s)});i.push(h)}}for(let r of i)await r.catch(a=>console.error(a));return e.innerHTML}function Vt(n,t){let e=document.createElement(n);return e.innerHTML=t,e}var Nn={langs:["actdiag","blockdiag","bpmn","bytefield","c4plantuml","d2","dbml","ditaa","erd","excalidraw","graphviz","mermaid","nomnoml","nwdiag","packetdiag","pikchr","plantuml","rackdiag","seqdiag","structurizr","svgbob","symbolator","tikz","vega","vegalite","wavedrom","wireviz"],serverPath:"//kroki.io/"},Tn=(n,t)=>{n.afterEach((e,i)=>{Zn(e,{...Nn,...t?.config?.kroki}).then(i)})};globalThis.$docsify=globalThis.$docsify||{};globalThis.$docsify.plugins=(globalThis.$docsify.plugins||[]).concat(Tn);
