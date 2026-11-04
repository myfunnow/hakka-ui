import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./storybook-ZazsUxr2.js";import{i as r,n as i,r as a,t as o}from"./HkIcon-JEduLVAG.js";function s(e){return()=>({components:{HkIcon:o},setup(){return{names:e}},template:m})}var c,l,u,d,f,p,m,h,g,_;function v(){return(v=e((()=>{n(),i(),r(),c={title:`Icons/HkIcon`,component:o,args:{name:`add`,size:`32`},argTypes:{name:{control:`select`,options:Object.keys(a)},size:{control:`text`,table:{type:{summary:`string | number`}}},width:{control:`text`,table:{type:{summary:`string | number`}}},height:{control:`text`,table:{type:{summary:`string | number`}}},svgComponent:{control:!1}},parameters:{docs:{description:{component:`Small symbols in one style, such as arrows, warnings, add and delete. Pick a name in the Controls table to see the icon. In the Controls table a number such as 24 means pixels, and text such as 2rem is used as it is.`}}}},l={parameters:t({description:`One icon. Pick another name, or change the size, in the Controls table.`})},u=`-filled`,d=Object.keys(a),f=d.filter(e=>!e.endsWith(u)),p=d.filter(e=>e.endsWith(u)),m=`
  <div class="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-4">
    <div v-for="name in names" :key="name" class="flex flex-col items-center gap-1">
      <HkIcon :name="name" size="32" />
      <code class="text-xs">{{ name }}</code>
    </div>
  </div>
`,h={parameters:t({description:`Every stroke icon with its name. Use the name as the name value of the icon.`,code:`<hk-icon name="add" :size="32" />`}),render:s(f)},g={parameters:t({description:`Every filled icon with its name. A filled icon has the same name as its stroke icon plus the -filled suffix, such as feeds-filled.`,code:`<hk-icon name="feeds-filled" :size="32" />`}),render:s(p)},_=[`Default`,`StrokeIcons`,`FilledIcons`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  parameters: storyDocs({
    description: 'One icon. Pick another name, or change the size, in the Controls table.'
  })
}`,...l.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  parameters: storyDocs({
    description: 'Every stroke icon with its name. Use the name as the name value of the icon.',
    code: '<hk-icon name="add" :size="32" />'
  }),
  render: renderIconGrid(strokeNames)
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  parameters: storyDocs({
    description: 'Every filled icon with its name. A filled icon has the same name as its stroke icon plus the -filled suffix, such as feeds-filled.',
    code: '<hk-icon name="feeds-filled" :size="32" />'
  }),
  render: renderIconGrid(filledNames)
}`,...g.parameters?.docs?.source}}}})))()}v();export{l as Default,g as FilledIcons,h as StrokeIcons,_ as __namedExportsOrder,c as default};