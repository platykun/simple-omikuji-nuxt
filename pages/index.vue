<template>
  <div>
    <dev v-if="descriptionFlag">
      Please add query parameter "users" like
      <br>http://localhost:3000/?users=nannany,platykun
    </dev>
    <br>
    <v-container fluid>
      <v-flex v-for="(user,index) in users" :key="index">
        <v-checkbox v-model="selected" :label="user" :value="user">{{user}}</v-checkbox>
      </v-flex>
    </v-container>
    <v-btn @click="shuffle">シャッフルボタン</v-btn>
    <v-btn :to="resultUtl">結果作成</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      selected: [],
      array: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      descriptionFlag: true
    };
  },
  asyncData(context) {
    let descriptionFlag = context.query["users"] == null ? true : false;
    let splitUsers;
    if (!descriptionFlag) {
      splitUsers = context.query["users"].split(",");
    }

    return {
      users: splitUsers,
      descriptionFlag: descriptionFlag
    };
  },
  computed: {
    resultUtl() {
      let users = "users=" + this.selected;
      // TODO sheed値の桁数などは要検討
      let seed = "seed=" + Math.random();

      return "/result?" + users + "&" + seed;
    }
  },
  methods: {
    shuffle() {
      console.log("called");

      for (let i = this.array.length - 1; i >= 0; i--) {
        // 0~iのランダムな数値を取得
        let rand = Math.floor(Math.random() * (i + 1));

        // 配列の数値を入れ替える
        [this.array[i], this.array[rand]] = [this.array[rand], this.array[i]];
      }

      //TODO シャッフルする対象の配列の修正
      console.log(this.array);
    }
  }
};
</script>
