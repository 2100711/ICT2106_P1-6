﻿// <auto-generated />
using System;
using CleanBrightCompany.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ICT2106P14.Migrations
{
    [DbContext(typeof(CleanBrightCompanyDBContext))]
    [Migration("20230313161010_31420232")]
    partial class _31420232
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.2");

            modelBuilder.Entity("CleanBrightCompany.Models.Goals", b =>
                {
                    b.Property<int>("goalID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<double>("cumulativeCF")
                        .HasColumnType("REAL");

                    b.Property<DateTime>("endDate")
                        .HasColumnType("TEXT");

                    b.Property<int>("goalDuration")
                        .HasColumnType("INTEGER");

                    b.Property<double>("progress")
                        .HasColumnType("REAL");

                    b.Property<DateTime>("startDate")
                        .HasColumnType("TEXT");

                    b.Property<double>("targetCF")
                        .HasColumnType("REAL");

                    b.HasKey("goalID");

                    b.ToTable("Goals");
                });

            modelBuilder.Entity("CleanBrightCompany.Models.Product", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Brand")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<float>("CarbonFootprint")
                        .HasColumnType("REAL");

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<float>("Price")
                        .HasColumnType("REAL");

                    b.Property<int>("Stock")
                        .HasColumnType("INTEGER");

                    b.Property<float>("Weight")
                        .HasColumnType("REAL");

                    b.HasKey("ID");

                    b.ToTable("Product");
                });

            modelBuilder.Entity("CleanBrightCompany.Models.Reward", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("PointValue")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Reward");
                });

            modelBuilder.Entity("CleanBrightCompany.Models.Room", b =>
                {
                    b.Property<string>("roomID")
                        .HasColumnType("TEXT");

                    b.Property<int>("level")
                        .HasColumnType("INTEGER");

                    b.HasKey("roomID");

                    b.ToTable("Room");
                });

            modelBuilder.Entity("CleanBrightCompany.Models.RoomUsage", b =>
                {
                    b.Property<string>("roomUsageID")
                        .HasColumnType("TEXT");

                    b.Property<float>("carbonFootprintEmission")
                        .HasColumnType("REAL");

                    b.Property<float>("electricityUsage")
                        .HasColumnType("REAL");

                    b.Property<DateOnly>("logDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("roomID")
                        .HasColumnType("TEXT");

                    b.HasKey("roomUsageID");

                    b.ToTable("RoomUsage");
                });
#pragma warning restore 612, 618
        }
    }
}
