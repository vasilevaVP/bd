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
    password: DataTypes.STRING,
  },
  {
    timestamps: false,
  }
);

async function run() {
  try {
    await sequelize.sync({ force: true });
    console.log("Таблица User пересоздана.");

    // Создание пользователей
    await User.create({ name: "John Doe", age: 30, cash: 100, password: 111 });
    await User.create({
      name: "Jane Smith",
      age: 25,
      cash: 200,
      password: 112,
    });
    await User.create({ name: "Oleg", age: 40, cash: 1000, password: 113 });
    await User.create({ name: "Natasha", age: 19, cash: 500, password: 114 });

    //  // Основы выполнения запросов

    //  // 1. Создание экземпляра
    //  const john = await User.create({ name: "John Smith", age: 35, cash: 50 });
    //  console.log("Создан пользователь John:", john.toJSON());

    //  // 2. Создание экземпляра с определенными полями
    //  const userWithUsername = await User.create(
    //    { name: "UserWithUsernameOnly", age: 28, cash: 300 },
    //    { fields: ["name"] }
    //  ); // Сохранятся только поле name
    //  console.log("Создан пользователь с указанными полями:", userWithUsername.toJSON());

    //  // 3. Получение экземпляра
    //  const firstUser = await User.findOne(); // Получает первый найденный экземпляр
    //  console.log("Первый пользователь:", firstUser ? firstUser.toJSON() : "Нет пользователей");

    //  // 4. Получение всех пользователей
    //  const allUsers = await User.findAll();
    //  console.log("Все пользователи:", allUsers.map((user) => user.toJSON()));

    //  // 5. Получение пользователей по условию
    //  const usersOver30 = await User.findAll({ where: { age: { [Op.gt]: 30 } } });
    //  console.log("Пользователи старше 30:", usersOver30.map((user) => user.toJSON()));

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

    // // Создание нескольких экземпляров с валидацией и выбором полей
    // try {
    //   const usersWithValidation = await User.bulkCreate(
    //     [{ name: "John" }, { name: "Jane", age: 30 }],
    //     { validate: true, fields: ["name"] }
    //   );
    //   console.log(
    //     "Пользователи созданы с валидацией и выбором полей:",
    //     usersWithValidation.map((user) => user.toJSON())
    //   );
    // } catch (validationError) {
    //   console.error("Ошибка валидации:", validationError);
    // }

    // // Сортировка и группировка

    // const sortedUsers = await User.findAll({
    //   order: [["age", "DESC"]], // Сортировка по возрасту (по убыванию)
    // });
    // console.log(
    //   "Отсортированные пользователи:",
    //   sortedUsers.map((user) => user.toJSON())
    // );

    // // Поисковые запросы

    // // 1. findAll() - все пользователи
    // const allUsers = await User.findAll();
    // console.log(
    //   "\nВсе пользователи:",
    //   allUsers.map((user) => user.toJSON())
    // );

    // // 2. findByPk() - пользователь по ID
    // const userById = await User.findByPk(1); // предположим, что user с id=1 существует
    // console.log(
    //   "\nПользователь по ID 1:",
    //   userById ? userById.toJSON() : "Пользователь не найден"
    // );

    // // 3. findOne() - первый пользователь
    // const firstUser = await User.findOne();
    // console.log(
    //   "\nПервый пользователь:",
    //   firstUser ? firstUser.toJSON() : "Пользователей нет"
    // );

    // // 4. findOne() - пользователь по условию
    // const userByName = await User.findOne({ where: { name: "Jane Smith" } });
    // console.log(
    //   "\nПользователь по имени Jane Smith:",
    //   userByName ? userByName.toJSON() : "Пользователь не найден"
    // );

    // // 5. findOrCreate() - поиск или создание
    // const [newUser, created] = await User.findOrCreate({
    //   where: { name: "New User" },
    //   defaults: { age: 20, cash: 0 },
    // });
    // console.log("\nfindOrCreate():", newUser.toJSON(), "Создан:", created);

    // // 6. findAndCountAll() - поиск с подсчетом
    // const { count, rows } = await User.findAndCountAll({
    //   where: { age: { [Op.gte]: 25 } }, // пользователи старше или равные 25 лет
    //   limit: 2, // ограничение на количество возвращаемых строк
    // });
    // console.log(
    //   "\nfindAndCountAll():",
    //   "Количество:",
    //   count,
    //   "Пользователи:",
    //   rows.map((user) => user.toJSON())
    // );

    //  // Удаление экземпляра
    //     async function deleteUserById(userId) {
    //       try {
    //         const user = await User.findByPk(userId);
    //         if (user) {
    //           await user.destroy();
    //           console.log(`Пользователь с ID ${userId} успешно удален.`);
    //         } else {
    //           console.log(`Пользователь с ID ${userId} не найден.`);
    //         }
    //       } catch (error) {
    //         console.error("Ошибка при удалении пользователя:", error);
    //       } finally {
    //         await sequelize.close();
    //       }
    //     }

    //     deleteUserById(1);

    // // Геттеры и сеттеры// Создание пользователей
    // const user1 = await User.create({
    //   name: "John Doe",
    //   age: 30,
    //   cash: 100,
    //   password: "mySecretPassword", // Хэшированный пароль
    // });
    // console.log("Пользователь создан:", user1.toJSON());
  } catch (error) {
    console.error("Ошибка:", error);
  } finally {
    await sequelize.close();
  }
}

run();
