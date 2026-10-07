import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{i as t,n,r,t as i}from"./HkIcon-CQ4EdarL.js";var a,o,s,c,l;function u(){return(u=e((()=>{n(),t(),a=e=>({docs:{source:{code:e}}}),o={title:`Icons/HkIcon`,component:i,args:{name:`add`,size:32},argTypes:{name:{control:`select`,options:Object.keys(r)}}},s={},c={parameters:a(`<hk-icon v-for="name in names" :key="name" :name="name" :size="32" />`),render:()=>({components:{HkIcon:i},setup(){return{names:Object.keys(r)}},template:`
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:16px">
        <div v-for="name in names" :key="name" style="display:flex;flex-direction:column;align-items:center;gap:4px">
          <HkIcon :name="name" size="32" />
          <code style="font-size:12px">{{ name }}</code>
        </div>
      </div>
    `})},l=[`Default`,`AllIcons`],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}}})))()}u();export{c as AllIcons,s as Default,l as __namedExportsOrder,o as default};