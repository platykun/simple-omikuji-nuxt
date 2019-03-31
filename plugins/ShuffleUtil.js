import seedRandom from 'seedrandom'

export default class ShuffleUtil {
  static shuffle(roles, users, seed) {
    let seedRandomMethod = seedRandom.alea(seed);

    for (let i = users.length - 1; i >= 0; i--) {
      // 0~iのランダムな数値を取得
      let rand = Math.floor(seedRandomMethod() * (i + 1));

      // 配列の数値を入れ替える
      [users[i], users[rand]] = [users[rand], users[i]]
    }

    let userRoleList = users.map((user, index) => {
      let userRole = {};
      userRole.role = roles[index];
      userRole.user = user;
      return userRole;
    });

    return userRoleList;
  }
}
