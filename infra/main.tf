provider "aws" {
  region  = "us-east-1"
  profile = "personal"
}

variable "key_name" {}
variable "db_password" { sensitive = true }
