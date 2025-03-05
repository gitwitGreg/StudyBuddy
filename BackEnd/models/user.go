package models

type User struct {
	ID             uint     `json:"id"`
	Name           string   `json:"name"`
	Username       string   `json:"username"`
	Email          string   `json:"email"`
	Password       string   `json:"password"`
	ProfilePicture string   `json:"profilePicture"`
	Major          string   `json:"major"`
	Classes        []string `json:"classes"`
}

type LoginRequest struct {
	email    string `json:"email"`
	password string `json:"password"`
}
