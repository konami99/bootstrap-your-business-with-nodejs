variable "master_db_username" {
  description = "RDS root user username"
  type        = string
  sensitive   = true
}

variable "master_db_password" {
  description = "RDS root user password"
  type        = string
  sensitive   = true
}