import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{E as t,F as n,K as r,N as ee,P as i,S as a,T as te,V as o,_ as s,f as c,j as ne,k as l,l as u,n as d,o as re,p as f,q as p,u as m,v as ie}from"./iframe-BMXJBWpz.js";import{n as h,t as g}from"./storybook-Bmfw4Q-w.js";import{n as ae,t as _}from"./src-Co4d3tpM.js";function oe(e){return`url("${e.replace(/(["\\])/g,`\\$1`)}")`}function v(e){return e.startsWith(`/`)&&!e.startsWith(`//`)}function y(e,t){return!t||!C.test(t)?!1:e.startsWith(t.endsWith(`/`)?t:`${t}/`)}function b(e,{isDev:t,publicBase:n}){if(!t&&S.test(e)&&(v(e)||y(e,n)))return e.replace(/\.\w+$/,`.webp`)}function x(){let{__publicAssetsURL:e}=globalThis;return{isDev:!1,publicBase:e?.()}}var S,C;function w(){return(w=e((()=>{S=/\.(png|jpe?g)$/i,C=/^https?:\/\//i})))()}var T,E,D,O,k,A,j,M,N,P;function F(){return(F=e((()=>{d(),_(),w(),T={class:`contents`},E=[`srcset`],D=[`src`,`alt`,`loading`],O=`hk-img relative inline-flex flex-col align-top max-w-full max-h-full overflow-hidden`,k=`absolute inset-0 w-full h-full`,A=`w-full aspect-[1.8]`,j=`block w-full h-full min-h-0`,M=`[mask:var(--hk-img-mask)_var(--hk-img-mask-position,center)/var(--hk-img-mask-size,contain)_no-repeat] [-webkit-mask:var(--hk-img-mask)_var(--hk-img-mask-position,center)/var(--hk-img-mask-size,contain)_no-repeat]`,N=`transition-opacity duration-300`,P=s({inheritAttrs:!1,__name:`HkImg`,props:{src:{},alt:{},cover:{type:Boolean},eager:{type:Boolean},aspectRatio:{},position:{},gradient:{},inheritColor:{type:Boolean},fadeIn:{type:Boolean,default:!0}},emits:[`load`,`error`],setup(e,{emit:s}){let d=new Set([`crossorigin`,`decoding`,`draggable`,`fetchpriority`,`loading`,`referrerpolicy`,`sizes`,`srcset`]),h=e,g=s,_=ne(),v=ee(),y=i(`img`),S=o(!1),C=o(!1),w=o(typeof window>`u`||!!ie()?.vnode.el),P=u(()=>h.fadeIn&&!w.value&&!S.value),F=u(()=>h.fadeIn?[N,{"opacity-0":P.value}]:void 0),I=u(()=>!!v.placeholder&&!S.value),L=u(()=>P.value||I.value),R=u(()=>{let e={},t={};for(let[n,r]of Object.entries(_))n!==`class`&&(d.has(n.replace(/-/g,``).toLowerCase())?t[n]=r:e[n]=r);return{root:e,img:t}}),z=u(()=>R.value.img.srcset||h.inheritColor?void 0:b(h.src,x())),B=u(()=>!!h.src&&!C.value),V=u(()=>ae(O,!B.value&&A,_.class)),H=u(()=>B.value?`hk-img__content absolute inset-0 flex`:`hk-img__content relative flex flex-1`),U=u(()=>h.inheritColor?{class:[j,`opacity-0`],crossorigin:`anonymous`}:{class:[j,h.cover?`object-cover`:`object-contain`,h.fadeIn?N:void 0,{"opacity-0":L.value}],style:{objectPosition:h.position}}),W=u(()=>({"--hk-img-mask":oe(h.src),"--hk-img-mask-position":h.position,"--hk-img-mask-size":h.cover?`cover`:void 0})),G=u(()=>({aspectRatio:h.aspectRatio===void 0?void 0:`${h.aspectRatio}`}));n(()=>h.src,()=>{S.value=!1,C.value=!1,w.value=!1}),te(()=>{let e=y.value;e?.complete&&(e.naturalWidth>0?K():q())});function K(){S.value=!0,g(`load`,h.src)}function q(){C.value=!0,g(`error`,h.src)}return(n,ee)=>(t(),f(`div`,a(R.value.root,{class:V.value,style:G.value}),[B.value?(t(),f(re,{key:0},[m(`picture`,T,[z.value?(t(),f(`source`,{key:0,srcset:z.value,type:`image/webp`},null,8,E)):c(``,!0),m(`img`,a({ref:`img`,src:e.src,alt:e.alt,loading:e.eager?`eager`:`lazy`},{...R.value.img,...U.value},{onLoad:K,onError:q}),null,16,D)]),e.inheritColor?(t(),f(`div`,{key:0,"aria-hidden":`true`,class:r([k,`bg-current`,M,F.value]),style:p(W.value)},null,6)):c(``,!0)],64)):c(``,!0),e.gradient?(t(),f(`div`,{key:1,class:r([k,`hk-img__gradient`,`bg-no-repeat`]),style:p({backgroundImage:`linear-gradient(${e.gradient})`})},null,6)):c(``,!0),n.$slots.placeholder&&!S.value&&!C.value?(t(),f(`div`,{key:2,class:r(k)},[l(n.$slots,`placeholder`)])):c(``,!0),n.$slots.error&&C.value?(t(),f(`div`,{key:3,class:r(k)},[l(n.$slots,`error`)])):c(``,!0),n.$slots.default?(t(),f(`div`,{key:4,class:r(H.value)},[l(n.$slots,`default`)],2)):c(``,!0)],16))}})})))()}var I;function L(){return(L=e((()=>{F(),I=P,P.__docgenInfo=Object.assign({displayName:P.name??P.__name},{exportName:`default`,displayName:`HkImg`,description:``,tags:{},props:[{name:`src`,description:`Address of the image. Leave it empty to show the placeholder instead.`,required:!0,type:{name:`string`}},{name:`alt`,description:`Short text that describes the image. Screen readers read it, and it shows when the image cannot load.`,required:!1,type:{name:`string`}},{name:`cover`,description:`Fill the whole box and cut off what does not fit. By default the whole image is shown.`,required:!1,type:{name:`boolean`}},{name:`eager`,description:`Load the image right away. By default it loads when it comes close to the screen.`,required:!1,type:{name:`boolean`}},{name:`aspectRatio`,description:`Shape of the box: width divided by height, for example 1 (square) or 1.8. Without it, the box takes the shape of the image, like a plain img does. It also gives the placeholder and the error message their shape, so give it when the picture might be missing.`,required:!1,type:{name:`AspectRatio`}},{name:`position`,description:`Which part of the image stays in view when it is cut off, for example "top" or "left center".`,required:!1,type:{name:`string`}},{name:`gradient`,description:`A color layer on top of the image. Write what goes inside the CSS linear-gradient(), for example: to bottom, rgba(0,0,0,0), rgba(0,0,0,0.4)`,required:!1,type:{name:`string`}},{name:`inheritColor`,description:`For an svg with one color: paint its shape with the text color, so a class such as "text-yellow-50" changes its color.
An svg inside an <img> cannot read the page's color, so the shape is used as a CSS mask instead.`,required:!1,type:{name:`boolean`}},{name:`fadeIn`,description:`Fade the image in after it has loaded. On by default; use :fade-in="false" to turn it off. Images already in the server-rendered page are shown at once, with no fade.`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`true`}}],events:[{name:`load`,type:{names:[`string`]}},{name:`error`,type:{names:[`string`]}}],slots:[{name:`placeholder`,description:`Shown until the image has loaded, and when there is no src. The image stays see-through underneath until it has loaded, so its square corners never show past a rounded placeholder.`},{name:`error`,description:`Replaces the image when it fails to load.`},{name:`default`,description:`Content on top of the image.`}],sourceFiles:[`/home/runner/work/hakka-ui/hakka-ui/packages/core/src/components/HkImg/HkImg.vue`]})})))()}var R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{g(),L(),R=new URL(`/hakka-ui/assets/corgi-CTEfaE_S.jpg`,``+import.meta.url).href,z=new URL(`data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20id='Combined%20Shape'%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M10.4307%203.48506L8.62116%207.15154C8.58475%207.22533%208.51436%207.27647%208.43293%207.2883L4.38672%207.87625C4.00586%207.93159%203.65386%208.11095%203.38522%208.38654C2.71059%209.07864%202.72475%2010.1866%203.41685%2010.8612L6.34471%2013.7152C6.40363%2013.7726%206.43052%2013.8554%206.41661%2013.9365L5.72544%2017.9663C5.66038%2018.3456%205.72218%2018.7358%205.90127%2019.0765C6.35102%2019.932%207.40912%2020.2609%208.2646%2019.8111L11.8836%2017.9085C11.9565%2017.8702%2012.0435%2017.8702%2012.1163%2017.9085L15.7353%2019.8111C16.076%2019.9902%2016.4662%2020.052%2016.8455%2019.987C17.7981%2019.8236%2018.4379%2018.9189%2018.2745%2017.9663L17.5833%2013.9365C17.5694%2013.8554%2017.5963%2013.7726%2017.6552%2013.7152L20.5831%2010.8612C20.8587%2010.5926%2021.038%2010.2406%2021.0934%209.85971C21.2324%208.90326%2020.5697%208.01523%2019.6132%207.87625L15.567%207.2883C15.4856%207.27647%2015.4152%207.22533%2015.3788%207.15154L13.5693%203.48506C13.3989%203.13993%2013.1196%202.86059%2012.7745%202.69026C11.9078%202.26252%2010.8584%202.61836%2010.4307%203.48506ZM12.1106%204.03536C12.1599%204.05969%2012.1998%204.0996%2012.2242%204.1489L14.0337%207.81539C14.2886%208.33189%2014.7813%208.68989%2015.3513%208.77271L19.3975%209.36066C19.5342%209.38052%2019.6288%209.50738%2019.609%209.64401C19.6011%209.69842%2019.5754%209.74871%2019.5361%209.78709L16.6082%2012.641C16.1958%2013.0431%2016.0076%2013.6223%2016.1049%2014.19L16.7961%2018.2199C16.8194%2018.356%2016.728%2018.4852%2016.592%2018.5086C16.5378%2018.5178%2016.482%2018.509%2016.4334%2018.4834L12.8143%2016.5808C12.3045%2016.3128%2011.6954%2016.3128%2011.1856%2016.5808L7.56659%2018.4834C7.44437%2018.5477%207.29322%2018.5007%207.22897%2018.3785C7.20338%2018.3298%207.19455%2018.2741%207.20385%2018.2199L7.89502%2014.19C7.99239%2013.6223%207.80418%2013.0431%207.39173%2012.641L4.46386%209.78709C4.36499%209.69071%204.36297%209.53243%204.45935%209.43356C4.49772%209.39419%204.54801%209.36857%204.60242%209.36066L8.64863%208.77271C9.21862%208.68989%209.71136%208.33189%209.96627%207.81539L11.7758%204.1489C11.8267%204.04573%2011.9393%203.99323%2012.0471%204.01396L12.1106%204.03536Z'%20fill='currentColor'/%3e%3c/svg%3e`,``+import.meta.url).href,B=`to bottom, rgba(0,0,0,0) 40%, rgba(0,0,175,0.75)`,V=e=>e.replace(/src="[^"]*\/corgi[^"]*\.jpg"/g,`src="/images/corgi.jpg"`),H={title:`Core/HkImg`,component:I,args:{src:R,alt:`A surprised corgi`,aspectRatio:`1`,class:`w-80`},argTypes:{aspectRatio:{control:`text`,table:{type:{summary:`string | number`}}},load:{description:`The image has loaded. It gets the src of the image.`},error:{description:`Event: the image failed to load, and it gets the src of the image. Slot: replaces the image when it fails to load.`},placeholder:{control:!1,table:{type:{summary:`content`}}},default:{control:!1,table:{type:{summary:`content`}}}},parameters:{docs:{description:{component:`Shows a picture inside a box. The box can have a fixed shape, a color layer on top, a gray block while the picture loads, and a message when it fails. Change a value in the Controls table and the picture updates. In the Controls table a number such as 320 means pixels, and text such as 50% is used as it is.`},source:{transform:V}}}},U={parameters:h({description:`A square picture, 320 pixels wide (the class w-80). Change aspectRatio in the Controls table to change its shape.`})},W={args:{cover:!0,aspectRatio:`16/9`,class:`w-80`},parameters:h({description:`A wide box (16/9) that the picture fills. What does not fit is cut off. Turn cover off to see the whole picture.`})},G={args:{cover:!0,gradient:B},render:e=>({components:{HkImg:I},setup:()=>({args:e}),template:`<hk-img v-bind="args"><p class="absolute bottom-2 left-3 m-0 text-white">Sold out</p></hk-img>`}),parameters:h({description:`A dark color layer lies over the bottom of the picture, with the text "Sold out" on top. Change gradient to change the color layer.`,code:`<hk-img
  src="/images/corgi.jpg"
  alt="A surprised corgi"
  :aspect-ratio="1"
  class="w-80"
  cover
  gradient="${B}"
>
  <p class="absolute bottom-2 left-3 m-0 text-white">Sold out</p>
</hk-img>`})},K={args:{src:``,class:``},render:e=>({components:{HkImg:I},setup:()=>({args:e}),template:`<div class="w-96 border border-dashed border-gray-400"><hk-img v-bind="args"><template #placeholder><div class="w-full h-full bg-gray-200" /></template></hk-img></div>`}),parameters:h({description:`The picture has no address, so a gray block shows in its place. With no picture the box fills the width of what holds it (the dashed frame, 24rem wide), and aspectRatio gives it its shape (here a square). The same shape is used by the picture, so the page does not jump when it loads.`,code:`<hk-img src="/images/corgi.jpg" alt="A surprised corgi" :aspect-ratio="1">
  <template #placeholder>
    <div class="w-full h-full bg-gray-200" />
  </template>
</hk-img>`})},q={args:{src:``,class:``,aspectRatio:void 0},render:e=>({components:{HkImg:I},setup:()=>({args:e}),template:`<div class="w-96 border border-dashed border-gray-400"><hk-img v-bind="args"><template #placeholder><div class="w-full h-full bg-gray-200" /></template></hk-img></div>`}),parameters:h({description:`No shape is given (no aspectRatio, no aspect class). A box with no picture still keeps a 1.8 wide to 1 tall shape and the width of what holds it, so a missing or broken picture never leaves a hole in the page. Give aspectRatio to use the shape of your picture instead.`,code:`<hk-img src="/images/corgi.jpg" alt="A surprised corgi">
  <template #placeholder>
    <div class="w-full h-full bg-gray-200" />
  </template>
</hk-img>`})},J={parameters:h({description:`The picture fades in after it has loaded. This is on by default; set fadeIn to false to turn it off. Reload this page to see it again.`})},Y={args:{src:`/this-image-does-not-exist.png`,class:``},render:e=>({components:{HkImg:I},setup:()=>({args:e}),template:`<div class="w-96 border border-dashed border-gray-400"><hk-img v-bind="args"><template #error><div class="grid place-items-center w-full h-full bg-gray-200">Image unavailable</div></template></hk-img></div>`}),parameters:h({description:`The picture address is wrong, so the picture cannot load. A message shows in its place, and the box fills the width of what holds it (the dashed frame, 24rem wide).`,code:`<hk-img src="/images/missing.png" alt="A surprised corgi" :aspect-ratio="1">
  <template #error>
    <div class="grid place-items-center w-full h-full bg-gray-200">Image unavailable</div>
  </template>
</hk-img>`})},X={args:{src:z,alt:`Star`,inheritColor:!0,aspectRatio:`1`,class:`w-24`},render:e=>({components:{HkImg:I},setup:()=>({args:e}),template:`<hk-img v-bind="args" class="text-pink" />`}),parameters:h({description:`An svg icon painted with the text color of its box. Here the color is pink. Use it for icons that have only one color.`,code:`<hk-img src="/icons/star.svg" alt="Star" inherit-color :aspect-ratio="1" class="w-24 text-pink" />`})},Z={args:{src:z,alt:`Star`,inheritColor:!0,aspectRatio:`1`,class:`w-24`},render:e=>({components:{HkImg:I},setup:()=>({args:e}),template:`<div class="p-6 bg-neutral-800 text-white"><hk-img v-bind="args" /></div>`}),parameters:h({description:`The icon has no color of its own, so it takes the white text color of the dark box around it.`,code:`<div class="p-6 bg-neutral-800 text-white">
  <hk-img src="/icons/star.svg" alt="Star" inherit-color :aspect-ratio="1" class="w-24" />
</div>`})},Q=[`Default`,`Cover`,`GradientWithContent`,`Placeholder`,`PlaceholderWithoutShape`,`FadeIn`,`ErrorFallback`,`InheritColor`,`InheritsTextColor`],U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  parameters: storyDocs({
    description: 'A square picture, 320 pixels wide (the class w-80). Change aspectRatio in the Controls table to change its shape.'
  })
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    cover: true,
    aspectRatio: '16/9',
    class: 'w-80'
  },
  parameters: storyDocs({
    description: 'A wide box (16/9) that the picture fills. What does not fit is cut off. Turn cover off to see the whole picture.'
  })
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: {
    cover: true,
    gradient: GRADIENT
  },
  render: args => ({
    components: {
      HkImg
    },
    setup: () => ({
      args
    }),
    template: '<hk-img v-bind="args"><p class="absolute bottom-2 left-3 m-0 text-white">Sold out</p></hk-img>'
  }),
  parameters: storyDocs({
    description: 'A dark color layer lies over the bottom of the picture, with the text "Sold out" on top. Change gradient to change the color layer.',
    code: \`<hk-img
  src="/images/corgi.jpg"
  alt="A surprised corgi"
  :aspect-ratio="1"
  class="w-80"
  cover
  gradient="\${GRADIENT}"
>
  <p class="absolute bottom-2 left-3 m-0 text-white">Sold out</p>
</hk-img>\`
  })
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: {
    src: '',
    class: ''
  },
  render: args => ({
    components: {
      HkImg
    },
    setup: () => ({
      args
    }),
    template: '<div class="w-96 border border-dashed border-gray-400"><hk-img v-bind="args"><template #placeholder><div class="w-full h-full bg-gray-200" /></template></hk-img></div>'
  }),
  parameters: storyDocs({
    description: 'The picture has no address, so a gray block shows in its place. With no picture the box fills the width of what holds it (the dashed frame, 24rem wide), and aspectRatio gives it its shape (here a square). The same shape is used by the picture, so the page does not jump when it loads.',
    code: \`<hk-img src="/images/corgi.jpg" alt="A surprised corgi" :aspect-ratio="1">
  <template #placeholder>
    <div class="w-full h-full bg-gray-200" />
  </template>
</hk-img>\`
  })
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: {
    src: '',
    class: '',
    aspectRatio: undefined
  },
  render: args => ({
    components: {
      HkImg
    },
    setup: () => ({
      args
    }),
    template: '<div class="w-96 border border-dashed border-gray-400"><hk-img v-bind="args"><template #placeholder><div class="w-full h-full bg-gray-200" /></template></hk-img></div>'
  }),
  parameters: storyDocs({
    description: 'No shape is given (no aspectRatio, no aspect class). A box with no picture still keeps a 1.8 wide to 1 tall shape and the width of what holds it, so a missing or broken picture never leaves a hole in the page. Give aspectRatio to use the shape of your picture instead.',
    code: \`<hk-img src="/images/corgi.jpg" alt="A surprised corgi">
  <template #placeholder>
    <div class="w-full h-full bg-gray-200" />
  </template>
</hk-img>\`
  })
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  parameters: storyDocs({
    description: 'The picture fades in after it has loaded. This is on by default; set fadeIn to false to turn it off. Reload this page to see it again.'
  })
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    src: '/this-image-does-not-exist.png',
    class: ''
  },
  render: args => ({
    components: {
      HkImg
    },
    setup: () => ({
      args
    }),
    template: '<div class="w-96 border border-dashed border-gray-400"><hk-img v-bind="args"><template #error><div class="grid place-items-center w-full h-full bg-gray-200">Image unavailable</div></template></hk-img></div>'
  }),
  parameters: storyDocs({
    description: 'The picture address is wrong, so the picture cannot load. A message shows in its place, and the box fills the width of what holds it (the dashed frame, 24rem wide).',
    code: \`<hk-img src="/images/missing.png" alt="A surprised corgi" :aspect-ratio="1">
  <template #error>
    <div class="grid place-items-center w-full h-full bg-gray-200">Image unavailable</div>
  </template>
</hk-img>\`
  })
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: {
    src: ICON_SRC,
    alt: 'Star',
    inheritColor: true,
    aspectRatio: '1',
    class: 'w-24'
  },
  render: args => ({
    components: {
      HkImg
    },
    setup: () => ({
      args
    }),
    template: '<hk-img v-bind="args" class="text-pink" />'
  }),
  parameters: storyDocs({
    description: 'An svg icon painted with the text color of its box. Here the color is pink. Use it for icons that have only one color.',
    code: \`<hk-img src="/icons/star.svg" alt="Star" inherit-color :aspect-ratio="1" class="w-24 text-pink" />\`
  })
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: {
    src: ICON_SRC,
    alt: 'Star',
    inheritColor: true,
    aspectRatio: '1',
    class: 'w-24'
  },
  render: args => ({
    components: {
      HkImg
    },
    setup: () => ({
      args
    }),
    template: '<div class="p-6 bg-neutral-800 text-white"><hk-img v-bind="args" /></div>'
  }),
  parameters: storyDocs({
    description: 'The icon has no color of its own, so it takes the white text color of the dark box around it.',
    code: \`<div class="p-6 bg-neutral-800 text-white">
  <hk-img src="/icons/star.svg" alt="Star" inherit-color :aspect-ratio="1" class="w-24" />
</div>\`
  })
}`,...Z.parameters?.docs?.source}}}})))()}$();export{W as Cover,U as Default,Y as ErrorFallback,J as FadeIn,G as GradientWithContent,X as InheritColor,Z as InheritsTextColor,K as Placeholder,q as PlaceholderWithoutShape,Q as __namedExportsOrder,H as default};