<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <h2>結果表示</h2>

    <v-data-table :items="shuffledUsers" class="elevation-1" hide-actions :headers="headers">
      <template v-slot:items="props">
        <td>{{props.item.role}}</td>
        <td>{{ props.item.user}}</td>
      </template>
    </v-data-table>

    <v-btn>URLを共有</v-btn>
    <v-btn @click="copyToClipboard">結果をクリップボードにコピー</v-btn>
  </div>
</template>

<script>
import ShuffleUtil from "~/plugins/ShuffleUtil";
import copy from "copy-to-clipboard";

export default {
  data() {
    return {
      headers: [
        {
          text: "役割",
          sortable: false,
          value: "role"
        },
        {
          text: "名前",
          sortable: false,
          value: "user"
        }
      ],
      shuffledUsers: []
    };
  },
  asyncData(context) {
    let seedValue = context.query["seed"];
    let roleList = ["S", "P", "D", "D", "D", "D", "D", "D", "D", "D"];
    let users = context.query["users"].split(",");

    let shuffledUsers = ShuffleUtil.shuffle(roleList, users, seedValue);

    return {
      shuffledUsers: shuffledUsers
    };
  },
  methods: {
    copyToClipboard() {
      let toClipboard = "";
      for (let shuffledUser of this.shuffledUsers) {
        toClipboard += shuffledUser.role + ":" + shuffledUser.user + "\r\n";
      }
      copy(toClipboard);
    }
  }
};
</script>
