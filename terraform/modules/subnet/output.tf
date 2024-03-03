# Outputs
output "subnet_ids" {
  value = aws_subnet.subnet[*].id
}

output "subnet_names" {
  value = aws_subnet.subnet[*].tags["Name"]
}

output "pub_rt_id" {
  value = aws_route_table.pub_rt.id
}

output "pri_rt_id" {
  value = aws_route_table.pri_rt.id
}