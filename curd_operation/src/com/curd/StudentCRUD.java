package com.curd;

import java.sql.*;
import java.util.Scanner;

public class StudentCRUD {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        while (true) {
            System.out.println("\n--- STUDENT CRUD MENU ---");
            System.out.println("1. Insert");
            System.out.println("2. View");
            System.out.println("3. Update");
            System.out.println("4. Delete");
            System.out.println("5. Exit");
            System.out.print("Enter choice: ");

            int ch = sc.nextInt();

            switch (ch) {

                case 1:
                    insertStudent(sc);
                    break;

                case 2:
                    viewStudents();
                    break;

                case 3:
                    updateStudent(sc);
                    break;

                case 4:
                    deleteStudent(sc);
                    break;

                case 5:
                    System.out.println("Thank you!");
                    System.exit(0);

                default:
                    System.out.println("Invalid choice");
            }
        }
    }

    // INSERT
    static void insertStudent(Scanner sc) {
        try {
            Connection con = DBConnection.getConnection();

            System.out.print("Enter ID: ");
            int id = sc.nextInt();
            sc.nextLine();

            System.out.print("Enter Name: ");
            String name = sc.nextLine();

            System.out.print("Enter Marks: ");
            int marks = sc.nextInt();

            PreparedStatement ps = con.prepareStatement(
                "INSERT INTO student VALUES (?, ?, ?)");

            ps.setInt(1, id);
            ps.setString(2, name);
            ps.setInt(3, marks);

            ps.executeUpdate();
            System.out.println("✅ Record Inserted");

            con.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // READ
    static void viewStudents() {
        try {
            Connection con = DBConnection.getConnection();
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("SELECT * FROM student");

            System.out.println("\nID   NAME   MARKS");
            while (rs.next()) {
                System.out.println(
                    rs.getInt(1) + "   " +
                    rs.getString(2) + "   " +
                    rs.getInt(3));
            }

            con.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // UPDATE
    static void updateStudent(Scanner sc) {
        try {
            Connection con = DBConnection.getConnection();

            System.out.print("Enter ID to update: ");
            int id = sc.nextInt();

            System.out.print("Enter new marks: ");
            int marks = sc.nextInt();

            PreparedStatement ps = con.prepareStatement(
                "UPDATE student SET marks=? WHERE id=?");

            ps.setInt(1, marks);
            ps.setInt(2, id);

            ps.executeUpdate();
            System.out.println("✅ Record Updated");

            con.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // DELETE
    static void deleteStudent(Scanner sc) {
        try {
            Connection con = DBConnection.getConnection();

            System.out.print("Enter ID to delete: ");
            int id = sc.nextInt();

            PreparedStatement ps = con.prepareStatement(
                "DELETE FROM student WHERE id=?");

            ps.setInt(1, id);
            ps.executeUpdate();

            System.out.println("✅ Record Deleted");

            con.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
