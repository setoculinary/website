    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = $_POST["name"];
        $email = $_POST["email"];
        $phone = $_POST["phone"];
        $course = $_POST["course"];
        $message = $_POST["message"];

        $to = "setoculinaryacademy@gmail.com";
        $subject = "New Course Enquiry";
        $body = "Name: $name\nEmail: $email\nPhone: $phone\nCourse: $course\nMessage: $message";
        $headers = "From: $email";

        if (mail($to, $subject, $body, $headers)) {
            echo "Thank you for your enquiry!";
        } else {
            echo "Oops! Something went wrong. Please try again later.";
        }
    }
  ?>