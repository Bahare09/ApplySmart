
module "s3-applysmart" {
  source      = "./modules/s3"
  bucket_name = "applysmart-terraform001"
}

module "vpc-applysmart" {
  source         = "./modules/vpc"
  vpc_cidr_block = "10.0.0.0/16"
  vpc_name       = "applysmart-main-vpc"
  igw_name       = "applysmart-igw"
}

module "subnet-ec2-pub" {
  source                  = "./modules/subnet"
  subnet_count            = 1
  vpc_id                  = module.vpc-applysmart.vpc_id
  subnet_cidr_block       = ["10.0.16.0/20"]
  availability_zone       = ["eu-west-2b"]
  map_public_ip_on_launch = [true]
  subnet_name             = "ec2-pub-subnet"
  igw_id                  = module.vpc-applysmart.igw_id
}

module "applysmart-ec2-tf" {
  source               = "./modules/ec2"
  ami_id               = "ami-027d95b1c717e8c5d"
  instance_type        = "t2.micro"
  instance_name        = "applysmart-ec2"
  subnet_ids           = module.subnet-ec2-pub.subnet_ids
  vpc_id               = module.vpc-applysmart.vpc_id
  desired_subnet_index = 0

}
module "subnet-rds-prv" {
  source                  = "./modules/subnet"
  vpc_id                  = module.vpc-applysmart.vpc_id
  subnet_cidr_block       = ["10.0.144.0/20", "10.0.128.0/20"]
  availability_zone       = ["eu-west-2b", "eu-west-2a"]
  map_public_ip_on_launch = [false, false]
  subnet_name             = "rds-pvt-subnet"
  igw_id                  = module.vpc-applysmart.igw_id
  subnet_count            = 2
}


module "applysmart-rds-tf" {
  source                 = "./modules/rds"
  db_instance_identifier = "as-tf"
  db_engine              = "postgres"
  db_instance_class      = "db.t3.micro"
  db_allocated_storage   = 20
  db_username            = "ap_tf"
  vpc_id                 = module.vpc-applysmart.vpc_id
  subnet_ids             = module.subnet-rds-prv.subnet_ids
  security_group_ids     = module.applysmart-ec2-tf.security_group_ids
  db_name                = "dbname"
}