module "vpc-applysmart" {
  source         = "./modules/vpc"
  vpc_cidr_block = "10.0.0.0/16"
  vpc_name       = "applysmart-main-vpc"
  igw_name       = "applysmart-igw"
}

module "subnet-ec2-pub" {
  source                  = "./modules/subnet"
  vpc_id                  = module.vpc-applysmart.vpc_id
  subnet_cidr_block       = "10.0.16.0/20"
  availability_zone       = "eu-west-2b"
  map_public_ip_on_launch = true
  subnet_name             = "ec2-pub-subnet"
}

module "applysmart-ec2-tf" {
  source        = "./modules/ec2"
  ami_id        = "ami-027d95b1c717e8c5d"
  instance_type = "t2.micro"
  instance_name = "applysmart-ec2"
  subnet_id     = module.subnet-ec2-pub.subnet_id
  vpc_id        = module.vpc-applysmart.vpc_id

}
module "subnet-rds-pvt-b" {
  source                  = "./modules/subnet"
  vpc_id                  = module.vpc-applysmart.vpc_id
  subnet_cidr_block       = "10.0.144.0/20"
  availability_zone       = "eu-west-2b"
  map_public_ip_on_launch = false
  subnet_name             = "rds-pvt-b-subnet"
}

module "subnet-rds-pvt-a" {
  source                  = "./modules/subnet"
  vpc_id                  = module.vpc-applysmart.vpc_id
  subnet_cidr_block       = "10.0.128.0/20"
  availability_zone       = "eu-west-2a"
  map_public_ip_on_launch = false
  subnet_name             = "rds-pvt-a-subnet"
}

module "applysmart-rds-tf" {
  source                 = "./modules/rds"
  db_instance_identifier = "as-tf"
  db_engine              = "postgres"
  db_instance_class      = "db.t3.micro"
  db_allocated_storage   = 20
  db_username            = "ap_tf"
  vpc_id                 = module.vpc-applysmart.vpc_id
  subnet_ids             = [module.subnet-rds-pvt-b.subnet_id, module.subnet-rds-pvt-a.subnet_id]
}
