output "vpc_id" {
  value = aws_vpc.vpc.id
}
output "igw_id" {
  value = aws_internet_gateway.igw.id
}

output "vpc_cidr_block" {
  value = aws_vpc.vpc.cidr_block
}