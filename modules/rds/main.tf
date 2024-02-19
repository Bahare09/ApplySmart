
resource "aws_db_subnet_group" "rds_subnet_group" {
  name        = "rds-subnet-group"
  description = "RDS subnet group for DB instances"
  subnet_ids  = var.subnet_ids 
}

resource "aws_security_group" "TF_SG_rds" {
  vpc_id        = var.vpc_id  
  name          = "security_group_rds"
  description   = "RDS security group using Terraform"

  ingress {
    description      = "Allow incoming traffic from EC2"
    from_port        = 5432
    to_port          = 5432
    protocol         = "tcp"
    # security_groups  = var.security_groups
  }

  tags = {
    Name = "TF_SG_rds"
  }
}
resource "aws_db_instance" "rds" {
  engine               = var.db_engine
  identifier           = var.db_instance_identifier
  allocated_storage    = var.db_allocated_storage
  engine_version       = "15.4"
  instance_class       = var.db_instance_class
  username             = var.db_username
  password             = var.db_password
  skip_final_snapshot  = true
  publicly_accessible = false
  vpc_security_group_ids = [aws_security_group.TF_SG_rds.id]
  db_subnet_group_name  = aws_db_subnet_group.rds_subnet_group.name
  tags = {
    Name = var.db_instance_identifier
  }
}