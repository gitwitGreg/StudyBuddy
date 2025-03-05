package handlers

import (
	"context"
	"fmt"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/yourusername/buddy-buddy-app/database"
	"github.com/yourusername/buddy-buddy-app/models"
	"go.mongodb.org/mongo-driver/bson"
)

// Create user account in MongoDb
func CreateUser(c *fiber.Ctx) error {

	fmt.Println("mad it to endpoint")

	var user models.User

	if err := c.BodyParser(&user); err != nil {
		fmt.Println("Error parsing user")
		return c.Status(400).JSON(fiber.Map{"error": "Unable to parser user object"})
	}

	return c.Status(201).JSON(user)

}

// Find user account in MongoDb
func FindUserAccount(c *fiber.Ctx) error {

	email := c.Query("email")

	if database.Client == nil {
		fmt.Println("Client in database is nil from intialization from handler")
		return c.JSON(fiber.Map{"error": "Client in database is nil"})
	}

	client := database.Client

	database := client.Database("StudyBuddy")

	result := database.RunCommand(context.Background(), bson.M{"collStats": "StudyBuddy"})

	var document bson.M

	err := result.Decode(&document)

	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Unable to document"})
	}

	collection := client.Database("StudyBuddy").Collection("Users")

	var userProfile models.User

	userErr := collection.FindOne(context.TODO(), bson.M{"email": email}).Decode(&userProfile)

	if userErr != nil {

		newUser := models.User{
			Username:       email,
			Email:          email,
			Name:           "",
			Password:       "",
			ProfilePicture: "",
			Major:          "",
			Classes:        []string{},
		}

		_, insertErr := collection.InsertOne(context.TODO(), newUser)

		if insertErr != nil {
			return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Unable to add new user to Db"})
		}

		return c.Status(http.StatusCreated).JSON(newUser)

	}

	return c.JSON(userProfile)
}
