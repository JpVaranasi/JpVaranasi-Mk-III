// Basic Phaser.js setup for a 2D F1 time trial game
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    }
};

const game = new Phaser.Game(config);
let car;

function preload() {
    this.load.image('car', 'car.jpg',);
     // Replace with actual image path
}

function create() {
    this.add.rectangle(400, 300, 600, 400, 0xffffff).setStrokeStyle(2, 0x000000); // Simple track outline
    car = this.physics.add.sprite(400, 500, 'car');
    car.setCollideWorldBounds(true);
}

function update() {
    const cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
        car.setAngularVelocity(-150);
    } else if (cursors.right.isDown) {
        car.setAngularVelocity(150);
    } else {
        car.setAngularVelocity(0);
    }

    if (cursors.up.isDown) {
        this.physics.velocityFromRotation(car.rotation, 200, car.body.velocity);
    } else {
        car.setVelocity(0);
    }
}
