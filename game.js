const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let player;
let cursors;
let fruits;
let score = 0;
let scoreText;

const game = new Phaser.Game(config);

function preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('fruit', 'assets/fruits.png');
    this.load.spritesheet('character1', 'assets/character1.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('character2', 'assets/character2.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('character3', 'assets/character3.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {
    // Background and ground
    this.add.image(400, 300, 'background');
    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    // Player creation
    player = this.physics.add.sprite(100, 450, 'character1');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // Animations
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('character1', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'character1', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('character1', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    // Fruits
    fruits = this.physics.add.group({
        key: 'fruit',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    fruits.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    // Score text
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

    // Collisions
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(fruits, platforms);

    this.physics.add.overlap(player, fruits, collectFruit, null, this);

    // Input
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}

function collectFruit(player, fruit) {
    fruit.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
    // Power up logic can be added here
}
