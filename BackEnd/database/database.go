package database

import (
	"context"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client

// Connet with MongoDB database
func ConnectToDb() {

	var envErr = godotenv.Load()

	if envErr != nil {
		log.Fatal("Error loading enviroment variables")
	}

	mongoUri := os.Getenv("MONGO_URI")

	if mongoUri == "" {
		log.Fatal("Missing Uri")
	}

	serverApi := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(mongoUri).SetServerAPIOptions(serverApi)

	client, err := mongo.Connect(context.TODO(), opts)

	if err != nil {
		log.Fatal("Error connecting to database")
	}

	Client = client
}

// Disconnect from MongoDB databse
func DisconnectFromDb() {
	if err := Client.Disconnect(context.TODO()); err != nil {
		log.Fatal("Error disconnecting from database")
	}
}
