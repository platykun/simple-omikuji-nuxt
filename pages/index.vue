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
              v-model="user.selected"
              :value="user.selected"/>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-text-field
              v-model="user.user"
              :value="user.user"/>
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
        descriptionFlag: false,
      };
    },
    asyncData(context) {
      let queryUsers = context.query['users'];

      if (queryUsers == null) {
        return {
          descriptionFlag: true,
        }
      }

      let mappedSplitUsers = queryUsers
        .split(',')
        .map(s => {
            return {
              "user": s,
              "selected": true
            }
          }
        );

      return {
        users: mappedSplitUsers,
        descriptionFlag: false,
      };
    },
    computed: {
      resultUtl() {
        let selectedUserName = this.users
          .filter(s => s.selected)
          .map(s => s.user);
        let seed = Math.random();

        return "/result?users=" + selectedUserName + "&seed=" + seed;
      }
    },
    methods: {
      addUser() {
        this.users.push(
          {
            "user": "",
            "selected": true
          });
      }
    }
  };
</script>
