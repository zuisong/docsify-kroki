/*!
 * docsify-kroki
 * v1.3.0
 * https://github.com/zuisong/docsify-kroki
 * (c) 2020-2023 zuisong
 * MIT license
 */
var r=Uint8Array,n=Uint16Array,t=Int32Array,e=new r([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),a=new r([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),o=new r([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),i=function(r,e){for(var a=new n(31),o=0;o<31;++o)a[o]=e+=1<<r[o-1];var i=new t(a[30]);for(o=1;o<30;++o)for(var f=a[o];f<a[o+1];++f)i[f]=f-a[o]<<5|o;return{b:a,r:i}},f=i(e,2),c=f.b,l=f.r;c[28]=258,l[258]=28;var u=i(a,0).r,s=new n(32768);for(g=0;g<32768;++g)v=(61680&(v=(52428&(v=(43690&g)>>1|(21845&g)<<1))>>2|(13107&v)<<2))>>4|(3855&v)<<4,s[g]=((65280&v)>>8|(255&v)<<8)>>1;var v,h=function(r,t,e){for(var a=r.length,o=0,i=new n(t);o<a;++o)r[o]&&++i[r[o]-1];var f,c=new n(t);for(o=1;o<t;++o)c[o]=c[o-1]+i[o-1]<<1;if(e){f=new n(1<<t);var l=15-t;for(o=0;o<a;++o)if(r[o])for(var u=o<<4|r[o],v=t-r[o],h=c[r[o]-1]++<<v,d=h|(1<<v)-1;h<=d;++h)f[s[h]>>l]=u}else for(f=new n(a),o=0;o<a;++o)r[o]&&(f[o]=s[c[r[o]-1]++]>>15-r[o]);return f},d=new r(288);for(g=0;g<144;++g)d[g]=8;for(g=144;g<256;++g)d[g]=9;for(g=256;g<280;++g)d[g]=7;for(g=280;g<288;++g)d[g]=8;var w=new r(32);for(g=0;g<32;++g)w[g]=5;var g,y=h(d,9,0);h(d,9,1);var m=h(w,5,0);h(w,5,1);var p=function(r){return(r+7)/8|0},b=function(r,n,t){t<<=7&n;var e=n/8|0;r[e]|=t,r[e+1]|=t>>8},x=function(r,n,t){t<<=7&n;var e=n/8|0;r[e]|=t,r[e+1]|=t>>8,r[e+2]|=t>>16},M=function(t,e){for(var a=[],o=0;o<t.length;++o)t[o]&&a.push({s:o,f:t[o]});var i=a.length,f=a.slice();if(!i)return{t:P,l:0};if(1==i){var c=new r(a[0].s+1);return c[a[0].s]=1,{t:c,l:1}}a.sort((function(r,n){return r.f-n.f})),a.push({s:-1,f:25001});var l=a[0],u=a[1],s=0,v=1,h=2;for(a[0]={s:-1,f:l.f+u.f,l:l,r:u};v!=i-1;)l=a[a[s].f<a[h].f?s++:h++],u=a[s!=v&&a[s].f<a[h].f?s++:h++],a[v++]={s:-1,f:l.f+u.f,l:l,r:u};var d=f[0].s;for(o=1;o<i;++o)f[o].s>d&&(d=f[o].s);var w=new n(d+1),g=k(a[v-1],w,0);if(g>e){o=0;var y=0,m=g-e,p=1<<m;for(f.sort((function(r,n){return w[n.s]-w[r.s]||r.f-n.f}));o<i;++o){var b=f[o].s;if(!(w[b]>e))break;y+=p-(1<<g-w[b]),w[b]=e}for(y>>=m;y>0;){var x=f[o].s;w[x]<e?y-=1<<e-w[x]++-1:++o}for(;o>=0&&y;--o){var M=f[o].s;w[M]==e&&(--w[M],++y)}g=e}return{t:new r(w),l:g}},k=function(r,n,t){return-1==r.s?Math.max(k(r.l,n,t+1),k(r.r,n,t+1)):n[r.s]=t},A=function(r){for(var t=r.length;t&&!r[--t];);for(var e=new n(++t),a=0,o=r[0],i=1,f=function(r){e[a++]=r},c=1;c<=t;++c)if(r[c]==o&&c!=t)++i;else{if(!o&&i>2){for(;i>138;i-=138)f(32754);i>2&&(f(i>10?i-11<<5|28690:i-3<<5|12305),i=0)}else if(i>3){for(f(o),--i;i>6;i-=6)f(8304);i>2&&(f(i-3<<5|8208),i=0)}for(;i--;)f(o);i=1,o=r[c]}return{c:e.subarray(0,a),n:t}},T=function(r,n){for(var t=0,e=0;e<n.length;++e)t+=r[e]*n[e];return t},z=function(r,n,t){var e=t.length,a=p(n+2);r[a]=255&e,r[a+1]=e>>8,r[a+2]=255^r[a],r[a+3]=255^r[a+1];for(var o=0;o<e;++o)r[a+o+4]=t[o];return 8*(a+4+e)},C=function(r,t,i,f,c,l,u,s,v,g,p){b(t,p++,i),++c[256];for(var k=M(c,15),C=k.t,E=k.l,P=M(l,15),S=P.t,$=P.l,q=A(C),I=q.c,U=q.n,j=A(S),D=j.c,H=j.n,L=new n(19),N=0;N<I.length;++N)++L[31&I[N]];for(N=0;N<D.length;++N)++L[31&D[N]];for(var W=M(L,7),O=W.t,R=W.l,_=19;_>4&&!O[o[_-1]];--_);var B,F,G,J,K=g+5<<3,Q=T(c,d)+T(l,w)+u,V=T(c,C)+T(l,S)+u+14+3*_+T(L,O)+2*L[16]+3*L[17]+7*L[18];if(v>=0&&K<=Q&&K<=V)return z(t,p,r.subarray(v,v+g));if(b(t,p,1+(V<Q)),p+=2,V<Q){B=h(C,E,0),F=C,G=h(S,$,0),J=S;var X=h(O,R,0);b(t,p,U-257),b(t,p+5,H-1),b(t,p+10,_-4),p+=14;for(N=0;N<_;++N)b(t,p+3*N,O[o[N]]);p+=3*_;for(var Y=[I,D],Z=0;Z<2;++Z){var rr=Y[Z];for(N=0;N<rr.length;++N){var nr=31&rr[N];b(t,p,X[nr]),p+=O[nr],nr>15&&(b(t,p,rr[N]>>5&127),p+=rr[N]>>12)}}}else B=y,F=d,G=m,J=w;for(N=0;N<s;++N){var tr=f[N];if(tr>255){x(t,p,B[(nr=tr>>18&31)+257]),p+=F[nr+257],nr>7&&(b(t,p,tr>>23&31),p+=e[nr]);var er=31&tr;x(t,p,G[er]),p+=J[er],er>3&&(x(t,p,tr>>5&8191),p+=a[er])}else x(t,p,B[tr]),p+=F[tr]}return x(t,p,B[256]),p+F[256]},E=new t([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),P=new r(0),S=function(o,i,f,c,s,v){var h=v.z||o.length,d=new r(c+h+5*(1+Math.ceil(h/7e3))+s),w=d.subarray(c,d.length-s),g=v.l,y=7&(v.r||0);if(i){y&&(w[0]=v.r>>3);for(var m=E[i-1],b=m>>13,x=8191&m,M=(1<<f)-1,k=v.p||new n(32768),A=v.h||new n(M+1),T=Math.ceil(f/3),P=2*T,S=function(r){return(o[r]^o[r+1]<<T^o[r+2]<<P)&M},$=new t(25e3),q=new n(288),I=new n(32),U=0,j=0,D=v.i||0,H=0,L=v.w||0,N=0;D+2<h;++D){var W=S(D),O=32767&D,R=A[W];if(k[O]=R,A[W]=O,L<=D){var _=h-D;if((U>7e3||H>24576)&&(_>423||!g)){y=C(o,w,0,$,q,I,j,H,N,D-N,y),H=U=j=0,N=D;for(var B=0;B<286;++B)q[B]=0;for(B=0;B<30;++B)I[B]=0}var F=2,G=0,J=x,K=O-R&32767;if(_>2&&W==S(D-K))for(var Q=Math.min(b,_)-1,V=Math.min(32767,D),X=Math.min(258,_);K<=V&&--J&&O!=R;){if(o[D+F]==o[D+F-K]){for(var Y=0;Y<X&&o[D+Y]==o[D+Y-K];++Y);if(Y>F){if(F=Y,G=K,Y>Q)break;var Z=Math.min(K,Y-2),rr=0;for(B=0;B<Z;++B){var nr=D-K+B&32767,tr=nr-k[nr]&32767;tr>rr&&(rr=tr,R=nr)}}}K+=(O=R)-(R=k[O])&32767}if(G){$[H++]=268435456|l[F]<<18|u[G];var er=31&l[F],ar=31&u[G];j+=e[er]+a[ar],++q[257+er],++I[ar],L=D+F,++U}else $[H++]=o[D],++q[o[D]]}}for(D=Math.max(D,L);D<h;++D)$[H++]=o[D],++q[o[D]];y=C(o,w,g,$,q,I,j,H,N,D-N,y),g||(v.r=7&y|w[y/8|0]<<3,y-=7,v.h=A,v.p=k,v.i=D,v.w=L)}else{for(D=v.w||0;D<h+g;D+=65535){var or=D+65535;or>=h&&(w[y/8|0]=g,or=h),y=z(w,y+1,o.subarray(D,or))}v.i=h}return function(n,t,e){(null==t||t<0)&&(t=0),(null==e||e>n.length)&&(e=n.length);var a=new r(e-t);return a.set(n.subarray(t,e)),a}(d,0,c+p(y)+s)};!function(){for(var r=new Int32Array(256),n=0;n<256;++n){for(var t=n,e=9;--e;)t=(1&t&&-306674912)^t>>>1;r[n]=t}}();var $=function(){var r=1,n=0;return{p:function(t){for(var e=r,a=n,o=0|t.length,i=0;i!=o;){for(var f=Math.min(i+2655,o);i<f;++i)a+=e+=t[i];e=(65535&e)+15*(e>>16),a=(65535&a)+15*(a>>16)}r=e,n=a},d:function(){return(255&(r%=65521))<<24|(65280&r)<<8|(255&(n%=65521))<<8|n>>8}}},q=function(n,t,e,a,o){if(!o&&(o={l:1},t.dictionary)){var i=t.dictionary.subarray(-32768),f=new r(i.length+n.length);f.set(i),f.set(n,i.length),n=f,o.w=i.length}return S(n,null==t.level?6:t.level,null==t.mem?Math.ceil(1.5*Math.max(8,Math.min(13,Math.log(n.length)))):12+t.mem,e,a,o)},I=function(r,n,t){for(;t;++n)r[n]=t,t>>>=8},U=function(r,n){var t=n.level,e=0==t?0:t<6?1:9==t?3:2;if(r[0]=120,r[1]=e<<6|(n.dictionary&&32),r[1]|=31-(r[0]<<8|r[1])%31,n.dictionary){var a=$();a.p(n.dictionary),I(r,2,a.d())}};typeof TextEncoder<"u"&&new TextEncoder;var j=typeof TextDecoder<"u"&&new TextDecoder;try{j.decode(P,{stream:!0}),1}catch(r){}async function D(r){return await function(r,n){n||(n={});var t=$();t.p(r);var e=q(r,n,n.dictionary?6:2,4);return U(e,n),I(e,e.length-4,t.d()),e}(r,{level:9})}async function H(r){const n=function(r){return(new TextEncoder).encode(r)}(r),t=D(n);return function(r){const n=[];for(let t=0;t<r.length;t+=16384)n.push(String.fromCharCode(...r.subarray(t,t+16384)));return n.join("")}(await t)}const L=r=>btoa(encodeURI(r)),N="image/svg+xml";async function W(r,n,t){const e="".concat(t+n,"/svg/"),a=await H(r),o=e+btoa(a).replace(/\+/g,"-").replace(/\//g,"_"),i=o.length<4e3?o:await async function(r,n,t){const e="".concat(t+n,"/svg/"),a=await fetch(e,{method:"POST",body:r}),o=await a.text();return"data:".concat(N,";base64,").concat(L(o))}(r,n,t);return'<object type="'.concat(N,'" style="max-width: 100%;" data="').concat(i,'" />')}function O(r,n){const t=document.createElement(r);return t.innerHTML=n,t}const R={langs:["actdiag","blockdiag","bpmn","bytefield","c4plantuml","d2","dbml","ditaa","erd","excalidraw","graphviz","mermaid","nomnoml","nwdiag","packetdiag","pikchr","plantuml","rackdiag","seqdiag","structurizr","svgbob","symbolator","tikz","vega","vegalite","wavedrom","wireviz"],serverPath:"//kroki.io/"};window.$docsify=window.$docsify||{},window.$docsify.plugins=(window.$docsify.plugins||[]).concat(((r,n)=>{r.afterEach(((r,t)=>{var e;(async function(r,n){const t=O("div",r),e=[];for(const r of n.langs){const a=Array.from(t.querySelectorAll('pre[data-lang="'.concat(r,'"]')));for(const t of a){const{textContent:a}=t;if(null!==a){const o=W(a,r,n.serverPath).then((n=>{var e;const a=O("p",n);a.dataset.lang=r,a.style.maxWidth="inherit",null===(e=t.parentNode)||void 0===e||e.replaceChild(a,t)}));e.push(o)}}const o=Array.from(t.querySelectorAll('img[alt="kroki-'.concat(r,'"]')));for(const t of o){const a=t,o=t.parentNode,i=a.getAttribute("src");if(!i)continue;const f=fetch(i).then((r=>r.text())).then((t=>W(t,r,n.serverPath))).then((n=>{const e=O("p",n);e.dataset.lang=r,e.style.maxWidth="inherit",null==o||o.replaceChild(e,t)}));e.push(f)}}for(const r of e)await r.catch((r=>console.error(r)));return t.innerHTML})(r,{...R,...null==n||null===(e=n.config)||void 0===e?void 0:e.kroki}).then(t)}))}));
//# sourceMappingURL=https://unpkg.com/docsify-kroki@1.3.0/dist/docsify-kroki.js.map
