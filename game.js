import java.util.ArrayList;
import java.util.List;

// Classe pour représenter un joueur
class Player {
    private String name;
    private int health;
    private int fruitsCollected;
    private SpecialAttack specialAttack;

    public Player(String name, SpecialAttack specialAttack) {
        this.name = name;
        this.health = 100;
        this.fruitsCollected = 0;
        this.specialAttack = specialAttack;
    }

    public void collectFruit() {
        fruitsCollected++;
        increaseAttackPower();
    }

    public void takeDamage(int damage) {
        health -= damage;
        if (health <= 0) {
            System.out.println(name + " a été vaincu !");
            // Gérer la défaite du joueur
        }
    }

    public void increaseAttackPower() {
        // Augmenter la puissance des attaques spéciales en fonction des fruits collectés
    }

    public void useSpecialAttack() {
        specialAttack.execute();
    }

    // Getters et Setters
    public int getHealth() { return health; }
    public int getFruitsCollected() { return fruitsCollected; }
}

// Interface pour représenter une attaque spéciale
interface SpecialAttack {
    void execute();
}

// Exemple d'attaque spéciale : Rugissement puissant
class Roar implements SpecialAttack {
    public void execute() {
        System.out.println("Rugissement puissant! Les ennemis sont paralysés.");
        // Logique pour paralyser les ennemis
    }
}

// Classe pour représenter un dinosaure
class Dinosaur {
    private int health;
    private int damage;
    private List<Projectile> projectiles;

    public Dinosaur(int health, int damage) {
        this.health = health;
        this.damage = damage;
        this.projectiles = new ArrayList<>();
    }

    public void shootProjectile() {
        // Logique pour tirer des projectiles
        System.out.println("Le dinosaure tire un projectile!");
        projectiles.add(new Projectile(10, 10, 0, 0));
    }

    public void takeDamage(int damage) {
        health -= damage;
        if (health <= 0) {
            System.out.println("Le dinosaure a été vaincu!");
            // Gérer la défaite du dinosaure
        }
    }

    // Getters et Setters
    public int getHealth() { return health; }
}

// Classe pour représenter un projectile
class Projectile {
    private int speed;
    private int damage;
    private int x, y;

    public Projectile(int speed, int damage, int x, int y) {
        this.speed = speed;
        this.damage = damage;
        this.x = x;
        this.y = y;
    }

    public void move() {
        // Logique pour déplacer le projectile
        x += speed;
        System.out.println("Le projectile se déplace.");
    }

    public boolean checkCollision(Player player) {
        // Logique pour vérifier la collision avec un joueur
        return false;
    }

    // Getters et Setters
    public int getDamage() { return damage; }
}

// Classe pour représenter un fruit
class Fruit {
    private int x, y;

    public Fruit(int x, int y) {
        this.x = x;
        this.y = y;
    }

    // Getters et Setters
}

// Classe principale pour gérer le jeu
public class DinosaurGame {
    private Player player;
    private List<Dinosaur> dinosaurs;
    private List<Fruit> fruits;

    public DinosaurGame() {
        // Initialisation des éléments du jeu
        player = new Player("T-Rex", new Roar());
        dinosaurs = new ArrayList<>();
        fruits = new ArrayList<>();
    }

    public void startGame() {
        System.out.println("Le jeu commence!");

        // Logique pour démarrer le jeu, par exemple, créer des dinosaures et des fruits
        dinosaurs.add(new Dinosaur(100, 10));
        fruits.add(new Fruit(100, 100));
    }

    public void gameLoop() {
        // Boucle principale du jeu
        while (player.getHealth() > 0) {
            // Logique de jeu, mise à jour des états des objets, etc.
            System.out.println("Boucle de jeu en cours...");
            player.collectFruit(); // Exemple de collecte de fruit
            player.useSpecialAttack(); // Exemple d'utilisation d'attaque spéciale

            for (Dinosaur dino : dinosaurs) {
                dino.shootProjectile();
            }

            // Terminer la boucle si le joueur est vaincu
            if (player.getHealth() <= 0) {
                System.out.println("Game Over!");
                break;
            }
        }
    }

    public static void main(String[] args) {
        DinosaurGame game = new DinosaurGame();
        game.startGame();
        game.gameLoop();
    }
}
