resource "aws_vpc" "main" {
  cidr_block          = var.vpc_cidr_block
  enable_dns_support  = true
  enable_dns_hostnames = true

  tags = {
    Name = "main-vpc"
  }
}

resource "aws_subnet" "main_subnet" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.subnet_cidr_block
  availability_zone       = var.availability_zone
  map_public_ip_on_launch = var.map_public_ip_on_launch

  tags = {
    Name = "main-subnet"
  }
}


resource "aws_subnet" "subnet_a" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.subnet_cidr_block
  availability_zone       = var.availability_zone
  map_public_ip_on_launch = var.map_public_ip_on_launch

  tags = {
    Name = "subnet-a"
  }
}

resource "aws_subnet" "subnet_b" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.2.0/24"  # Replace with your CIDR block for another subnet
  availability_zone       = "eu-west-2c"   # Replace with another AZ
  map_public_ip_on_launch = var.map_public_ip_on_launch

  tags = {
    Name = "subnet-b"
  }
}

output "subnet_id_a" {
  value = aws_subnet.subnet_a.id
}

output "subnet_id_b" {
  value = aws_subnet.subnet_b.id
}
