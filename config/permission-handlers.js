const handlingPermission = (roleAllowed, msg) => {
  return msg.member.roles.cache.some((role) => roleAllowed.includes(role.id));
};
module.exports = { handlingPermission };
