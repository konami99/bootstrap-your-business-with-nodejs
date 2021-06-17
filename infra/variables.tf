variable "master_db_username" {
  description = "RDS root user username"
  type        = string
}

variable "master_db_password" {
  description = "RDS root user password"
  type        = string
  sensitive   = true
}

variable "region" {
  default     = "us-west-2"
  description = "AWS region"
}