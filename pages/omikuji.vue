<template>
  <div>
    omikuji
    {{ users }}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        users: "",
      };
    },
    asyncData(context) {
      // TODO context.query['users']をカンマ区切りで配列化
      // TODO 引数が空になった時には空文字
      return {
        users: context.query['users']
      }
    },
  }
</script>
