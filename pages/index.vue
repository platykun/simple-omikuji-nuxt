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

    <v-btn fab dark color="info">
      <v-icon dark @click="addRole">add</v-icon>
    </v-btn>

    <v-list light two-line>
      <template v-for="(role,index) in roles">
        <v-list-tile :key="role">
          <v-list-tile-action>
            <v-checkbox
              v-model="role.selected"
              :value="role.selected"/>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-text-field
              v-model="role.role"
              :value="role.role"/>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider
          v-if="index + 1 < role.length"
          :key="`role-divider-${index}`"/>
      </template>
    </v-list>

    <v-btn :to="reloadUrl">リロード</v-btn>
    <v-btn :to="resultUtl">結果作成</v-btn>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        users: [],
        roles: [],
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

      let queryRoles = context.query['roles'];
      let mappedSplitRoles = [];
      if (queryRoles != null) {
        mappedSplitRoles = queryRoles.split(',')
          .map(s => {
            return {
              "role": s,
              "selected": true
            }
          })
      }

      return {
        users: mappedSplitUsers,
        roles: mappedSplitRoles,
        descriptionFlag: false,
      };
    },
    computed: {
      // 結果画面のURLを作成する
      resultUtl() {
        let selectedUserName = this.users
          .filter(s => s.selected)
          .map(s => s.user);
        let selectedRoleName = this.roles
          .filter(s => s.selected)
          .map(s => s.role);
        let seed = Math.random();

        return "/result?"
          + "users=" + selectedUserName
          + "&roles=" + selectedRoleName
          + "&seed=" + seed;
      },
      // 入力画面を更新する
      reloadUrl() {
        let userNames = this.users.map(s => s.user);
        let roleNames = this.roles.map(s => s.role);
        return "/?users=" + userNames + "&roles=" + roleNames;
      }
    },
    methods: {
      // this.usersにユーザを追加する
      addUser() {
        this.users.push(
          {
            "user": "",
            "selected": true
          });
      },
      // this.rolesにユーザを追加する
      addRole() {
        console.log(this.roles);
        console.log(this.roles.size);
        const roleValue = this.roles.size;
        this.roles.push(
          {
            "role": roleValue,
            "selected": true
          }
        )
      }
    }
  };
</script>
