const { Character } = require('./character');


class Enemy extends Character {
  constructor(name, description, currentRoom) {
    super(name, description, currentRoom)
    this.cooldown = 3000;
    this.attackTarget = null;
    this.add = this.cooldown / 3
  }

  setPlayer(player) {
    this.player = player;
  }


  randomMove() {
    // Fill this in
    this.cooldown += this.add;
    const exit = Object.keys(this.currentRoom.exits)
    const newRoom = Math.floor(Math.random() * exit.length)
    const room = this.currentRoom.exits[exit[newRoom]]
    this.currentRoom = room
  }

  takeSandwich() {
    // Fill this in
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = function () {
      this.cooldown = 0;
      this.act();
    };
    setTimeout(resetCooldown, this.cooldown);
  }

  attack() {
    this.cooldown += this.add;
    if (this.attackTarget) {
      this.attackTarget.applyDamage(this.strength);
    }
  }

  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.rest();
    } else {
      this.scratchNose();
      this.rest();
      if (this.player.currentRoom !== this.currentRoom) this.randomMove();
      this.rest();
    }

    // Fill this in
  }


  scratchNose() {
    this.cooldown += 1000;

    this.alert(`${this.name} scratches its nose`);

  }


}

module.exports = {
  Enemy,
};
