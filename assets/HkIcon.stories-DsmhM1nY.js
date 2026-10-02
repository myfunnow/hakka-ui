import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{i as t,n,r,t as i}from"./HkIcon-eugu9thn.js";var a,o,s,c;function l(){return(l=e((()=>{n(),t(),a={title:`Icons/HkIcon`,component:i,args:{name:`add`,size:32},argTypes:{name:{control:`select`,options:Object.keys(r)}}},o={},s={render:()=>({components:{HkIcon:i},setup(){return{names:Object.keys(r)}},template:`
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:16px">
        <div v-for="name in names" :key="name" style="display:flex;flex-direction:column;align-items:center;gap:4px">
          <HkIcon :name="name" size="32" />
          <code style="font-size:12px">{{ name }}</code>
        </div>
      </div>
    `})},c=[`Default`,`AllIcons`],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}}})))()}l();export{s as AllIcons,o as Default,c as __namedExportsOrder,a as default};