variable "region" {
  description = "The AWS region where the resources will be deployed."
  type        = string
  default     = "eu-west-2"
}

variable "vpc_id" {
  type = string
}
variable "db_instance_identifier" {
  description = "Identifier for the RDS instance"
  default     = "applysmart-terraform"
}

variable "db_engine" {
  description = "Database engine type (e.g., postgres)"
  default     = "postgres"
}

variable "db_instance_class" {
  description = "The instance class of the RDS instance (e.g., db.t3.micro)"
  default     = "db.t3.micro"
}

variable "db_allocated_storage" {
  description = "The amount of allocated storage for the RDS instance (in GB)"
  default     = 20
}

variable "db_username" {
  description = "Username for the master DB user"
  default     = "postgres-applysmart-tf"
}

variable "db_password" {
  description = "Password for the master DB user"
  default     = "admin123"
}

variable "subnet_ids" {
  type        = list(string)
  description = "The list of subnet IDs for the RDS instance."
}
variable "security_group_ids" {
  type = list(string)
}
variable "db_name" {
  type    = string
  default = "dbname"
}