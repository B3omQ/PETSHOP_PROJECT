---------------------------------------------------------
-- PET SHOP E-COMMERCE DATABASE (SQL SERVER)
---------------------------------------------------------

CREATE DATABASE PetShop;
GO
USE PetShop;
GO

---------------------------------------------------------
-- USERS (Chỉ để tích điểm + xem lịch sử)
---------------------------------------------------------
CREATE TABLE Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    Phone NVARCHAR(20),
    Address NVARCHAR(MAX),
    Role NVARCHAR(20) DEFAULT 'customer',
    CreatedAt DATETIME DEFAULT GETDATE()
);

---------------------------------------------------------
-- PET TYPES (Dog, Cat, Bird,…)
---------------------------------------------------------
CREATE TABLE Pets (
    PetId INT IDENTITY(1,1) PRIMARY KEY,
    PetName NVARCHAR(50) NOT NULL,
    Description NVARCHAR(MAX)
);

---------------------------------------------------------
-- CATEGORIES
---------------------------------------------------------
CREATE TABLE Categories (
    CategoryId INT IDENTITY(1,1) PRIMARY KEY,
    CategoryName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX)
);

---------------------------------------------------------
-- PRODUCTS
---------------------------------------------------------
CREATE TABLE Products (
    ProductId INT IDENTITY(1,1) PRIMARY KEY,
    ProductName NVARCHAR(150) NOT NULL,
    Description NVARCHAR(MAX),
    Price DECIMAL(10,2) NOT NULL,
    Stock INT DEFAULT 0,
    CategoryId INT,
    PetId INT,
    CreatedAt DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (CategoryId) REFERENCES Categories(CategoryId),
    FOREIGN KEY (PetId) REFERENCES Pets(PetId)
);

---------------------------------------------------------
-- PRODUCT IMAGES (1 Product = N Images)
---------------------------------------------------------
CREATE TABLE ProductImages (
    ImageId INT IDENTITY(1,1) PRIMARY KEY,
    ProductId INT NOT NULL,
    ImageUrl NVARCHAR(255) NOT NULL,
    ImageAlt NVARCHAR(255),

    FOREIGN KEY (ProductId) REFERENCES Products(ProductId)
);

---------------------------------------------------------
-- CARTS (Hỗ trợ Guest + User Cart)
---------------------------------------------------------
CREATE TABLE Carts (
    CartId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NULL,       -- User cart
    SessionId NVARCHAR(255) NULL,  -- Guest cart
    CreatedAt DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);

---------------------------------------------------------
-- CART ITEMS
---------------------------------------------------------
CREATE TABLE CartItems (
    CartItemId INT IDENTITY(1,1) PRIMARY KEY,
    CartId INT NOT NULL,
    ProductId INT NOT NULL,
    Quantity INT DEFAULT 1,

    FOREIGN KEY (CartId) REFERENCES Carts(CartId),
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId)
);

---------------------------------------------------------
-- ORDERS (Guest + User)
---------------------------------------------------------
CREATE TABLE Orders (
    OrderId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NULL,
    OrderDate DATETIME DEFAULT GETDATE(),
    TotalPrice DECIMAL(10,2) DEFAULT 0,
    Status NVARCHAR(50) DEFAULT 'Pending',

    -- Guest info
    GuestName NVARCHAR(100),
    GuestEmail NVARCHAR(100),
    GuestPhone NVARCHAR(20),
    GuestAddress NVARCHAR(MAX)
);

---------------------------------------------------------
-- ORDER ITEMS
---------------------------------------------------------
CREATE TABLE OrderItems (
    OrderItemId INT IDENTITY(1,1) PRIMARY KEY,
    OrderId INT NOT NULL,
    ProductId INT NOT NULL,
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId),
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId)
);

---------------------------------------------------------
-- REVIEWS (Chỉ User mới được review)
---------------------------------------------------------
CREATE TABLE Reviews (
    ReviewId INT IDENTITY(1,1) PRIMARY KEY,
    ProductId INT NOT NULL,
    UserId INT NOT NULL,
    Rating INT CHECK (Rating BETWEEN 1 AND 5),
    Comment NVARCHAR(MAX),
    CreatedAt DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (ProductId) REFERENCES Products(ProductId),
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);
CREATE TABLE RefreshTokens (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Token NVARCHAR(MAX) NOT NULL,
    UserId INT NOT NULL, 
    Expires DATETIME2 NOT NULL,
    Created DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    Revoked DATETIME2 NULL,
    CONSTRAINT FK_RefreshTokens_Users 
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
    ON DELETE CASCADE 
);


---------------------------------------------------------
-- SAMPLE DATA (OPTIONAL)
---------------------------------------------------------
INSERT INTO Pets (PetName) VALUES
('Dog'), ('Cat'), ('Bird'), ('Hamster'), ('Fish');

INSERT INTO Categories (CategoryName) VALUES
('Food'), ('Toys'), ('Accessories'), ('Health Care'), ('Bathing');

INSERT INTO Users (FullName, Email, PasswordHash, Phone, Role)
VALUES
('Admin', 'admin@petshop.com', '123456', '0900000000', 'admin'),
('John Doe', 'john@gmail.com', 'abc123', '0901111111', 'customer');

INSERT INTO Products (ProductName, Description, Price, Stock, CategoryId, PetId)
VALUES
('Dog Food Premium', 'High quality dog food', 15.99, 100, 1, 1),
('Cat Toy Mouse', 'A small toy mouse for cats', 5.50, 200, 2, 2),
('Bird Cage Small', 'Small cage for birds', 29.99, 50, 3, 3);

INSERT INTO ProductImages (ProductId, ImageUrl)
VALUES
(1, 'dog_food_1.jpg'),
(2, 'cat_toy_1.jpg'),
(3, 'bird_cage.png');
