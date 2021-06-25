locals {
  common_tags = {
    env     = terraform.workspace
    owner   = "richard chou"
    project = "bootstrap-your-business-with-nodejs-${terraform.workspace}"
  }
}

terraform {
  backend "s3" {
    bucket = "bootstrap-your-business-with-nodejs-terraform-${local.common_tags.env}"
    key    = state
    region = var.region
  }
}

provider "aws" {
  region = var.region
}

resource "aws_db_parameter_group" "main" {
  name   = "rds-pg"
  family = "postgres13"

  parameter {
    name  = "log_connections"
    value = "1"
  }

  tags = local.common_tags
}

resource "aws_security_group" "rds" {
  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = local.common_tags
}

resource "aws_db_instance" "main" {
  instance_class         = "db.t3.micro"
  allocated_storage      = 5
  engine                 = "postgres"
  engine_version         = "13.1"
  username               = var.master_db_username
  password               = var.master_db_password
  vpc_security_group_ids = [aws_security_group.rds.id]
  parameter_group_name   = aws_db_parameter_group.main.name
  publicly_accessible    = true
  skip_final_snapshot    = true

  tags = local.common_tags
}