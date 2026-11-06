import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t,t as n}from"./storybook-Bmfw4Q-w.js";import{i as r,n as i,r as a,t as o}from"./HkIcon-CrAXZBsq.js";function s(e){return()=>({components:{HkIcon:o},setup(){return{names:e}},template:h})}var c,l,u,d,f,p,m,h,g,_,v;function y(){return(y=e((()=>{n(),i(),r(),c={title:`Icons/HkIcon`,component:o,args:{name:`stroke_add`,size:`32`},argTypes:{name:{control:`select`,options:Object.keys(a)},size:{control:`text`,table:{type:{summary:`string | number`}}},width:{control:`text`,table:{type:{summary:`string | number`}}},height:{control:`text`,table:{type:{summary:`string | number`}}},svgComponent:{control:!1}},parameters:{docs:{description:{component:`Small symbols in one style, such as arrows, warnings, add and delete. Pick a name in the Controls table to see the icon. In the Controls table a number such as 24 means pixels, and text such as 2rem is used as it is.`}}}},l={parameters:t({description:`One icon. Pick another name, or change the size, in the Controls table.`})},u=`stroke_`,d=`filled_`,f=Object.keys(a),p=f.filter(e=>e.startsWith(u)),m=f.filter(e=>e.startsWith(d)),h=`
  <div class="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
    <div v-for="name in names" :key="name" class="flex flex-col items-center gap-1">
      <HkIcon :name="name" size="32" />
      <code class="break-all text-center text-xs">{{ name }}</code>
    </div>
  </div>
`,g={parameters:t({description:`Every stroke icon with its name. Use the name as the name value of the icon.`,code:`<hk-icon name="stroke_add" :size="32" />`}),render:s(p)},_={parameters:t({description:`Every filled icon with its name. Names are grouped by the Figma component group: stroke icons start with stroke_ and filled icons start with filled_, such as filled_feeds.`,code:`<hk-icon name="filled_feeds" :size="32" />`}),render:s(m)},v=[`Default`,`StrokeIcons`,`FilledIcons`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  parameters: storyDocs({
    description: 'One icon. Pick another name, or change the size, in the Controls table.'
  })
}`,...l.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  parameters: storyDocs({
    description: 'Every stroke icon with its name. Use the name as the name value of the icon.',
    code: '<hk-icon name="stroke_add" :size="32" />'
  }),
  render: renderIconGrid(strokeNames)
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  parameters: storyDocs({
    description: 'Every filled icon with its name. Names are grouped by the Figma component group: stroke icons start with stroke_ and filled icons start with filled_, such as filled_feeds.',
    code: '<hk-icon name="filled_feeds" :size="32" />'
  }),
  render: renderIconGrid(filledNames)
}`,..._.parameters?.docs?.source}}}})))()}y();export{l as Default,_ as FilledIcons,g as StrokeIcons,v as __namedExportsOrder,c as default};