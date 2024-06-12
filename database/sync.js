const sequelize_fixtures = require("sequelize-fixtures");
const models = require("./models");
const {
  Course,
  CourseMessage,
  CourseGoal,
  CourseQuestion,
  User,
} = models;

async function sync() {
  try {
    //	Step 1: Sync models without foreign key dependencies
    await User.sync({ alter: true });
    await Course.sync({ alter: true });

    await CourseQuestion.sync({ alter: true });
    await CourseGoal.sync({ alter: true });
    await CourseMessage.sync({ alter: true });

    console.log("All models synced successfully!");
  } catch (error) {
    console.error("Error syncing models:", error);
  }
}

async function loadFixtures(fileName) {
  try {
    await sequelize_fixtures.loadFile(fileName, models);
    console.log("All fixtures loaded successfully");
  } catch (error) {
    console.error("Error loading fixtures:", error);
  }
}

async function run(argv) {
  await sync();
  if (argv.length === 3) {
    const input = argv[2];
    await loadFixtures(input);
  }
  console.log("GG");
  return;
}

run(process.argv);
