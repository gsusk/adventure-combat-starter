class Character {

  constructor(name, description, currentRoom) {
    // Fill this in
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;
    this.items = []
    this.health = 100;
    this.strength = 10;
  }

  applyDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.die()
    }
  }

  die() {
    console.log(`You Died:${this.name, this.description} in ${this.currentRoom}`);
    let idx = 0;
    while (this.items.length > idx) {
      this.currentRoom.items.push(this.items[idx])
      idx++
    }
    this.items = [];
    this.currentRoom = null;
  }

}

module.exports = {
  Character,
};
