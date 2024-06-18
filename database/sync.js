const sequelize_fixtures = require("sequelize-fixtures");
const models = require("./models");
const {
  Course,
  Checkpoint,
  Question,
  Student,
  Plan,
  Answer,
  Content,
  AnswerAnalysis,
  CheckpointItem,
} = models;

async function sync() {
  try {
    await Student.sync({ alter: true });
    await Course.sync({ alter: true });
    await Plan.sync({ alter: true });

    await Checkpoint.sync({ alter: true });
    await CheckpointItem.sync({ alter: true });
    await Question.sync({ alter: true });
    await Answer.sync({ alter: true });
    await Content.sync({ alter: true });
    await AnswerAnalysis.sync({ alter: true });


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
