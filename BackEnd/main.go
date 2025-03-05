package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/yourusername/buddy-buddy-app/database"
	"github.com/yourusername/buddy-buddy-app/handlers"
)

func main() {

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	database.ConnectToDb()

	app.Post("/api/username", handlers.CreateUser)

	app.Get("/user", handlers.FindUserAccount)

	defer database.DisconnectFromDb()

	log.Fatal(app.Listen(":4000"))

}
