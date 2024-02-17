variable "region" {
  description = "The AWS region where the resources will be deployed."
  type        = string
  default     = "eu-west-2"
}

variable "vpc_cidr_block" {
  description = "CIDR block for the VPC"
  default     = "10.0.0.0/16"
}

variable "subnet_cidr_block" {
  description = "CIDR block for the subnet"
  default     = "10.0.1.0/24"
}

variable "availability_zone" {
  description = "Availability Zone for the subnet"
  default     = "eu-west-2b"
}

variable "map_public_ip_on_launch" {
  description = "Map public IP on launch for the subnet"
  default     = true
}