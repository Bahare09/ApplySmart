variable "aws_region" {
  description = "AWS region for S3 bucket"
  type        = string
  default     = "eu-west-2"
}

variable "bucket_name" {
  description = "The name of the S3 bucket"
  type        = string
  default     = "applysmart-terraform11"
}

