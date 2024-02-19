variable "region" {
  description = "The AWS region where the resources will be deployed."
  type        = string
  default     = "eu-west-2"
}

variable "vpc_cidr_block" {
  description = "CIDR block for the VPC"
  default     = "10.0.0.0/16"
}

variable "vpc_name" {
  description = "Name tag for the vpc"
  type        = string
  default     = "applysmart-main-vpc"
}

# Variable for Internet Gateway Name
variable "igw_name" {
  default = "my-igw"  
}