let primaryKey = 0;
const db = new Map();

class User {
  /**
   *
   * @param {object} fields
   * @param {string} fields.firstName
   * @param {string} fields.lastName
   * @param {string} fields.email
   * @param {number} fields.age
   * @param {string} fields.gender
   * @param {string} fields.password
   * 
   * 
   * firstName: string;
    lastName: string;
    email: string;
    age: number (0...120);
    gender: string ('male' | 'female' | 'other');
    password: string (password must be at least 8 characters long, be of mixed case and also contain a digit or symbol. );
   */
  constructor(fields) {
    for (const key in fields) {
      if (fields.hasOwnProperty(key)) {
        this[key] = fields[key];
      }
    }
    this.id = String(++primaryKey);
    this.createdAt = new Date();
  }

  update(fields) {
    for (const key in fields) {
      if (fields.hasOwnProperty(key)) {
        this[key] = fields[key];
      }
    }
    return Promise.resolve(this);
  }
}

User.create = function (fields) {
  const newUser = new User(fields);
  db.set(newUser.id.toString(), newUser);
  return Promise.resolve(newUser);
};

User.findById = function (userId) {
  return Promise.resolve(db.get(userId));
};

User.findAll = function () {
  return Promise.resolve([...db.values()]);
};

User.remove = function (userId) {
  return Promise.resolve(db.delete(userId));
};

module.exports = User;
console.log("db", db.toString());
