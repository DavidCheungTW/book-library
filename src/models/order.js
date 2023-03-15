module.exports = (sequelize, DataTypes) => {
  const schema = {
    startDate: {
      allowNull: false,
      type: DataTypes.DATEONLY,
      validate: {
        notNull: {
          args: [true],
          msg: "We need order start date",
        },
        notEmpty: {
          args: [true],
          msg: "Order start date cannot be empty",
        },
      },
    },
    endDate: {
      allowNull: false,
      type: DataTypes.DATEONLY,
      validate: {
        notNull: {
          args: [true],
          msg: "We need order end date",
        },
        notEmpty: {
          args: [true],
          msg: "Order end date cannot be empty",
        },
      },
    },
    orderCount: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          args: [true],
          msg: "We need order start date",
        },
        notEmpty: {
          args: [true],
          msg: "Order start date cannot be empty",
        },
        max: { args: 3, msg: "Continuously order book max 3 times!" },
      },
    },
  };
  return sequelize.define("Order", schema);
};
