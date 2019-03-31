<template>
  <div>
    <dev v-if="descriptionFlag">
      Please add query parameter "users" like
      <br>http://localhost:3000/?users=nannany,platykun
    </dev>
    <br>
    <v-btn fab dark color="info">
      <v-icon dark @click="addUser">add</v-icon>
    </v-btn>

    <v-list light two-line>
      <template v-for="(user,index) in users">
        <v-list-tile :key="user">
          <v-list-tile-action>
            <v-checkbox
              v-model="selected"
              :value="user"/>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-text-field
              v-model="users[index]"
              :value="user"/>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider
          v-if="index + 1 < users.length"
          :key="`user-divider-${index}`"/>
      </template>
    </v-list>


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
        selected: splitUsers,
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
      addUser() {
        this.users.push("");
      }
    }
  };
</script>
