<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <h2>結果表示</h2>

    <v-data-table
      :items="shuffledUsers"
      class="elevation-1"
      hide-actions
      :headers="headers"
    >
      <template v-slot:items="props">
        <td>{{props.item.role}}</td>
        <td>{{ props.item.user}}</td>
      </template>
    </v-data-table>

    <v-btn>URLを共有</v-btn>
    <v-btn>結果をクリップボードにコピー</v-btn>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        headers: [
          {
            text: '役割',
            sortable: false,
            value: 'role'
          }, {
            text: '名前',
            sortable: false,
            value: 'user'
          },
        ],
        users: [],
        shuffledUsers: [
          {
            role: "S",
            user: "hoge"
          },
          {
            role: "P",
            user: "piyo"
          },
          {
            role: "D",
            user: "ほげ"
          },
          {
            role: "D",
            user: "ぴよ"
          },
        ],
        selected: "",
        seed: ""
      };
    },
    asyncData(context) {
      // TODO 引数が空になった時には空文字
      let splitUsers = context.query['users'].split(',');
      let seed = context.query['seed'];

      return {
        users: splitUsers,
        seed: seed,
      }
    },
  }
</script>
