variable "region" {
  description = "The AWS region where the resources will be deployed."
  type        = string
  default     = "eu-west-2"
}
variable "subnet_count" {
  description = "Number of subnets to create"
  default     = 2
}
variable "vpc_id" {
  type = string
  # default = "vpc-04068e649eecb7713"
}
variable "subnet_cidr_block" {
  description = "CIDR blocks for subnets"
  type        = list(string)
  # Example: ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "availability_zone" {
  description = "Availability zones for subnets"
  type        = list(string)
  # Example: ["us-east-1a", "us-east-1b"]
}

variable "map_public_ip_on_launch" {
  description = "Whether to map public IP on launch for each subnet"
  type        = list(bool)
  # Example: [true, false]
}

variable "subnet_name" {
  description = "Name tag for the subnet"
  type        = string
  default     = "main-subnet"
}

variable "igw_id" {
  type = string
  # default = "igw-09c51db3ae00f083c"

}




