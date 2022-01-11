<template>
  <Title :title="title" :link="link" :type="type" />
</template>

<script>
import Title from "../../components/Title.vue";

export default {
  components: {
    Title,
  },
  data() {
    return {
      title: "🚚 Fournisseurs",
      link: "/app/providers",
      type: "fournisseur",
    };
  },
  mounted() {
    this.$store.commit("setHeader", [
      {
        name: this.title,
        link: this.link,
      },
    ]);
  },
};
</script>
