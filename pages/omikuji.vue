<template>
  <div>
    omikuji
    <br>
    // TODO 複数選択できない
    <v-container fluid>
      <v-flex v-for="(user,index) in users" :key="index">
        <v-checkbox v-model="selected" :label="user" :value="user">{{user}}</v-checkbox>
      </v-flex>
    </v-container>
    <v-btn @click="shuffle">シャッフルボタン</v-btn>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        users: [],
        selected: [],
        selectedUsers: [],
        array: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      };
    },
    asyncData(context) {
      // TODO context.query['users']をカンマ区切りで配列化
      // TODO 引数が空になった時には空文字
      let splitUsers = context.query['users'].split(',');

      return {
        users: splitUsers,
      }
    },
    computed: {
      randomValue() {
        return Math.random();
      },
    },
    methods: {
      shuffle() {
        console.log("called");

        for (let i = this.array.length - 1; i >= 0; i--) {

          // 0~iのランダムな数値を取得
          let rand = Math.floor(Math.random() * (i + 1));

          // 配列の数値を入れ替える
          [this.array[i], this.array[rand]] = [this.array[rand], this.array[i]]
        }

        //TODO シャッフルする対象の配列の修正
        console.log(this.array);
      }
    }
  }
</script>
