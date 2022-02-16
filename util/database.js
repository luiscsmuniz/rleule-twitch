const Database = require("@replit/database")
const db = new Database()


class Connect {
  insert = async (key, value) => {
    if (await db.set(key, value)) {
      return true
    }   
    return false
  }

  delete = async (key, value) => {
    if (await db.delete(key)) {
      return true
    }   
    return false
  }

  show = async (key) => {
    const value = await db.get(key)
    return value
  }

}

module.exports = Connect
