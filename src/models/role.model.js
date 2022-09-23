class Role {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static getAllRoles() {
    const roles = [];
    [
      {
        id: 'admin',
        name: 'Admin',
      },
      {
        id: 'editor',
        name: 'Editor',
      },
    ].forEach(role => {
      roles.push(new Role(role.id, role.name));
    })
    return roles
  }

  static getRoleById(id) {
    
  }

  getRoleInfo() {
    return `${this.id}: ${this.name}`;
  }
}

module.exports = Role;