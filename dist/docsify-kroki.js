var M=Uint8Array,_=Uint16Array,
It=Int32Array,yt=new M([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),mt=new M([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),St=new M([16,17,18,0,8,7,9,
6,10,5,11,4,12,3,13,2,14,1,15]),zn=function(n,t){for(var e=new _(31),i=0;i<31;++i)e[i]=t+=1<<n[i-1];for(var r=new It(e[30]),i=1;i<30;++i)for(var a=e[i];a<e[i+1];++a)r[a]=a-e[i]<<5|i;return {b:e,r}},Mn=zn(
yt,2),en=Mn.b,jt=Mn.r;en[28]=258,jt[258]=28;var Cn=zn(mt,0),Ot=Cn.r,Ft=new _(32768);for(I=0;I<32768;++I)nt=(I&43690)>>1|(I&21845)<<1,nt=(nt&52428)>>2|(nt&13107)<<2,nt=(nt&61680)>>4|(nt&3855)<<
4,Ft[I]=((nt&65280)>>8|(nt&255)<<8)>>1;var nt,I,H=function(n,t,e){for(var i=n.length,r=0,a=new _(t);r<i;++r)n[r]&&++a[n[r]-1];var s=new _(t);for(r=1;r<t;++r)s[r]=s[r-1]+a[r-1]<<1;var o;if(e){o=new _(1<<
t);var c=15-t;for(r=0;r<i;++r)if(n[r])for(var h=r<<4|n[r],u=t-n[r],f=s[n[r]-1]++<<u,p=f|(1<<u)-1;f<=p;++f)o[Ft[f]>>c]=h;}else for(o=new _(i),r=0;r<i;++r)n[r]&&(o[r]=Ft[s[n[r]-1]++]>>15-n[r]);return o},
et=new M(288);for(I=0;I<144;++I)et[I]=8;var I;for(I=144;I<256;++I)et[I]=9;var I;for(I=256;I<280;++I)et[I]=7;var I;for(I=280;I<288;++I)et[I]=8;var I,dt=new M(32);for(I=0;I<32;++I)dt[I]=5;var I,kn=H(et,
9,0);H(et,9,1);var Tn=H(dt,5,0);H(dt,5,1);var bt=function(n){return (n+7)/8|0},J=function(n,t,e){(t==null||t<0)&&(t=0),(e==null||e>n.length)&&(e=n.length);var i=new M(e-t);return i.set(n.subarray(
t,e)),i},N=function(n,t,e){e<<=t&7;var i=t/8|0;n[i]|=e,n[i+1]|=e>>8;},vt=function(n,t,e){e<<=t&7;var i=t/8|0;n[i]|=
e,n[i+1]|=e>>8,n[i+2]|=e>>16;},Wt=function(n,t){for(var e=[],i=0;i<n.length;++i)n[i]&&e.push({s:i,f:n[i]});var r=e.length,a=e.slice();if(!r)return {t:rt,l:0};if(r==1){var s=new M(e[0].s+1);return s[e[0].
s]=1,{t:s,l:1}}e.sort(function(S,E){return S.f-E.f}),e.push({s:-1,f:25001});var o=e[0],c=e[1],h=0,u=1,f=2;for(e[0]={s:-1,f:o.f+c.f,l:o,r:c};u!=r-1;)o=e[e[h].f<e[f].f?h++:f++],c=e[h!=u&&e[h].f<e[f].f?h++:
f++],e[u++]={s:-1,f:o.f+c.f,l:o,r:c};for(var p=a[0].s,i=1;i<r;++i)a[i].s>p&&(p=a[i].s);var C=new _(p+1),y=Qt(e[u-1],C,0);if(y>t){var i=0,w=0,v=y-t,b=1<<v;for(a.sort(function(E,z){return C[z.s]-C[E.s]||
E.f-z.f});i<r;++i){var k=a[i].s;if(C[k]>t)w+=b-(1<<y-C[k]),C[k]=t;else break}for(w>>=v;w>0;){var x=a[i].s;C[x]<t?w-=1<<t-C[x]++-1:++i;}for(;i>=0&&w;--i){var g=a[i].s;C[g]==t&&(--C[g],++w);}y=t;}return {t:new M(
C),l:y}},Qt=function(n,t,e){return n.s==-1?Math.max(Qt(n.l,t,e+1),Qt(n.r,t,e+1)):t[n.s]=e},Ht=function(n){for(var t=n.length;t&&!n[--t];);for(var e=new _(++t),i=0,r=n[0],a=1,s=function(c){e[i++]=c;},o=1;o<=
t;++o)if(n[o]==r&&o!=t)++a;else {if(!r&&a>2){for(;a>138;a-=138)s(32754);a>2&&(s(a>10?a-11<<5|28690:a-3<<5|12305),a=0);}else if(a>3){for(s(r),--a;a>6;a-=6)s(8304);a>2&&(s(a-3<<5|8208),a=0);}for(;a--;)s(r);
a=1,r=n[o];}return {c:e.subarray(0,i),n:t}},pt=function(n,t){for(var e=0,i=0;i<t.length;++i)e+=n[i]*t[i];return e},rn=function(n,t,e){var i=e.length,r=bt(t+2);n[r]=i&255,n[r+1]=i>>8,n[r+2]=n[r]^255,n[r+
3]=n[r+1]^255;for(var a=0;a<i;++a)n[r+a+4]=e[a];return (r+4+i)*8},Jt=function(n,t,e,i,r,a,s,o,c,h,u){N(t,u++,e),++r[256];for(var f=Wt(r,15),p=f.t,C=f.l,y=Wt(a,15),w=y.t,v=y.l,b=Ht(p),k=b.c,x=b.n,g=Ht(w),
S=g.c,E=g.n,z=new _(19),m=0;m<k.length;++m)++z[k[m]&31];for(var m=0;m<S.length;++m)++z[S[m]&31];for(var d=Wt(z,7),T=d.t,W=d.l,U=19;U>4&&!T[St[U-1]];--U);var q=h+5<<3,A=pt(r,et)+pt(a,dt)+s,L=pt(r,p)+pt(
a,w)+s+14+3*U+pt(z,T)+2*z[16]+3*z[17]+7*z[18];if(c>=0&&q<=A&&q<=L)return rn(t,u,n.subarray(c,c+h));var D,G,R,$;if(N(t,u,1+(L<A)),u+=2,L<A){D=H(p,C,0),G=p,R=H(w,v,0),$=w;var ot=H(T,W,0);N(t,u,x-257),N(
t,u+5,E-1),N(t,u+10,U-4),u+=14;for(var m=0;m<U;++m)N(t,u+3*m,T[St[m]]);u+=3*U;for(var V=[k,S],B=0;B<2;++B)for(var tt=V[B],m=0;m<tt.length;++m){var X=tt[m]&31;N(t,u,ot[X]),u+=T[X],X>15&&(N(t,u,tt[m]>>5&
127),u+=tt[m]>>12);}}else D=kn,G=et,R=Tn,$=dt;for(var m=0;m<o;++m){var Q=i[m];if(Q>255){var X=Q>>18&31;vt(t,u,D[X+257]),u+=G[X+257],X>7&&(N(t,u,Q>>23&31),u+=yt[X]);var K=Q&31;vt(t,u,R[K]),u+=$[K],K>3&&
(vt(t,u,Q>>5&8191),u+=mt[K]);}else vt(t,u,D[Q]),u+=G[Q];}return vt(t,u,D[256]),u+G[256]},In=new It([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),rt=new M(0),An=function(n,t,e,i,r,a){
var s=a.z||n.length,o=new M(i+s+5*(1+Math.ceil(s/7e3))+r),c=o.subarray(i,o.length-r),h=a.l,u=(a.r||0)&7;if(t){u&&(c[0]=a.r>>3);for(var f=In[t-1],p=f>>13,C=f&8191,y=(1<<e)-1,w=a.p||new _(32768),v=a.h||
new _(y+1),b=Math.ceil(e/3),k=2*b,x=function($t){return (n[$t]^n[$t+1]<<b^n[$t+2]<<k)&y},g=new It(25e3),S=new _(288),E=new _(32),z=0,m=0,d=a.i||0,T=0,W=a.w||0,U=0;d+2<s;++d){var q=x(d),A=d&32767,L=v[q];
if(w[A]=L,v[q]=A,W<=d){var D=s-d;if((z>7e3||T>24576)&&(D>423||!h)){u=Jt(n,c,0,g,S,E,m,T,U,d-U,u),T=z=m=0,U=d;for(var G=0;G<286;++G)S[G]=0;for(var G=0;G<30;++G)E[G]=0;}var R=2,$=0,ot=C,V=A-L&32767;if(D>
2&&q==x(d-V))for(var B=Math.min(p,D)-1,tt=Math.min(32767,d),X=Math.min(258,D);V<=tt&&--ot&&A!=L;){if(n[d+R]==n[d+R-V]){for(var Q=0;Q<X&&n[d+Q]==n[d+Q-V];++Q);if(Q>R){if(R=Q,$=V,Q>B)break;for(var K=Math.
min(V,Q-2),ct=0,G=0;G<K;++G){var lt=d-V+G&32767,_t=w[lt],kt=lt-_t&32767;kt>ct&&(ct=kt,L=lt);}}}A=L,L=w[A],V+=A-L&32767;}if($){g[T++]=268435456|jt[R]<<18|Ot[$];var Ut=jt[R]&31,Tt=Ot[$]&31;m+=yt[Ut]+mt[Tt],
++S[257+Ut],++E[Tt],W=d+R,++z;}else g[T++]=n[d],++S[n[d]];}}for(d=Math.max(d,W);d<s;++d)g[T++]=n[d],++S[n[d]];u=Jt(n,c,h,g,S,E,m,T,U,d-U,u),h||(a.r=u&7|c[u/8|0]<<3,u-=7,a.h=v,a.p=w,a.i=d,a.w=W);}else {for(var d=a.
w||0;d<s+h;d+=65535){var Zt=d+65535;Zt>=s&&(c[u/8|0]=h,Zt=s),u=rn(c,u+1,n.subarray(d,Zt));}a.i=s;}return J(o,0,i+bt(u)+r)};(function(){for(var n=new Int32Array(256),t=0;t<256;++t){for(var e=t,i=9;--i;)
e=(e&1&&-306674912)^e>>>1;n[t]=e;}return n})();var Xt=function(){var n=1,t=0;return {
p:function(e){for(var i=n,r=t,a=e.length|0,s=0;s!=a;){for(var o=Math.min(s+2655,a);s<o;++s)r+=i+=e[s];i=(i&65535)+15*(i>>16),r=(r&65535)+15*(r>>16);}n=i,t=r;},d:function(){return n%=65521,t%=65521,(n&255)<<
24|(n&65280)<<8|(t&255)<<8|t>>8}}},ht=function(n,t,e,i,r){if(!r&&(r={l:1},t.dictionary)){var a=t.dictionary.subarray(-32768),s=new M(a.length+n.length);s.set(a),s.set(n,a.length),n=s,r.w=a.length;}return An(
n,t.level==null?6:t.level,t.mem==null?Math.ceil(Math.max(8,Math.min(13,Math.log(n.length)))*1.5):12+t.mem,e,i,r)},F=function(n,t,e){for(;e;++t)n[t]=e,e>>>=8;},hn=function(n,t){
var e=t.level,i=e==0?0:e<6?1:e==9?3:2;if(n[0]=120,n[1]=i<<6|(t.dictionary&&32),n[1]|=31-(n[0]<<8|n[1])%31,t.dictionary){var r=Xt();r.p(t.dictionary),F(n,2,r.d());}};function mn(n,t){t||(t={});var e=Xt();e.p(n);var i=ht(n,t,t.dictionary?
6:2,4);return hn(i,t),F(i,i.length-4,e.d()),i}typeof TextEncoder<
"u"&&new TextEncoder;var nn=typeof TextDecoder<"u"&&new TextDecoder,Vn=0;try{nn.decode(rt,{stream:!0}),Vn=1;}catch{}

function o(n){return new TextEncoder().encode(n)}function s(n){const r=[];for(let t=0;t<n.length;t+=16384)r.push(String.fromCharCode(...n.subarray(t,t+16384)));return r.
join("")}async function c(n){return await mn(n,{level:9})}async function u$1(n){const i=o(n),r=c(i);return s(await r)}

const k=r=>btoa(encodeURI(r)),u="image/svg+xml";async function b(r,t,e){const a=`${e+t}/svg/`,s=await(await fetch(a,{method:"POST",body:r})).text();return `
    <object data="data:${u};base64,${k(s)}"
    type="${u}"></object>
    `}async function h(r,t,e){const a=`${e+t}/svg/`,n=await u$1(r),s=btoa(n).replace(/\+/g,"-").replace(/\//g,"_"),o=`<object type="image/svg+xml" data="${a+s}" />`;return o.length<4e3?o:b(r,t,e)}async function v(r,t){
const e=m("span",r),a=[];for(const n of t.langs){const s=Array.from(e.querySelectorAll(`pre[data-lang="${n}"]`));for(const o of s)if(o instanceof HTMLElement){const p=h(o.textContent,n,t.serverPath).then(
l=>{var g;const i=m("p",l);i.dataset.lang=n,(g=o.parentNode)==null||g.replaceChild(i,o);});a.push(p);}const d=Array.from(e.querySelectorAll(`img[alt="kroki-${n}"]`));for(const o of d)if(o instanceof HTMLImageElement){
const p=o,l=o.parentNode,i=p.getAttribute("src");if(!i)continue;const g=fetch(i).then(c=>c.text()).then(c=>h(c,n,t.serverPath)).then(c=>{const f=m("p",c);l&&(f.dataset.lang=n,l.replaceChild(f,o));});a.
push(g);}}for(const n of a)await n.catch(s=>console.error(s));return e.innerHTML}function m(r,t){const e=document.createElement(r);return e.innerHTML=t,e}const E={langs:["actdiag","blockdiag","bpmn","b\
ytefield","c4plantuml","d2","dbml","ditaa","erd","excalidraw","graphviz","mermaid","nomnoml","nwdiag","packetdiag","pikchr","plantuml","rackdiag","seqdiag","structurizr","svgbob","vega","vegalite","wa\
vedrom","wireviz"],serverPath:"//kroki.io/"},T=(r,t)=>{r.afterEach((e,a)=>{(async()=>{var s;const n=await v(e,{...E,...((s=t==null?void 0:t.config)==null?void 0:s.kroki)||{}});a(n);})();});};

window.$docsify=window.$docsify||{};window.$docsify.plugins=(window.$docsify.plugins||[]).concat(T);
//# sourceMappingURL=https://unpkg.com/docsify-kroki@1.2.0/dist/docsify-kroki.js.map
