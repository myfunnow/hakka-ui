import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./storybook-Dtz3QNhJ.js";import{i as r,n as i,r as a,t as o}from"./HkIcon-CvyReWnd.js";var s,c,l,u;function d(){return(d=e((()=>{t(),i(),r(),s={title:`Icons/HkIcon`,component:o,args:{name:`add`,size:32},argTypes:{name:{control:`select`,options:Object.keys(a)}}},c={},l={parameters:n(`<hk-icon v-for="name in names" :key="name" :name="name" :size="32" />`),render:()=>({components:{HkIcon:o},setup(){return{names:Object.keys(a)}},template:`
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:16px">
        <div v-for="name in names" :key="name" style="display:flex;flex-direction:column;align-items:center;gap:4px">
          <HkIcon :name="name" size="32" />
          <code style="font-size:12px">{{ name }}</code>
        </div>
      </div>
    `})},u=[`Default`,`AllIcons`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  parameters: exampleCode('<hk-icon v-for="name in names" :key="name" :name="name" :size="32" />'),
  render: () => ({
    components: {
      HkIcon
    },
    setup() {
      return {
        names: Object.keys(iconMap) as IconName[]
      };
    },
    template: \`
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:16px">
        <div v-for="name in names" :key="name" style="display:flex;flex-direction:column;align-items:center;gap:4px">
          <HkIcon :name="name" size="32" />
          <code style="font-size:12px">{{ name }}</code>
        </div>
      </div>
    \`
  })
}`,...l.parameters?.docs?.source}}}})))()}d();export{l as AllIcons,c as Default,u as __namedExportsOrder,s as default};