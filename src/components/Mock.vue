<template>
  <div></div>
</template>

<script>
import api from "@/api"

export default {
  name: "mock",
  data() {
    return {
      list: [],
    };
  },
  methods: {
    getList() {
      console.log(api.forum)
      api.user.getList().then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
  },
  mounted () {
    this.getList();
  },
};
</script>

<style scoped>
</style>