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
  description = "Security group IDs for the EC2 instance."
  type        = list(string)
  default     = []
}



variable "instance_name" {
  description = "name for the EC2 instance."
  type        = string
  default     = "applysmart-terraform"
}


variable "subnet_id" {
  type = string
}