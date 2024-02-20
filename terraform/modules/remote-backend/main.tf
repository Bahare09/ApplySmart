provider "aws" {
  region = "eu-west-2"
}

resource "aws_s3_bucket" "hosting_bucket" {
  bucket = "applysmart-tfstate"
}

resource "aws_dynamodb_table" "terraform_lock" {
  name           = "applysmart-terraform_lock"
  hash_key       = "LockID"
  read_capacity  = 5
  write_capacity = 5

  attribute {
    name = "LockID"
    type = "S"
  }
}
