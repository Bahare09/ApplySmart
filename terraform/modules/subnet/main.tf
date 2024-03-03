resource "aws_subnet" "subnet" {
  count                   = var.subnet_count
  vpc_id                  = var.vpc_id
  cidr_block              = element(var.subnet_cidr_block, count.index)
  availability_zone       = element(var.availability_zone, count.index)
  map_public_ip_on_launch = element(var.map_public_ip_on_launch, count.index)
  tags = {
    Name = "${var.subnet_name}-${count.index + 1}"
  }
}

# Create a public route table
resource "aws_route_table" "pub_rt" {
  vpc_id = var.vpc_id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = var.igw_id
  }
  tags = {
    Name = "pub_rt"
  }
}

# Create a private route table
resource "aws_route_table" "pri_rt" {
  vpc_id = var.vpc_id
  tags = {
    Name = "pri_rt"
  }
}

# Create route table association based on subnet type
resource "aws_route_table_association" "example" {
  count          = var.subnet_count
  subnet_id      = aws_subnet.subnet[count.index].id
  route_table_id = aws_subnet.subnet[count.index].map_public_ip_on_launch ? aws_route_table.pub_rt.id : aws_route_table.pri_rt.id
}
