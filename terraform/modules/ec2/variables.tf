# variables.tf

variable "region" {
  description = "The AWS region where the resources will be deployed."
  type        = string
  default     = "eu-west-2"
}
variable "vpc_id" {
  type = string
}

variable "ami_id" {
  description = "AMI ID for the EC2 instance."
  type        = string
  default     = "ami-027d95b1c717e8c5d"
}

variable "instance_type" {
  description = "Instance type for the EC2 instance."
  type        = string
  default     = "t2.micro"
}


variable "security_group_ids" {
  type        = list(string)
  default     = []
  description = "List of security group IDs for EC2 instances"
}

variable "instance_name" {
  description = "name for the EC2 instance."
  type        = string
  default     = "applysmart-terraform"
}

variable "subnet_ids" {
  type        = list(string)
  description = "List of subnet IDs where EC2 instances will be created"
}

variable "desired_subnet_index" {
  description = "Index of the desired subnet from the subnet_ids list"
  type        = number
  default     = 0 # Default to the first subnet
}