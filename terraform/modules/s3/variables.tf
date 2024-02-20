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

# variable "acl_s3" {
#   description = "Access Control List (ACL) for the S3 bucket"
#   type        = string
#   # default     = "public"
# }

# variable "enable_versioning" {
#   description = "Enable versioning for the S3 bucket"
#   type        = bool
#   default     = true
# }
