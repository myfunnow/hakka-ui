import { ref } from "vue";
import ZdPagination from "./zd-pagination.vue";

export default {
  title: "Pagination",
  component: ZdPagination,
};

export const Template = {
  render: (args) => ({
    components: { ZdPagination },
    setup() {
      const page = ref(1);
      const updateModel = (val: number) => (page.value = val);

      return {
        args,
        page,
        updateModel,
      };
    },
    template: '<zd-pagination v-bind="args" v-model="page"/>',
  }),
};
