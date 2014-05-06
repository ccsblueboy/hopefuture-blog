var object = Object.create(null);
/*jshint -W089 */
//忽略 forin 的校验
for (var prop in object) {
  console.info(prop);
}
