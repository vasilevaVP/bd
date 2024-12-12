const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize("database", "vp", "123", {
  dialect: "sqlite",
  storage: "database.sqlite",
});

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Добавлено ограничение not null
      validate: {
        len: [2, 10], // Валидация длины имени
      },
    },
    favouriteColor: {
      type: DataTypes.STRING,
      defaultValue: "green",
    },
    age: DataTypes.INTEGER,
    cash: DataTypes.INTEGER,
  },
  {
    timestamps: false,
  }
);

async function run() {
  try {
    await sequelize.sync({ force: true });
    console.log("Таблица User пересоздана.");

    // // Создание нескольких экземпляров одновременно
    // const users = await User.bulkCreate([
    //   { name: "TTT", age: 30, cash: 100 },
    //   { name: "JJJ", age: 25, cash: 200 },
    //   { name: "OOO", age: 40, cash: 1000 },
    //   { name: "AAA", age: 19, cash: 500 },
    // ]);
    // console.log(
    //   "Пользователи созданы:",
    //   users.map((user) => user.toJSON())
    // );

    // Создание нескольких экземпляров с валидацией и выбором полей
    try {
      const usersWithValidation = await User.bulkCreate(
        [{ name: "John" }, { name: "Jane", age: 30 }],
        { validate: true, fields: ["name"] }
      );
      console.log(
        "Пользователи созданы с валидацией и выбором полей:",
        usersWithValidation.map((user) => user.toJSON())
      );
    } catch (validationError) {
      console.error("Ошибка валидации:", validationError);
    }

    // // Сортировка и группировка (примеры)

    // const sortedUsers = await User.findAll({
    //   order: [["age", "DESC"]], // Сортировка по возрасту (по убыванию)
    // });
    // console.log("Отсортированные пользователи:", sortedUsers.map((user) => user.toJSON()));
  } catch (error) {
    console.error("Ошибка:", error);
  } finally {
    await sequelize.close();
  }
}

run();