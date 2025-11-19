"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Addresses (must be created before Users)
    await queryInterface.createTable("Addresses", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      street: { type: Sequelize.STRING, allowNull: false },
      city: { type: Sequelize.STRING, allowNull: false },
      state: { type: Sequelize.STRING, allowNull: false },
      country: { type: Sequelize.STRING, allowNull: false },
      postalCode: { type: Sequelize.STRING, allowNull: false },
    });

    // Users
    await queryInterface.createTable("Users", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: Sequelize.STRING, allowNull: false, unique: true },
      fullName: { type: Sequelize.STRING, allowNull: true },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      dob: { type: Sequelize.DATE, allowNull: true },
      gender: {
        type: Sequelize.ENUM("male", "female", "other"),
        allowNull: true,
      },
      profileBio: { type: Sequelize.TEXT, allowNull: true },
      password: { type: Sequelize.STRING, allowNull: false },
      passwordChangedAt: { type: Sequelize.DATE, allowNull: true },
      passwordResetToken: { type: Sequelize.STRING, allowNull: true },
      passwordResetExpires: { type: Sequelize.DATE, allowNull: true },
      failedLoginAttempts: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      accountLockedUntil: { type: Sequelize.DATE, allowNull: true },
      role: {
        type: Sequelize.ENUM("admin", "customer", "seller"),
        allowNull: false,
        defaultValue: "customer",
      },
      phoneNumber: { type: Sequelize.STRING, allowNull: true, unique: true },
      profilePicture: { type: Sequelize.STRING, allowNull: true },
      status: {
        type: Sequelize.ENUM("active", "inactive", "blocked"),
        allowNull: false,
        defaultValue: "active",
      },
      address: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "Addresses", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      notificationEnabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      verificationToken: { type: Sequelize.STRING, allowNull: true },
      verificationTokenExpires: { type: Sequelize.DATE, allowNull: true },
      isTwoFactorEnabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      twoFactorSecret: { type: Sequelize.STRING, allowNull: true },
      twoFactoryExpires: { type: Sequelize.DATE, allowNull: true },
      lastLoginAt: { type: Sequelize.DATE, allowNull: true },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      deletedAt: { type: Sequelize.DATE, allowNull: true },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // Categories
    await queryInterface.createTable("Categories", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: false },
      imageUrl: { type: Sequelize.STRING, allowNull: false },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // Tags
    await queryInterface.createTable("Tags", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
    });

    // Coupons
    await queryInterface.createTable("Coupons", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      code: { type: Sequelize.STRING, allowNull: false, unique: true },
      description: { type: Sequelize.TEXT, allowNull: true },
      discountPercentage: { type: Sequelize.DECIMAL(5, 2), allowNull: false },
      validFrom: { type: Sequelize.DATE, allowNull: false },
      validTo: { type: Sequelize.DATE, allowNull: false },
      usageLimit: { type: Sequelize.INTEGER, allowNull: true },
      minimumPurchaseAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // Products
    await queryInterface.createTable("Products", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: false },
      price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      stockQuantity: { type: Sequelize.INTEGER, allowNull: false },
      imageUrl: { type: Sequelize.STRING, allowNull: false },
      category: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Categories", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      seller: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      isDiscounted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      discountPercentage: { type: Sequelize.INTEGER, allowNull: true },
      discountExpires: { type: Sequelize.DATE, allowNull: true },
      isFeatured: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isNew: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // Carts
    await queryInterface.createTable("Carts", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      totalAmount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // CartItems
    await queryInterface.createTable("CartItems", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      cartId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Carts", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Products", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      quantity: { type: Sequelize.INTEGER, allowNull: false },
      price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // Wishlists
    await queryInterface.createTable("Wishlists", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // WishlistItems
    await queryInterface.createTable("WishlistItems", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      wishlistId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Wishlists", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Products", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      addedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // Orders
    await queryInterface.createTable("Orders", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      totalAmount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      paymentMethod: {
        type: Sequelize.ENUM(
          "credit_card",
          "debit_card",
          "paypal",
          "cash_on_delivery"
        ),
      },
      paymentStatus: {
        type: Sequelize.ENUM("pending", "paid", "failed"),
        allowNull: false,
        defaultValue: "pending",
      },
      shippingAddressId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Addresses", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      status: {
        type: Sequelize.ENUM(
          "pending",
          "confirmed",
          "shipped",
          "delivered",
          "cancelled"
        ),
        allowNull: false,
        defaultValue: "pending",
      },
      shippingFee: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      subtotal: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // OrderItems
    await queryInterface.createTable("OrderItems", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Orders", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Products", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      appliedCouponId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "Coupons", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      quantity: { type: Sequelize.INTEGER, allowNull: false },
      price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      discountAmount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      taxAmount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // Payments
    await queryInterface.createTable("Payments", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      transactionId: { type: Sequelize.STRING, allowNull: false },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Orders", key: "id" },
      },
      amount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      paymentMethod: { type: Sequelize.STRING, allowNull: false },
      paymentDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      status: { type: Sequelize.STRING, allowNull: false },
    });

    // Shipments
    await queryInterface.createTable("Shipments", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Orders", key: "id" },
      },
      status: { type: Sequelize.STRING, allowNull: false },
      trackingNumber: { type: Sequelize.STRING, allowNull: true },
      shippedDate: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      deliveryDate: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // ProductTags (many-to-many)
    await queryInterface.createTable("ProductTags", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Products", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      tagId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Tags", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    });

    // Reviews
    await queryInterface.createTable("Reviews", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Products", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      rating: { type: Sequelize.INTEGER, allowNull: false },
      review: { type: Sequelize.TEXT, allowNull: false },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // SellerReviews
    await queryInterface.createTable("SellerReviews", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      sellerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      rating: { type: Sequelize.INTEGER, allowNull: false },
      review: { type: Sequelize.TEXT, allowNull: false },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // Points
    await queryInterface.createTable("Points", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      totalPoints: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // Notifications
    await queryInterface.createTable("Notifications", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      type: { type: Sequelize.STRING, allowNull: false },
      title: { type: Sequelize.STRING, allowNull: false },
      message: { type: Sequelize.TEXT, allowNull: false },
      isRead: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      readAt: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // Messages
    await queryInterface.createTable("Messages", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      senderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      receiverId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      content: { type: Sequelize.TEXT, allowNull: false },
      sentAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      isRead: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      readAt: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop in reverse order, accounting for foreign key dependencies
    await queryInterface.dropTable("Messages");
    await queryInterface.dropTable("Notifications");
    await queryInterface.dropTable("Points");
    await queryInterface.dropTable("SellerReviews");
    await queryInterface.dropTable("Reviews");
    await queryInterface.dropTable("ProductTags");
    await queryInterface.dropTable("Shipments");
    await queryInterface.dropTable("Payments");
    await queryInterface.dropTable("OrderItems");
    await queryInterface.dropTable("Orders");
    await queryInterface.dropTable("WishlistItems");
    await queryInterface.dropTable("Wishlists");
    await queryInterface.dropTable("CartItems");
    await queryInterface.dropTable("Carts");
    await queryInterface.dropTable("Products");
    await queryInterface.dropTable("Coupons");
    await queryInterface.dropTable("Tags");
    await queryInterface.dropTable("Categories");
    await queryInterface.dropTable("Users"); // Drop Users before Addresses
    await queryInterface.dropTable("Addresses");
  },
};
