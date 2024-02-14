# modules/ec2_instance/main.tf

module "applysmart-terraform" {
  source = "./modules/ec2"

  #   region          = var.region
  #   ami_id          = var.ami_id
}



# terraform {
#   required_providers {
#     aws = {
#       source  = "hashicorp/aws"
#       version = "~> 5.0"
#     }
#   }
# }

# # Configure the AWS Provider
# provider "aws" {
#   region = "eu-west-2"
# }
# resource "aws_instance" "app_server" {
#   ami           = "ami-027d95b1c717e8c5d"
#   instance_type = "t2.micro"

#   tags = {
#     Name = "terroform ec2"
#   }
# }