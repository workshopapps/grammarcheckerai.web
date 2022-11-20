terraform {
  backend "s3" {
    bucket = "hng-actions"
    key    = "terraform.tfstate"
    region = "us-east-1"
  }
}


// resource "tls_private_key" "pk" {
//   algorithm = "RSA"
//   rsa_bits  = 4096
// }

// resource "aws_key_pair" "generated_key" {
//   key_name   = "hng-actions"
//   public_key = tls_private_key.pk.public_key_openssh
// }

resource "aws_vpc" "devcloud" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

}


resource "aws_internet_gateway" "devc_igw" {
  vpc_id = aws_vpc.devcloud.id
  tags = {
    Name = "DevC-IGW"
  }
  depends_on = [aws_vpc.devcloud]
}


resource "aws_subnet" "devc_public_subnet" {
  vpc_id                  = aws_vpc.devcloud.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true

  tags = {
    Name = "DevC-PublicSubnet"
  }
}


resource "aws_route_table" "default_rtb" {
  vpc_id = aws_vpc.devcloud.id
  tags = {
    Names = "DefaultRTB"
  }
}


resource "aws_route" "publicRoute" {
  route_table_id         = aws_route_table.default_rtb.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.devc_igw.id
}


resource "aws_route_table_association" "devcPublicAssociation" {
  subnet_id      = aws_subnet.devc_public_subnet.id
  route_table_id = aws_route_table.default_rtb.id
}


resource "aws_instance" "public_instance" {
  ami                         = data.aws_ami.devc_data_source.id
  instance_type               = "t2.micro"
  subnet_id                   = aws_subnet.devc_public_subnet.id
  vpc_security_group_ids      = [aws_security_group.public_sg.id]
  associate_public_ip_address = true
  key_name                   = "hng-pk"

  }



resource "aws_security_group" "public_sg" {
  name        = "DevC Public SG"
  description = "Allow connections from my computer via ssh"
  vpc_id      = aws_vpc.devcloud.id
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

}
