# modules/ec2/outputs.tf

output "instance_id" {
  description = "The ID of the created EC2 instance."
  value       = aws_instance.ec2.id
}

output "public_ip" {
  description = "The public IP address of the created EC2 instance."
  value       = aws_instance.ec2.public_ip
}

# Output for the Security Group ID
output "security_group_ids" {
  value = [aws_security_group.TF_SG_ec2.id]
}