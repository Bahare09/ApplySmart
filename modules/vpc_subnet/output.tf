output "vpc_id" {
  value = aws_vpc.main.id
}

output "subnet_id" {
  value = aws_subnet.main_subnet.id
}

output "subnet_name" {
  value = aws_subnet.main_subnet.tags["Name"]
}
