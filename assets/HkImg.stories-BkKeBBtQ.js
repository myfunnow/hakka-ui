import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{A as t,C as n,D as r,H as i,I as a,V as o,c as s,d as c,h as l,j as u,n as d,s as f,u as p,w as m}from"./iframe-CZAPofl1.js";import{n as h,t as g}from"./_plugin-vue_export-helper-BqBa3wPr.js";function _(e){return e.startsWith(`/`)&&!e.startsWith(`//`)}function v(e,t){return!t||!S.test(t)?!1:e.startsWith(t.endsWith(`/`)?t:`${t}/`)}function y(e,{isDev:t,publicBase:n}){if(!t&&x.test(e)&&(_(e)||v(e,n)))return e.replace(/\.\w+$/,`.webp`)}function b(){let{__publicAssetsURL:e}=globalThis;return{isDev:!1,publicBase:e?.()}}var x,S;function C(){return(C=e((()=>{x=/\.(png|jpe?g)$/i,S=/^https?:\/\//i})))()}function w(e){if(e!==void 0&&e!==``)return Number.isNaN(Number(e))?`${e}`:`${e}px`}var T,E,D,O,k,A,j;function M(){return(M=e((()=>{d(),C(),T={key:0,class:`hk-img__layer`},E=[`srcset`],D=[`src`,`alt`,`loading`],O={key:2,class:`hk-img__layer`},k={key:3,class:`hk-img__layer`},A={class:`hk-img__content`},j=l({__name:`HkImg`,props:{src:{},alt:{},cover:{type:Boolean},eager:{type:Boolean},aspectRatio:{},width:{},height:{},maxWidth:{},maxHeight:{},minWidth:{},minHeight:{},position:{},gradient:{}},emits:[`load`,`error`],setup(e,{emit:l}){let d=e,h=l,g=t(`img`),_=a(!1),v=a(!1),x=a(),S=f(()=>y(d.src,b())),C=f(()=>{let e=d.aspectRatio??x.value;return{width:w(d.width),height:w(d.height),maxWidth:w(d.maxWidth),maxHeight:w(d.maxHeight),minWidth:w(d.minWidth),minHeight:w(d.minHeight),aspectRatio:e===void 0?void 0:`${e}`}});function j(){let{naturalWidth:e=0,naturalHeight:t=0}=g.value??{};e&&t&&(x.value=e/t),_.value=!0,h(`load`,d.src)}function M(){v.value=!0,h(`error`,d.src)}return n(()=>{let e=g.value;e?.complete&&(e.naturalWidth>0?j():M())}),u(()=>d.src,()=>{_.value=!1,v.value=!1,x.value=void 0}),(t,n)=>(m(),c(`div`,{class:`hk-img`,style:i(C.value)},[e.src&&!v.value?(m(),c(`picture`,T,[S.value?(m(),c(`source`,{key:0,srcset:S.value,type:`image/webp`},null,8,E)):p(``,!0),s(`img`,{ref:`img`,class:o([`hk-img__layer hk-img__image`,{"hk-img__image--cover":e.cover}]),src:e.src,alt:e.alt,loading:e.eager?`eager`:`lazy`,style:i({objectPosition:e.position}),onLoad:j,onError:M},null,46,D)])):p(``,!0),e.gradient?(m(),c(`div`,{key:1,class:`hk-img__layer hk-img__gradient`,style:i({backgroundImage:`linear-gradient(${e.gradient})`})},null,4)):p(``,!0),t.$slots.placeholder&&!_.value&&!v.value?(m(),c(`div`,O,[r(t.$slots,`placeholder`,{},void 0,!0)])):p(``,!0),t.$slots.error&&v.value?(m(),c(`div`,k,[r(t.$slots,`error`,{},void 0,!0)])):p(``,!0),s(`div`,A,[r(t.$slots,`default`,{},void 0,!0)])],4))}})})))()}var N;function P(){return(P=e((()=>{M(),h(),N=g(j,[[`__scopeId`,`data-v-3fada655`]]),j.__docgenInfo=Object.assign({displayName:j.name??j.__name},{exportName:`default`,displayName:`HkImg`,description:``,tags:{},props:[{name:`src`,required:!0,type:{name:`string`}},{name:`alt`,required:!1,type:{name:`string`}},{name:`cover`,required:!1,type:{name:`boolean`}},{name:`eager`,required:!1,type:{name:`boolean`}},{name:`aspectRatio`,required:!1,type:{name:`CssSize`}},{name:`width`,required:!1,type:{name:`CssSize`}},{name:`height`,required:!1,type:{name:`CssSize`}},{name:`maxWidth`,required:!1,type:{name:`CssSize`}},{name:`maxHeight`,required:!1,type:{name:`CssSize`}},{name:`minWidth`,required:!1,type:{name:`CssSize`}},{name:`minHeight`,required:!1,type:{name:`CssSize`}},{name:`position`,description:`object-position of the image`,required:!1,type:{name:`string`}},{name:`gradient`,description:"The inside of a linear-gradient(), for example `to bottom, rgba(0,0,0,0), rgba(0,0,0,0.4)`",required:!1,type:{name:`string`}}],events:[{name:`load`,type:{names:[`string`]}},{name:`error`,type:{names:[`string`]}}],slots:[{name:`placeholder`},{name:`error`},{name:`default`}],sourceFiles:[`/home/runner/work/hakka-ui/hakka-ui/packages/core/src/components/HkImg/HkImg.vue`]})})))()}var F,I,L,R,z,B,V,H;function U(){return(U=e((()=>{P(),F=`data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22640%22%20height%3D%22360%22%3E%3Crect%20width%3D%22640%22%20height%3D%22360%22%20fill%3D%22%23ffd9c9%22%2F%3E%3Ccircle%20cx%3D%22320%22%20cy%3D%22180%22%20r%3D%2290%22%20fill%3D%22%23ff5537%22%2F%3E%3C%2Fsvg%3E`,I={title:`Core/HkImg`,component:N,args:{src:F,alt:`Sample`,aspectRatio:`16/9`,width:320}},L={},R={args:{cover:!0,aspectRatio:1,width:240}},z={args:{gradient:`to bottom, rgba(0,0,0,0), rgba(0,0,0,0.4)`},render:e=>({components:{HkImg:N},setup:()=>({args:e}),template:`<hk-img v-bind="args"><p style="position: absolute; bottom: 8px; left: 12px; margin: 0; color: #fff">Sold out</p></hk-img>`})},B={args:{src:``},render:e=>({components:{HkImg:N},setup:()=>({args:e}),template:`<hk-img v-bind="args"><template #placeholder><div style="width: 100%; height: 100%; background: #eee" /></template></hk-img>`})},V={args:{src:`/this-image-does-not-exist.png`},render:e=>({components:{HkImg:N},setup:()=>({args:e}),template:`<hk-img v-bind="args"><template #error><div style="display: grid; place-items: center; width: 100%; height: 100%; background: #eee">Image unavailable</div></template></hk-img>`})},H=[`Default`,`Cover`,`GradientWithContent`,`Placeholder`,`ErrorFallback`],L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    cover: true,
    aspectRatio: 1,
    width: 240
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    gradient: 'to bottom, rgba(0,0,0,0), rgba(0,0,0,0.4)'
  },
  render: args => ({
    components: {
      HkImg
    },
    setup: () => ({
      args
    }),
    template: '<hk-img v-bind="args"><p style="position: absolute; bottom: 8px; left: 12px; margin: 0; color: #fff">Sold out</p></hk-img>'
  })
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    src: ''
  },
  render: args => ({
    components: {
      HkImg
    },
    setup: () => ({
      args
    }),
    template: '<hk-img v-bind="args"><template #placeholder><div style="width: 100%; height: 100%; background: #eee" /></template></hk-img>'
  })
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    src: '/this-image-does-not-exist.png'
  },
  render: args => ({
    components: {
      HkImg
    },
    setup: () => ({
      args
    }),
    template: '<hk-img v-bind="args"><template #error><div style="display: grid; place-items: center; width: 100%; height: 100%; background: #eee">Image unavailable</div></template></hk-img>'
  })
}`,...V.parameters?.docs?.source}}}})))()}U();export{R as Cover,L as Default,V as ErrorFallback,z as GradientWithContent,B as Placeholder,H as __namedExportsOrder,I as default};