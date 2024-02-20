provider "aws" {
  region = "eu-west-2"
}

terraform {
  backend "s3" {
    bucket         = "applysmart-tfstate"
    key            = "terraform.tfstate"
    region         = "eu-west-2"
    encrypt        = true
    dynamodb_table = "applysmart-terraform_lock"
  }
}