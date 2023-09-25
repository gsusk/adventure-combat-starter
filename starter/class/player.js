const { Character } = require('./character');
const { Enemy } = require('./enemy');
const { Food } = require('./food');

class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0; i < this.items.length; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {
    let items = this.currentRoom.items.filter(item => {
      if (item.name === itemName) {
        this.items.push(item)
        return false;
      }
      return true
    })

    this.currentRoom.items = items;

  }

  dropItem(itemName) {
    let item = this.items.find(item => item.name === itemName);
    this.currentRoom.items.push(item);
    this.items.splice(this.items.indexOf(item), 1)
  }

  eatItem(itemName) {
    let item = this.items.filter(itm => itm.name === itemName)[0]
    if (item instanceof Food) {
      this.items.splice(this.items.indexOf(item), 1)
    }
  }

  getItemByName(name) {
    let items = this.items.reduce((searchItem, item) => {
      if (item.name === name) {
        return item;
      }
      return searchItem;
    }, {})
    return items
  }

  hit(name) {
    const enemy = this.currentRoom.getEnemyByName(name);

    if (!(enemy.name)) {
      return;
    }

    enemy.applyDamage(this.strength);
    enemy.attackTarget = this;
    // Fill this in

  }

  die() {
    console.log("You are dead!");
    process.exit();
  }

}

module.exports = {
  Player,
};
