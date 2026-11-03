// Browser version of the Java "Game Collection Manager" terminal app
// (github.com/Tyler32J/Game-Collection-Manager-Terminal-). It follows Main.java, IO.java and GameDAO.java
// line for line: same menus, prompts, table layout and rules. The one difference is storage: the PostgreSQL
// tables (platform, games) become in-memory tables in the visitor's browser, reset on every run.

// ---- In-memory stand-in for the PostgreSQL database (DatabaseManager.java) ----

// PostgreSQL ILIKE: case-insensitive, % matches anything, _ matches one character
const ilike = (value, pattern) => {
  if (value == null) return false;
  const regex = pattern
    .split("")
    .map((ch) => (ch === "%" ? ".*" : ch === "_" ? "." : ch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
    .join("");
  return new RegExp(`^${regex}$`, "is").test(value);
};

const isBlank = (text) => text.trim() === "";

const createDatabase = () => {
  const db = { platforms: [], games: [], nextPlatformId: 1, nextGameId: 1 };
  // Seeded by DatabaseManager.initialize()
  [["PlayStation", "Sony"], ["Xbox", "Microsoft"], ["PC", "Windows"], ["Nintendo Switch", "Nintendo"]].forEach(
    ([title, manufacturer]) => db.platforms.push({ id: db.nextPlatformId++, title, manufacturer })
  );
  return db;
};

// GameDAO.java
const createGameDAO = (db) => {
  const normalizeGenre = (genre) => {
    if (genre == null || genre.title == null) return null;
    const g = genre.title.trim();
    if (!g) return null;
    return g.substring(0, 1).toUpperCase() + (g.length > 1 ? g.substring(1).toLowerCase() : "");
  };

  const getOrCreatePlatformId = (platform) => {
    if (!platform || platform.title == null || isBlank(platform.title)) return -1;

    const existing = db.platforms.find((p) => ilike(p.title, platform.title.trim()));
    if (existing) {
      if (platform.manufacturer != null && !isBlank(platform.manufacturer)) {
        existing.manufacturer = platform.manufacturer.trim();
      }
      return existing.id;
    }

    const created = {
      id: db.nextPlatformId++,
      title: platform.title.trim(),
      manufacturer: platform.manufacturer != null ? platform.manufacturer.trim() : null,
    };
    db.platforms.push(created);
    return created.id;
  };

  // mapResultSetToGame: a LEFT JOIN with no platform still gives a Platform with null fields
  const toGame = (row) => {
    const platform = db.platforms.find((p) => p.id === row.platform);
    return {
      id: row.id,
      title: row.title,
      platform: { id: row.platform ?? 0, title: platform?.title ?? null, manufacturer: platform?.manufacturer ?? null },
      genre: { title: row.genre },
      completed: row.completed === 1,
    };
  };

  const newestFirst = (a, b) => b.id - a.id;

  return {
    addGame(game) {
      const platformId = getOrCreatePlatformId(game.platform);
      db.games.push({
        id: db.nextGameId++,
        title: game.title,
        platform: platformId > 0 ? platformId : null,
        genre: normalizeGenre(game.genre),
        completed: game.completed ? 1 : 0,
      });
      return true;
    },

    getAllGames() {
      return [...db.games].sort(newestFirst).map(toGame);
    },

    getGameById(id) {
      const row = db.games.find((g) => g.id === id);
      return row ? toGame(row) : null;
    },

    searchGames(term) {
      const pattern = `%${term}%`;
      return db.games
        .filter((row) => {
          const platform = db.platforms.find((p) => p.id === row.platform);
          return ilike(row.title, pattern) || ilike(platform?.title, pattern) ||
            ilike(platform?.manufacturer, pattern) || ilike(row.genre, pattern);
        })
        .sort(newestFirst)
        .map(toGame);
    },

    updateGame(game) {
      const platformId = getOrCreatePlatformId(game.platform);
      const row = db.games.find((g) => g.id === game.id);
      if (!row) return false;
      row.title = game.title;
      row.platform = platformId > 0 ? platformId : null;
      row.genre = normalizeGenre(game.genre);
      row.completed = game.completed ? 1 : 0;
      return true;
    },

    deleteGame(id) {
      const index = db.games.findIndex((g) => g.id === id);
      if (index === -1) return false;
      db.games.splice(index, 1);
      return true;
    },
  };
};

// ---- Main.java ----

const pad = (text, width) => String(text).padEnd(width);
const truncate = (text, length) => {
  if (text == null) return "";
  if (text.length <= length) return text;
  return text.substring(0, length - 3) + "...";
};

// Every run starts with an empty collection, like the Java app on a brand-new database
export async function runGameCollectionManager({ write, readLine, ready }) {
  const dao = createGameDAO(createDatabase());
  ready();

  // IO.java
  const println = (message) => write(`${message}\n`);
  const print = (message) => write(message);
  const readString = () => readLine();
  // Scanner.nextInt(): skips empty lines, reads the first word, and anything that isn't a whole number gives -1
  const readInt = async () => {
    for (;;) {
      const words = (await readLine()).trim().split(/\s+/).filter(Boolean);
      if (words.length === 0) continue;
      const word = words[0];
      if (/^[+-]?\d+$/.test(word)) {
        const value = Number(word);
        if (value >= -2147483648 && value <= 2147483647) return value;
      }
      return -1;
    }
  };

  const printTable = (games) => {
    println(`${pad("ID", 4)} | ${pad("Title", 20)} | ${pad("Platform", 12)} | ${pad("Genre", 12)} | ${pad("Status", 10)}`);
    println("-------------------------------------------------------------------------");
    for (const game of games) {
      const status = game.completed ? "Completed" : "In Progress";
      const platformName = game.platform != null ? game.platform.title : "N/A";
      const genreName = game.genre != null ? game.genre.title : "N/A";
      println(`${pad(game.id, 4)} | ${pad(truncate(game.title, 20), 20)} | ${pad(truncate(platformName, 12), 12)} | ${pad(truncate(genreName, 12), 12)} | ${pad(status, 10)}`);
    }
    println("-------------------------------------------------------------------------");
  };

  const printMenu = () => {
    println("\n=======================================");
    println("      GAME COLLECTION MANAGER          ");
    println("=======================================");
    println("  [1] Add New Game");
    println("  [2] View Collection");
    println("  [3] Search for a Game");
    println("  [4] Update a Game");
    println("  [5] Delete a Game");
    println("---------------------------------------");
    println("  [0] Exit Application");
    println("=======================================");
    print("Selection > ");
  };

  const addGame = async () => {
    print("Enter title: ");
    const title = await readString();
    print("Enter platform name (PC, Xbox, PlayStation, Nintendo Switch, etc): ");
    const pName = await readString();
    print("Enter manufacturer (Sony, Microsoft, Nintendo, Windows, etc): ");
    const pMaker = await readString();
    print("Enter genre (Action, Strategy, Adventure etc): ");
    const gName = await readString();
    print("Is it completed? (y/n): ");
    const isCompleted = (await readString()).toLowerCase() === "y";

    const game = { title, platform: { title: pName, manufacturer: pMaker }, genre: { title: gName }, completed: isCompleted };
    if (dao.addGame(game)) println("Game added successfully!");
    else println("(!) Error: Could not save the game. Please check your database connection.");
  };

  const viewAllGames = () => {
    const games = dao.getAllGames();
    if (games.length === 0) {
      println("\n(!) Your collection is currently empty.");
    } else {
      println("\n--- CURRENT COLLECTION ---");
      printTable(games);
    }
  };

  const searchGames = async () => {
    print("You can search by Title, Platform, Manufacturer, or Genre:");
    const term = await readString();
    const games = dao.searchGames(term);
    if (games.length === 0) {
      println(`\n(!) No games found matching '${term}'.`);
    } else {
      println("\n--- SEARCH RESULTS ---");
      printTable(games);
    }
  };

  const updateGame = async () => {
    print("Enter game ID to update: ");
    const id = await readInt();
    const game = dao.getGameById(id);
    if (game == null) {
      println(`(!) Error: Game with ID ${id} not found.`);
      return;
    }

    println(`\n--- Updating Game: ${game.title} ---`);
    println("Leave blank to keep current value.");

    print(`New title [${game.title}]: `);
    const title = await readString();
    if (!isBlank(title)) game.title = title;

    const currentPlatform = game.platform != null ? game.platform.title : "N/A";
    print(`New platform [${String(currentPlatform)}]: `);
    const pName = await readString();
    if (!isBlank(pName)) {
      const currentMaker = game.platform != null ? game.platform.manufacturer : "";
      print(`New manufacturer [${String(currentMaker)}]: `);
      let pMaker = await readString();
      if (isBlank(pMaker)) pMaker = currentMaker;
      game.platform = { id: 0, title: pName, manufacturer: pMaker };
    } else if (game.platform != null) {
      // Platform name didn't change, but maybe manufacturer should?
      const currentMaker = game.platform.manufacturer;
      print(`New manufacturer [${String(currentMaker)}]: `);
      const pMaker = await readString();
      if (!isBlank(pMaker)) game.platform.manufacturer = pMaker;
    }

    const currentGenre = game.genre != null ? game.genre.title : "N/A";
    print(`New genre [${String(currentGenre)}]: `);
    const gName = await readString();
    if (!isBlank(gName)) game.genre.title = gName;

    print(`Is it completed? (y/n) [${game.completed ? "y" : "n"}]: `);
    const completedInput = await readString();
    if (!isBlank(completedInput)) game.completed = completedInput.toLowerCase() === "y";

    if (dao.updateGame(game)) println("Game updated successfully!");
    else println("(!) Error: Could not update the game in the database.");
  };

  const deleteGame = async () => {
    print("Enter game ID to delete: ");
    const id = await readInt();
    if (dao.deleteGame(id)) println("Game deleted successfully!");
    else println(`(!) Error: Game with ID ${id} not found or database error.`);
  };

  println("Welcome to the Game Collection Manager!");
  let running = true;
  while (running) {
    printMenu();
    const choice = await readInt();
    switch (choice) {
      case 1: await addGame(); break;
      case 2: viewAllGames(); break;
      case 3: await searchGames(); break;
      case 4: await updateGame(); break;
      case 5: await deleteGame(); break;
      case 0:
        running = false;
        println("Goodbye!");
        break;
      default:
        println("Invalid choice. Try again.");
    }
  }
}
