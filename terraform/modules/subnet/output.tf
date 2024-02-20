# If the map_public_ip_on_launch attribute is set to true in the subnet resource, the output will return the ID of the public subnet. Conversely, if it is set to false, the output will return the ID of the private subnet.
output "subnet_id" {
  value = aws_subnet.subnet.id
}

output "subnet_name" {
  value = aws_subnet.subnet.tags["Name"]
}